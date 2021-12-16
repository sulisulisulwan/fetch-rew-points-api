const app = require('./app');
require('dotenv').config({ path: __dirname + '/.env'})
const APP_PORT = process.env.APP_PORT

app.listen(APP_PORT, () => {
  console.log(`Listening on port ${APP_PORT}`)
})