const  { getAllNonZeroSubBalanceTransactions, updateTransactionsSubBalances} = require('../../models').SpendModel;
const  { addNewTransaction } = require('../../models').TransactionsModel;
const { formatTimestamp, getTimestampForNow } = require('./../utils')

const addDebitTransaction= async (transactionData) => {
  try {
    const { payer, points, timestamp, subBalance, payerId } = transactionData;
    const data = { payer, points, timestamp, subBalance: points, trans_type: 'debit', payerId }
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
      let { id, payer, subBalance, payerId } = subBalances[i];
      let difference = Math.abs(debit - subBalance);
      let newSubBalance = subBalance < debit ? 0 : subBalance - debit;
      debit = debit <= subBalance ? 0 : difference;
      let pointsUpdate = subBalance < debit ? subBalance * -1 : (subBalance - difference) * -1;
      processedSubBalances.push(newSubBalance, id);
      totalPayerDebits[payer] === undefined ?
        totalPayerDebits[payer] = { payer, payerId, points: pointsUpdate}
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
    for (let payerDebitTotal in totalPayerDebits) {
      const { payer, points } = totalPayerDebits[payerDebitTotal]
      debitSummaryPerPayer.push({ payer, points });
    }
    return debitSummaryPerPayer;
  } catch(err) {
    console.error(err);
    return err;
  }
}

const processSpendPoints = async (points) => {
  try {
    const allTransactionsWithNonZero = await getAllNonZeroSubBalanceTransactions();
    const [totalPayerDebits, processedSubBalances] = await distributeDebit(allTransactionsWithNonZero, points);
    const debitSummaryPerPayer = await formatDebitData(totalPayerDebits);
    await updateTransactionsSubBalances(processedSubBalances)
    return debitSummaryPerPayer;
  } catch (err) {
    console.error(err);
    return err;
  }
}

module.exports = { processSpendPoints, addDebitTransaction };