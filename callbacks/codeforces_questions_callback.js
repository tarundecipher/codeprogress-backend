const codeforces_user = require("../PlatformApis/codeforces-api");

module.exports = (req, res) => {
  let cdf = req.query.cdf;
  fetch_data(cdf)
    .then((result) => {
      res.send({ problems: result });
    })
    .catch((err) => {
      res.send({problems:0})
      console.log(err);
    });
};

async function fetch_data(cdf) {
  let user_codeforces = new codeforces_user(cdf);
  let result = await user_codeforces.get_number_of_problems();
  return result;
}
