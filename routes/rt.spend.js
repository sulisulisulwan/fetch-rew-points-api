const router = require('express').Router();
const { SpendController } = require('../controllers')

const { spendPoints } = SpendController;

router.post('/', spendPoints)

module.exports = router;

