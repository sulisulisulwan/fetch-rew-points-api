const Model = require('./baseClass.js')

module.exports = class BalancesModels extends Model {

  constructor(connection, queries) {
    super(connection, queries);
  }

  async getAllBalances() {
    const q = this.queries.getAllBalances;
    const result = await this.connection.query(q);
    return result;
  }

}



