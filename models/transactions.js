const Model = require('./model_base_class')

class Transactions extends Model {
  constructor(connection, queries) {
    super(connection, queries);
  }

  async getAllTransactions () {
    const q = this.queries.getAllTransactions;
    return this.query(q);
  }

  async getPositiveSubBalances () {
    const q = this.queries.getPositiveSubBalances;
    return this.query(q);
  }

  async addNewTransaction (payer, points, timestamp) {
    const q = this.queries.addNewTransaction;
    const v = { payer, points, timestamp }
    return this.query(q, v)
  }

  async updateAndInsertTransactions (update, insert) {
    const q = this.queries.buildUpdateAndInsertMultiQuery(update, insert);
    // WHAT DO I DO HERE?
  }
}

module.exports = Transactions;