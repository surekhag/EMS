
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProjectSchema = new Schema({   
    title : {
        type: Schema.Types.String,
        trim: true,
        required: true,
        unique: true
      },
    description : {
        type: String,
        trim: true,
        required: false
      },
    startdate : {
        type: String,
        trim: true,
        required: true
      },
    enddate : {
        type: String,
        trim: true,
        required: false
      },
    technology : {
        type: String,
        trim: true,
        required: true
      },
    client : {
        type: String,
        trim: true,
        required: true
      },
    client_location : {
        type: String,
        trim: true,
        required: true
      },
    status : {
        type: String,
        trim: true,
        required: true
      },
    type : {
        type: String,
        trim: true,
        required: true
      },
    created_date : {
        type: String,
        trim: true,
        required: true
      },
    created_by : {
        type: String,
        trim: true,
        required: false
      },
    updated_date : {
        type: String,
        trim: true,
        required: true
      },
    last_updated_by : {
        type: String,
        trim: true,
        required: true
      },
});

module.exports = mongoose.model("Project", ProjectSchema);
