'use-strict';

var answerService = require('../services/answer');
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
    if (!pillTaken) return res.say(`Sorry, I dont understand you stupid face. You said ${pillTaken}`);
    return prescriptionService.getId(pillTaken).then((prescriptionId) => {
      if (!prescriptionId) return res.say(`Sorry, I don't have recorded that you take ${pillTaken}. Please try again.`);
      return prescriptionService.takePill(prescriptionId).then((prescription) => {
        req.getSession().set('prescriptionId', prescriptionId);
        res.say(`Great! I recorded that you took ${pillTaken}...`);
        answerService.askNextQuestion(req, res);
      });
    });
  }
};
