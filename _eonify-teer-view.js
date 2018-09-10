
// node _eonify-teer-view eonpattern

const fs = require('fs')
const path = require('path')
const http = require('http')

const puppeteer = require('puppeteer')

let args = process.argv
let [cmd, scp, ...opts] = args

let dirname = path.dirname(require.main.filename)

const waitInPromise = delay => arg =>
  Number.isFinite(delay) && delay > 0
    ? new Promise(resolve => setTimeout(() => resolve(arg), delay))
    : Promise.resolve(arg)

const viewPort = { width: 900, height: 600 }

let htmlpattern = new RegExp('^(eon.*)\.html$', 'i')
const isDirectory = d => fs.lstatSync(d).isDirectory()
const isFile = d => fs.lstatSync(d).isFile()
let indir = './'

let view = opts[0] || '.*'
let thiseonpattern = new RegExp(`^eon-z-${view}.*\.html$`, 'i')

let closebrowser = 0
let tracing = 0
let tracingpath = './___trace.json'

let files = fs.readdirSync(indir)
  .filter(file => isFile(file))
  .filter(d => thiseonpattern.test(d))

let indirpath = (__dirname + '/').replace(/\\/g, '/') // z-indexes

const options = {
  fullPage: false,
  clip: {
    x: 0,
    y: 0,
    width: 600,
    height: 400,
  },
}

async function lightanimas (browser, fls, opts) {
  const variations = fls

  async function lightNext (current) {
    if (current >= variations.length) {
      return
    }

    let infileName = files[current]
    let inpathname = `${indirpath}${infileName}`

    console.log(`ani:  ${current}, ${infileName}`)

    let regex2 = new RegExp('^((eon-z)-(.*)-(.*))\.(html)', 'i')
    let parts = infileName.match(regex2)
    let fullname = parts[0]
    let rootname = parts[1]
    let code = parts[2]
    let name = parts[3]
    let type = parts[4]

    let delay = 3000

    const page = await browser.newPage()
    page.setViewport({
      width: 600,
      height: 400,
    }) // Viewport

    if (tracing) {
      await page.tracing.start({
        path: tracingpath,
        screenshots: true,
      })
    }

    await page.goto(`file:///${inpathname}`, {
      waitUntil: 'domcontentloaded',
    })
    await page.waitForSelector('#viewframe')
    await waitInPromise(delay)(page.content())
    
    page.on('pageerror', function (err) {
      let theTempValue = err.toString()
      console.log('Page error: ' + theTempValue)
    })
    page.on('error', function (err) {
      let theTempValue = err.toString()
      console.log('Error: ' + theTempValue)
    })
    page.on('console', msg => {
      for (let i = 0; i < msg.args.length; ++i) { console.log(`${i}: ${msg.args[i]}`) }
    })
    await page.evaluate(() => console.log(`url is ${location.href}`))

    let opts = Object.assign({}, options)

    if (tracing) await page.tracing.stop()

    await lightNext(current + 1)
  }

  return lightNext(0)
}

async function run (fls, opts) {
  const winwidth = 1200
  const winheight = 900


  
  const browser = await puppeteer.launch({
    headless: false,
    devtools: true, // open DevTools when window launches
    args: ['--remote-debugging-port=9222',
      `--window-size=${winwidth},${winheight}`, // Window size
      // '--show-fps-counter',
      '--trace-to-console',
    ],
  })

  await browser.pages()

  await lightanimas(browser, fls, opts)

  if (closebrowser) await browser.close()
}

run(files, options)
