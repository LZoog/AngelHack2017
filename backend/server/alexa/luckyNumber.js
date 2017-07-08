'use-strict';

var _ = require('lodash');

module.exports = {
  name: 'LUCKYNUMBERS',
  options: {
    slots: {}
  },
  controller: (req, res) => {
    var m = server.models;
    m.Prescription.find().then((prescriptions) => {
      var prescriptionString = 'Your prescriptions are';
      _.each(prescriptions, (prescription) => {
        prescriptionString += ` ${prescription.name}`;
      });
      return prescriptionString;
    }).then((prescriptionString) => {
      res.say(prescriptionString);
    });
    // var number = Math.floor(Math.random() * 100);
    // res.say(`Your lucky number is ${number}`);
  }
};
