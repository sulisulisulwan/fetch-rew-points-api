const router = require('express').Router();
const { BalanceController } = require('../controllers')
const { getBalance } = BalanceController;

router.get('/', getBalance)

module.exports = router;