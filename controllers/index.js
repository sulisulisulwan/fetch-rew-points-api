const CreditController = require('./credit')
const SpendController = require('./spend')
const BalanceController = require('./balance')
const utils = require('./utils');
const { TransactionsModel, BalancesModel }= require('../models')
module.exports = {
  CreditController: new CreditController({ TransactionsModel, BalancesModel }, utils),
  SpendController: new SpendController({ TransactionsModel }, null)
  BalanceController: new BalanceController({ BalancesModel }, null)
}

