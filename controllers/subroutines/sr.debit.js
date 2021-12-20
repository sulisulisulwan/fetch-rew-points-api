module.exports = class DebitSubRoutines {

  constructor(models) {
    this.models = models;
  }

  async addDebitTransaction(transactionData) {
    const { Transaction } = this.models;
    const { payer, points, timestamp, subBalance, payerId } = transactionData;
    const data = { payer, points, timestamp, subBalance: points, trans_type: 'debit', payerId }
    await this.models.TransactionsMdls.addNewTransaction(data);
    return;
  }

  async distributeDebit(subBalances, points) {
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
  }

  async formatDebitData(totalPayerDebits) {
    const debitSummaryPerPayer = [];
    for (let payerDebitTotal in totalPayerDebits) {
      const { payer, points } = totalPayerDebits[payerDebitTotal]
      debitSummaryPerPayer.push({ payer, points });
    }
    return debitSummaryPerPayer;
  }

  async processSpendPoints(points) {
    const allTransactionsWithNonZero = await this.models.SpendMdls.getAllNonZeroSubBalanceTransactions();
    const [totalPayerDebits, processedSubBalances] = await this.distributeDebit(allTransactionsWithNonZero[0], points);
    const debitSummaryPerPayer = await this.formatDebitData(totalPayerDebits);
    await this.models.SpendMdls.updateTransactionsSubBalances(processedSubBalances)
    return debitSummaryPerPayer;
  }

}
