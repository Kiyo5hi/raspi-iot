const aliyunIot = require('aliyun-iot-device-sdk');
const deviceConfig = require('./config/device_id_password.json');
const getTempInfo = require('./sensors/dht.js');
const mongoose = require('mongoose');
const DataModel = require('./models/datamodel.js');
const config = require('./config/.config.json');

const db = config.database;
const device = aliyunIot.device(deviceConfig);

mongoose.connect(db, { useNewUrlParser: true });

device.on('connect', () => {
  console.log('Connect successfully!');
  console.log('Post properties every hour...');
  setInterval(() => {
    getTempInfo(2, (err, temp, hum) => {
      const params = {
        Temperature: temp,
        Humidity: hum
      };

      DataModel.create(
        {
          Time: Date.now(),
          Temperature: temp,
          Humidity: hum
        }
      );

      console.log(`Post properties: ${JSON.stringify(params)}`);
      device.postProps(params);
    });
  }, 3600000);

  device.serve('property/set', (data) => {
    console.log('Received a message: ', JSON.stringify(data));
  });
});

device.on('error', err => {
  console.error(err);
});
