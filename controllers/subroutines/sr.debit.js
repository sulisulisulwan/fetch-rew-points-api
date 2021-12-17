const  { getPositiveSubBalances, updateAndInsertTransactions } = require('../../models').TransactionsModel;
const  { updatePayerBalances } = require('../../models').BalancesModel;
const { getTimestampForNow, formatTimestamp } = require('./../utils')

const adminDebitAccount = async (transactionData) => {
  const { payer, points, timestamp } = transactionData;
  await updatePayerBalances([-1 * points, balanceId], 'debit')
  return;
}

const distributeDebit = async (subBalances, points) => {
  try {
    let debit = points;
    const processedTransactions = []; //This will be sent to insert into Transactions database
    const updatedSubBalances = []; //This will be sent to update existing subbalances in transactions
    const totalDebitsPerPayer = {}; //This will be formatted later to update Balances database and send to client via response
    let i = 0;
    let timestamp = await formatTimestamp(await getTimestampForNow());
    while (debit > 0 && subBalances[i] !== undefined) {
      let { id, payer, subBalance, balanceId } = subBalances[i];
      let debitForSubBalance = subBalance <= debit ? subBalance : debit;
      let debitToZero = subBalance <= debit ? false : true;
      newSubBalance = subBalance <= debit ? 0 : subBalance;
      subBalance <= debit ? debit -= subBalance : subBalance -= debit
      if (debitToZero) {
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
  } catch(err) {
    console.error(err);
    return err;
  }

}

const formatDistDebitData = async (totalDebitsPerPayer) => {
  try {
    const debitSummaryPerPayer = [];
    const balanceUpdatePerPayer = []
    for (let payerDebitTotal in totalDebitsPerPayer) {
      const { payer, balanceId, points } = totalDebitsPerPayer[payerDebitTotal]
      debitSummaryPerPayer.push({ payer, points });
      balanceUpdatePerPayer.push(points, balanceId)
    }
    return [debitSummaryPerPayer, balanceUpdatePerPayer];
  } catch(err) {
    console.error(err);
    return err;
  }
}

const processSpendPoints = async (points) => {
  try {
    const positiveSubBalances = await getPositiveSubBalances();
    const [processedTrans, updatedSubBalances, totalDebitsPerpayer] = await distributeDebit(positiveSubBalances, points);
    const [debitSummaryPerPayer, balanceUpdatePerPayer] = await formatDistDebitData(totalDebitsPerpayer)
    await updatePayerBalances(balanceUpdatePerPayer, 'debit')
    await updateAndInsertTransactions(updatedSubBalances, processedTrans)
    return debitSummaryPerPayer;
  } catch (err) {
    console.error(err);
    return err;
  }
}

module.exports = { processSpendPoints, adminDebitAccount };