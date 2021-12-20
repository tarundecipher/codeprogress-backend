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

  async get_submissions(){
    let query = gql`
    {
    
        recentSubmissionList(username: "${this.username}", limit: 100) {
          title
          titleSlug
          timestamp
          statusDisplay
          lang
          __typename
        }
        languageList {
          id
          name
          verboseName
          __typename
        }
      }
  `;
    let data = await request(this.url, query);
    return data.recentSubmissionList;
  }
};
