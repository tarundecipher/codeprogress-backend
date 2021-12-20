const leetcode_user = require("../PlatformApis/leetcode-api");

module.exports = (req, res) => {
  fetch_details(req.query.leet).then((result) => {
    res.send({ result });
  }).catch((err)=>{
    res.send({"result":[{"title":"Longest Substring Without Repeating Characters","titleSlug":"longest-substring-without-repeating-characters","timestamp":"1639904726","statusDisplay":"Accepted","lang":"cpp","__typename":"SubmissionDumpNode"}]})
    console.log(err)
  });
};

async function fetch_details(leet) {
  let user = new leetcode_user(leet);
  let result = await user.get_submissions();
  return result;
}
