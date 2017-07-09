'use-strict';

module.exports = (app) => {
  return {
    name: 'ANSWERQUESTION',
    options: {
      slots: {
        ANSWER: "ANSWERVALUE"
      },
    },
    controller: (req, res) => {
      var answer = request.slot("ANSWER");
      if (request.getSession().get("question") == "anxiety") {
        res.say(`Great! I recorded your answer of ${answer}`);
      } else {
        res.say(`uh oh, I didnt save the session.`);
      }
    }
  };
};
