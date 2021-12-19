module.exports = class Model {
  constructor (connection, queries) {
    this.connection = connection;
    this.queries = queries;
  }

  async query (q, v) {
    return await connection.query(q, v);
  }
}

