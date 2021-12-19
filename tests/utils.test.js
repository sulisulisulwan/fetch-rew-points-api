const { Utils } = require('../controllers/utils');
const newUtils = new Utils('yoo', 'does this work')


describe('Utils:', () => {

  describe('formatTimestamp()', () => {
    try {
      test('Is a function', () => {
        expect(typeof newUtils.formatTimestamp).toBe('function');
      })
      test('Should throw an error if first argument is not a string', async () => {
        expect.assertions(5)
        const errMessage = 'First argument must be a string';
        await expect(newUtils.formatTimestamp(undefined)).rejects.toEqual(TypeError(errMessage))
        await expect(newUtils.formatTimestamp(null)).rejects.toEqual(TypeError(errMessage))
        await expect(newUtils.formatTimestamp(2345)).rejects.toEqual(TypeError(errMessage))
        await expect(newUtils.formatTimestamp(false)).rejects.toEqual(TypeError(errMessage))
        await expect(newUtils.formatTimestamp({})).rejects.toEqual(TypeError(errMessage))

      });

      test('Should return a string', async () => {
          const timestamp = '2021-12-18T22:37:17.83Z'
          const result = await newUtils.formatTimestamp(timestamp)
          expect(typeof result).toBe('string')
      });


      test('Valid timestamp inputs should output correctly formatted string "YYYY-MM-DD HH:MM:SS"', async () => {
          const timestamp1 = '2021-12-18T22:37:17.83Z';
          const timestamp2 = '2013-06-28';
          const timestamp3 = '2019-01-01T00:00:32.000Z';
          expect(await newUtils.formatTimestamp(timestamp1)).toBe('2021-12-18 22:37:17');
          expect(await newUtils.formatTimestamp(timestamp2)).toBe('2013-06-28 00:00:00');
          expect(await newUtils.formatTimestamp(timestamp3)).toBe('2019-01-01 00:00:32');
      });

      test('String input must be in a format acceptable to Date.parse()', async () => {
        expect.assertions(3)
        const timestamp1 = '2019-01-01T00:00:32.000#Z'
        const timestamp2 = '2019-61-01T00:00:32.000Z'
        const timestamp3 = 'MMM! Sausage!'
        const errMessage = 'Timestamp must be a parsable date string using Date.parse(<timestamp>)'
        await expect(newUtils.formatTimestamp(timestamp1)).rejects.toEqual(RangeError('Invalid time value'))
        await expect(newUtils.formatTimestamp(timestamp2)).rejects.toEqual(RangeError('Invalid time value'))
        await expect(newUtils.formatTimestamp(timestamp3)).rejects.toEqual(RangeError('Invalid time value'))

      });

    } catch (err) {
      console.error(err)
    }

  })
})
