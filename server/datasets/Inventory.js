var mongoose = require('mongoose');
var Schema = mongoose.schema;

var inventorySchema = new Schema {
	type : 'String',
	bookId : {
		type : mongoose.Schema.ObjectId,
		ref : 'books'
	},
	userId : {
		type : mongoose.Schema.ObjectId,
		ref : 'users'
	},
	discount : 'Number',
	amount : 'Number',
	dateTime : {
		type : 'Date',
		default : 'Date.now'
	},
	lastModified : {
		type : 'Date',
		default : 'Date.now'
	}
};

module.exports = mongoose.model('Inventory',inventorySchema);