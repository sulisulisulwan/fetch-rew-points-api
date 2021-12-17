const Model = require('./base_class/model')

class Balances extends Model {
  constructor(connection, queries) {
    super(connection, queries);
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

  async updatePayerBalances (newBalances) {
    const q = await this.queries.buildUpdatePayerBalanceQuery(newBalances);
    const v; //THIS NEEDS TO BE ALL OF THE BALANCES
    return this.query(q, v);
  }

  async getAllBalances () {
    const q = this.queries.getAllBalances;
    return this.query(q);
  }
}

module.exports = Balances;