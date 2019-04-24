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
  inScopeExt: 'html',
}

// state

const state = {
  prgname,
  actions: [],
  inDir: './',
  indirpath: (cwdir + '/').replace(/\\/g, '/'),
  inScopePattern: new RegExp(`^eon-z___none___.*\.html$`, 'i'), // none pattern
}

// args

let args = process.argv
let [cmd, scp, ...opts] = args

if (opts.length === 0) {
  state.actions.push('help')
} else if (opts.length >= 1) {
  let codepattern = '.*' // default to all
  if (opts[0] === '.') {
    codepattern = '.*'
  } else {
    codepattern = opts[0]
  }
  state.inScopePattern = new RegExp(
    `^${options.qualiprefix}${codepattern}.*.${options.inScopeExt}$`,
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
    // pageSrc.setViewport
    width: 600,
    height: 400,
  },
  delay: 3000, // waitInPromise
  timeout: 50000, // pageSrc.goto
  pageSelector: '#viewframe', // pageSrc.waitForSelector
}

state.files = fs
  .readdirSync(state.inDir) // to actView
  .filter(file => isFile(file))
  .filter(d => state.inScopePattern.test(d))

// .................. actUponItems
async function actUponItems (data) {
  let { state, options } = data
  let { files, indirpath, browser } = state
  let { browseopts, tracing, tracingpath, zpattern } = options
  let { viewPort, timeout, pageSelector, delay } = browseopts

  async function actUponNext (current) {
    // n+1
    if (current >= files.length) return
    let inFileName = files[current]
    let inPathName = path.resolve(indirpath, inFileName)
    console.assert(existsFile(inPathName), `file ${inPathName} does not exist`)
    if (includes(state.actions, 'debug')) console.log(`doing:  ${inPathName}`)

    let parts = inFileName.match(zpattern)
    let fullname = parts[0]
    let rootname = parts[1]
    let code = parts[2]
    let name = parts[3]
    let type = parts[4]


    const pageSrc = await browser.newPage()
    pageSrc.setViewport(viewPort) // viewport

    if (tracing) {
      await pageSrc.tracing.start({
        path: tracingpath,
        screenshots: true,
      })
    }

    await pageSrc.goto(`file:///${inPathName}`, {
      waitUntil: 'domcontentloaded',
      timeout: timeout, // timeout
    })
    await pageSrc.waitForSelector(pageSelector)
    await waitInPromise(delay)(pageSrc.content())

    pageSrc.on('pageerror', function (err) {
      let theTempValue = err.toString()
      console.log('pageSrc error: ' + theTempValue)
    })
    pageSrc.on('error', function (err) {
      let theTempValue = err.toString()
      console.log('Error: ' + theTempValue)
    })
    pageSrc.on('console', msg => {
      for (let i = 0; i < msg.args.length; ++i) {
        console.log(`${i}: ${msg.args[i]}`)
      }
    })
    await pageSrc.evaluate(() => console.log(`url is ${location.href}`))

    if (tracing) await pageSrc.tracing.stop()

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
