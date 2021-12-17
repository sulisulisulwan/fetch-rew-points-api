
const formatTimestamp = async (timestamp) => {
  let date = timestamp.substring(0, 10)
  let time = timestamp.substring(11, 19)
  return `${date} ${time}`;
}

const getTimestampForNow = async () => {
  let date = new Date(Date.now()).toISOString();
  return date;
}

module.exports = {
  formatTimestamp,
  getTimestampForNow
}