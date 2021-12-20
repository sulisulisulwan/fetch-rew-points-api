const Controller = require('../controllers/baseClass')
const {
  TransactionsControllers,
  BalancesControllers,
  SpendControllers
} = require('../controllers/')

describe('Controllers:', () => {

  describe('Base Class:', () => {
    test('Should have a property "models" assigned to first argument', () => {
      const newController = new Controller('models')
      expect(newController.models).toBe('models', 'utils');
    })
  })

  describe('TransactionsControllers:', () => {

    describe('constructor():', () => {

      const newTransactionsControllers = new TransactionsControllers('models', 'utils', 'subroutines');
      test('Should be an instance of Controllers', () => {
        expect(newTransactionsControllers instanceof Controller).toBe(true)
      })

      test('Should have a property "utils"', () => {
        expect(newTransactionsControllers.utils).toBe('utils')
      })

      test('Should have a property "sbrt"', () => {
        expect(newTransactionsControllers.sbrt).toBe('subroutines')
      })

      test('Should have a property "models" assigned through super()', () => {
        expect(newTransactionsControllers.models).toBe('models')
      })

    })

    describe('processTransactions():', () => {

      beforeEach(() => {
        jest.resetAllMocks()
        jest.clearAllMocks()
      })
      const db = {
        Payer: [{ id: 1 }]
      }

      const mocks = {
        transactionsModels: {
          async getPayerByName (payer) {
            let result = [db[payer]];
            result = result[0] || [[]]
            return result;
          },
          async addNewPayer (payer) {
            db[payer] = { id: 2 };
            return [{ insertId: 2 }]
          }
        },
        subRoutines: {
          DebitSbrt : {
            async addDebitTransaction () {
              return;
            },
          },
          CreditSbrt: {
            async addCreditTransaction () {
              return;
            }
          }
        },
        utils: {
          async formatTimestamp(timestamp) {
            if (timestamp === undefined) {
              throw new Error('formatTimestamp must be passed a timestamp');
            }
            return 'formatted';
          }
        },
        response: {
          sendStatus(status) {
            return;
          }
        }
      }
      const { transactionsModels, utils, subRoutines, response } = mocks;
      const newTransactionsControllers = new TransactionsControllers(transactionsModels, utils, subRoutines)

      test('Should send payer, points, timestamp, and payerId to credit subroutine if points are greater than 0', async () => {
        const spyCredit = jest.spyOn(mocks.subRoutines.CreditSbrt, 'addCreditTransaction');
        const request = {
          body: {
            timestamp: 'This is a timestamp',
            payer: 'Payer',
            points: 1000
          }
        }
        await newTransactionsControllers.processTransactions(request, response)
        expect(spyCredit).toHaveBeenCalledTimes(1);
      })
      test('Should send payer, points, timestamp, and payerId to debit subroutine if points are less than 0', async() => {
        const spyDebit = jest.spyOn(mocks.subRoutines.DebitSbrt, 'addDebitTransaction');
        const request = {
          body: {
            timestamp: 'This is a timestamp',
            payer: 'Payer',
            points: -1000
          }
        }
        await newTransactionsControllers.processTransactions(request, response)
        expect(spyDebit).toHaveBeenCalledTimes(1);
      })

      test('Should pass the id of payer from the database record to pass to subroutine', async() => {
        const request = {
          body: {
            timestamp: 'This is a timestamp',
            payer: 'Payer',
            points: 1000
          }
        }
        const spyCredit = jest.spyOn(newTransactionsControllers.sbrt.CreditSbrt, 'addCreditTransaction');
        await newTransactionsControllers.processTransactions(request, response)
        expect(spyCredit).toHaveBeenCalledTimes(1);
        expect(spyCredit).toHaveBeenLastCalledWith(expect.objectContaining({
          payer: 'Payer',
          points: 1000,
          timestamp: 'formatted',
          payerId: 1
        }))

        request.body.points = -500;
        const spyDebit = jest.spyOn(newTransactionsControllers.sbrt.DebitSbrt, 'addDebitTransaction');
        await newTransactionsControllers.processTransactions(request, response);
        expect(spyDebit).toHaveBeenCalledTimes(1);
        expect(spyDebit).toHaveBeenLastCalledWith(expect.objectContaining({
          payer: 'Payer',
          points: -500,
          timestamp: 'formatted',
          payerId: 1
        }))
      })

      test('Should add the given payer if the payer doesn\'t exist in the database and retain the id to pass to subroutine', async() => {
        const spyAddPayer = jest.spyOn(newTransactionsControllers.models, 'addNewPayer');
        const request = {
          body: {
            timestamp: 'This is a timestamp',
            payer: 'Nobody',
            points: 1234
          }
        }
        await newTransactionsControllers.processTransactions(request, response);
        expect(spyAddPayer).toHaveBeenCalledTimes(1);
        expect(spyAddPayer).toHaveBeenLastCalledWith('Nobody')
        expect(db['Nobody'].id).toBe(2);
      })

      test('Should send a 201 status for success', async() => {
        const spySendStatus = jest.spyOn(response, 'sendStatus')
        const request = {
          body: {
            timestamp: 'This is a timestamp',
            payer: 'Payer',
            points: 1000
          }
        }
        await newTransactionsControllers.processTransactions(request, response)
        expect(spySendStatus).toHaveBeenLastCalledWith(201)
      })
      test('Should send a 500 status for an error', async() => {
        const spySendStatus = jest.spyOn(response, 'sendStatus')
        const request = {
          body: {
            timestamp: undefined,
            payer: 'Payer',
            points: 1000
          }
        }
        await newTransactionsControllers.processTransactions(request, response)
        expect(spySendStatus).toHaveBeenLastCalledWith(500)
      })
    })

  })

  describe('BalancesControllers:', () => {
    const newBalancesControllers = new BalancesControllers('models');

    test('Should be an instance of Controllers', () => {
      expect(newBalancesControllers instanceof Controller).toBe(true)
    })

    test('Should have a property "models" assigned through super()', () => {
      expect(newBalancesControllers.models).toBe('models')
    })


    describe('getBalance():', () => {

      const mocks = {
        balanceModels: {
          async getAllBalances() {
            return [[{ payer1: 4000, payer2: 1000 }]]
          }
        },
        response: {
          status: () => {
            return {
              spyJson: (json) => {
                return json;
              }
            }
          },
          sendStatus(status) {
            return;
          }
        }
      }

      const { balanceModels, response } = mocks;
      const newBalancesControllers = new BalancesControllers(balanceModels)

      test('Should call the Balances model to getAllBalances()', async() => {
        const spyGetAllBalances = jest.spyOn(newBalancesControllers.models, 'getAllBalances')
        await newBalancesControllers.getBalance(null, response);
        expect(spyGetAllBalances).toHaveBeenCalled();
      })

      // test('Response should contain a JSON data from database formatted with payer as key and balance as value', () => {

      //   await await newBalancesControllers.getBalance();
      // })

      test('Successful responses should return a status of 200', async() => {
        const spyStatus = jest.spyOn(response, 'status')
        await newBalancesControllers.getBalance(null, response);
        expect(spyStatus).toHaveBeenLastCalledWith(200);
      })

      test('Errors should return a status of 500', async() => {
        const spySendStatus = jest.spyOn(response, 'sendStatus');
        await newBalancesControllers.getBalance(null, response);
        expect(spySendStatus).toHaveBeenLastCalledWith(500);
      })
    })

  })


  describe('SpendControllers:', () => {

    //THESE TESTS ARE... UNDER CONSTRUCTION

    // mocks = {
    //   spendModels: {

    //   },
    //   subRoutines: {
    //     DebitSbrt: {
    //       processSpendPoints() => {

    //       }
    //     }
    //   }
    // }

    describe('constructor():', () => {
      const newSpendControllers = new SpendControllers('models', 'subroutines');
      test('Should be an instance of Controllers', () => {
        expect(newSpendControllers instanceof Controller).toBe(true)
      })
      test('Should have a property "sbrt"', () => {
        expect(newSpendControllers.sbrt).toBe('subroutines')
      })
      test('Should have a property "models" assigned through super()', () => {
        expect(newSpendControllers.models).toBe('models');
      })
    })

    // describe('spendPoints():', () => {
    //   const newSpendControllers = new SpendControllers()
    //   const db = {
    //     debitSummaryData: [{ payer1: 100, payer2: 200, payer3: 0 }]
    //   }

      // test('Should send debitSummaryData in JSON format to client upon response', () => {

      // })

      // test('Successful responses should be sent with a 201 code', () => {
      // })

      // test('Error responses should be sent with a 500 code', () => {
      //   const spySendStatus = jest.spyOn(response, 'sendStatus');

      // })

    // })

  })
})