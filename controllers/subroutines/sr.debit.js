const  { getAllNonZeroSubBalanceTransactions, updateTransactionsAndBalances } = require('../../models').SpendModel;
const  { addNewTransaction } = require('../../models').TransactionsModel;
const { formatTimestamp, getTimestampForNow } = require('./../utils')

const addDebitTransaction= async (transactionData) => {
  try {
    const { payer, points, timestamp, subBalance, balanceId } = transactionData;
    const data = { payer, points, timestamp, subBalance: points, trans_type: 'debit', balanceId }
    await addNewTransaction(data);
    return;
  } catch(err) {
    console.error(err);
    return err;
  }
}

const distributeDebit = async (subBalances, points) => {
  try {
    let debit = points;
    let i = 0;
    let totalPayerDebits = {};
    let processedSubBalances = [];
    while (debit > 0 && subBalances[i] !== undefined) {
      let { id, payer, subBalance, balanceId } = subBalances[i];

      let difference = Math.abs(debit - subBalance);
      let newSubBalance = subBalance < debit ? 0 : subBalance - debit;
      debit = debit <= subBalance ? 0 : difference;

      let pointsUpdate = subBalance < debit ? subBalance * -1 : (subBalance - difference) * -1;

      //FOR THE DATABASE
      processedSubBalances.push(newSubBalance, id);


      totalPayerDebits[payer] === undefined ?
        totalPayerDebits[payer] = { payer, balanceId, points: pointsUpdate}
        : totalPayerDebits[payer].points = totalPayerDebits[payer].points - (pointsUpdate * -1);
      i += 1;

    }
    return [totalPayerDebits, processedSubBalances];
  } catch(err) {
    console.error(err);
    return err;
  }

}

const formatDebitData = async (totalPayerDebits) => {
  try {
    const debitSummaryPerPayer = [];
    const payerBalanceUpdates = []
    for (let payerDebitTotal in totalPayerDebits) {
      const { payer, balanceId, points } = totalPayerDebits[payerDebitTotal]

      //FOR THE RESPONSE
      debitSummaryPerPayer.push({ payer, points });

      //FOR THE DATABASE
      payerBalanceUpdates.push(points, balanceId)
    }
    return [debitSummaryPerPayer, payerBalanceUpdates];
  } catch(err) {
    console.error(err);
    return err;
  }
}

const processSpendPoints = async (points) => {
  try {
    //grab all transactions in order by timestamp a
    const allTransactionsWithNonZero = await getAllNonZeroSubBalanceTransactions();
    const [totalPayerDebits, processedSubBalances] = await distributeDebit(allTransactionsWithNonZero, points);
    const [debitSummaryPerPayer, payerBalanceUpdates] = await formatDebitData(totalPayerDebits);

    console.log(`

    FINALLY BEFORE DATABASE INSERTION
    payerBalanceUpdates: ${payerBalanceUpdates}
    processedSubBalances: ${processedSubBalances}

    `)
    await updateTransactionsAndBalances(payerBalanceUpdates, processedSubBalances)
    //update transactions with subbalances in processedSubBalances
    return debitSummaryPerPayer;
  } catch (err) {
    console.error(err);
    return err;
  }
}

module.exports = { processSpendPoints, addDebitTransaction };