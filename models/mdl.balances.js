const balanceQueries = require('./queries/balances')
const connection= require('../db')


const getPayerByName = async (payer) => {
  //the return value of this includes
  //timestamp and balance data from aliveBalances
  const q = balanceQueries.getPayerByName;
  const result = await connection.query(q, payer);
  return result[0];
}
const addNewPayer = async (payer, points) => {
  const q = balanceQueries.addNewPayer;
  const v = { payer, balance: points }
  const result = await connection.query(q, v)
  return result[0].insertId;
}

const updatePayerBalances = async (newBalances, transType) => {

  const q = await balanceQueries.buildUpdatePayerBalanceQuery(newBalances, transType);
  const result = await connection.query(q, newBalances);
  return result;
}

const getAllBalances = async () => {
  const q = balanceQueries.getAllBalances;
  const result = connection.query(q);
  return result[0]
}

module.exports = {
  getPayerByName,
  addNewPayer,
  updatePayerBalances,
  getAllBalances
};