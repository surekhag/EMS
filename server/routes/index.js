const movies = require("./movies");
const users = require("./users");
const validateUser = require("../middleware/validate-user");
module.exports = app => {
  // public route
  app.use("/users", users);

  // private route
  app.use("/movies", movies);

  //app.use(logger('dev'));
  app.get("/", function(req, res) {
    res.json({
      message: "Hello world! keep smilling"
    });
    res.send();
  });

  // express doesn't consider not found 404 as an error so we need to handle 404 explicitly
  // handle 404 error
  app.use(function(req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
  });
};
