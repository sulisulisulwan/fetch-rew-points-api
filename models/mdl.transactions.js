
const queries = require('./queries')
const connection = require('../db')

const addNewTransaction = async  (transaction) => {
  try {
    const q = queries.addNewTransaction;
    const result = await connection.query(q, transaction);
    return result[0];
  } catch (err) {
    console.error(err)
    return err;
  }
}

module.exports = {
  addNewTransaction,
};