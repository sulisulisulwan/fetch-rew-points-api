const Controller = require('./controller_base_class');

class Balance extends Controller {
  constructor(models, utils) {
    super(models, utils);
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