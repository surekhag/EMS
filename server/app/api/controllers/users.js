const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../../config");
module.exports = {
  create: function (req, res, next) {
    const {
      employee_id,
      email,
      userName,
      password,
      firstname,
      lastname,
      middlename,
      address1,
      address2,
      city,
      zip,
      state,
      country,
      gender,
      dateofbirth,
      dateofjoining,
      status = "Active",
      experience_at_joining,
      work_location,
      timezone,
      shift_timing,
      designation,
      employment_status,
      userRole,
      reporting_manager,
      contact_no,
      skills,
      certifications,
      achievements
    } = req.body;
    userModel.create(
      {
        employee_id,
        email,
        userName,
        password,
        firstname,
        lastname,
        middlename,
        address1,
        address2,
        city,
        zip,
        state,
        country,
        gender,
        dateofbirth,
        dateofjoining,
        status,
        experience_at_joining,
        work_location,
        timezone,
        shift_timing,
        designation,
        employment_status,
        userRole,
        reporting_manager,
        contact_no,
        skills,
        certifications,
        achievements
      },
      function (err, result) {
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
  authenticate: function (req, res, next) {
    userModel.findOne({ $or: [{ userName: req.body.userName }, { email: req.body.userName }] }, function (err, userInfo) {
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
            { id: userInfo._id, userName: userInfo.userName, role: userInfo.userRole },
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
  getAll: function (req, res, next) {
    const query = req.query || {}
    userModel.find(query, function (err, users) {
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
  },
  getManagers: function (req, res, next) {
    userModel.find({ userRole: "manager", userRole: "Manager" }, function (err, users) {
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
  },
  update: function (req, res, next) {
    userModel.findOneAndUpdate({ _id: req.params.id },
      {
        $set: req.body
      },
      function (err, userInfo) {
        if (err) {
          console.log("in err");
          next(err);
        }
        else {
          res.json({
            status: "success",
            message: "User Info  updated successfully!!!",
          });
        }
      });
  },

  delete: function (req, res, next) {
    userModel.findOneAndUpdate({ _id: req.params.id },
      {
        status: "Inactive"
      },
      function (err, userInfo) {
        if (err) {
          console.log("in err");
          next(err);
        }
        else {
          res.json({
            status: "success",
            message: "User Info deleted successfully!!!",
          });
        }
      });
  }
};
