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

async function rqt(url,callback,selector){
    try{
       
       const browser = await puppet.launch({
        headless: true,
        args: ['--no-sandbox','--disable-setuid-sandbox']
      });
       const page = await browser.newPage();
       await page.setRequestInterception(true)
       page.on('request', (request) => {
       if (request.resourceType() === 'image') request.abort()
       else request.continue()
         })
       
       await page.goto(url)
      let selectorExists = await page.waitForSelector(selector)
       const html = await page.content();
       const $ = ch.load(html);
       await browser.close();
       return callback($)
  
    }
    catch(err){
        console.log(err);
        await browser.close();
        return null;
    }
  
}


function check(value){
  return new Promise((resolve,reject)=>{
    if(value==3){
      resolve('');
    }
  })
}


async function fetch_details(url_codechef,url_leetcode,url_codeforces){

    try{
    var result = {};
    result['codechef'] = [];
    [value3,value2,value] = await Promise.all([
    rqt(url_leetcode,
    callback_leetcode,'.total-solved-count__2El1'),
    
    
   
    rqt(url_codechef,($)=>{
      return $('.content').children('h5').map(function() {
          var num = $(this).text().toString().split("(")[1];
          num = num.slice(0,num.length-1);
          result['codechef'].push(num);
        });
    },'.content'),
    
    rqt(url_codeforces,
    callback_codeforces,'._UserActivityFrame_counterValue')
  ]
    )
    result['leetcode'] = value3.toString()
    value = value.toString();
    result['codeforces'] = value.split(" ")[0];
  
    return result;
}
catch(err){
    console.log(err);
}
    
}


const callback_codeforces = ($)=>{
  return $('._UserActivityFrame_counterValue').text();
}

// const callback_codechef = 

const callback_leetcode = ($)=>{
  return $('.total-solved-count__2El1').text();
}

module.exports = fetch_details

// process.on('message',(msg)=>{
//   fetch_details(msg.url_codechef,msg.url_leetcode,msg.url_codeforces).then((details)=>{
//     process.send(details);
//   }
//   )
// })



