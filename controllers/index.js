const CreditController = require('./ctrl.credit')
const SpendController = require('./ctrl.spend')
const BalanceController = require('./ctrl.balance')
const { TransactionsModel, BalancesModel }= require('../models')


module.exports = {
  CreditController: new CreditController({ TransactionsModel, BalancesModel }),
  SpendController: new SpendController({ TransactionsModel })
  BalanceController: new BalanceController({ BalancesModel })
}

