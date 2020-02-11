

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Project_allocation_Schema = new Schema({   
    project_id  : {
        type: String,
        trim: true,
        required: true,
        unique : true      
      },
    employee_id  : {
        type: String,
        trim: true,
        required: true,        
      },
    start_date  : {
        type: String,
        trim: true,
        required: true,        
      },
    end_date  : {
        type: String,
        trim: true,
        required: false,        
      },
    manager_employee_id  : {
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

module.exports = mongoose.model("PeerReview", Project_allocation_Schema);






