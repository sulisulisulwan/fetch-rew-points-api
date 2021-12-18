
const queries = require('./queries')
const connection = require('../db')

const addNewTransaction = async  (transaction, processedSubBalances) => {
  try {
    const q = queries.addNewTransaction;
    const v = transaction;
    const result = await connection.query(q, v);
    return result[0];
  } catch (err) {
    console.error(err)
    return err;
  }
}

module.exports = {
  addNewTransaction,
};