const puppet = require('puppeteer')
const ch = require('cheerio');




const waitTillHTMLRendered = async (page, timeout = 30000) => {
    const checkDurationMsecs = 1000;
    const maxChecks = timeout / checkDurationMsecs;
    let lastHTMLSize = 0;
    let checkCounts = 1;
    let countStableSizeIterations = 0;
    const minStableSizeIterations = 3;
  
    while(checkCounts++ <= maxChecks){
      let html = await page.content();
      let currentHTMLSize = html.length; 
  
      if(lastHTMLSize != 0 && currentHTMLSize == lastHTMLSize) 
        countStableSizeIterations++;
      else 
        countStableSizeIterations = 0; //reset the counter
  
      if(countStableSizeIterations >= minStableSizeIterations) {
        break;
      }
  
      lastHTMLSize = currentHTMLSize;
      await page.waitFor(checkDurationMsecs);
    }  
  };

async function rqt(url,callback){
    try{
       
       const browser = await puppet.launch({ args: ['--no-sandbox'] });
       const page = await browser.newPage();
       
       await page.goto(url)
       await waitTillHTMLRendered(page)
       const html = await page.content();
       const $ = ch.load(html);
       browser.close();
    //    return $(query).text();
       return callback($)
    }
    catch(err){
        console.log(err);
        return null;
    }
}

async function fetch_details(url_codechef,url_leetcode,url_codeforces){

    try{
    var result = {};

    var value3 = await rqt(url_leetcode,
    ($)=>{
        return $('.total-solved-count__2El1').text();
    });
    result['leetcode'] = value3.toString()
    
    result['codechef'] = [];
    await rqt(url_codechef,($)=>{
        return $('.content').children('h5').map(function() {
            var num = $(this).text().toString().split("(")[1];
            num = num.slice(0,num.length-1);
            result['codechef'].push(num);
          });
    });
    
    var value = await rqt(url_codeforces,
    ($)=>{
        return $('._UserActivityFrame_counterValue').text();
    })
    value = value.toString();
    result['codeforces'] = value.split(" ")[0];
    
    return result;
}
catch(err){
    console.log(err);
}
    
}

process.on('message',(msg)=>{
  fetch_details(msg.url_codechef,msg.url_leetcode,msg.url_codeforces).then((details)=>{
    process.send(details);
  }
  )
})



