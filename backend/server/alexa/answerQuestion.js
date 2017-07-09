'use-strict';

var answerService = require('../services/answer');

module.exports = {
  name: 'ANSWERQUESTION',
  options: {
    slots: {
      answer: "ANSWERVALUE"
    },
  },
  controller: (req, res) => {
    var session = req.getSession();
    if(!session.get("prescriptionId") || !session.get("currentQuestionId")) {
      res.say(`I'm sorry, I dont understand you stupid`);
    } else {
      var answer = req.slot("answer");
      if (answer > 10) {
        res.say(`Wow, quite high huh? I'll count that as 10.`);
        answer = 10;
      } else {
        res.say(`Great! I recorded your answer of ${answer}...`);
      }
      var currentQuestionId = session.get("currentQuestionId");
      // answerService.createAnswer()
      updateSessionForAnsweredQuestions(session, currentQuestionId);
      answerService.askNextQuestion(req, res);
    }
  }
};

function updateSessionForAnsweredQuestions(session, answeredQuestionId) {
  var ids = answerService.getAnsweredQuestionIds(session); // adds current question id
  session.set("answeredQuestionIds", JSON.stringify(ids));
}
