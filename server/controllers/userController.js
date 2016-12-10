var User = require('../datasets/User');

module.exports.createUser = function(req, res){
	if(req.body.email == null){
		res.status(500);
		res.json({status:false, message: 'email is required argument'});
		return;
	} else 	if(req.body.password == null){
		res.status(500);
		res.json({status:false, message: 'password is required argument'});
		return;
	}
	var reader = new User({
		email : req.body.email,
		password : req.body.password
	});

	reader.save(function(err){
		if(err) throw err;
		res.json({
			email:req.body.email
		});
	});
};
module.exports.getAll = function(req, res) {
	User.find({}, function(err, users){
		if(err) {
			console.log(err);
			return;
		}
		res.json(users);
	});
};