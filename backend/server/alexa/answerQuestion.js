'use-strict';

var answerService = require('../services/answer');

module.exports = {
  name: 'ANSWERQUESTION',
  options: {
    slots: {
      ANSWER: "ANSWERVALUE"
    },
  },
  controller: (req, res) => {
    var session = req.getSession(); // STILL NEEDS WORK
    if(!session.get("prescriptionId") || !session.get("currentQuestionId")) {
      res.say(`I'm sorry, I dont understand you stupid`);
    } else {
      var answer = req.slot("answer");
      // answerService.createAnswer()
      res.say(`Great! I recorded your answer of ${answer}`);
      answerService.askNextQuestion(req, res);
    }
  }
};
