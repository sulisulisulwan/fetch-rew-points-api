const router = require('express').Router();
const { TransactionsCtrls } = require('../init')

router.post('/', async(req, res) =>{
  TransactionsCtrls.processTransactions(req, res);
})

module.exports = router;