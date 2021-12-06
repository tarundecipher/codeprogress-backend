const codechef_user = require("../PlatformApis/codechef-api");
const launch_browser = require("../launch_browser");

let browser = null;
launch_browser().then((brw) => {
  browser = brw;
});

module.exports = (req, res) => {
  fetch_details(req.query.cdchf).then((result) => {
    res.send({ problems: result });
  }).catch((err)=>{
    res.send({problems:0})
    console.log(err);
  });
};

async function fetch_details(cdchf) {
  const user = new codechef_user(cdchf);
  let result = user.get_numberof_questions(browser);
  return result;
}
