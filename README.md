# fetch-rew-points-api



### This microservice was built using:

- Node.JS,
- Express.JS,
- MySQL 8.0.25,

## Contents

1. [Dependencies](#dependencies)
2. [Set up the database](#set-up-the-database)
3. [Set up the environment variables](#set-up-the-environment-variables)
4. [Run the server](#run-the-server)
5. [The Endpoints](#the-endpoints)
    - [Transactions](#transactions)
    - [Spend](#spend)
    - [Balance](#balance)


# Dependencies

To run the service in your local environment, you need to download and install the latest version ofNode.JS and MySQL Server.

Node: https://nodejs.dev/download.

MySQL: https://dev.mysql.com/downloads/mysql/

After downloading and installing Node and MySQL, clone down the repo using the following terminal command:

`git clone https://github.com/sulisulisulwan/fetch-rew-points-api.git`

`cd fetch-rew-points-api`

Install all dependencies using

`npm install`

# Set up the database

Using the terminal, navigate

`fetch-rew-points-api/db/`

There should be a `schema.sql` file in this folder.

In the command line, run:

`mysql -u <username> -p < schema.sql`

After entering your password, the schema will load into the database under the name `fetchAPI`.


# Set up the environment variables

Before running the service, edit the `example.env` file in the root folder where it says `TODO:`.

You need to make sure that the values correspond with the credentials you set up while installing MySQL.  The App port can be any valid port you wish to use.  I used 3000.

After editing the file, rename `example.env` to `.env`.  The rest of the app should now recognize the environment variables within that file.

# Run the server
To begin the service, first make sure you are in the root folder, then run the terminal command:

`npm start`

The console should log:

`'listening on port <whatever port you chose>'`

Now the server can accept valid http requests to its endpoints.

# The Endpoints
## Transactions
----------------
`http://localhost:<your port>/transactions`

This endpoint accepts only `'POST'` requests.

Through  `/transactions`, a user is able to enter in transactional data that will ultimately affect the points spending algorithm.  Both credit and debit transactions can be entered into the database via this endpoint, though their immediate effect won't take hold until points are spent.  This is achieved by creating a subbalance for every transaction made.  These subbalances remain untouched until they are used up in the points spending algorithm.

To make a proper request to `/transactions`, the following request object must be sent:

`{
  "payer": "DANNON", "points": 300, "timestamp": "2020-10-31T10:00:00Z"
}`

The data types are:
'payer': string

'points': integer

'timestamp': datetime

## Spend
----------------
`http://localhost:<your port>/spend`

This endpoint accepts only `'POST'` requests.

It is through `/spend` that the client can begin blow all of their hard earned points.  An algorithm takes in the desired debit and updates the subbalances of past transactions that have not yet reached zero in the order of earliest to latest timestamp.

This includes transactions with a negative subbalance, which increases the debit amount upon processing.  Once a transaction's subbalance reaches zero, it is considered dead and won't be pulled from the database by the algorithm in future calls.

>Debit transactions are processed similarily to credit transactions in that their 'live' balance is determined by whether or not they are non-zero.  A debit's negative balance will increase to zero upon processing as opposed to the credit transactions which will decrease to zero.

To receive a proper response without error, the body of the request object must be formatted as follows:

`{ "points": 5000 }`

the debit being the value of `"points"`.

Upon a successful request, the response should include the following array:

`[
  { "payer": "DANNON", "points": -100 },
  { "payer": "UNILEVER", "points": -200 },
  { "payer": "MILLER COORS", "points": -4,700 }
]`

being the amount of difference between the previous and current of each affected payer balance.

>Given that a client application would not be able to display a balance more than what could be derived from the database, the client should never be able to break into a negative balance with any transaction.  This is the recommended contract between the server and client application.

## Balance
----------------
`http://localhost:<your port>/balances`

This endpoint accepts only accepts `'GET'` requests.

Upon successful request, `/balances` provides up to date data on the client's points balance, broken down per payer:

`
{
"DANNON": 1000,
"UNILEVER": 0,
"MILLER COORS": 5300
}
`

>There is no query payload rnecessary to receive a response from this endpoint.  However, if there were no previous transactions made in the database, hitting this endpoint will return an empty object.



