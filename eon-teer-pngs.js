const fs = require('fs')
const path = require('path')
const http = require('http')

const puppeteer = require('puppeteer')

let dirname = path.dirname(require.main.filename)

  const waitInPromise = delay => arg =>
    Number.isFinite(delay) && delay > 0
      ? new Promise(resolve => setTimeout(() => resolve(arg), delay))
      : Promise.resolve(arg);


  const viewPort = { width: 900, height: 600 }
       

  let htmlpattern = new RegExp('^(eon.*)\.html$', 'i')
  const isDirectory = d => fs.lstatSync(d).isDirectory()
  const isFile = d => fs.lstatSync(d).isFile()    
  let indir = './'
  let files = fs.readdirSync(indir)
    .filter(file => isFile(file))
    .filter(d => htmlpattern.test(d))


let indirpath = (__dirname + '/').replace(/\\/g,"/")  // z-indexes
let infilename = 'eon-z-722e-fractals10.html'
let inpathname = `${indirpath}${infilename}`

let outdirpath = (__dirname + '/images/').replace(/\\/g,"/")  // images
let outfilename = 'eon-z-722e-fractals10.png'
let outpathname = `${outdirpath}${outfilename}`
let outext = '.png'

const options = {
  path: `${outpathname}`,
  fullPage: false,
  clip: {
    x: 0,
    y: 0,
    width: 600,
    height: 400
  }
}

async function takeScreenshot(page, opts) {
  await page.screenshot(opts);
}


async function takeManyScreenshots(browser, fls, inpage, opts) {

  const variations = fls
  console.log('takeManyScreenshots ')

  async function takeNext(current) {
  
      if (current >= variations.length) {
        return
      }

      console.log('takeManyScreenshots ', current)
      let fileName = files[current]
      let regex2 = new RegExp('^((eon-z)-(.*)-(.*))\.(html)', 'i')
      let parts = fileName.match(regex2)
      let fullname = parts[0]
      let rootname = parts[1]
      let code = parts[2]
      let name = parts[3]
      let type = parts[4]

      let inpathname = `${indirpath}${fileName}`
      let outpathname = `${outdirpath}${rootname}${outext}`

      const page = await browser.newPage()
      await page.goto(`file:///${inpathname}`, {waitUntil: 'domcontentloaded'} )      
      await page.waitForSelector('#viewframe')      
      await waitInPromise(5000)(page.content())

      let opts = Object.assign({}, options, {path: outpathname})

      console.log('screenshot: ', inpathname, outpathname)

      await takeScreenshot(page, opts)
      await takeNext(current + 1)
  }

  return takeNext(0)
}


async function run(fls, inpage, opts) {
  
  const browser = await puppeteer.launch({ headless: true })
  console.log('run ')
  await takeManyScreenshots(browser, fls, inpage, opts)

  await browser.close()

}



run(files, inpathname, options)


// for (let i = 0; i < files.length; i++) {
//   let fileName = files[i]

//   let regex2 = new RegExp('^((eon-z)-(.*)-(.*))\.(html)', 'i')
//   let parts = fileName.match(regex2)

//   let fullname = parts[0]
//   let rootname = parts[1]
//   let code = parts[2]
//   let name = parts[3]
//   let type = parts[4]


//   let inpathname = `${indirpath}${fileName}`
//   let outpathname = `${outdirpath}${rootname}${outext}`
//   options.path = outpathname
//   run(inpathname, options)
// }
