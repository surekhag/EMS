const projectModel = require("../models/projects");

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
          status : "Active",
          type : req.body.type,
          created_date : new Date(),
          created_by : req.user.userName,
          updated_date : new Date(),
          last_updated_by : req.user.userName,
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
    //todo - remove or optimize it
    projectModel.findOne({ _id: req.params.id }, function(err, users) {
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
    projectModel.findOneAndUpdate({ _id: req.params.id }, 
      {
          $set: req.body,
          updated_date : new Date(),
          last_updated_by : req.user.userName,
      },      
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
    projectModel.findOneAndUpdate({ _id: req.params.id }, 
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
                message: "Project deleted successfully!!!",                
              });
            }
        });
  }
};
