const projectModel = require("../models/projects");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../../config");
module.exports = {
  create: function(req, res, next) {
    projectModel.create(
      {          
          title  : req.body.title,
          description  : req.body.description,
          startdate : req.body.startdate,
          enddate : req.body.enddate,
          technology : req.body.technology,
          client : req.body.client,
          client_location : req.body.client_location ,
          status : req.body.status,
          type : req.body.type,
          created_date : req.body.created_date ,
          created_by : req.body.created_by,
          updated_date : req.body.updated_date,
          last_updated_by : req.body.last_updated_by,
      },
      function(err, result) {
        if (err) next(err);
        else
          res.json({
            status: "success",
            message: "Project added successfully!!!",            
          });
      }
    );
  },
  getProject: function(req, res, next) {
    console.log(req.user);
    //todo - remove or optimize it
    projectModel.findOne({ title: req.params.title }, function(err, users) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: "success",
          message: "Project found!!!",
          data: users
        });
      }
    });
  },
  getAll: function(req, res, next) {
    console.log(req.user);
    //todo - remove or optimize it
    projectModel.find({}, function(err, users) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: "success",
          message: "Project list found!!!",
          data: users
        });
      }
    });
  },
  update: function(req, res, next) {    
    projectModel.findOneAndUpdate({ title: req.params.title }, 
      {
          $set: req.body 
      },
      {upsert: true}, 
      function(err, userInfo) {      
      if (err) {
        console.log("in err");
        next(err);
      }      
      else {
              res.json({
                status: "success",
                message: "Project updated successfully!!!",                
              });
            }
        });
  },

  delete: function(req, res, next) {
    projectModel.findOneAndUpdate({ title: req.params.title }, 
      {
         status : "Inactive"
      },
      {upsert: true}, 
      function(err, userInfo) {      
      if (err) {
        console.log("in err");
        next(err);
      }      
      else {
              res.json({
                status: "success",
                message: "Project deleted successfully!!!",                
              });
            }
        });
  }
};
