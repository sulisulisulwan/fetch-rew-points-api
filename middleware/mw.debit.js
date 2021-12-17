const  { getPositiveSubBalances, updateAndInsertTransactions } = require('../models').TransactionsModel;
const  { updatePayerBalances } = require('../models').BalancesModel;
const { getTimestampForNow, formatTimestamp } = require('./utils')

const distributeDebit = async (subBalances, points) => {
  let debit = points;
  const processedTransactions = []; //This will be sent to insert into Transactions database
  const updatedSubBalances = []; //This will be sent to update existing subbalances in transactions
  const totalDebitsPerPayer = {}; //This will be formatted later to update Balances database and send to client via response
  let i = 0;
  let timestamp = await formatTimestamp(await getTimestampForNow());
  while (debit > 0 && subBalances[i] !== undefined) {
    let { id, payer, subBalance, balanceId } = subBalances[i];
    let debitForSubBalance;
    if (subBalance <= debit) {
      debit -= subBalance;
      debitForSubBalance = subBalance
      newSubBalance = 0;
    } else {
      subBalance -= debit
      debitForSubBalance = debit;
      newSubBalance = subBalance
      debit = 0
    }
    processedTransactions.push({ payer, points: debitForSubBalance * -1, trans_type: 'debit', balanceId, timestamp });
    updatedSubBalances.push(newSubBalance, id);
    totalDebitsPerPayer[payer] === undefined ?
      totalDebitsPerPayer[payer] = { payer, balanceId, points: debitForSubBalance * -1}
      : totalDebitsPerPayer[payer].points = totalDebitsPerPayer[payer].points - debitForSubBalance;
    i += 1;
  }
  return [processedTransactions, updatedSubBalances, totalDebitsPerPayer];
}

const formatDistDebitData = async (totalDebitsPerPayer) => {
  const debitSummaryPerPayer = [];
  const balanceUpdatePerPayer = []
  for (let payerDebitTotal in totalDebitsPerPayer) {
    const { payer, balanceId, points } = totalDebitsPerPayer[payerDebitTotal]
    debitSummaryPerPayer.push({ payer, points });
    balanceUpdatePerPayer.push(points, balanceId)
  }
  return [debitSummaryPerPayer, balanceUpdatePerPayer];
}

const processDebit = async (req, res, next) => {
  try {
    const { points } = req.body;
    const positiveSubBalances = await getPositiveSubBalances();
    console.log(positiveSubBalances)
    const [processedTrans, updatedSubBalances, totalDebitsPerpayer] = await distributeDebit(positiveSubBalances, points);
    const [debitSummaryPerPayer, balanceUpdatePerPayer] = await formatDistDebitData(totalDebitsPerpayer)
    await updatePayerBalances(balanceUpdatePerPayer, 'debit')
    await updateAndInsertTransactions(updatedSubBalances, processedTrans)

  } catch (err) {
    console.error(err);
  }
}

module.exports = { processDebit };