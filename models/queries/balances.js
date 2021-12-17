module.exports = {
  addNewPayer: '',
  buildUpdatePayerBalanceQuery: async(updatedEarliestTransId) => {
    if (updatedEarliestTransId === null) {
      //if earliestTransactionId is null, it means that
      //we do not want to update earliestTransactionId in the payer Row
      //build a query that just updates PayerBalance
    } else {
      //we have an updatedEarliestTransactionId
      //so build a query that updates both payer balance
      //and earliestTransactionId
    }
   }
}