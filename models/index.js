const connection = require('../db')
const BalancesModel = require('./balances');
const TransactionsModel = require('./transactions');
const BalancesQueries = require('./queries/balances')
const TransactionsQueries = require('./queries/transactions')

module.exports = {
  BalancesModel: new BalancesModel(connection, BalancesQueries),
  TransactionsModel: new TransactionsModel(connection, BalancesQueries)
}