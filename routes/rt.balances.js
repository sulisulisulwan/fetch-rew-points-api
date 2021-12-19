const router = require('express').Router();
const { BalancesCtrls } = require('../init')
const { getBalance } = BalancesCtrls;

router.get('/', getBalance)

module.exports = router;