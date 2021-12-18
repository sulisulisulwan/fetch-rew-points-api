const queries = require('./queries')
const connection= require('../db')


const getPayerByName = async (payer) => {
  try {
    const q = queries.getPayerByName;
    const result = await connection.query(q, payer);
    return result[0];
  } catch (err) {
    console.error(err);
    return err;
  }
}
const addNewPayer = async (payer) => {
  try {
    const q = queries.addNewPayer;
    const v = { payer }
    const result = await connection.query(q, v)
    return result[0].insertId;
  } catch(err) {
    console.error(err);
    return err;
  }
}

const getAllBalances = async () => {
  try {
    const q = queries.getAllBalances;
    const result = await connection.query(q);
    return result[0]
  } catch(err) {
    console.error(err);
    return err;
  }
}

module.exports = {
  getPayerByName,
  addNewPayer,
  getAllBalances
};