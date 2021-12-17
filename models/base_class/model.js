class Model {
  constructor(connection, queries) {
    this.connection = connection;
    this.queries = queries;
  }

  async query() {
    return this.connection.query();
  }

}

module.exports = Model;