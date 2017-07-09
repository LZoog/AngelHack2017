'use strict';

var app = require('../server');
var _ = require('lodash');
var Err = require('err');
var socket = require('./socket');

var m = app.models;

module.exports = {
  getId: (prescriptionName) => {
    return m.Prescription.findOne({
      where: {
        name: { like: new RegExp(`.*${prescriptionName}.*`, 'i') }
      }
    }).then((prescription) => {
      if (!prescription) throw new Err(`${prescriptionName} is not a valid prescription.`, 404);
      return prescription.id;
    });
  },

  takePill: (prescriptionId) => {
    return m.Prescription.findOne({
      where: {
        id: prescriptionId
      }
    }).then((prescription) => {
      if (!prescription) return {};
      var datesTaken = prescription.datesTaken || [];
      datesTaken.push(new Date());
      return prescription.updateAttributes({
        datesTaken: datesTaken
      });
    }).then((prescription) => {
      socket.fire();
      return prescription;
    });
  }
};
