const fs = require('fs')
const path = require('path')
const http = require('http')
const puppeteer = require('puppeteer')

const waitInPromise = delay => arg =>
  Number.isFinite(delay) && delay > 0
    ? new Promise(resolve => setTimeout(() => resolve(arg), delay))
    : Promise.resolve(arg)

const includes = (a, b) => a.includes(b) // is element b in array a

// fs

const isDirectory = d => fs.lstatSync(d).isDirectory()
const isFile = d => fs.lstatSync(d).isFile()
const existsFile = d => fs.existsSync(d)

let filename = __filename // full path name of the current module
let prgname = path.basename(filename) // file name of current module
let dirname = path.dirname(require.main.filename) // __dirname
let cwdir = process.cwd() // directory of invocation
let prgdir = __dirname // directory of calling js

// options

const options = {
  qualiprefix: 'eon-z',
  closebrowser: 0,
  tracing: 0,
  tracingpath: './___trace.json',
  zpattern: new RegExp('^((eon-z)(.*)-(.*)).(html)', 'i'),
}

// state

const state = {
  prgname,
  actions: [],
  indir: './',
  indirpath: (cwdir + '/').replace(/\\/g, '/'),
}

// args

let args = process.argv
let [cmd, scp, ...opts] = args

let inScopePattern = new RegExp(`^eon-z___none___.*\.html$`, 'i') // none pattern

if (opts.length === 0) {
  state.actions.push('help')
} else if (opts.length >= 1) {
  let codepattern = '.*' // default to all
  if (opts[0] === '.') {
    codepattern = '.*'
  } else {
    codepattern = opts[0]
  }
  inScopePattern = new RegExp(
    `^${options.qualiprefix}${codepattern}.*\.html$`,
    'i'
  ) // actView pattern

  if (opts.length >= 2 && opts[1] === 'doit') {
    state.actions.push('doit')
  } else if (opts.length >= 2 && opts[1] === 'dodebug') {
    state.actions.push('doit')
    state.actions.push('debug')
  } else {
    state.actions.push('debug')
  }
}

options.browseopts = {
  headless: false, // puppeteer.launch
  devtools: false, // puppeteer.launch
  debuggingPort: 9222, // puppeteer.launch
  window: {
    // puppeteer.launch
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
  viewPort: {
    // page.setViewport
    width: 600,
    height: 400,
  },
  delay: 3000, // waitInPromise
  timeout: 50000, // page.goto
  pageSelector: '#viewframe', // page.waitForSelector
}

state.files = fs
  .readdirSync(state.indir) // to actView
  .filter(file => isFile(file))
  .filter(d => inScopePattern.test(d))

// .................. actUponItems
async function actUponItems (data) {
  let { state, options } = data
  let { files, indirpath, browser } = state
  let { browseopts, tracing, tracingpath, zpattern } = options
  let { viewPort, timeout, pageSelector, delay } = browseopts

  async function actUponNext (current) {
    // n+1
    if (current >= files.length) return
    let infileName = files[current]

    let inpathname = path.resolve(indirpath, infileName)
    console.assert(existsFile(inpathname), `file ${inpathname} does not exist`)
    if (includes(state.actions, 'debug')) console.log(`doing:  ${inpathname}`)

    let parts = infileName.match(zpattern)
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
  let { browseopts, closebrowser } = options
  let { headless, devtools, debuggingPort, window } = browseopts
  let { actions } = state
  if (includes(actions, 'debug')) console.log('doit data', data)

  const browser = await puppeteer.launch({
    headless: headless,
    devtools: devtools, // open DevTools when window launches
    args: [
      `--remote-debugging-port=${debuggingPort}`,
      `--window-size=${window.width},${window.height}`, // Window size
    ],
  })

  await browser.pages()
  state.browser = browser
  data.state = state
  await actUponItems(data) // actUponItems
  if (closebrowser) await browser.close()
}
// .................. help
function help (data) {
  let { state, options } = data
  let { prgname } = state
  console.log(`node ${prgname} inScopePattern {debug | doit}}`)
  console.log(`   inScopePattern applies to eon-z files`)
  console.log(`call puppeteer and show html eon`)
  console.log(`eg.: node ${prgname} .*`)
  console.log(`eg.: node ${prgname} 793`)
  console.log(`eg.: node ${prgname} 793d debug`)
  console.log(`eg.: node ${prgname} 793d doit`)
}
// .................. debug
function debug (data) {
  let { state, options } = data
  console.log(state)
  console.log(options)
  console.log(`will do: ${state.files}`)
}

if (includes(state.actions, 'help')) {
  help({ state, options })
}
if (includes(state.actions, 'doit')) {
  doit({ state, options })
}
if (includes(state.actions, 'debug')) {
  debug({ state, options })
}
