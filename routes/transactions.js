const router = require('express').Router();
const connection = require('../db')
const BalancesQueries = require('../db/queries/balances')
const BalancesModel = require('../models/balances')
const newBalancesModel = new BalancesModel(connection, )

const BalanceController = require('../controllers/balance')
const controllerUtils = require('../controllers/utils')
const { getBalance } = new BalanceController(newBalancesModel, controllerUtils)




router.get('/', ())