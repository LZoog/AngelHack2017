'use strict';

var app = require('../server');
var _ = require('lodash');
var socket = require('./socket');
var m = app.models;

var questionService = require('./question');

module.exports = {
  fetchUnansweredQuestions: (prescriptionId, answeredQuestionIds) => {
    return questionService.getAll(prescriptionId).then((questions) => {
      var unansweredQuestions = _.filter(questions, (question) => {
        return !_.includes(answeredQuestionIds, question.id);
      });
      return unansweredQuestions;
    });
  },

  getAnsweredQuestionIds: (session) => {
    var answeredQuestionIds = session.get('answeredQuestionIds');
    answeredQuestionIds = answeredQuestionIds ? JSON.parse(answeredQuestionIds) : [];
    var justAnsweredQuestion = session.get('currentQuestionId');
    if (justAnsweredQuestion) answeredQuestionIds.push(justAnsweredQuestion);
    return answeredQuestionIds;
  },

  askNextQuestion: (req, res) => {
    var session = req.getSession();
    var prescriptionId = session.get('prescriptionId');
    var answeredQuestionIds = module.exports.getAnsweredQuestionIds(session);
    return module.exports.fetchUnansweredQuestions(prescriptionId, answeredQuestionIds).then((unansweredQuestions) => {
      if (unansweredQuestions.length > 0) {
        var questionToSend = unansweredQuestions[0];
        session.set('currentQuestionId', questionToSend.id);
        res.shouldEndSession(false);
        res.say(questionToSend.question);
      } else {
        res.shouldEndSession(true);
        res.say('Goodbye');
      }
    });
  },

  create: (questionId, value) => {
    return m.Question.findOne({
      where: {
        id: questionId
      }
    }).then((question) => {
      if (!question) return {};
      return question.answers.create({
        dateAnswered: new Date(),
        value: value
      });
    }).then((answer) => {
      socket.fire();
      return answer;
    });
  }
};
