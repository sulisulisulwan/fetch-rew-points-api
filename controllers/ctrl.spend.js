const  { getPositiveSubBalances, updateAndInsertTransactions } = require('../models').TransactionsModel;
const  { updatePayerBalances } = require('../models').BalancesModel;

const spendPoints = async (req, res) => {
  //calls processDebit, which is now middleware

  //make model calls here, send to middleware
  //sends back
}

module.exports = { spendPoints };