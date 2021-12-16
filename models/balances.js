const Model = require('./base_model')

class Balances extends Model {
  constructor(connection, queries) {
    super(connection, queries);
  }

  async addNewPayer (payer, balance, earliestAliveId) {
    const q = this.queries.addNewPayer;
    const v = { payer, balance, earliestAliveId }
    return this.query(q, v)
  }

  async updateEarliestAlive (earliestAliveId) {
    const q = this.queries.updateEarliestAlive;
    return this.query(q, earliestAliveId);
  }

  async updatePayerBalance (balance) {
    const q = this.queries.updatePayerBalance;
    return this.query(q, balance);
  }

  async getOrderedByEarliest () {
    const q = this.queries.getOrderedByEarliest;
    return this.query(q);
  }

  async updateToNextEarliestAlive () {
    const q = this.queries.updateToNextEarliestAlive;
    return this.query(q);
  }

  async getAllBalances () {
    const q = this.queries.getAllBalances;
    return this.query(q);
  }
}

module.exports = Balances;