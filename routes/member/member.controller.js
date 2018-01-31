const multer = require('multer');

const Member = require('./member.model.js');
const error = require('../../helper/errorHandler');
const hashPassword = require('../../helper/hashPassword.js');
const folderHelper = require('../../helper/folderHelper');

exports.getAllMember = function (req, res, next) {
  const respond = (results) => {
    res.status(200).json(results);
  };

  const onError = (err) => {
    next(err);
  };

  Member.findAndCountAll({
    offset: req.params.start,
    limit: req.params.end,
  })
  .then(respond)
  .catch(onError);
};

exports.getMember = function (req, res, next) {
  const respond = (result) => {
    result ? res.status(200).json(result) : next(error(400));
  };

  const onError = (err) => {
    next(err);
  };

  Member.findById(req.params.mem_id)
  .then(respond)
  .catch(onError);
};

exports.createMember = function (req, res, next) {
  const createList = {
    mem_userid: req.body.mem_userid,
    mem_email: req.body.mem_email,
    mem_name: req.body.mem_name,
    mem_pw: req.body.mem_pw,
    mem_phone: req.body.mem_phone,
    mem_mail_agree: req.body.mem_mail_agree,
    mem_create_date: new Date(),
    mem_last_connect_date: new Date(),
    mem_update: new Date(),
  };

  // Hashing password
  createList.mem_pw = hashPassword.createPw(createList.mem_pw);

  const respond = (result) => {
    res.status(201).json(result);
  };

  const onError = (err) => {
    next(err);
  };

  Member.create(createList)
  .then(respond)
  .catch(onError);
};

exports.deleteMember = (req, res, next) => {
  const respond = (data) => {
    if (data) {
      Member.destroy({
        where: {
          mem_id: req.params.mem_id,
        },
      })
      .then((result) => {
        folderHelper.deleteF(`images/member/${req.params.mem_id}`);
        res.send(200);
      })
      .catch((err) => {
        next(err);
      });
    } else {
      next(error(400));
    }
  };

  const onError = (err) => {
    next(err);
  };

  Member.findById(req.params.mem_id)
  .then(respond)
  .catch(onError);
};

exports.updateMember = (req, res, next) => {
  const respond = (data) => {
    if (data) {
      const updateList = {
        mem_userid: req.body.mem_userid || data.mem_userid,
        mem_email: req.body.mem_email || data.mem_email,
        mem_name: req.body.mem_name || data.mem_name,
        mem_pw: req.body.mem_pw,
        mem_phone: req.body.mem_phone || data.mem_phone,
        mem_mail_agree: req.body.mem_mail_agree || data.mem_mail_agree,
        mem_update: new Date(),
      };

      // Checking password with hashed one.
      if (updateList.mem_pw) {
        updateList.mem_pw = hashPassword.updatePw(updateList.mem_pw, data.mem_pw);
      } else {
        updateList.mem_pw = data.mem_pw;
      }

      // Updating
      Member.update(updateList, {
        where: {
          mem_id: req.params.mem_id,
        },
      })
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        next(err);
      });
    } else {
      next(error(400));
    }
  };

  const onError = (err) => {
    next(err);
  };

  // Hashing and Updating
  Member.findById(req.params.mem_id)
  .then(respond)
  .catch(onError);
};

exports.updateMemberProfile = (req, res, next) => {
  const respond = (data) => {
    if (data) {
      const updateList = {
        mem_profile_photo: req.file.path || data.mem_profile_photo,
        mem_update: new Date(),
      };

      Member.update(updateList, {
        where: {
          mem_id: req.params.mem_id,
        },
      })
      .then((result) => {
        res.status(201).json(req.file);
      })
      .catch((err) => {
        next(err);
      });
    } else {
      next(error(400));
    }
  };

  const onError = (err) => {
    next(err);
  };

  Member.findById(req.params.mem_id)
  .then(respond)
  .catch(onError);
};
