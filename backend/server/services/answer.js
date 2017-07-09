'use strict';

var app = require('../server');
var _ = require('lodash');

var m = app.models;

module.exports = {
  create(prescriptionName, questionName, dateAnswered, value) {
    return m.Prescription.findOne({
      where: {
        name: prescriptionName
      }
    }).then((prescription) => {
      if (!prescription) return {};
      return m.Question.findOne({
        where: {
          prescription: prescription.id,
          name: questionName
        }
      }).then((question) => {
        if (!question) return {};
        return question.answers.create({
          dateAnswered: dateAnswered,
          value: value
        });
      });
    });
  }
};
