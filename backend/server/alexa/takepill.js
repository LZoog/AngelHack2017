'use-strict';

module.exports = {
  name: 'TAKENPILL',
  options: {
    slots: {}
  },
  controller: (req, res) => {
    var additionalQuestion = getNextQuestion(req, res);
    res.say(`Great! I recorded that. ${additionalQuestion}`);
  }
};

function getNextQuestion(req, res) = {
  var session = request.getSession();
  session.set("question", "anxiety");
  response.shouldEndSession(false);
  return "On a scale of 1 to 10 how is strong your anxiety right now?";
}
