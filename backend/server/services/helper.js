'use strict';

module.exports = {
  handleError: (err, res) => {
    var code = 500;
    if (err.code) code = err.code;
    if (code < 200 || code >= 600) code = 500;
    if (code >= 500) {
      if (process.env.NODE_ENV === 'production') {
        console.error(err);
      } else {
        console.error(err.message);
      }
      return res.say(`Sorry, ${err.message}`);
    }
    if (process.env.NODE_ENV !== 'production') {
      console.warn(err.message);
    }
    return res.say(`Sorry, ${err.message}`);
  }
};
