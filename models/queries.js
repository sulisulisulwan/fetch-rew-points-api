module.exports = {
  getPayerByName: 'SELECT * FROM Balances WHERE payer = ?',
  addNewPayer: 'INSERT INTO Balances SET ?;',
  getAllBalances: `
    SELECT payer, SUM(subBalance) AS balance
    FROM Transactions GROUP BY payer;`,
  addNewTransaction: 'INSERT INTO Transactions SET ?;',
  getAllNonZeroSubBalancedTransactions: 'SELECT * FROM Transactions WHERE subBalance != 0 ORDER BY timestamp;',
  buildMultiStatementQuery: async (queryData) => {
    console.log('queryData is', queryData)
    try {
      let multiStatementQuery = ''
      for (let i = 0; i < queryData.length; i += 2) {
        const statement = queryData[i]
        const numOfStatements = queryData[i + 1];
        console.log('numOfStatements', numOfStatements)
        for (let j = 0; j < numOfStatements; j += 1) {
          multiStatementQuery += statement;
        }
      }
      console.log('the query is', multiStatementQuery)
      return multiStatementQuery;
    } catch(err) {
      console.error(err);
      return err;
    }
  }
}


