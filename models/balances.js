const Model = require('./model_base_class')

class Balances extends Model {
  constructor(connection, queries, utils) {
    super(connection, queries, utils);
  }

  async getPayerByName (payer) {
    //the return value of this includes
    //timestamp and balance data from aliveBalances
    const q = this.queries.getPayerByName;
    return this.query(q, payer);
  }
  async addNewPayer (payer, points, transactionId) {
    const q = this.queries.addNewPayer;
    const v = { payer, points, earliestAliveId }
    return this.query(q, v)
  }

  async updatePayerBalance (newBalance, earliestTransactionId) {
    const q = earliestTransactionId === null ? this.queries.updatePayerBalance
      : this.queries.updatePayerBalanceAndEarliestTrans;
    //possibly instead above have a function which generates the query depending on
    //values passed in
    const v = { balance: newBalance };
    if (earliestTransactionId !== null) {
      v.earliestTrans = earliestTransactionId
    }
    return this.query(q, v);
  }

  async getAllBalances () {
    const q = this.queries.getAllBalances;
    return this.query(q);
  }
}

module.exports = Balances;