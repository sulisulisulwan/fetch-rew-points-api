module.exports = {
  getPayerByName: 'SELECT * FROM Balances WHERE payer = ?',
  addNewPayer: 'INSERT INTO Balances SET ?;',
  getAllBalances: 'SELECT * FROM Balances',
  buildUpdatePayerBalanceQuery: async(newBalances, transType) =>  {
    const creditQuery = `
      UPDATE Balances
      SET balance = ?
      WHERE id = ?;
    `;
    const debitQuery = `
      UPDATE Balances AS a
      INNER JOIN Balances AS b ON a.id = b.id
      SET a.balance = (a.balance + ?) WHERE a.id = ?;
    `;
    let multiQuery = ''
    for (let i = 0; i < newBalances.length; i += 2) {
      multiQuery += (transType === 'credit' ? creditQuery : debitQuery);
    }
    return multiQuery;
  },
}