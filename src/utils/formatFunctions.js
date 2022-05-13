const formatMobileNumber = (num) => {
  return parseInt(55 + num);
};

const formatMessage = (msg) => {
  return msg.replace(/\s/g, "%20");
};

export { formatMobileNumber, formatMessage };
