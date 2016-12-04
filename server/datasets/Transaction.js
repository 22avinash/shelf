var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transactionSchema = new Schema({
	//fill the schema
});

module.exports = mongoose.model('Transaction', transactionSchema);