var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
	title : 'String',
	author : 'String',
	genre : 'String',
	price : 'Number',
	publication : 'String',
	isbn : 'String',
	dateTime : {
		type : 'Date',
		default : 'Date.now'
	},
	lastModified : {
		type : 'Date',
		default : 'Date.now'
	}
});

module.exports = mongoose.model('Book', bookSchema);