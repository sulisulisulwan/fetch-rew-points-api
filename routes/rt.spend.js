const router = require('express').Router();
const { SpendCtrls } = require('../init');
const { spendPoints } = SpendCtrls;

router.post('/', spendPoints)

module.exports = router;

