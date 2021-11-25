const ch = require("cheerio");

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

async function fetch_details(
  url_codechef,
  url_leetcode,
  url_codeforces,
  browser
) {
  try {
    var result = {};
    result["codechef"] = [];
    [value3, value2, value] = await Promise.all([
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

      rqt(
        url_codeforces,
        callback_codeforces,
        "._UserActivityFrame_counterValue",
        browser
      ),
    ]);
    if (value3 != null) {
      result["leetcode"] = value3.toString();
    } else {
      result["leetcode"] = "0";
    }
    if (value != null) {
      value = value.toString();
      result["codeforces"] = value.split(" ")[0];
    } else {
      result["codeforces"] = "0";
    }

    return result;
  } catch (err) {
    console.log(err);
  }
}

const callback_codeforces = ($) => {
  return $("._UserActivityFrame_counterValue").text();
};

// const callback_codechef =

const callback_leetcode = ($) => {
  return $(".total-solved-count__2El1").text();
};

module.exports = fetch_details;
