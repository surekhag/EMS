const Leaves_Application_Model = require("../models/leaves_application");
module.exports = {    
        create: function(req, res, next) {
          const {
                employee_id,
                manager_id,
                leave_date_from,
                leave_date_to,
                summary,
                type,
                status='Active',
                approved_by,
                created_date = new Date(),
                updated_date = new Date(),
                created_by = req.user.userName,
                last_updated_by = req.user.userName,
          } = req.body;
            Leaves_Application_Model.create(
            {          
                employee_id,
                manager_id,
                leave_date_from,
                leave_date_to,
                summary,
                type,
                status,
                approved_by,
                created_date,
                updated_date,
                created_by,
                last_updated_by,
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
        getAll: function(req, res, next) {
          Leaves_Application_Model.find({}, function(err, users) {
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