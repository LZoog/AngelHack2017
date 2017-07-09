'use strict';

var app = require('../server');
var _ = require('lodash');

module.exports = {
  fire: () => {
    try {
      _.each(app.io.sockets.sockets, (socket, key) => {
        socket.emit('notify', {});
      });
    } catch(err) {}
  }
};
