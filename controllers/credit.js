const Controller = require('./controller_base_class')

class Credit extends Controller {
  constructor(models, utils) {
    super(models, utils)
  }

  async creditAccount (req, res) {
    const { payer, points, timestamp } = req.body;
	- const transactionId = this.models.Transactions.addNewTransaction({ points: points, payer: payer, timestamp: timestamp, subBalance: points, type: 'credit' })
	- let payerBalance = this.models.Balances.getPayerByName(payer)
    if (payerBalance === null) {
      await this.models.Balances.addNewPayer(payer, points, transactionId)
    } else {
      if (payerBalance.earliestTrans === null) {
        await this.models.Balances.updatePayerBalance (points, transactionId)
      } else {
        balance += points;
        let earlier = await this.utils.earlierTimestamp(timestamp, payerBalance.earliestTrans);
        earlier === timestamp ? await this.models.Balances.updatePayerBalance(balance, transactionId)
          : await this.models.Balances.updatePayerBalance(balance, null)
      }
    }
  }
}

module.exports = Credit;