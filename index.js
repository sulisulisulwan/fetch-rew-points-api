const app = require('./app');
require('dotenv').config({ path: __dirname + '/.env'})
const PORT = process.env.NODE_LOCAL_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})