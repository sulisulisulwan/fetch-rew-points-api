const Model = require('./base_model')

class AllTransactions extends Model {
  constructor(connection, queries) {
    super(connection, queries);
  }

  async addNewTransaction (payer, points, timestamp) {
    const q = this.queries.addNewTransaction;
    const v = { payer, points, timestamp }
    return this.query(q, v)
  }
}

module.exports = AllTransactions;