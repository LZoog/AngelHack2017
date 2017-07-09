'use strict';

var app = require('../server');
var _ = require('lodash');
var socket = require('./socket');

var m = app.models;

module.exports = {
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
