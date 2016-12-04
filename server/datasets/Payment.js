var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paymentSchema = new Schema({
	//fill the schema
});

module.exports = mongoose.model('Payment', transactionSchema);