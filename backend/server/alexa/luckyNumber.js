'use-strict';

var _ = require('lodash');

module.exports = {
  name: 'LUCKYNUMBERS',
  options: {
    slots: {}
  },
  controller: (req, res) => {
    var number = Math.floor(Math.random() * 100);
    res.say(`Your lucky number is ${number}`);
  }
};
