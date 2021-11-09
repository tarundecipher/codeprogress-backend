const express = require('express');
const {fork} = require('child_process');
const forked = fork('fetch_details.js');
const fetch_details = require('./fetch_details')


const app = express();
const port = process.env.PORT||3000

const url_leetcode = 'https://leetcode.com/';
const url_codeforces = 'https://codeforces.com/profile/';
const url_codechef = 'https://www.codechef.com/users/';

app.use(function (req, res, next) {
    res.set('Cache-control', 'public, max-age=300')
  })

app.get('/', (req, res) => {
    let cdchf = req.query.cdchf;
    let cdf = req.query.cdf;
    let leet = req.query.leet
    fetch_details(url_codechef+cdchf,url_leetcode+leet,url_codeforces+cdf).then((details)=>{
        res.send(details)
    })
    // forked.send({url_codechef:url_codechef+cdchf,url_leetcode:url_leetcode+leet,url_codeforces:url_codeforces+cdf});
    // forked.on('message',(msg)=>{
    //     console.log(msg);
    //     res.send(msg);
    // })


})
  
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})
