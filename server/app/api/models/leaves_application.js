

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LeavesApplicationSchema = new Schema({ 
    employee_id  : {
        type: String,
        trim: true,
        required: true,        
      },
    manager_id  : {
        type: String,
        trim: true,
        required: true,        
      },
    leave_date_from  : {
        type: String,
        trim: true,
        required: true,        
      },
    leave_date_to  : {
        type: String,
        trim: true,
        required: true,        
      },
    summary  : {
        type: String,
        trim: true,
        required: true,        
      },
    type  : {
        type: String,
        trim: true,
        required: true,        
      },
    status  : {
        type: String,
        trim: true,
        required: true,        
      },
    approved_by  : {
        type: String,
        trim: true,
        required: true,        
      },
    created_date  : {
        type: String,
        trim: true,
        required: true,        
      },
    updated_date  : {
        type: String,
        trim: true,
        required: true,        
      },
    created_by  : {
        type: String,
        trim: true,
        required: true,        
      },
    last_updated_by  : {
        type: String,
        trim: true,
        required: true,        
      },
});

module.exports = mongoose.model("Leaves_Application", LeavesApplicationSchema);