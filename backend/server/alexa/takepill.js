'use-strict';

var answerService = require('../services/answer');

module.exports = {
  name: 'PILLTAKEN',
  options: {
    slots: {
      pill: 'PILL'
    }
  },
  controller: (req, res) => {
    var pillTaken = req.slot('pill');
    if (pillTaken) {
      var prescription = answerService.getPrescriptionByName(pillTaken);
      if (prescription) {
        // answerService.recordPrescriptionConsumedById(prescription.id);
        req.getSession().set("prescriptionId", prescription.id);
        res.say(`Great! I recorded that you took ${pillTaken}`);
        answerService.askNextQuestion(req, res);
      } else {
        res.say(`Sorry, I don't have recorded that you take ${pillTaken}. Please try again.`);
      }
    } else {
      res.say(`sorry, I dont understand you stupid face. You said ${pillTaken}`);
    }
  }
};
