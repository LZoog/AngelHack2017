'use strict';

module.exports = (app) => {
  app.get('/alexa', (req, res) => {
    res.json({hello: 'world'});
  });
};
