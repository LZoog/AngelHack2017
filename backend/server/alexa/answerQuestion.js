'use-strict';

module.exports = {
  name: 'TAKENPILL',
  options: {
    slots: {
      ANSWER: "ANSWERVALUE"
    },
  },
  controller: (req, res) => {
    var answer = parseInt(request.slot("ANSWER"));
    if (request.getSession().get("question") == "anxiety") {
      res.say(`Great! I recorded that. ${additionalQuestion}`);
    } else {
      res.say(`uh oh, I didnt save the session.`);
    }
  }
};
