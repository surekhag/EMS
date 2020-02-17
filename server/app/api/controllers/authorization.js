const userModel = require("../models/users");
module.exports = {   
getAuth: function(req, res, next) {
    userModel.find({_id: req.user.id}, function(err, users) {
      if (err) {
          console.log("here in err");
        next(err);
      } else {
        res.json({
          status: "success",
          message: "User found!!!",
          data: users
        });
      }
    });
  }
}
