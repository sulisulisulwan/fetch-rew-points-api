const queries = require('./queries');
const connection = require('../db')

const updateTransactionsAndBalances = async (payerBalanceUpdates, processedSubBalances) => {
  // console.log(payerBalanceUpdates, processedSubBalances)
  try {
    const numOfStatements1 = payerBalanceUpdates.length / 2;
    const numOfStatements2 = processedSubBalances.length / 2;
    const statement1 = `UPDATE Balances SET balance = ? WHERE id = ?; `
    const statement2 = `UPDATE Transactions SET subBalance = ? WHERE id = ?; `;
    const queryStringsAndFrequency = [statement1, numOfStatements1, statement2, numOfStatements2]
    const q = await queries.buildMultiStatementQuery(queryStringsAndFrequency)
    const v = payerBalanceUpdates.concat(processedSubBalances);
    const result = await connection.query(q, v)
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
  updateTransactionsAndBalances,
  getAllNonZeroSubBalanceTransactions
}