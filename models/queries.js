module.exports = {
  getPayerByName: 'SELECT * FROM Payers WHERE payer = ? ',
  addNewPayer: 'INSERT INTO Payers SET ?; ',
  getAllBalances: `
    SELECT payer, SUM(subBalance) AS balance
    FROM Transactions GROUP BY payer; `,
  addNewTransaction: 'INSERT INTO Transactions SET ?; ',
  getAllNonZeroSubBalancedTransactions: 'SELECT * FROM Transactions WHERE subBalance != 0 ORDER BY timestamp; ',
  updateTransactionsSubBalances: 'UPDATE Transactions SET subBalance = ? WHERE id = ?; '
}


