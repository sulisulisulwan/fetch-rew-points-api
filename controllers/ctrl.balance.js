const Controller = require('./base_class/controller');

class Balance extends Controller {
  constructor(models) {
    super(models);
  }

  async getBalance () {
    try {
      const balances = await this.models.getAllBalances();
      res.status(200).json(balances);
    } catch(err) {
      console.error(err);
      res.sendStatus(500);
    }
  }


}

module.exports = Balance;