const addCreditTransaction = async (transactionData) => {
  try {
    let { payer, points, timestamp, payerId, payerRecord } = transactionData;
    await addNewTransaction(
      {
        points,
        payer,
        timestamp,
        subBalance: points,
        payerId,
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