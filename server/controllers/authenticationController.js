var jwt = require('jsonwebtoken');
var config = require('../config');
var User = require('../datasets/User');
var AccessToken = require('../datasets/AccessToken');

module.exports.verifyToken = function(req, res, next) {
	  // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.', err });    
      } else {
        // if everything is good, save to request for use in other routes
        AccessToken.findOne({token: token}, function(err, accessToken){
          if(err){
            return res.json({ success: false, message: 'Failed to authenticate token.'});    
            return;
          }
          req.decoded = decoded;    
          next();
        });
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({ 
      success: false, 
      message: 'No token provided.' 
    });
    
  }
};
var getUserData = function(user){
  var userData = {
    email : user.email,
    id : user._id
  };
  return userData;
};
module.exports.logout = function(req, res){
  if(req.body.userId) {
    AccessToken.remove({userId : req.body.userId}, function(err){
      if(err){
        return res.json({ success: false, message : 'token already destroyed'});
      }
      res.json({
      success : true
    })
    });
  }
};
module.exports.login = function(req, res) {
  //console.log(req.body);
  if(req.body.email) {
    var filter = {
      email:req.body.email
    };
    User.findOne(filter, function(err, user){
      if(err){
        throw err;
        return;
      }
      if(!user) {
        res.json({success:false, message:'User not found!'});
      } else {
        if(!req.body.password) {
          res.json({success: false, message : 'password is required argument'});
          return;
        }

        user.comparePassword(req.body.password, function(err,isMatch){
          if(err) throw err;

          if(!isMatch) {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
          } else {
            //login success
            var token = jwt.sign(user, config.secret, {
                expiresIn: 60*60*24 // expires in 24 hours
              });
            var userData = getUserData(user);
            var accessToken = new AccessToken({
              userId : userData.id,
              token : token
            });

            accessToken.save(function(err, accessToken){
              userData.token = accessToken.token;
              res.json({
                success: true,
                message : 'welcome',
                user:userData
              });
            });
          }
        });
      }
    });
  }
}