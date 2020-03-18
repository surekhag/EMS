const Peer_Review_Model = require("../models/peer_review");
module.exports = {
  create: function(req, res, next) {
    req.body.employee_reviewing.map((employee_reviewing)=>{
    Peer_Review_Model.create(
      {
        employee_under_review: req.body.employee_under_review,
        employee_reviewing: employee_reviewing,
        project: req.body.project,
        functional_manager: req.body.functional_manager,
        from_date: req.body.from_date,
        to_date: req.body.to_date,
        due_from: req.body.due_from,
        due_to: req.body.due_to,
        review_form_link: req.body.review_form_link,
        status: "Active",
        created_date: new Date(),
        updated_date: new Date(),
        created_by: req.user.userName,
        last_updated_by: req.user.userName
      },
      function(err, result) {
        if (err) next(err);
        else
          res.json({
            status: "success",
            message: " Peer Review added successfully!!!"
          });
      }
    );
  })
  },

  update: function(req, res, next) {
    delete req.body.created_date;
    delete req.body.created_by;
    Peer_Review_Model.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: req.body,
        updated_date: new Date(),
        last_updated_by: req.user.userName
      },
      function(err, peerInfo) {
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
    Peer_Review_Model.find({}, function(err, users) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: "success",
          message: "Peer Review list found!!!",
          data: users
        });
      }
    });
  },
  getForUser: function(req, res, next) {
    Peer_Review_Model.find({ employee_reviewing: req.user.userName }, function(
      err,
      users
    ) {
      if (err) {
        next(err);
      } else {
        res.json({
          status: "success",
          message: "Peer Review list found!!!",
          data: users
        });
      }
    });
  },
  delete: function(req, res, next) {
    Peer_Review_Model.findOneAndUpdate(
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
            message: "Project deleted successfully!!!"
          });
        }
      }
    );
  }
};
