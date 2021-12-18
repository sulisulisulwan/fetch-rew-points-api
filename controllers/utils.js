
const formatTimestamp = async (timestamp) => {
  try {
    let date = timestamp.substring(0, 10)
    let time = timestamp.substring(11, 19)
    return `${date} ${time}`;
  } catch(err) {
    console.error(err);
    return err;
  }
}

const getTimestampForNow = async () => {
  try {
    let date = new Date(Date.now()).toISOString();
    return date;
  } catch(err) {
    console.error(err);
    return err;
  }
}

module.exports = {
  formatTimestamp,
  getTimestampForNow
}