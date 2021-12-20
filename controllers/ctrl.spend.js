const Controller = require('./baseClass')

module.exports = class SpendControllers extends Controller {

  constructor(models, subroutines) {
    super(models);
    this.sbrt = subroutines;
  }

  async spendPoints(req, res) {
    try {
      const { points } = req.body;
      const debitSummaryPerPayer = await this.sbrt.processSpendPoints(points)
      res.status(201).json(debitSummaryPerPayer);
    } catch(err) {
      console.error(err)
      res.sendStatus(500);
    }
  }
}

