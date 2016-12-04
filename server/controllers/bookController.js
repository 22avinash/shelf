var Book = require('../datasets/Book');
var _ = require('underscore');

module.exports.createBook = function(req, res) {
	if (req.body.title == null || req.body.title == '') {
		res.status(500);
		res.json({status:false, message:'title is required argument'});
		return;
	}
	var book = new Book({
		title : req.body.title,
		author : req.body.author,
		genre : req.body.genre
	});
	book.save(function(err) {
		if(err) {res.status(500);res.json({status:false,err:err});};
		res.json(book);
	});
};
module.exports.getAll = function(req, res) {
	Book.find({},function(err,books){
		if(err) {
			{res.status(500);res.json({status:false,err:err});return;};
		}
		res.json(books);
	});
};
module.exports.getOne = function(req, res) {
	if(!req.params.id){
		res.status(500);
		res.json({status: false, message: 'id is required parameter'});
		return;
	}
	Book.findOne({_id: req.params.id},function(err, book){
		if(err) {res.status(500);res.json({status:false,err:err});return;};
		res.json(book);
	});
};
module.exports.updateBook = function(req, res) {
	if(!req.params.id) {
		res.status(500);
		res.json({status: false, message: 'id is required parameter'});
		return;
	}
	Book.findOne({_id: req.params.id},function(err, book){
		if(err) {res.status(500);res.json({status:false,err:err});return;};
		if(book != null) {
			book = _.extend(book, req.body);
			book.save(function(err){
				if(err) {
					res.status(500);
					res.json({status:false,err:err});
					return;
				};
				res.json(book);
			});
		} else {
			res.status(500);
			res.json({status:false, message : 'book not found'});
		}
	})
};
module.exports.delete = function(req, res) {
	var id = req.params.id;
	if(!id) {
		res.status(500);
		res.json({status: false, message: 'id is required parameter'});
		return;
	}
	Book.remove({_id:id}, function(err, result){
		if(err) {res.status(500);res.json({status:false,err:err});};
		res.json(result);
	});
};