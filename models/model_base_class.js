class Model {
  constructor(connection, queries, utils) {
    this.connection = connection;
    this.queries = queries;
    this.utils = utils;
  }

  async query() {
    return this.connection.query();
  }

}

module.exports = Model;