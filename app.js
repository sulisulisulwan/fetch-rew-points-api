const express = require('express');
const app = express();
const { transactions, balances, spend } = require('./routes')

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.use('/transactions', transactions);
app.use('/balances', balances);
app.use('/spend', spend);

module.exports = app;