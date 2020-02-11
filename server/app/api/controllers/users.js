const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../../config");
module.exports = {
  create: function(req, res, next) {
    userModel.create(
      {
          employee_id : req.body.employee_id ,
          email: req.body.email ,
          userName: req.body.userName ,
          password: req.body.password,
          firstname : req.body.firstname ,
          lastname: req.body.lastname ,
          middlename: req.body.middlename ,
          address1: req.body.address1 ,
          address2 : req.body.address2 ,
          city : req.body.city ,
          zip : req.body.zip ,
          state : req.body.state ,
          country : req.body.country ,
          gender : req.body.gender ,
          dateofbirth : req.body.dateofbirth ,
          dateofjoining : req.body.dateofjoining ,
          status : req.body.status,
          experience_at_joining : req.body.experience_at_joining ,
          work_location : req.body.work_location ,
          timezone : req.body.timezone ,
          shift_timing : req.body.shift_timing ,
          designation : req.body.designation ,
          employment_status : req.body.employment_status ,
          userRole: req.body.userRole ,
          reporting_manager : req.body.reporting_manager ,
          functional_manager: req.body.functional_manager ,
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
  },
  update: function(req, res, next) {    
    userModel.findOneAndUpdate({ id: req.params.id }, 
      {
          $set: req.body 
      },      
      function(err, userInfo) {      
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

  delete: function(req, res, next) {
    userModel.findOneAndUpdate({ id: req.params.id }, 
      {
         status : "Inactive"
      },      
      function(err, userInfo) {      
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
