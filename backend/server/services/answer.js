'use strict';

var app = require('../server');
var _ = require('lodash');
var socket = require('./socket');
var m = app.models;

module.exports = {
  getPrescriptionByName: (name) => {
    return {
      name: 'ritalin',
      id: 1
    };
  },
  createAnswer: (questionId, value) => {
    return;
  },
  fetchUnansweredQuestions: (prescriptionId, answeredQuestionIds) => {
    var unansweredQuestions = _.filter(questions, (question) => {
      return !_.includes(answeredQuestionIds, question.id);
    });
    return unansweredQuestions;
  },
  getAnsweredQuestionIds: (session) => {
    var answeredQuestionIds = session.get("answeredQuestionIds");
    if(answeredQuestionIds) {
      answeredQuestionIds = JSON.parse(answeredQuestionIds);
    } else {
      var answeredQuestionIds = [];
    }
    var justAnsweredQuestion = session.get("currentQuestionId");
    if (justAnsweredQuestion) {
      answeredQuestionIds.push(justAnsweredQuestion);
    }
    return answeredQuestionIds;
  },
  askNextQuestion: (req, res) => {
    var session = req.getSession();
    var prescriptionId = session.get("prescriptionId");
    var answeredQuestionIds = module.exports.getAnsweredQuestionIds(session);
    var unansweredQuestions = module.exports.fetchUnansweredQuestions(prescriptionId, answeredQuestionIds);
    if (unansweredQuestions.length > 0) {
      var questionToSend = unansweredQuestions[0];
      session.set('currentQuestionId', questionToSend.id);
      res.shouldEndSession(false);
      res.say(questionToSend.question);
    } else {
      res.shouldEndSession(true);
      res.say('Goodbye');
    }
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

var questions = [
  {
    question: "On a scale of 1 to 10, how is your anxiety",
    id: 1
  },
  {
    question: "On a scale of 1 to 10, how is your hunger",
    id: 2
  },
  {
    question: "On a scale of 1 to 10, how is your pain",
    id: 3
  }
]
