var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
 
var messageSchema   = new Schema({
    rate: String,
    time: String
});
 
module.exports = mongoose.model('Weather', messageSchema);