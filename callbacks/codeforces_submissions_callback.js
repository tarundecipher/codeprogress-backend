const codeforces_user = require("../PlatformApis/codeforces-api");

module.exports = (req, res) => {
  const user = new codeforces_user(req.query.cdf);
  user
    .get_submissions()
    .then((result) => {
      res.send({result});
    })
    .catch((err) => {
      console.log(err);
    });
};
