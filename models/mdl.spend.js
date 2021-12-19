const queries = require('./queries');
const connection = require('../db')
const Model = require('./baseClass')

module.exports = class SpendModels extends Model {

  constructor(connection, queries) {
    super(connection, queries)
  }

  async updateTransactionsSubBalances(processedSubBalances) {
    try {
      const numOfStatements = processedSubBalances.length / 2;
      const statement = `UPDATE Transactions SET subBalance = ? WHERE id = ?; `;
      const queryStringsAndFrequency = [statement, numOfStatements]
      const q = await queries.buildMultiStatementQuery(queryStringsAndFrequency)
      const result = await connection.query(q, processedSubBalances)
      return result[0];
    } catch(err) {
      console.error(err);
      return err;
    }
  }

  async getAllNonZeroSubBalanceTransactions() {
    try {
      const q = queries.getAllNonZeroSubBalancedTransactions;
      const result = await connection.query(q);
      return result[0];
    } catch(err) {
      console.error(err);
      return err;
    }
  }

}


