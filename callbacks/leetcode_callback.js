const leetcode_user = require("../PlatformApis/leetcode-api");

module.exports = (req, res) => {
  fetch_details(req.query.leet).then((result) => {
    res.send(result.acSubmissionNum);
  }).catch((err)=>{
    console.log(err);
    res.send([{"difficulty":"All","count":0,"submissions":0},
    {"difficulty":"Easy","count":0,"submissions":0},
    {"difficulty":"Medium","count":0,"submissions":0},
    {"difficulty":"Hard","count":0,"submissions":0}])
  });
};

async function fetch_details(leet) {
  let user = new leetcode_user(leet);
  return await user.get_statistics();
}
