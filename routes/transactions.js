const router = require('express').Router();
const { CreditController, SpendController } = require('../controllers')
const { spendPoints } = SpendController;
const { creditAccount } = CreditController;

router.post('/credit', creditAccount)
router.post('/spend', spendPoints)


module.exports = router;