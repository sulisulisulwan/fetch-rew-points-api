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
      let newSubBalance = difference > 0 ? 0 : subBalance - difference;
      let newDebit = subBalance < 0 ? debit + difference : debit - difference;

      processedSubBalances.push(newSubBalance, id)
      totalPayerDebits[payer] === undefined ?
        totalPayerDebits[payer] = { payer, balanceId, points: subBalance}
        : totalPayerDebits[payer].points = totalPayerDebits[payer].points + subBalance;
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
      debitSummaryPerPayer.push({ payer, points });
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
    const [totalPayerDebits, processedSubBalances] = await distributeDebit();
    const [debitSummaryPerPayer, payerBalanceUpdates] = await formatDebitData(totalPayerDebits);
    //subtract totalPayerDebit from payer Balance
    await updateTransactionsAndBalances(payerBalanceUpdates, processedSubBalances)
    //update transactions with subbalances in processedSubBalances
    return debitSummaryPerPayer;
  } catch (err) {
    console.error(err);
    return err;
  }
}

module.exports = { processSpendPoints, addDebitTransaction };