const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var DataSchema = new Schema({
    time: Date,
    temperature: Number,
    humidity: Number
});

module.exports = mongoose.model('Data', DataSchema);