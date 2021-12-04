
function requiredParams(res, msg = '', data = {}, success = false) {
  res.status(200).send({
    success: success,
    msg: msg,
    data: data
  });
  return 0;
}

module.exports = { requiredParams };