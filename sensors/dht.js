const dht = require("node-dht-sensor");

function getInfo(data, callback) {
    dht.read(11, data, (err, temp, hum) => {
        if (typeof callback === 'function') callback(err, temp, hum);
    });
}

module.exports = getInfo;
