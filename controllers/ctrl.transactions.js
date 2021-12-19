const { addCreditTransaction } = require('./subroutines/sr.credit')
const { addDebitTransaction } = require('./subroutines/sr.debit')
const { Utils } = require('./utils')
const utils = new Utils();

const Controller = require('./baseClass')

module.exports = class TransactionsControllers extends Controller {

  constructor(models) {
    super(models);
  }

  async processTransactions (req, res) {
    try {
      const { payer, points } = req.body;
      const timestamp = await utils.formatTimestamp(req.body.timestamp)
      let payerRecord = await getPayerByName(payer)
      const payerId = payerRecord.length === 0 ? await addNewPayer(payer) : payerRecord[0].id;
      let transactionData = { payer, points, timestamp, payerId };
      points < 0 ? await addDebitTransaction(transactionData)
        : await addCreditTransaction(transactionData);
        res.sendStatus(201);
    } catch(err) {
      console.error(err)
      res.sendStatus(500);
    }
  }
};