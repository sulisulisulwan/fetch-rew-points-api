const Controller = require('./controller_base_class');

class Spend extends Controller {
  constructor(models, utils) {
    super(models, utils)
  }

  async spendPoints (req, res) {
    try {
      const { points } = req.body;
      let debit = points;
      const completedTransactions = [];
      const updatedSubBalances = [];
      const positiveSubBalances = await this.models.Transactions.getPositiveSubBalances();
      let i = 0;
      while (debit > 0 || positiveSubBalances[i] !== undefined) {
        let { transactionId, payer, subBalance } = positiveSubBalances[i];
        if (subBalance <= debit) {
          debit -= subBalance;
          completedTransactions.push({ payer, points: subBalance * -1})
          updatedSubBalances.push({ transactionId, subBalance: 0 });
        } else {
          subBalance -= debit;
          completedTransactions.push({ payer, points: debit * -1 })
          updatedSubBalances.push({ transactionId, subBalance });
        }
        i += 1;
      }

      await this.models.Transactions.updateAndInsertTransactions( updatedSubBalances, completedTransactions)
      res.status(201).json(completedTransactions);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

}

module.exports = Spend;