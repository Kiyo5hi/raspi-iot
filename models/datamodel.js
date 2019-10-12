const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var DataSchema = new Schema({
    Time: Date,
    Temperature: Number,
    Humidity: Number
});

module.exports = mongoose.model('Data', DataSchema);