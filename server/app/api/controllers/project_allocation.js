const Project_Allocation_Model = require("../models/project_allocation");
module.exports = {    
        create: function(req, res, next) {
          Project_Allocation_Model.create(
            {   
                project_id : req.body.project_id,
                employee_id : req.body. employee_id,
                start_date : req.body. start_date,
                end_date : req.body.end_date,
                manager_employee_id : req.body.manager_employee_id,
                created_date : new Date(),
                updated_date : new Date(),
                created_by : req.user.userName,
                last_updated_by : req.user.userName,               
            },
            function(err, result) {
              if (err) next(err);
              else
                res.json({
                  status: "success",
                  message: " Project Allocated Successfully!!!",            
                });
            }
          );
        },
        getAll: function(req, res, next) {
          Project_Allocation_Model.find({}, function(err, users) {
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
        }
};