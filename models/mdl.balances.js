const queries = require('./queries')
const connection= require('../db')

const Model = require('./baseClass.js')

module.exports = class BalancesModels extends Model {

  constructor(connection, queries) {
    super(connection, queries);
  }

  async getPayerByName (payer) {
    try {
      const q = queries.getPayerByName;
      const result = await connection.query(q, payer);
      return result[0];
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  async addNewPayer(payer) {
    try {
      const q = queries.addNewPayer;
      const result = await connection.query(q, payer)
      return result[0].insertId;
    } catch(err) {
      console.error(err);
      return err;
    }
  }

  async getAllBalances() {
    try {
      const q = queries.getAllBalances;
      const result = await connection.query(q);
      return result[0]
    } catch(err) {
      console.error(err);
      return err;
    }
  }

}



