const express = require('express');
const os = require('os');
const fetch_details = require('./fetch_details')
const mcache = require('memory-cache');
const cluster = require('cluster');
const redis = require('redis');

const cpu = 4

const app = express();
const port = process.env.PORT||3000
const redis_port = 6379

const client = redis.createClient(6379,"redis");

const url_leetcode = 'https://leetcode.com/';
const url_codeforces = 'https://codeforces.com/profile/';
const url_codechef = 'https://www.codechef.com/users/';


app.use(function (req, res, next) {
    let key = '__express__'+req.query.cdchf+
    req.query.cdf+req.query.leet;
    client.get(key,(err,data)=>{
        if(err){
            console.log(err);
            next()
        }
        if(data!=null){
            res.send(JSON.parse(data));
        }
        else{
            res.sendResponse = res.send
            res.send = (body) =>{
               
                client.setex(key,600,JSON.stringify(body));
                res.sendResponse(body)
            }
            next()
        }
    })
    
  })

app.get('/', (req, res) => {
    let cdchf = req.query.cdchf;
    let cdf = req.query.cdf;
    let leet = req.query.leet;
    fetch_details(url_codechef+cdchf,url_leetcode+leet,url_codeforces+cdf).then((details)=>{
        res.send(details);

    })

})



    app.listen(port, () => {
        console.log(`app listening at ${process.pid} http://localhost:${port}`)
    })
