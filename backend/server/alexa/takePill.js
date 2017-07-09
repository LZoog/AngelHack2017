'use-strict';

var Err = require('err');
var answerService = require('../services/answer');
var helperService = require('../services/helper');
var prescriptionService = require('../services/prescription');

module.exports = {
  name: 'PILLTAKEN',
  options: {
    slots: {
      pill: 'PILL'
    }
  },
  controller: (req, res) => {
    var pillTaken = req.slot('pill');
    return prescriptionService.getId(pillTaken).then((prescriptionId) => {
      if (!pillTaken) throw new Err('I didn\'t understand the prescription.', 404);
      if (!prescriptionId) throw new Err(`I don't have recorded that you took prescription ${pillTaken}. Please try again.`, 404);
      return prescriptionService.takePill(prescriptionId).then((prescription) => {
        req.getSession().set('prescriptionId', prescriptionId);
        res.say(`Great! I recorded that you took ${pillTaken}.`);
        var session = req.getSession();
        return answerService.nextQuestion(session, res).then((question) => {
          if (!question) res.shouldEndSession(true);
          res.shouldEndSession(false);
          res.say(question);
        });
      });
    }).catch(err => helperService.handleError(err, res));
  }
};
