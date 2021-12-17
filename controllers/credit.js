const Controller = require('./controller_base_class')

class Credit extends Controller {
  constructor(models, utils) {
    super(models, utils)
  }

  async creditAccount (req, res) {
    const { payer, points, timestamp } = req.body;
    let balanceId;
    let payerBalance = this.models.Balances.getPayerByName(payer)
    if (payerBalance === null) {
      balanceId = await this.models.Balances.addNewPayer(payer, points, transactionId)
    } else {
      balanceId = payerBalance.id;
      await this.models.Balances.updatePayerBalance(payerBalance.balance + points)
    }
    await this.models.Transactions.addNewTransaction(
      {
        points,
        payer,
        timestamp,
        subBalance: points,
        balanceId,
        trans_type: 'credit'
      }
    )
  }
}

module.exports = Credit;