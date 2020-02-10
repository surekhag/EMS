const userModel = require("../models/projects");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const config = require("../../../config");
module.exports = {
  create: function(req, res, next) {
    userModel.create(
      {
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        userRole: req.body.userRole
      },
      function(err, result) {
        if (err) next(err);
        else
          res.json({
            status: "success",
            message: "User added successfully!!!",
            data: null
          });
      }
    );
  },

  authenticate: function(req, res, next) {
    userModel.findOne({ userName: req.body.userName }, function(err, userInfo) {
      if (err) {
        console.log("in err");
        next(err);
      } else {
        if (
          userInfo &&
          bcrypt.compareSync(req.body.password, userInfo.password)
        ) {
          const { password, ...userWithoutPassword } = userInfo._doc;
          const token = jwt.sign(
            { id: userInfo._id, role: userInfo.userRole },
            config.secret,
            {
              expiresIn: config.tokenExpiry
            }
          );

          res.json({
            status: "success",
            message: "user found!!!",
            data: { user: userWithoutPassword, token: token }
          });
        } else {
          res.json({
            status: "error",
            message: "Invalid Username/Password!!!",
            data: null
          });
        }
      }
    });
  },
  getAll: function(req, res, next) {
    console.log(req.user);
    //todo - remove or optimize it
    userModel.find({}, function(err, users) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: "success",
          message: "Users list found!!!",
          data: users
        });
      }
    });
  }
};
