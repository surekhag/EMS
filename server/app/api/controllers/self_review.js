const Self_Review_Model = require("../models/self_review");
module.exports = {
  create: function(req, res, next) {
    Self_Review_Model.create(
      {
        employee_id: req.body.employee_id,        
        project_ids: req.body.project_ids,
        from_date: req.body.from_date,
        to_date: req.body.to_date,
        due_from: req.body.due_from,
        due_to: req.body.due_to,
        feedback : req.body.feedback,
        review_form_link: req.body.review_form_link,
        status: "Active",
        created_date: new Date(),
        updated_date: new Date(),
        created_by: req.user.userName,
        last_updated_by: req.user.userName
      },
      function(err, result) {
          console.log(result);
        if (err) next(err);
        else
          res.json({
            status: "success",
            message: "Review added successfully!!!"
          });
      }
    );
  },


  update: function(req, res, next) {
    //todo allow to update only if review edited between due dates    
    delete req.body.created_date;
    delete req.body.created_by;
    Self_Review_Model.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: req.body,
        updated_date: new Date(),
        last_updated_by: req.user.userName
      },
      function(err, info) {
        if (err) {
          console.log("in err");
          next(err);
        } else {
          res.json({
            status: "success",
            message: "Review updated successfully!!!"
          });
        }
      }
    );
  },
  getAll: function(req, res, next) {
    Self_Review_Model.find({}, function(err, users) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: "success",
          message: "Review list found!!!",
          data: users
        });
      }
    });
  },
 
  delete: function(req, res, next) {
    Self_Review_Model.findOneAndUpdate(
      { _id: req.params.id },
      {
        status: "Inactive"
      },
      function(err, userInfo) {
        if (err) {
          console.log("in err");
          next(err);
        } else {
          res.json({
            status: "success",
            message: "Review deleted successfully!!!"
          });
        }
      }
    );
  }
};
