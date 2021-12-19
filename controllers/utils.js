class Utils {

  async formatTimestamp (timestamp) {
    if (typeof timestamp !== 'string') {
      throw TypeError('First argument must be a string');
    }
    const parsedDate = new Date(Date.parse(timestamp)).toISOString();
    let date = parsedDate.substring(0, 10)
    let time = parsedDate.substring(11, 19)
    return `${date} ${time}`;

  }
}

module.exports = {
  Utils
}