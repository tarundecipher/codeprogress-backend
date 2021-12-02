const request = require("request");
const crypto = require("crypto");

module.exports = class codeforces_user {
  random = Math.floor(100000 + Math.random() * 900000);
  apikey = "87b91e7c43ecc7b98e29757fe5c8cae52a7628f1";
  secret = "80df59654a3ef2e3f01d81390b8c25b000f01226";
  date = new Date();
  time = Math.floor(this.date.getTime() / 1000);
  url_problems = "https://codeforces.com/api/user.status?handle=";
  url_info = " https://codeforces.com/api/user.info?handles=";

  constructor(username) {
    this.username = username;
    this.url_problems += username;
    this.url_info += username;
  }

  get_problems() {
    let hash = `${this.random}/user.status?apiKey=${this.apikey}&handle=${this.username}&time=${this.time}#${this.secret}`;
    hash = crypto.createHash("sha512").update(hash).digest("hex");
    let url_end = `&apiKey=${this.apikey}&time=${this.time}&apiSig=${this.random}${hash}`;

    return new Promise((resolve, reject) => {
      request(this.url_problems + url_end, (err, res, body) => {
        body = JSON.parse(body);
        if (body.status == "FAILED") {
          reject(body);
          return;
        }
        body.result = body.result.filter((problem) => {
          if (problem.verdict == "OK") {
            return problem;
          }
        });

        let visited = {};
        let result = body.result.map((problem) => {
          if (visited[problem.problem.name] == undefined) {
            let obj = {
              name: problem.problem.name,
              level: problem.problem.index,
              rating: problem.problem.rating,
            };
            visited[problem.problem.name] = 1;
            return obj;
          }
        });

        result = result.filter((problem) => {
          if (problem != undefined) {
            return problem;
          }
        });

        resolve(result);
      });
    });
  }

  get_number_of_problems() {
    let hash = `${this.random}/user.status?apiKey=${this.apikey}&handle=${this.username}&time=${this.time}#${this.secret}`;
    hash = crypto.createHash("sha512").update(hash).digest("hex");
    let url_end = `&apiKey=${this.apikey}&time=${this.time}&apiSig=${this.random}${hash}`;

    return new Promise((resolve, reject) => {
      request(this.url_problems + url_end, (err, res, body) => {
        body = JSON.parse(body);
        if (body.status == "FAILED") {
          reject(body);
          return;
        }
        let result = body.result.filter((problem) => {
          if (problem.verdict == "OK") {
            return problem;
          }
        });

        result = result.map((problem) => {
          return problem.problem.name;
        });

        result = new Set(result);
        resolve(result.size);
      });
    });
  }

  get_user_ratings() {
    let hash = `${this.random}/user.info?apiKey=${this.apikey}&handles=${this.username}&time=${this.time}#${this.secret}`;
    hash = crypto.createHash("sha512").update(hash).digest("hex");
    let url_end = `&apiKey=${this.apikey}&time=${this.time}&apiSig=${this.random}${hash}`;
    return new Promise((resolve, reject) => {
      request(this.url_info + url_end, (err, res, body) => {
        body = JSON.parse(body);
        if (body.status == "FAILED") {
          reject(body);
          return;
        }
        resolve(body.result[0].rating);
      });
    });
  }
};
