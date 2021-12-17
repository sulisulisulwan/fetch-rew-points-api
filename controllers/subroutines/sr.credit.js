const { getPayerByName, addNewPayer, updatePayerBalances, } = require('../../models').BalancesModel
const { addNewTransaction} = require('../../models').TransactionsModel
const { formatTimestamp } = require('./../utils')
const creditAccount = async (transactionData) => {
  try {
    let { payer, points, timestamp, balanceId, payerBalance } = transactionData;
    timestamp = await formatTimestamp(timestamp);
    await updatePayerBalances([ payerBalance[0].balance + points, balanceId ], 'credit')
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
    return
  } catch(err) {
    console.error(err)
    return err;
  }
}


module.exports = { creditAccount };