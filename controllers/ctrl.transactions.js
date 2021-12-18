const { getPayerByName, addNewPayer } = require('../models').BalancesModel
const { addCreditTransaction } = require('./subroutines/sr.credit')
const { addDebitTransaction } = require('./subroutines/sr.debit')
const { formatTimestamp } = require('./utils')

const processTransactions = async (req, res) => {
  try {
    const { payer, points } = req.body;
    const timestamp = await formatTimestamp(req.body.timestamp)
    let payerRecord = await getPayerByName(payer)
    const payerId = payerRecord.length === 0 ? await addNewPayer(payer) : payerRecord[0].id;
    let transactionData = { payer, points, timestamp, payerId };
    points < 0 ? await addDebitTransaction(transactionData)
      : await addCreditTransaction(transactionData);
      res.sendStatus(201);
  } catch(err) {
    console.error(err)
    res.sendStatus(500);
  }
}


module.exports = { processTransactions };