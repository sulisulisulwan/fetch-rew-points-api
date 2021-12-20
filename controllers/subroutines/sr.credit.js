module.exports = class CreditSubroutines {

  constructor(models) {
    this.models = models;
  }

  async addCreditTransaction(transactionData) {
    const Transactions = this.models;
    let { payer, points, timestamp, payerId, payerRecord } = transactionData;
    await Transactions.addNewTransaction(
      {
        points,
        payer,
        timestamp,
        subBalance: points,
        payerId,
        trans_type: 'credit'
      }
    )
    return;
  }

}

