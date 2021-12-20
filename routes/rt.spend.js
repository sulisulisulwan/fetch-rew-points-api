const router = require('express').Router();
const { SpendCtrls } = require('../init');


router.post('/', async(req, res) => {
  await SpendCtrls.spendPoints(req, res)
})

module.exports = router;

