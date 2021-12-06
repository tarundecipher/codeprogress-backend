const leetcode_user = require("../PlatformApis/leetcode-api");

module.exports = (req, res) => {
  fetch_details(req.query.leet).then((result) => {
    res.send({ problems: result });
  }).catch((err)=>{
    res.send({problems:0})
    console.log(err)
  });
};

async function fetch_details(leet) {
  let user = new leetcode_user(leet);
  let result = await user.get_numberof_questions();
  return result;
}
