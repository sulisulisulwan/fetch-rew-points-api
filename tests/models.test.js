const Model = require('../models/base_model');

describe('Models:', () => {

  const connection = {
    query() {
      return;
    }
  }

  describe('Base model class', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    })

    test('constructor()', () => {
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

      test('Should take two potential arguments and pass them to connection.query()')
//TODO:
    })
  })
})