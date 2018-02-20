const Nexmo = require('nexmo');
const error = require('../../helper/errorHandler');
const asset = require('../../config/nexon.json');

const nexmo = new Nexmo(asset);

exports.postVerify = (req, res, next) => {
  const data = {
    number : req.body.number,
    brand : nexmoHelper.brand,
  }

  nexmo.verify.request(data, (err, result) => {
    if(err) { next(err); }
    else {
      res.status(201).json(result);
    }
  });
};

exports.postCheck = (req, res, next) => {
  const data = {
    request_id : req.body.request_id,
    code : req.body.code,
  }
  nexmo.verify.check(data, (err, result) => {
    if(err) { next(err); }
    else {
      res.status(201).json(result);
    }
  });
};
