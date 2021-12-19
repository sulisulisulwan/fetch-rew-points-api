const Controller = require('./baseClass')

module.exports = class TransactionsControllers extends Controller {

  constructor(models, utils, subroutines) {
    super(models);
    this.utils = utils
    this.sbrt = subroutines
  }

  async processTransactions (req, res) {

    { CreditSbrt, DebitSbrt } = this.sbrt;
    const Transactions = this.models;

    try {
      const { payer, points } = req.body;
      const timestamp = await this.utils.formatTimestamp(req.body.timestamp)
      let payerRecord = await Transactions.getPayerByName(payer)
      const payerId = payerRecord.length === 0 ? await Transactions.addNewPayer(payer) : payerRecord[0].id;
      let transactionData = { payer, points, timestamp, payerId };
      points < 0 ? await DebitSbrt.addDebitTransaction(transactionData)
        : await CreditSbrt.addCreditTransaction(transactionData);
        res.sendStatus(201);
    } catch(err) {
      console.error(err)
      res.sendStatus(500);
    }
  }
};