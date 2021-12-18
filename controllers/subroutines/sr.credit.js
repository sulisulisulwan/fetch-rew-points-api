const { addNewTransaction} = require('../../models').TransactionsModel
const addCreditTransaction = async (transactionData) => {
  try {
    let { payer, points, timestamp, balanceId, payerBalance } = transactionData;
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

module.exports = { addCreditTransaction };