'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var fs = require('fs');
var _ = require('lodash');
var path = require('path');

var file = '';
_.each(fs.readFileSync(path.resolve(__dirname, './_datasources.json')).toString().split('\n'), (line) => {
  var matches = line.match(/\$\{[^${}]+(?=\})/g);
  if (matches && matches.length > 0) {
    var env = matches[0].replace(/^\$\{/, '');
    env = env.split(':');
    if (env.length > 1) {
      line = line.replace(`\$\{${env[0]}:${env[1]}\}`, process.env[env[0]] || env[1]);
    } else {
      line = line.replace(`\$\{${env[0]}\}`, process.env[env[0]] || '');
    }
  }
  file += `${line}\n`;
});
fs.writeFileSync(path.resolve(__dirname, './datasources.json'), file);

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module) {
    app.io = require('socket.io')(app.start());
    app.io.on('connection', (socket) => {
      console.log('client connected');
    });
    app.io.on('disconnect', () => {
      console.log('client disconnected');
    });
  }
});
