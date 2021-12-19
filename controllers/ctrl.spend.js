const { processSpendPoints } = require('./subroutines/sr.debit')
const Controller = require('./baseClass')

module.exports = class SpendControllers extends Controller {

  constructor(models) {
    super(models);
  }

  async spendPoints(req, res) {
    try {
      const { points } = req.body;
      const debitSummaryPerPayer = await processSpendPoints(points)
      res.status(201).json(debitSummaryPerPayer);
    } catch(err) {
      console.error(err)
      res.sendStatus(500);
    }
  }
}

