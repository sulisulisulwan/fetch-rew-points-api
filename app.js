const express = require('express');
const app = express();
const { transactions, balances } = require('./routes')

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use('/transactions', transactions)
app.use('/balances', balances)

module.exports = app;