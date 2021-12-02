const redis = require("redis");

const redis_port = 6379;

const client = redis.createClient(redis_port, "redis");

module.exports = function (req, res, next) {
  let key = "__express__" + req.originalUrl;
  client.get(key, (err, data) => {
    if (err) {
      console.log(err);
      next();
    }
    if (data != null) {
      res.send(JSON.parse(data));
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        client.setex(key, 120, JSON.stringify(body));
        res.sendResponse(body);
      };
      next();
    }
  });
};
