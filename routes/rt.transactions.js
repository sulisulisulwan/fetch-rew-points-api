const router = require('express').Router();
const { TransactionsCtrls } = require('../init')
const { processTransactions } = TransactionsCtrls;

router.post('/', processTransactions)

module.exports = router;