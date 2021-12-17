const Controller = require('./base_class/controller')

class Credit extends Controller {
  constructor(models) {
    super(models)
  }

  async creditAccount (req, res) {
    try {
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
      res.sendStatus(201);
    } catch(err) {
      res.sendStatus(500);
    }
  }
}

module.exports = Credit;