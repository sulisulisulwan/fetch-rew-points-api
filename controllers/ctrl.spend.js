const  { getPositiveSubBalances, updateAndInsertTransactions } = require('../models').TransactionsModel;
const { processSpendPoints } = require('./subroutines/sr.debit')
const spendPoints = async (req, res) => {
  try {
    const { points } = req.body;
    const debitSummaryPerPayer = await processSpendPoints(points)
    res.status(201).json(debitSummaryPerPayer);
  } catch(err) {
    console.error(err)
    res.sendStatus(500);
  }
}

module.exports = { spendPoints };