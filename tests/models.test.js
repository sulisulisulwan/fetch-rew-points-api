const Model = require('../models/baseClass')
const { TransactionsModels, BalancesModels, SpendModels }= require('../models');


const mocks = {
  connection: {
    query: async (q, v) => {
      return [true];
    }
  },
  queries: {
    addNewTransaction: 'THIS IS A QUERY',
    query2: 'THIS IS ANOTHER QUERY',
  }
}


describe('Models:', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  })

  try {

    const { connection, queries } = mocks;

    describe('Base Class:', () => {

      let newModel = new Model('connection', 'queries');

      test('Should have a property "connection"', () => {
        expect(newModel.connection).toBe('connection')
      })

      test('Should have a property "queries"', () => {
        expect(newModel.queries).toBe('queries')
      })

      describe(`query():`, () => {
        let newModel = new Model(connection, queries);
        test('Should be a function', async () => {
          expect(typeof newModel.query).toBe('function');
        });

        test('Should return a promise', async ()=> {
          const result = newModel.query();
          await expect(result instanceof Promise).toBe(true);
        });
      })

      describe('buildMultiStatementQuery():', () => {
        test('Should be callable', () => {
          expect(typeof newModel.buildMultiStatementQuery).toBe('function');
        })

        test('Should return a promise', () => {
          const result = newModel.buildMultiStatementQuery(['galleon', 3]);
          expect(result instanceof Promise).toBe(true);
        })

        test('Returned promise should contain a string', async () => {
          expect(typeof await newModel.buildMultiStatementQuery(['galleon', 3])).toBe('string')
        })

        test('String should contain statements from queryData', async () => {
          const result = await newModel.buildMultiStatementQuery(['galleon; ', 3]);
          expect(result).toBe('galleon; galleon; galleon; ')
        })

      })


    })

    describe('Transactions Models:', () => {

      beforeEach(() => {
        jest.clearAllMocks();
      })

      let newTransactionsModels = new TransactionsModels('connection', 'queries')

      test('Should be an instance of Model', () => {
        expect(newTransactionsModels instanceof Model).toBe(true);
      })


      test('Should have a property "connection"', () => {
        let newTransactionsModels = new TransactionsModels('connection', 'queries')
        expect(newTransactionsModels.connection).toBe('connection');
      })

      test('Should have a property "queries"', () => {
        let newTransactionsModels = new TransactionsModels('connection', 'queries')
        expect(newTransactionsModels.queries).toBe('queries');
      })

      test('Should have a method "query"', () => {
        expect(typeof newTransactionsModels.query).toBe('function');
      })

      describe('addNewTransaction():', () => {

        beforeEach(() => {
          jest.clearAllMocks();
        })

        newTransactionsModels = new TransactionsModels(connection, queries);

        test('Should exist', () => {
          expect(typeof newTransactionsModels.addNewTransaction).toBe('function');
        })
        test('Should call connection.query()', async () => {
          const spyOnConnectionQuery = jest.spyOn(newTransactionsModels.connection, 'query');
          await newTransactionsModels.addNewTransaction();
          expect(spyOnConnectionQuery).toHaveBeenCalledTimes(1);
        })
        test('Should return a promise', async () => {
          let result = newTransactionsModels.addNewTransaction();
          await expect(result instanceof Promise).toBe(true);
        })

      })


    })
    describe('Spend Models:', () => {
      test('Should be an instance of Model', () => {
        let newSpendModels = new SpendModels('connection', 'queries')
        expect(newSpendModels instanceof Model).toBe(true);
      });

      test('Should have a property "connection"', () => {
        let newSpendModels = new SpendModels('connection', 'queries')
        expect(newSpendModels.connection).toBe('connection');
      });

      test('Should have a property "queries"', () => {
        let newSpendModels = new SpendModels('connection', 'queries')
        expect(newSpendModels.queries).toBe('queries');
      });

      test('Should have a method "query"', () => {
        let newSpendModels = new SpendModels('connection', 'queries')
        expect(typeof newSpendModels.query).toBe('function')
      });


      describe('updateTransactionsSubBalances():', () => {

        beforeEach(() => {
          jest.clearAllMocks();
        })
        let newSpendModels = new BalancesModels(connection, queries);

        test('Should be callable', () => {
          let newSpendModels = new SpendModels(connection, queries)
          expect(typeof newSpendModels.updateTransactionsSubBalances).toBe('function');
        })

        test('Should call buildMultiStatementQuery()', async () => {
          let newSpendModels = new SpendModels(connection, queries)
          const spyBuildMulti = jest.spyOn(newSpendModels, 'buildMultiStatementQuery')
          await newSpendModels.updateTransactionsSubBalances(['fish', 3]);
          expect(spyBuildMulti).toHaveBeenCalledTimes(1);
        })

        test('Should call connection.query()', async () => {
          let newSpendModels = new SpendModels(connection, queries)
          const spyConnectionQuery = jest.spyOn(newSpendModels.connection, 'query');
          await newSpendModels.updateTransactionsSubBalances(['Yossarian', 3]);
          expect(spyConnectionQuery).toHaveBeenCalledTimes(1);
        })

        test('Should return a promise', () => {
          let newSpendModels = new SpendModels(connection, queries)
          const result = newSpendModels.updateTransactionsSubBalances(['Gatsby', 5])
          expect(result instanceof Promise).toBe(true);
        });

      })

      describe('getAllNonZeroSubBalanceTransactions():', () => {

        beforeEach(() => {
          jest.clearAllMocks();
          jest.resetAllMocks();
        })


        test('Should be callable', () => {
          let newSpendModels = new SpendModels(connection, queries)
          expect(typeof newSpendModels.getAllNonZeroSubBalanceTransactions).toBe('function');
        })
        test('Should call connection.query()', async () => {
          let newSpendModels = new SpendModels(connection, queries)
          const spyConnectionQuery = jest.spyOn(newSpendModels.connection, 'query');
          await newSpendModels.getAllNonZeroSubBalanceTransactions();
          expect(spyConnectionQuery).toHaveBeenCalledTimes(1);
        })
        test('Should return a promise', () => {
          let newSpendModels = new SpendModels(connection, queries)
          const result = newSpendModels.getAllNonZeroSubBalanceTransactions()
          expect(result instanceof Promise).toBe(true);
        })
      })

    })

    describe('Balances Models:', () => {

      const newBalancesModels = new BalancesModels('connection', 'queries');
      test('Should be an instance of Model', () => {
        expect(newBalancesModels instanceof Model).toBe(true);
      })

      test('Should have a property "connection"', () => {
        expect(newBalancesModels.connection).toBe('connection')
      })

      test('Should have a property "queries"', () => {
        expect(newBalancesModels.queries).toBe('queries');
      })

      test('Should have a method "query"', () => {
        expect(typeof newBalancesModels.query).toBe('function');
      })


    })
  } catch(err) {
    console.error(err)
  }
})