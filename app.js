const express = require("express");
const codeforces_callback = require("./callbacks/codeforces_callback");
// const cache_middleware = require("./middleware/redis_cache");
const getall_platforms_callback = require("./callbacks/getall_platforms");

const app = express();
const port = process.env.PORT || 3000;

// app.use(cache_middleware);

app.get("/", getall_platforms_callback);

app.get("/api/codeforces/questions", codeforces_callback);

app.listen(port, () => {
  console.log(`app listening at  http://localhost:${port}`);
});
