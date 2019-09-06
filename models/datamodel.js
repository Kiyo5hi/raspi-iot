const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var DataSchema = new Schema(
    {
        Time: Number,
        Temperature: Number,
        Humidity: Number
    }
);

module.exports = mongoose.model('Data', DataSchema);