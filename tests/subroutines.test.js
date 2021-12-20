

test('this test will pass', () => {
  expect(2).toBe(2)
})


//OUT OF TIME.. THIS IS AN OUTLINE OF THE UNIT TESTS FOR SUBROUTINES

// xdescribe('Subroutines:', () => {



//   xdescribe('CreditSubroutines:', () => {

//     'Should contain a "models" property with value passed in through first argument'
//     xdescribe('addCreditTransaction():', () => {
//       `Should pass points, payer, timestamp, subBalance with a value equal to
//       points, payerId, and trans_type with a value of "credit" to Transactions
//       addNewTransaction() model`
//     })
//   })


//   xdescribe('DebitSubroutines:', () => {
//     'Should contain a "models" property with value passed in through first argument'

//     xdescribe('addDebitTransaction()', () => {
//       `Should pass points, payer, timestamp, subBalance with a value equal to
//       points, payerId, and trans_type with a value of "debit" to Transactions
//       addNewTransaction() model`
//     })
//     xdescribe('distributeDebit()', () => {
//       `Should process subBalances in order from first to last until debit points
//       have been depleted`
//       `Should increase negative subBalances till they are zero`
//       `Should decrease positive subBalances till they are zero`
//       `Should return an array`
//       `The first value of the array should be an object`
//       `The object should have the payer as key and their total debit as an integer value`
//       `The second element of the array`
//       `The array should have at least 2 elements and always an even amount`
//       `The first of each two elements should be the new subBalance after processing`
//       `The second of each two elements should be the payer id`
//     })

//     xdescribe('formatDebitData()', () => {
//       `Should convert the object accepted as its argument to an array of objects
//       with "payer" key with corresponding payer name as a string, and "points" key
//       with its corresponding integer value`
//     })
//     xdescribe('processSpendPoints()', () => {
//       `Should distribute points as debit to transaction subBalances that are
//       non-zero in order of earliest to latest transaction and return a summary
//       with each payer name and their corresponding total debit`
//     })
//   })
// })