class Model {

  constructor (connection) {
    this.connection = connection;
  }

  async query (q, v) {
    return await connection.query(q, v);
  }

}


class Balances extends Model {
  constructor(connection) {
    super(connection)
  }

  async someQuery (someThing) {
    const q = someThing
    const v = 'ooplah'
    return await this.query(q, v)
  }
}


const connection = {
  async query (q, v) {
    return await q + v + 'and booplah'
  }
}

const BalancesModel = new Balances (connection);

// newBalancesModel.someQuery('look at me')
//   .then(result => {
//     console.log(result)
//   })
//   .catch(err => {
//     console.log(err)
//   })

class Controller {
  constructor(models) {
    this.models = models;
  }

  async someKindOfControl () {
    // const { BalancesModel } = this.models;
    const { BalancesModel } = this.models;
    return await BalancesModel.someQuery('poopaloopah')
  }
}

const newController = new Controller({ BalancesModel });

newController.someKindOfControl()
  .then(result => {
    console.log(result)
  })
