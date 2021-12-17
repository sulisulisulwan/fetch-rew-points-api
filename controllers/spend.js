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
      const totalDebitsPerPayer = {};
      const positiveSubBalances = await this.models.Transactions.getPositiveSubBalances();
      let i = 0;
      while (debit > 0 || positiveSubBalances[i] !== undefined) {
        let { transactionId, payer, subBalance } = positiveSubBalances[i];
        if (subBalance <= debit) {
          debit -= subBalance;
          completedTransactions.push(
            {
              payer,
              points: subBalance * -1,
              trans_type: 'debit'
            }
          )
          updatedSubBalances.push(
            {
              transactionId,
              subBalance: 0
            }
          );
          totalDebitsPerPayer[payer] === undefined ?
            totalDebitsPerPayer[payer] = {
              payer,
              points: subBalance * -1,
            }
            : totalDebitsPerPayer[payer].points = totalDebitsPerPayer[payer].points - subBalance;
        } else {
          subBalance -= debit;
          completedTransactions.push(
            {
              payer,
              points: debit * -1,
              trans_type: 'debit'
            }
          )
          updatedSubBalances.push({ transactionId, subBalance });
          totalDebitsPerPayer[payer] === undefined ?
            totalDebitsPerPayer[payer] = { payer, points: debit * -1}
            : totalDebitsPerPayer[payer].points = totalDebitsPerPayer[payer].points - debit;
          debit = 0;
        }
        i += 1;
      }
      const debitSummaryPerPayer = [];
      for (let payerDebitTotal in totalDebitsPerPayer) {
        debitSummaryPerPayer.push[payerDebitTotal];
      }
      await this.models.Balances.updatePayerBalances(debitSummaryPerPayer)
      await this.models.Transactions.updateAndInsertTransactions( updatedSubBalances, completedTransactions)
      res.status(201).json(debitSummaryPerPayer);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

}

module.exports = Spend;