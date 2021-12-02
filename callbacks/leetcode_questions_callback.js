const leetcode_user = require("../PlatformApis/leetcode-api");

module.exports = (req, res) => {
  fetch_details(req.query.leet).then((result) => {
    res.send({ problems: result });
  });
};

async function fetch_details(leet) {
  let user = new leetcode_user(leet);
  let result = await user.get_numberof_questions();
  return result;
}
