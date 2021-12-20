const express = require("express");
const codeforces_callback = require("./callbacks/codeforces_callback");
const codechef_questions_callback = require("./callbacks/codechef_callback");
const cache_middleware = require("./middleware/redis_cache");
const getall_platforms_callback = require("./callbacks/getall_platforms");
const codeforces_questions_callback = require("./callbacks/codeforces_questions_callback");
const leetcode_questions_callback = require("./callbacks/leetcode_questions_callback");
const leetcode_callback = require("./callbacks/leetcode_callback");
const codeforces_rating_callback = require("./callbacks/codeforces_rating_callback"); 
const update_callback = require('./callbacks/update_callbacks')
const codeforces_submissions_callback = require('./callbacks/codeforces_submissions_callback');
const leetcode_submissions_callback = require('./callbacks/leetcode_submissions_callback');

const app = express();
const port = process.env.PORT || 3000;

app.use(cache_middleware);

app.get("/", getall_platforms_callback);

app.get("/api/codeforces/questions", codeforces_questions_callback);
app.get("/api/leetcode/questions", leetcode_questions_callback);
app.get("/api/codechef/questions", codechef_questions_callback);

app.get("/api/codeforces/statistics", codeforces_callback);
app.get("/api/leetcode/statistics", leetcode_callback);

app.get("/api/codeforces/rating", codeforces_rating_callback);
app.get("/api/update",update_callback);

app.get('/api/codeforces/submissions',codeforces_submissions_callback);
app.get('/api/leetcode/submissions',leetcode_submissions_callback);

app.listen(port, "0.0.0.0", () => {
  console.log(`app listening at  http://localhost:${port}`);
});
