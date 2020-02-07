const userModel = require('../models/users');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

module.exports = {
 create: function(req, res, next) {

res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password, userType : req.body.userType }, function (err, result) {
      if (err) 
       next(err);
      else
       res.json({status: "success", message: "User added successfully!!!", data: null});      
    });
 },

authenticate: function(req, res, next) {  
res.setHeader('Access-Control-Allow-Origin', '*');
// res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
res.setHeader('Access-Control-Allow-Credentials', true); // If needed
res.setHeader('Access-Control-Allow-Methods' , 'POST');

  userModel.findOne({email:req.body.email}, function(err, userInfo){       
     if (err) {
      console.log("in err") ;
      next(err);
     } else {      
if(userInfo && bcrypt.compareSync(req.body.password, userInfo.password)) {  
const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
res.json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});
}else{
res.json({status:"error", message: "Invalid email/password!!!", data:null});
}
}
});    
 },
}