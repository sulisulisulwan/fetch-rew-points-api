const queries = require('./queries');
const connection = require('../db')

const updateTransactionsSubBalances = async (processedSubBalances) => {
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

const getAllNonZeroSubBalanceTransactions = async () => {
  try {
    const q = queries.getAllNonZeroSubBalancedTransactions;
    const result = await connection.query(q);
    return result[0];
  } catch(err) {
    console.error(err);
    return err;
  }
}


module.exports = {
  updateTransactionsSubBalances,
  getAllNonZeroSubBalanceTransactions
}