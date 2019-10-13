// import alibabacloud iot sdk
const iot = require('alibabacloud-iot-device-sdk');
const deviceConfig = require('./config/device_id_password.json');

// import getTemp() function to get data
const getTempInfo = require('./sensors/dht.js');

// import mongoose to connect MongoDB
const mongoose = require('mongoose');
// import configs to connect MongoDB
const config = require('./config/.config.json');
const db = `mongodb://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`;
const MINUTE = 60000;
const UPDATE_INTERVAL = config.update_interval * MINUTE;
const POST_INTERVAL_DB = config.post_interval_db * MINUTE;
const POST_INTERVAL_IOT = config.post_interval_iot * MINUTE;

// import postData() function to post data to MongoDB
const post = require('./controller/post.js');

// setup a device with imported config
const device = iot.device(deviceConfig);

// to prompt the device is connected successfully
device.on('connect', () => {
    console.log('Connect to IoT platform successfully!');
});

// to prompt error
device.on('error', err => {
    console.error(err);
});

// connect to MongoDB
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) throw err;
    console.log('Connect to MongoDB successfully!');
});

// function that gets new data
var params = {
    Temperature: 0.0,
    Humidity: 0.0
};
const setParams = function () {
    getTempInfo(2, (err, temp, hum) => {
        if (err) throw err;
        params = {
            Temperature: temp,
            Humidity: hum
        };
        console.log(`Update params: ${JSON.stringify(params)}`);
    });
}

// update params periodically
console.log(`Updating data every ${config.update_interval} minute(s).`)
setParams();
setInterval(setParams, UPDATE_INTERVAL);

// post to IoT periodically
console.log(`Posting data to IoT platform every ${config.post_interval_iot} minute(s).`);
setInterval(() => {
    post.toIoT(device, params);
}, POST_INTERVAL_IOT);

// post to DB periodically
console.log(`Posting data to MongoDB every ${config.post_interval_db} minute(s).`)
setInterval(() => {
    post.toDB(params);
}, POST_INTERVAL_DB);