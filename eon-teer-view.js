
// node <program> actuponpattern

const fs = require('fs')
const path = require('path')
const http = require('http')

const puppeteer = require('puppeteer')

const waitInPromise = delay => arg =>
  Number.isFinite(delay) && delay > 0
    ? new Promise(resolve => setTimeout(() => resolve(arg), delay))
    : Promise.resolve(arg)

const isDirectory = d => fs.lstatSync(d).isDirectory()
const isFile = d => fs.lstatSync(d).isFile()

// fs

let filename = __filename // full path name of the current module
let prgname = path.basename(filename) // file name of current module
let dirname = path.dirname(require.main.filename) // __dirname

// args

let args = process.argv
let [cmd, scp, ...opts] = args

let action = 'help' // {[help] pattern}
let inscopepattern = new RegExp(`^eon-z-___none___.*\.html$`, 'i') // none pattern

if (opts.length === 0) { // action: help
  action = 'help'
} else if (opts.length === 1 && opts[0] !== 'help') { // action:actView
  action = 'actView'
  let codepattern = '.*' // default to all
  if (opts[0] === '.') {
    codepattern = '.*'
  } else {
    codepattern = opts[0]
  }
  inscopepattern = new RegExp(`^eon-z-${codepattern}.*\.html$`, 'i') // actView pattern
}

const options = {
  headless: false, // puppeteer.launch
  devtools: false, // puppeteer.launch
  debuggingPort: 9222, // puppeteer.launch
  window: { // puppeteer.launch
    width: 1200,
    height: 900,
  },
  fullPage: false,
  clip: {
    x: 0,
    y: 0,
    width: 600,
    height: 400,
  },
  viewPort: { // page.setViewport
    width: 600,
    height: 400,
  },
  delay: 3000, // waitInPromise
  timeout: 50000, // page.goto
  pageSelector: '#viewframe', // page.waitForSelector
}

let indir = './'
let indirpath = (dirname + '/').replace(/\\/g, '/') // z-indexes
let closebrowser = 0
let tracing = 0
let tracingpath = './___trace.json'

let files = fs.readdirSync(indir) // to actView
  .filter(file => isFile(file))
  .filter(d => inscopepattern.test(d))

// .................. actUponItems
async function actUponItems (browser, fls, opts) {
  async function actUponNext (current) { // n+1
    if (current >= fls.length) { return }

    let infileName = fls[current]
    let inpathname = `${indirpath}${infileName}`
    console.log(`ani:  ${current}, ${infileName}`)

    // ------
    let regex2 = new RegExp('^((eon-z)-(.*)-(.*))\.(html)', 'i')
    let parts = infileName.match(regex2)
    let fullname = parts[0]
    let rootname = parts[1]
    let code = parts[2]
    let name = parts[3]
    let type = parts[4]
    // ------

    const page = await browser.newPage()
    page.setViewport(opts.viewPort) // viewport

    if (tracing) {
      await page.tracing.start({
        path: tracingpath,
        screenshots: true,
      })
    }

    await page.goto(`file:///${inpathname}`, {
      waitUntil: 'domcontentloaded',
      timeout: opts.timeout, // timeout
    })
    await page.waitForSelector(opts.pageSelector)
    await waitInPromise(opts.delay)(page.content())

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

    if (tracing) await page.tracing.stop()
    // ------

    await actUponNext(current + 1)
  }

  return actUponNext(0) // 0
}

// .................. actView
async function actView (fls, opts) {
  const browser = await puppeteer.launch({
    headless: opts.headless,
    devtools: opts.devtools, // open DevTools when window launches
    args: [`--remote-debugging-port=${opts.debuggingPort}`,
      `--window-size=${opts.window.width},${opts.window.height}`, // Window size
      '--trace-to-console',
    ],
  })

  await browser.pages()
  await actUponItems(browser, fls, opts) // actUponItems
  if (closebrowser) await browser.close()
}

if (action === 'help') {
  console.log(`node ${prgname} {[help], actPattern} on eon-z- files`)
} else if (action === 'actView') {
  console.log(`actView ${inscopepattern} eon files`)
  actView(files, options)
} else {
  console.log(`node ${prgname} {[help], actPattern} on eon-z- files`)
}
