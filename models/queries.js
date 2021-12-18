module.exports = {
  getPayerByName: 'SELECT * FROM Balances WHERE payer = ?',
  addNewPayer: 'INSERT INTO Balances SET ?;',
  getAllBalances: 'SELECT * FROM Balances',
  getAllTransactionsFromEarliest: `SELECT * FROM Transactions WHERE subBalance != 0 ORDER BY timestamp;`,
  addNewTransaction: 'INSERT INTO Transactions SET ?;',
  buildMultiStatementQuery: async (queryData) => {
    try {
      let multiStatementQuery = ''
      for (let i = 0; i < queryData.length; i += 2) {
        const numOfStatements = queryData[i]
        const statement = queryData[i + 1];
        for (let j = 0; j < numOfStatements; j += 1) {
          multiStatementQuery += statement;
        }
      }
      return multiStatementQuery;
    } catch(err) {
      console.error(err);
      return err;
    }
  }
}
