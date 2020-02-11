

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProjectAllocationSchema = new Schema({   
    project_id  : {
        type: Number,
        trim: true,
        required: true,
        unique : true      
      },
    employee_id  : {
        type: Number,
        trim: true,
        required: true,        
      },
    start_date  : {
        type: Date,
        trim: true,
        required: true,        
      },
    end_date  : {
        type: Date,
        trim: true,
        required: false,        
      },
    manager_employee_id  : {
        type: Number,
        trim: true,
        required: true,        
      },
    created_date  : {
        type: Date,
        trim: true,
        required: true,        
      },
    updated_date  : {
        type: Date,
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

module.exports = mongoose.model("Project_Allocation", ProjectAllocationSchema);






