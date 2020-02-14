const Peer_Review_Model = require("../models/peer_review");
module.exports = {    
        create: function(req, res, next) {
          Peer_Review_Model.create(
            {          
                employee_under_review :req.body.employee_under_review,
                employee_reviewing :req.body.employee_reviewing ,
                project :req.body.project ,
                from_date :req.body.  from_date ,
                to_date :req.body.to_date ,
                due_from :req.body.due_from ,
                due_to :req.body. due_to ,
                review_form_link :req.body.review_form_link ,
                status :req.body.status ,
                created_date :req.body.created_date ,
                updated_date :req.body.updated_date ,
                created_by :req.body.created_by ,
                last_updated_by :req.body.last_updated_by ,
            },
            function(err, result) {
              if (err) next(err);
              else
                res.json({
                  status: "success",
                  message: " Peer Review added successfully!!!",            
                });
            }
          );
        },
        getAll: function(req, res, next) {
          Peer_Review_Model.find({}, function(err, users) {
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

};