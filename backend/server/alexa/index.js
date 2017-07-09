'use-strict';

module.exports = (app) => {
  return [
    require('./luckyNumber')(app),
    require('./answerQuestion')(app),
    require('./takepill')(app)
  ];
};
