const launch_browser = require("../launch_browser");
const fetch_details = require("../fetch_details");

let browser = null;
launch_browser().then((brw) => {
  browser = brw;
});

module.exports = (req, res) => {
  fetch_details(req.query.cdchf, req.query.leet, req.query.cdf, browser).then(
    (details) => {
      res.send(details);
    }
  );
};
