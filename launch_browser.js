const puppet = require("puppeteer");
module.exports = async function launch_browser() {
  let browser = await puppet.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
    ],
  });
  return browser;
};
