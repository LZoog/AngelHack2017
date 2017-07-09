'use strict';

var app = require('../server');
var _ = require('lodash');

var m = app.models;

module.exports = {
  getId: (prescriptionId, questionName) => {
    return m.Question.findOne({
      where: {
        prescription: prescriptionId,
        name: questionName
      }
    }).then((question) => {
      return question.id;
    });
  },

  getAll: (prescriptionId) => {
    return m.Question.find({
      where: {
        id: prescriptionId
      }
    });
  }
};
