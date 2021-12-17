const { getAllBalances } = require('../models').BalancesModel

const getBalance = async (req, res) => {
    try {
      const balances = await getAllBalances();
      res.status(200).json(balances);
    } catch(err) {
      console.error(err);
      res.sendStatus(500);
    }
  }

module.exports = { getBalance };