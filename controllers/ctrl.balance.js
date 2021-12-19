const Controller = require('./baseClass')

module.exports = class BalancesControllers extends Controller {

  constructor(models) {
    super(models)
  }

  async getBalance(req, res) {

    const Balances = this.models;

    try {
      const result = await Balances.getAllBalances();
      const balances = {}
      result.forEach((balanceData) => {
        const { payer, balance } = balanceData
        balances[payer] = balance;
      })
      res.status(200).json(balances);
    } catch(err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

}


