'use-strict';

module.exports = {
  name: 'PILLTAKEN',
  options: {
    slots: {
      PILL: "PILL"
    }
  },
  controller: (req, res) => {
    var additionalQuestion = getNextQuestion(req, res);
    var pillTaken = req.slot("pill");
    res.say(`Great! I recorded that you took ${pillTaken}. ${additionalQuestion}`);
  }
};

function getNextQuestion(req, res) {
  var session = req.getSession();
  session.set("question", "anxiety");
  res.shouldEndSession(false);
  return "On a scale of 1 to 10 how is strong your anxiety right now?";
};
