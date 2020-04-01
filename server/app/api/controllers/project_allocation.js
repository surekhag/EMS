const Project_Allocation_Model = require("../models/project_allocation");

module.exports = {    
        create: function(req, res, next) {
          const {
                project,
                employee,
                startdate,
                enddate,
                functional_manager,
                created_date = new Date(),
                updated_date = new Date(),
                created_by = req.user.userName,
                last_updated_by = req.user.userName,
                status = "Active"
          } = req.body;
          Project_Allocation_Model.create(
            {   
                project,
                employee,
                startdate,
                enddate,
                functional_manager,
                created_date,
                updated_date,
                created_by,
                last_updated_by,
                status           
            },
            function(err, result) {
              if (err) next(err);
              else
                res.json({
                  status: "success",
                  message: " Project Allocated Successfully!!!",            
                });
            }
          );
        },
       getProjectAllocations: function (req, res, next) {
         console.log(req.params )
    Project_Allocation_Model.find({ project: req.params.id })
      .populate('project', 'title')
      .populate('employee', 'firstname lastname')
      .populate('functional_manager', 'firstname lastname')
      .exec(function (err, reviews) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: "success",
            message: "Project Allocation list found!!!",
            data: reviews
          });
        }
      });
  },

         getAll: function (req, res, next) {
    Project_Allocation_Model.find()
      .populate('project', 'title')
      .populate('employee', 'firstname lastname')
      .populate('functional_manager', 'firstname lastname')
      .exec(function (err, projectAllocations) {
        if (err) {
          next(err);
        } else {
          res.json({
            status: "success",
            message: "Project Allocation list found!!! ",
            data: projectAllocations
          });
        }
      });
  },
};