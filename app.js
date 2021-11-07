const express = require('express');
const {fork} = require('child_process');
const forked = fork('fetch_details.js');

3
const app = express();
const port = process.env.PORT||3000

const url_leetcode = 'https://leetcode.com/';
const url_codeforces = 'https://codeforces.com/profile/';
const url_codechef = 'https://www.codechef.com/users/';



app.get('/', (req, res) => {
    let cdchf = req.query.cdchf;
    let cdf = req.query.cdf;
    let leet = req.query.leet
    forked.send({url_codechef:url_codechef+cdchf,url_leetcode:url_leetcode+leet,url_codeforces:url_codeforces+cdf});
    forked.on('message',(msg)=>{
        console.log(msg);
        res.send(msg);
    })

})
  
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})