module.exports = {
  getPositiveSubBalances: `
    SELECT * FROM Transactions
    WHERE trans_type = "credit"
    AND subBalance > 0
    ORDER BY timestamp;
  `,
  addNewTransaction: 'INSERT INTO Transactions SET ?',
  buildUpdateAndInsertMultiQuery: async (update, insert) => {
      //update is an array of [transactionId, newBalance, ...]
      //insert is an array of [payer, balanceTrend,'debit', ...]
    const updateStatement = 'UPDATE Transactions SET subBalance = ? WHERE id = ?; ';
    const insertStatement = 'INSERT INTO Transactions SET ?; ';
    let multiQuery = '';
    for (let i = 0; i < update.length; i += 2) {
      multiQuery += updateStatement;
    }
    for (let i = 0; i < insert.length; i += 1) {
      multiQuery += insertStatement
    }
    return multiQuery;
  }
}