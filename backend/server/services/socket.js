'use strict';

var app = require('../server');
var _ = require('lodash');

module.exports = {
  fire: () => {
    _.each(app.io.sockets.sockets, (socket, key) => {
      socket.emit('notify', {});
    });
  }
};
