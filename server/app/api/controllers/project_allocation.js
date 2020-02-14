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
                created_date : req.body.created_date,
                updated_date : req.body.updated_date,
                created_by : req.body.created_by,
                last_updated_by : req.body.last_updated_by,               
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
};