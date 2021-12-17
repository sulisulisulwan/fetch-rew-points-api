
const transactionQueries = require('./queries/transactions')
const connection = require('../db')

const getAllTransactions = async () => {
  const q = transactionQueries.getAllTransactions;
  const result = await connection.query(q);
  return result[0];
}

const getPositiveSubBalances = async  () => {
  const q = transactionQueries.getPositiveSubBalances;
  const result = await connection.query(q);
  return result[0];
}

const addNewTransaction = async  (transaction) => {
  const q = transactionQueries.addNewTransaction;
  const v = transaction;
  const result = await connection.query(q, v);
  return result[0];
}

const updateAndInsertTransactions = async  (update, insert) => {
  const q = await transactionQueries.buildUpdateAndInsertMultiQuery(update, insert);
  //update is an array of [transactionId, newBalance, ...]
  //insert is an array of [payer, balanceTrend,'debit', ...]
  const v = update.concat(insert);
  const result = await connection.query(q, v);
  return result[0];
}

module.exports = {
  getAllTransactions,
  getPositiveSubBalances,
  addNewTransaction,
  updateAndInsertTransactions
};