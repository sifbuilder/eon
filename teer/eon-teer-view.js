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
const existsFile = d => fs.existsSync(d)

// fs

let filename = __filename // full path name of the current module
let prgname = path.basename(filename) // file name of current module
let dirname = path.dirname(require.main.filename) // __dirname
let cwdir = process.cwd() // directory of invocation
let prgdir = __dirname // directory of calling js

// args

let args = process.argv
let [cmd, scp, ...opts] = args

let action = 'help' // {[help] pattern}
let qualiprefix = 'eon-z'
let inScopePattern = new RegExp(`^eon-z___none___.*\.html$`, 'i') // none pattern

if (opts.length === 0) {
  action = 'help'
} else if (opts.length >= 1) {
  let codepattern = '.*' // default to all
  if (opts[0] === '.') {
    codepattern = '.*'
  } else {
    codepattern = opts[0]
  }
  inScopePattern = new RegExp(`^${qualiprefix}${codepattern}.*\.html$`, 'i') // actView pattern

  if (opts.length >= 2 && opts[1] === 'doit') {
    action = 'doit'
  } else {
    action = 'debug'
  }
}

// state

let state = {
  action,
  qualiprefix,
  inScopePattern,
  prgname,
}
let options = {
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

state.indir = './'
state.indirpath = (cwdir + '/').replace(/\\/g, '/') // z-indexes
state.closebrowser = 0
state.tracing = 0
state.tracingpath = './___trace.json'

let files = fs
  .readdirSync(state.indir) // to actView
  .filter(file => isFile(file))
  .filter(d => inScopePattern.test(d))
state.files = files

// .................. actUponItems
async function actUponItems (browser, data) {
  let {state, options} = data
  let {files, indirpath, tracing } = state
  let {viewPort, timeout, pageSelector, delay } = options

  async function actUponNext (current) { // n+1
    if (current >= files.length) return

    let infileName = files[current]

    let inpathname = path.resolve(indirpath, infileName)
    console.assert(existsFile(inpathname), `file ${inpathname} does not exist`)
    if (state.action === 'debug') console.log(`doing:  ${inpathname}`)

    let regex2 = new RegExp('^((eon-z)(.*)-(.*)).(html)', 'i')
    let parts = infileName.match(regex2)
    let fullname = parts[0]
    let rootname = parts[1]
    let code = parts[2]
    let name = parts[3]
    let type = parts[4]

    const page = await browser.newPage()
    page.setViewport(viewPort) // viewport

    if (tracing) {
      await page.tracing.start({
        path: tracingpath,
        screenshots: true,
      })
    }

    await page.goto(`file:///${inpathname}`, {
      waitUntil: 'domcontentloaded',
      timeout: timeout, // timeout
    })
    await page.waitForSelector(pageSelector)
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
      for (let i = 0; i < msg.args.length; ++i) {
        console.log(`${i}: ${msg.args[i]}`)
      }
    })
    await page.evaluate(() => console.log(`url is ${location.href}`))

    if (tracing) await page.tracing.stop()

    await actUponNext(current + 1)
  }

  return actUponNext(0) // 0
}

// .................. doit
async function doit (data) {
  let { state, options } = data
  console.log(`will do: ${state.files}`)

  const browser = await puppeteer.launch({
    headless: options.headless,
    devtools: options.devtools, // open DevTools when window launches
    args: [
      `--remote-debugging-port=${options.debuggingPort}`,
      `--window-size=${options.window.width},${options.window.height}`, // Window size
    ],
  })

  await browser.pages()
  await actUponItems(browser, data) // actUponItems
  if (state.closebrowser) await browser.close()
}
// .................. help
function help (data) {
  let { state, options } = data
  console.log(`node ${state.prgname} inScopePattern {debug | doit}}`)
  console.log(`   inScopePattern applies to eon-z files`)
  console.log(`call puppeteer and show html eon`)
  console.log(`eg.: node ${state.prgname} 793`)
  console.log(`eg.: node ${state.prgname} 793d`)
}
// .................. debug
function debug (data) {
  let { state, options } = data
  console.log(state)
  console.log(options)
  console.log(`will do: ${state.files}`)
}

if (state.action === 'help') {
  help({state, options})
} else if (state.action === 'doit') {
  doit({state, options})
} else if (state.action === 'debug') {
  debug({state, options})
}
