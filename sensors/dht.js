const dht = require("node-dht-sensor");

function getInfo(data, callback) {
    dht.read(11, data, (err, temp, humi) => {
        if (typeof callback === 'function') callback(err, temp, humi);
    });
}

module.exports = getInfo;