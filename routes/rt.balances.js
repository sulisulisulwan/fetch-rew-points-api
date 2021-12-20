const router = require('express').Router();
const { BalancesCtrls } = require('../init')

router.get('/', async(req, res) => {
  BalancesCtrls.getBalance(req, res)
})

module.exports = router;