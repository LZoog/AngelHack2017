'use strict';

var app = require('../server');
var _ = require('lodash');

var m = app.models;

module.exports = {
  getId: (prescriptionName) => {
    return m.Prescription.findOne({
      where: {
        name: prescriptionName
      }
    }).then((prescription) => {
      return prescription.id;
    });
  },
  takePill: (prescriptionName) => {
    return m.Prescription.findOne({
      where: {
        name: prescriptionName
      }
    }).then((prescription) => {
      if (!prescription) return {};
      var datesTaken = prescription.datesTaken || [];
      datesTaken.push(new Date());
      return prescription.updateAttributes({
        datesTaken: datesTaken
      });
    });
  }
};
