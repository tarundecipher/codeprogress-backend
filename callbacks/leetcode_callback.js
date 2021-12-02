const leetcode_user = require("../PlatformApis/leetcode-api");

module.exports = (req, res) => {
  fetch_details(req.query.leet).then((result) => {
    res.send(result.acSubmissionNum);
  });
};

async function fetch_details(leet) {
  let user = new leetcode_user(leet);
  return await user.get_statistics();
}
