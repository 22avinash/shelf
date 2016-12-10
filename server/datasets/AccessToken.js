var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tokenSchema = new Schema({
	userId : 'String',
	token : 'String'
});

module.exports = mongoose.model('AccessToken', tokenSchema);