const ch = require("cheerio");
const codeforces_user = require("./PlatformApis/codeforces-api");
const leetcode_user = require("./PlatformApis/leetcode-api");

async function rqt(url, callback, selector, browser) {
  const page = await browser.newPage();
  try {
    await page.setRequestInterception(true);
    page.on("request", (request) => {
      if (request.resourceType() === "image") request.abort();
      else request.continue();
    });

    await page.goto(url);
    let selectorExists = await page.waitForSelector(selector);
    const html = await page.content();
    const $ = ch.load(html);
    return callback($);
  } catch (err) {
    console.log(err);
    return null;
  } finally {
    await page.close();
  }
}

async function fetch_details(cdchf, leet, cdf, browser) {
  let url_codechef = "https://www.codechef.com/users/";
  url_codechef += cdchf;
  let user_leet = new leetcode_user(leet);
  let user_codeforces = new codeforces_user(cdf);
  try {
    var result = {};
    result["codechef"] = [];
    [value3, value2, res] = await Promise.all([
      user_leet.get_numberof_questions(),
      rqt(
        url_codechef,
        ($) => {
          return $(".content")
            .children("h5")
            .map(function () {
              var num = $(this).text().toString().split("(")[1];
              num = num.slice(0, num.length - 1);
              result["codechef"].push(num);
            });
        },
        ".content",
        browser
      ),
      user_codeforces.get_number_of_problems(),
    ]);

    result["leetcode"] = value3.toString();

    result["codeforces"] = res.toString();
    return result;
  } catch (err) {
    console.log(err);
  }
}

module.exports = fetch_details;
