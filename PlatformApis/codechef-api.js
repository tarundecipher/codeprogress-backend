const ch = require("cheerio");

module.exports = class codechef_user {
  constructor(cdchf) {
    this.cdchf = cdchf;
  }

  async rqt(url, callback, selector, browser) {
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

  async get_numberof_questions(browser) {
    let url_codechef = "https://www.codechef.com/users/";
    url_codechef += this.cdchf;
    try {
      let result = 0;

      await this.rqt(
        url_codechef,
        ($) => {
          return $(".content")
            .children("h5")
            .map(function () {
              var num = $(this).text().toString().split("(")[1];
              num = num.slice(0, num.length - 1);
              result += parseInt(num);
            });
        },
        ".content",
        browser
      );

      return result;
    } catch (err) {
      console.log(err);
    }
  }
};
