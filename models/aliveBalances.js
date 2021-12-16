const Model = require('./base_model')

class AliveBalances extends Model {
  constructor(connection, queries) {
    super(connection, queries);
  }

  async addNewALiveBalance (points, timestamp) {
    const q = this.queries.addNewAliveBalance;
    const v = { points, timestamp };
    return this.query(q, v);
  }

  async updateSubBalance (id, newSubBalance) {
    const q = this.queries.updateSubBalance;
    return this.query(newSubBalance)
  }

  async deleteALiveBalance (id) {
    const q = this.queries.deleteAliveBalance;
    return this.query(q);
  }

}

module.exports = AliveBalances;