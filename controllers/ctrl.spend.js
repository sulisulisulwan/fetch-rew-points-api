const Controller = require('./baseClass')

module.exports = class SpendControllers extends Controller {

  constructor(models, subroutines) {
    super(models);
    this.sbrt = subroutines;
  }

  async spendPoints(req, res) {

    { DebitSbrt } = this.sbrt;

    try {
      const { points } = req.body;
      const debitSummaryPerPayer = await DebitSbrt.processSpendPoints(points)
      res.status(201).json(debitSummaryPerPayer);
    } catch(err) {
      console.error(err)
      res.sendStatus(500);
    }
  }
}

