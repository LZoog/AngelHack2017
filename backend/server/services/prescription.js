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
    });
  }
};
