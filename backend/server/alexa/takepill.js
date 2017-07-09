'use-strict';

var answerService = require('../services/answer');
var perscriptionService = require('../services/perscription');

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
      var perscriptionId = perscriptionService.getId(pillTaken);
      if (prescriptionId) {
        perscriptionService.takePill(perscriptionId);
        // answerService.recordPrescriptionConsumedById(prescription.id);
        req.getSession().set("prescriptionId", prescriptionId);
        res.say(`Great! I recorded that you took ${pillTaken}...`);
        answerService.askNextQuestion(req, res);
      } else {
        res.say(`Sorry, I don't have recorded that you take ${pillTaken}. Please try again.`);
      }
    } else {
      res.say(`Sorry, I dont understand you stupid face. You said ${pillTaken}`);
    }
  }
};
