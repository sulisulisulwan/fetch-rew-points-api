const Model = require('./baseClass')

module.exports = class SpendModels extends Model {

  constructor(connection, queries) {
    super(connection, queries)
  }

  async updateTransactionsSubBalances(processedSubBalances) {
    const numOfStatements = processedSubBalances.length / 2;
    const statement = this.queries.updateTransactionsSubBalances;
    const queryStringsAndFrequency = [statement, numOfStatements]
    const q = await this.buildMultiStatementQuery(queryStringsAndFrequency)
    const result = await this.connection.query(q, processedSubBalances)
    return result;

  }

  async getAllNonZeroSubBalanceTransactions() {
    const q = this.queries.getAllNonZeroSubBalancedTransactions;
    const result = await this.connection.query(q);
    return result;
  }

}


