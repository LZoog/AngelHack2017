'use-strict';

var answerService = require('../services/answer');

module.exports = {
  name: 'ANSWERQUESTION',
  options: {
    slots: {
      answer: 'ANSWERVALUE'
    }
  },
  controller: (req, res) => {
    var session = req.getSession();
    if (!session.get('prescriptionId') || !session.get('currentQuestionId')) {
      return res.say(`I'm sorry, I dont understand you stupid`);
    }
    var answer = req.slot('answer');
    if (answer > 10) {
      res.say(`Wow, quite high huh? I'll count that as 10.`);
      answer = 10;
    } else {
      res.say(`Great! I recorded your answer of ${answer}...`);
    }
    var currentQuestionId = session.get('currentQuestionId');
    return answerService.create(currentQuestionId, answer).then((answer) => {
      var ids = answerService.getAnsweredQuestionIds(session);
      session.set('answeredQuestionIds', JSON.stringify(ids));
      answerService.askNextQuestion(req, res);
    });
  }
};
