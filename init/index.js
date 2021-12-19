const connection = require('../db');
const queries = require('../models/queries');
const { TransactionsModels, BalancesModels, SpendModels } = require('../models');
const { CreditSubroutines, DebitSubroutines } = require('../controllers/subroutines')
const { TransactionsControllers, BalancesControllers, SpendControllers } = require('../controllers');

const TransactionsMdls = new TransactionsModels(connection, queries);
const BalancesMdls = new BalancesModels(connection, queries);
const SpendMdls = new SpendModels(connection, queries);

const CreditSbrt = new CreditSubroutines(TransactionMdls);
const DebitSbrt = new DebitSubroutines({ SpendMdls, TransactionMdls });

const TransactionsCtrls = new TransactionsControllers(TransactionsMdls, { CreditSbrt, DebitSbrt });
const BalancesCtrls = new BalancesControllers(BalancesMdls);
const SpendCtrls = new SpendControllers(SpendMdls, DebitSbrt);

module.exports = {
  TransactionsCtrls,
  BalancesCtrls,
  SpendCtrls
}