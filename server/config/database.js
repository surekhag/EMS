//Set up mongoose connection
const mongoose = require("mongoose");
const config = require("./index");
mongoose.connect(config.mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
mongoose.Promise = global.Promise;
module.exports = mongoose;
