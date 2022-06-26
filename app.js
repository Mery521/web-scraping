const puppeteer = require('puppeteer');

const inputData= [ 
    { website: 'https://www.vgmusic.com/music/console/nintendo/nes' },
    { website: 'https://www.vgmusic.com/music/console/nintendo/nes' }
];
const output = [];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const websites = inputData[inputData.length - 1];
  await page.goto(websites?.website);
  const links = await page.$$eval('a', elements => elements.filter(elem => {
    const parensRegex = /^((?!\().)*$/;
    return elem.href.includes('.mid') && parensRegex.test(elem.textContent);
  }).map(element => element.href));

    output.push({_website: websites?.website, _link: links, statusCode: [200]});
    console.log(output);
  await browser.close();
})();