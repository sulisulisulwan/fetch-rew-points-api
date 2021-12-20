module.exports = class Model {
  constructor (connection, queries) {
    this.connection = connection;
    this.queries = queries;
  }

  async query (q, v) {
    return await this.connection.query(q, v);
  }

  async buildMultiStatementQuery(queryData) {
    let multiStatementQuery = '';
    for (let i = 0; i < queryData.length; i += 2) {
      const statement = queryData[i]
      const numOfStatements = queryData[i + 1];
      for (let j = 0; j < numOfStatements; j += 1) {
        multiStatementQuery += statement;
      }
    }
    return multiStatementQuery;
  }

}

