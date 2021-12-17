const { getPayerByName, addNewPayer, updatePayerBalances, } = require('../models').BalancesModel
const { addNewTransaction} = require('../models').TransactionsModel

const processTransactions = async (req, res) => {
  try {
    const { points } = req.body;

    if (points < 0) {
      //call debit middleware
    } else {
      //call credit middleware
    }
    res.sendStatus(201);
  } catch(err) {
    console.error(err)
    res.sendStatus(500);
  }
}


module.exports = { processTransactions };