const Work_Outside_Office_Log_Model = require("../models/work_outside_office_log");
module.exports = {    
        create: function(req, res, next) {
            Work_Outside_Office_Log_Model.create(
            {   
                employee_id : req.body.employee_id ,
                date : req.body.date ,
                time_from : req.body.time_from ,
                time_to : req.body.time_to ,
                task : req.body.task ,
                manager_id : req.body.manager_id ,
                project_id : req.body.project_id ,
                created_date : req.body.created_date ,
                created_by : req.body.created_by ,
                updated_date : req.body.updated_date ,
                updated_by : req.body.updated_by ,
                status : req.body.status ,
            },
            function(err, result) {
              if (err) next(err);
              else
                res.json({
                  status: "success",
                  message: "Work Outside Office Log added successfully!!!",            
                });
            }
          );
        },
};