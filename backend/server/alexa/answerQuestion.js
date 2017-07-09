'use-strict';

var answerService = require('../services/answer');
var helperService = require('../services/helper');
var Err = require('err');

module.exports = {
  name: 'ANSWERQUESTION',
  options: {
    slots: {
      answer: 'ANSWERVALUE'
    }
  },
  controller: (req, res) => {
    return Promise.resolve().then(() => {
      var session = req.getSession();
      if (!session.get('prescriptionId') || !session.get('currentQuestionId')) {
        throw new Err('I don\'t understand you', 404);
      }
      var answer = req.slot('answer');
      if (!answer || answer === '?') throw new Err('I did not understand your answer.', 404);
      if (answer > 10) {
        res.say('Wow, quite high huh? I\'ll count that as 10.');
        answer = 10;
      } else {
        res.say(`Great! I recorded your answer of ${answer}.`);
      }
      var currentQuestionId = session.get('currentQuestionId');
      return answerService.create(currentQuestionId, answer).then((answer) => {
        var ids = answerService.getAnsweredQuestionIds(session);
        session.set('answeredQuestionIds', JSON.stringify(ids));
        return session;
      }).then((session) => {
        return answerService.nextQuestion(session, res).then((question) => {
          if (!question) res.shouldEndSession(true);
          res.shouldEndSession(false);
          res.say(question);
        });
      });
    }).catch(err => helperService.handleError(err, res));
  }
};
