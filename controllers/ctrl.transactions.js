const Controller = require('./baseClass')

module.exports = class TransactionsControllers extends Controller {

  constructor(models, utils, subroutines) {
    super(models);
    this.utils = utils
    this.sbrt = subroutines
  }

  async processTransactions (req, res) {

    const { formatTimestamp } = this.utils;
    const { getPayerByName, addNewPayer } = this.models;
    try {
      const { payer, points } = req.body;
      const timestamp = await formatTimestamp(req.body.timestamp)
      let payerRecord = await this.models.getPayerByName(payer)
      const payerId = payerRecord[0].length === 0 ? (await this.models.addNewPayer(payer))[0].insertId : payerRecord[0].id;
      let transactionData = { payer, points, timestamp, payerId };
      points < 0 ? await this.sbrt.DebitSbrt.addDebitTransaction(transactionData)
        : await this.sbrt.CreditSbrt.addCreditTransaction(transactionData);
        res.sendStatus(201);
    } catch(err) {
      console.error(err)
      res.sendStatus(500);
    }
  }
};