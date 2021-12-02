const { gql, request } = require("graphql-request");

module.exports = class leetcode_user {
  url = "https://leetcode.com/graphql";

  constructor(username) {
    this.username = username;
  }
  async get_numberof_questions() {
    let query = gql`
    {
      matchedUser(username: "${this.username}") {
        username
        submitStats: submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
        }
      }
    }
  `;
    let data = await request(this.url, query);
    return data.matchedUser.submitStats.acSubmissionNum[0].count;
    // return data;
  }

  async get_statistics() {
    let query = gql`
    {
      matchedUser(username: "${this.username}") {
        username
        submitStats: submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
        }
      }
    }
  `;
    let data = await request(this.url, query);
    return data.matchedUser.submitStats;
  }
};
