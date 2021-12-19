
const queries = require('./queries')
const connection = require('../db')
const Model = require('./baseClass')

module.exports = class TransactionsModels extends Model {

  constructor (connection, queries) {
    super(connection, queries)
  }

  async addNewTransaction(transaction) {
    try {
      const q = queries.addNewTransaction;
      const result = await connection.query(q, transaction);
      return result[0];
    } catch (err) {
      console.error(err)
      return err;
    }
  }

}


