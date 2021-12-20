const Model = require('./baseClass')

module.exports = class TransactionsModels extends Model {

  constructor (connection, queries) {
    super(connection, queries);
  }

  async addNewTransaction(transaction) {
    const q = this.queries.addNewTransaction;
    const result = await this.connection.query(q, transaction);
    return result;
  }

  async getPayerByName (payer) {
    const q = this.queries.getPayerByName;
    const result = await this.connection.query(q, payer);
    return result;
  }

  async addNewPayer(payer) {
    const q = this.queries.addNewPayer;
    const v = { payer }
    const result = await this.connection.query(q, v)
    return result;
  }

}



