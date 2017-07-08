'use strict';

var alexaApp = require('alexa-app');

var alexa = new alexaApp.app('alexa');

module.exports = (app) => {
  alexa.express({
    expressApp: app,
    checkCert: false,
    debug: process.env.NODE_ENV === 'development'
  });

  alexa.launch((req, res) => {
    res.say('You launched the app');
  });

  alexa.intent('LUCKYNUMBERS', {
    slots: {}
  }, (req, res) => {
    var number = Math.floor(Math.random() * 100);
    res.say(`Your lucky number is ${number}`);
  });
};
