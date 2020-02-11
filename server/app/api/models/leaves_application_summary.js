const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Leaves_application_summary_Schema = new Schema({ 
    employee_id : {
        type: String,
        trim: true,
        required: true,
        unique: true       
      },
    type : {
        type: String,
        trim: true,
        required: true,        
      },
    count : {
        type: String,
        trim: true,
        required: true,        
      },
    balance : {
        type: String,
        trim: true,
        required: true,        
      },
    applied_on : {
        type: String,
        trim: true,
        required: true,        
      },
    note : {
        type: String,
        trim: true,
        required: true,        
      },
    created_date : {
        type: String,
        trim: true,
        required: true,        
      },
    created_by : {
        type: String,
        trim: true,
        required: true,        
      },
    updated_date : {
        type: String,
        trim: true,
        required: true,        
      },
    updated_by : {
        type: String,
        trim: true,
        required: true,        
      },
});

module.exports = mongoose.model("PeerReview", Leaves_application_summary_Schema);