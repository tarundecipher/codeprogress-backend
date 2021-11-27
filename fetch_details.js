const ch = require("cheerio");
const codeforces_user = require("./codeforces-api");

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
  let url_leetcode = "https://leetcode.com/";
  let url_codeforces = "https://codeforces.com/profile/";
  let url_codechef = "https://www.codechef.com/users/";
  url_leetcode += leet;
  url_codeforces += cdf;
  url_codechef += cdchf;
  try {
    var result = {};
    result["codechef"] = [];
    [value3, value2] = await Promise.all([
      rqt(
        url_leetcode,
        callback_leetcode,
        ".total-solved-count__2El1",
        browser
      ),

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
    ]);
    if (value3 != null) {
      result["leetcode"] = value3.toString();
    } else {
      result["leetcode"] = "0";
    }
    const user = new codeforces_user(cdf);
    let res = await user.get_number_of_problems();

    result["codeforces"] = res;
    return result;
  } catch (err) {
    console.log(err);
  }
}

const callback_codeforces = ($) => {
  return $("._UserActivityFrame_counterValue").text();
};

const callback_leetcode = ($) => {
  return $(".total-solved-count__2El1").text();
};

module.exports = fetch_details;
