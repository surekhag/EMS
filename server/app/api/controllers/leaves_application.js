const Leaves_Application_Model = require("../models/leaves_application");
module.exports = {    
        create: function(req, res, next) {
            Leaves_Application_Model.create(
            {          
                employee_id : req.body.employee_id,
                manager_id : req.body.manager_id,
                leave_date_from : req.body.leave_date_from,
                leave_date_to : req.body.leave_date_to,
                summary : req.body.summary,
                type : req.body.type,
                status : req.body.status,
                approved_by : req.body. approved_by,
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
                  message: "Leave Application added successfully!!!",            
                });
            }
          );
        },
};