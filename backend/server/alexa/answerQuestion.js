'use-strict';

module.exports = {
  name: 'ANSWERQUESTION',
  options: {
    slots: {
      ANSWER: "ANSWERVALUE"
    },
  },
  controller: (req, res) => {
    var answer = req.slot("ANSWER");
    if (req.getSession().get("question") == "anxiety") {
      res.say(`Great! I recorded your answer of ${answer}`);
    } else {
      res.say(`uh oh, I didnt save the session.`);
    }
  }
};
