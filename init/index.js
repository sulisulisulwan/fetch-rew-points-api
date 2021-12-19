const connection = require('../db');
const queries = require('../models/queries');
const { TransactionsModels, BalancesModels, SpendModels } = require('../models');
const { TransactionsControllers, BalancesControllers, SpendControllers } = require('../controllers');

const TransactionsMdls = new TransactionsModels(connection, queries);
const BalancesMdls = new BalancesModels(connection, queries);
const SpendMdls = new SpendModels(connection, queries);

const TransactionsCtrls = new TransactionsControllers(TransactionsMdls);
const BalancesCtrls = new BalancesControllers(BalancesMdls);
const SpendCtrls = new SpendControllers(SpendMdls);

module.exports = {
  TransactionsCtrls,
  BalancesCtrls,
  SpendCtrls
}