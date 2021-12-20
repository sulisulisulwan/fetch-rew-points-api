const connection = require('../db');
const queries = require('../models/queries');
const { Utils } = require('../controllers/utils')
const { TransactionsModels, BalancesModels, SpendModels } = require('../models');
const { CreditSubroutines, DebitSubroutines } = require('../controllers/subroutines')
const { TransactionsControllers, BalancesControllers, SpendControllers } = require('../controllers');

const utils = new Utils();

const TransactionsMdls = new TransactionsModels(connection, queries);
const BalancesMdls = new BalancesModels(connection, queries);
const SpendMdls = new SpendModels(connection, queries);

const CreditSbrt = new CreditSubroutines(TransactionsMdls);
const DebitSbrt = new DebitSubroutines({ SpendMdls, TransactionsMdls });


const TransactionsCtrls = new TransactionsControllers(TransactionsMdls, utils, { CreditSbrt, DebitSbrt });
const SpendCtrls = new SpendControllers(SpendMdls, DebitSbrt);

const BalancesCtrls = new BalancesControllers(BalancesMdls);

module.exports = {
  TransactionsCtrls,
  BalancesCtrls,
  SpendCtrls
}