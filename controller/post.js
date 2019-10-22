const DataModel = require('../models/datamodel.js');

const toDB = function (params) {
    DataModel.create({
        time: new Date(),
        temperature: params.temperature,
        humidity: params.humidity
    });

    console.log(`Post properties to DB: ${JSON.stringify(params)}`);
}

const toIoT = function (device, params) {
    device.postProps(params);
    console.log(`Post properties to IoT: ${JSON.stringify(params)}`);
}

post = {
    toDB: toDB,
    toIoT: toIoT
}

module.exports = post;