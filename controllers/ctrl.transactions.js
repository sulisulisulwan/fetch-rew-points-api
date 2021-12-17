const { getPayerByName, addNewPayer, updatePayerBalances, } = require('../models').BalancesModel
const { addNewTransaction} = require('../models').TransactionsModel
const { creditAccount } = require('./subroutines/sr.credit')
const { adminDebitAccount } = require('./subroutines/sr.debit')


const processTransactions = async (req, res) => {
  try {
    const { payer, points } = req.body;
    let balanceId;
    let payerBalance = await getPayerByName(payer)
    if (payerBalance.length === 0) {
      balanceId = await addNewPayer(payer, points)
      payerBalance = points;
    } else {
      balanceId = payerBalance[0].id;
    }
    let transactionData = { payer, points, timestamp, balanceId, payerBalance };
    points < 0 ? await adminDebitAccount(transactionData)
      : await credit(transactionData);
      res.sendStatus(201);
  } catch(err) {
    console.error(err)
    res.sendStatus(500);
  }
}


module.exports = { processTransactions };