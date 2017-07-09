'use strict';

var app = require('../server');
var _ = require('lodash');
var socket = require('./socket');
var m = app.models;

var questionService = require('./question');

module.exports = {
  nextQuestion: (session) => {
    var prescriptionId = session.get('prescriptionId');
    var answeredQuestionIds = getAnsweredQuestionIds(session);
    return getUnansweredQuestions(prescriptionId, answeredQuestionIds).then((unansweredQuestions) => {
      if (unansweredQuestions.length <= 0) return false;
      var questionToSend = unansweredQuestions[0];
      session.set('currentQuestionId', questionToSend.id);
      return questionToSend.question;
    });
  },

  create: (questionId, value) => {
    return m.Question.findOne({
      where: {
        id: questionId
      }
    }).then((question) => {
      if (!question) throw new Err('We asked you a question we do not understand.', 404);
      return question.answers.create({
        dateAnswered: new Date(),
        value: value
      });
    }).then((answer) => {
      socket.fire();
      return answer;
    });
  },

  getAnsweredQuestionIds: getAnsweredQuestionIds
};

function getUnansweredQuestions(prescriptionId, answeredQuestionIds) {
  return questionService.getAll(prescriptionId).then((questions) => {
    return _.filter(questions, (question) => {
      return !_.includes(answeredQuestionIds, question.id);
    });
  });
}

function getAnsweredQuestionIds(session) {
  var answeredQuestionIds = session.get('answeredQuestionIds');
  answeredQuestionIds = answeredQuestionIds ? JSON.parse(answeredQuestionIds) : [];
  var justAnsweredQuestion = session.get('currentQuestionId');
  if (justAnsweredQuestion) answeredQuestionIds.push(justAnsweredQuestion);
  return answeredQuestionIds;
}
