const router = require('express').Router();
const { TransactionsController } = require('../controllers')
const { processTransactions } = TransactionsController;

router.post('/', processTransactions)

module.exports = router;