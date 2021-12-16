const Model = require('../models/base_model');
const AllTransactions = require('../models/allTransactions')
const Balances = require('../models/balances')
const AliveBalances = require('../models/aliveBalances')

describe('Models:', () => {

  const connection = {
    query() {
      return;
    }
  }
  const queries = {

  }

  describe('Base model class', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    })

    describe('constructor()', () => {
      test('Should take a connection and queries argument and assign them to this.connection and this.queries', () => {
//TODO:
      })

    })
    describe('query():', () => {
      test('Should be able to call method query()', () => {
        const newModel = new Model(connection)
        const spyOnQuery = jest.spyOn(newModel, 'query');
        newModel.query();
        expect(spyOnQuery).toHaveBeenCalled();
      })
      test('Should call connection.query()', () => {
        const newModel = new Model(connection)
        const spyOnConnectionQuery = jest.spyOn(newModel.connection, 'query')
        newModel.query();
        expect(spyOnConnectionQuery).toHaveBeenCalled();
      })

      test('Should return a promise', () => {
        const newModel = new Model(connection)
        const result = newModel.query();
        expect(result instanceof Promise).toBe(true);
      })

      test('Should take two potential arguments and pass them to connection.query()', () => {
//TODO:
      })
    })
  })

  describe('AllTransactions Model:', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    })

    test('Should have a properties "connection" and "queries"', () => {
      const newAllTransactions = new AllTransactions('connection', 'queries');
      expect(newAllTransactions.connection).toBe('connection')
      expect(newAllTransactions.queries).toBe('queries')
    })

  })

  describe('Balances Model:', () =>{
    beforeEach(() => {
      jest.resetAllMocks();
    })


    test('Should have a properties "connection" and "queries"', () => {
      const newBalances = new Balances('connection', 'queries');
      expect(newBalances.connection).toBe('connection')
      expect(newBalances.queries).toBe('queries')
    })

  })
  describe('AliveBalances Model:', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    })


    test('Should have a properties "connection" and "queries"', () => {
      const newAliveBalances = new AliveBalances('connection', 'queries');
      expect(newAliveBalances.connection).toBe('connection')
      expect(newAliveBalances.queries).toBe('queries')
    })

  })

})


