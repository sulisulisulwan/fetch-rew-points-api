const { getPayerByName, addNewPayer, updatePayerBalances, } = require('../models').BalancesModel
const { addNewTransaction} = require('../models').TransactionsModel
const { formatTimestamp } = require('./utils')
const creditAccount = async (req, res) => {
  try {
    const { payer, points } = req.body;
    let { timestamp } = req.body;
    timestamp = await formatTimestamp(timestamp);
    let balanceId;
    let payerBalance = await getPayerByName(payer)
    if (payerBalance.length === 0) {
      balanceId = await addNewPayer(payer, points)
    } else {
      balanceId = payerBalance[0].id;
      await updatePayerBalances([ payerBalance[0].balance + points, balanceId ], 'credit')
    }
    await addNewTransaction(
      {
        points,
        payer,
        timestamp,
        subBalance: points,
        balanceId,
        trans_type: 'credit'
      }
    )
    res.sendStatus(201);
  } catch(err) {
    console.error(err)
    res.sendStatus(500);
  }
}


module.exports = { creditAccount };