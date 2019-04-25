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
let prgdir = __dirname // directory of calling js file

// options

const options = {
  qualiprefix: 'eon-z',
  closebrowser: 0,
  tracing: 0,
  tracingpath: './___trace.json',
  // ((eon-z-)([^-.]*))[-]?(.*)
  zpattern: new RegExp('^(((eon-z)(.*))-([^-.]*))[-]?(.*).(html)', 'i'),
  inScopeExt: 'html',
  outext: 'jpg', // 'png',  //
  outImgType: 'jpeg', // 'png', //
  snapTypes: ['preview'], // ['thumbnail'], // ['preview', 'thumbnail'],
}

// state

const state = {
  imgdirpath: (__dirname + '/images/').replace(/\\/g, '/'),
  outdirpath: (__dirname + '/').replace(/\\/g, '/'),
  // imgdirpath: (cwdir + '/img/').replace(/\\/g, '/'),
  // outdirpath: (cwdir + '/img/').replace(/\\/g, '/'),

  prgname,
  actions: [],
  inDir: './',
  indirpath: (cwdir + '/').replace(/\\/g, '/'),
  inScopePattern: new RegExp(`^eon-z___none___.*\.html$`, 'i'), // none pattern
}

options.browseOpts = {
  headless: false, // puppeteer.launch
  devtools: false, // puppeteer.launch
  debuggingPort: 9222, // puppeteer.launch
  window: {
    // puppeteer.launch
    width: 1200,
    height: 900,
  },
  fullPage: false,
  clip: { // body default margin is 8px on all sides
    x: 8,
    y: 8,
    width: 600,
    height: 400,
  },
  viewPort: { // page.setViewport
    preview: { // page.setViewport
      width: 600,
      height: 400,
    },
    thumbnail: { // page.setViewport
      width: 180,
      height: 120,
    },
  },
  delay: 3000, // waitInPromise
  timeout: 50000, // page.goto
  pageSelector: '#viewframe', // page.waitForSelector
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

state.files = fs
  .readdirSync(state.inDir) // to doit
  .filter(file => isFile(file))
  .filter(d => state.inScopePattern.test(d))

// .................. doItems
async function doItems (data) {
  let { state, options } = data
  let { files, indirpath, browser } = state
  let { browseOpts, tracing, tracingpath, zpattern } = options
  let { viewPort, timeout, pageSelector, delay } = browseOpts

  let snapTypes = { options } // 'preview', 'thumbnail'

  async function actUponNext (current) {
    // n+1
    if (current >= files.length) return
    let inFileName = files[current]
    let inPathName = path.resolve(indirpath, inFileName)
    console.assert(existsFile(inPathName), `file ${inPathName} does not exist`)
    if (includes(state.actions, 'debug')) console.log(`doing:  ${inPathName}`)

    let parts = inFileName.match(zpattern)
    console.log('parts:', parts)
    let fullnamewithext = parts[0]
    let fullname = parts[1]
    let rootname = parts[2]
    let prefix = parts[3]
    let code = parts[4]
    let name = parts[5]
    let vide = parts[6]
    let exten = parts[7]

    // ------ show

    let outfile, outpathname, itemOpts
    let typeimg // preview, thumbnail
    let pageSrc // page to be loaded

    pageSrc = await browser.newPage()
    await pageSrc.goto(`file:///${inPathName}`, {
      waitUntil: 'domcontentloaded',
    })

    await waitInPromise(options.browseOpts.delay)(pageSrc.content())

    typeimg = 'preview'
    outfile = `${rootname}-${typeimg}.${options.outext}` // preview, thumbnail
    outpathname = `${state.outdirpath}${outfile}`
    viewPort = options.browseOpts.viewPort[typeimg]
    itemOpts = Object.assign({}, options,
      {path: outpathname,
        type: options.outImgType,
        clip: options.browseOpts.clip,
      })
    if (includes(state.actions, 'debug')) console.log('screenshot: ', inPathName, outpathname, itemOpts)

    console.assert(typeimg !== undefined, `screenshot type undefined`)
    console.assert(viewPort !== undefined, `viewPort size undefined`)

    // await pageSrc.setViewport(viewPort) // viewport
    await pageSrc.screenshot(itemOpts)

    // ------ show preview

    pageSrc = await browser.newPage()
    await pageSrc.goto(`file:///${outpathname}`, {
      waitUntil: 'domcontentloaded',
    })

    typeimg = 'thumbnail'
    outfile = `${rootname}-${typeimg}.${options.outext}` // preview, thumbnail
    outpathname = `${state.outdirpath}${outfile}`
    viewPort = options.browseOpts.viewPort[typeimg]
    itemOpts = Object.assign({}, options,
      {
        path: outpathname,
        type: options.outImgType,
      })
    if (includes(state.actions, 'debug')) console.log('screenshot: ', inPathName, outpathname, itemOpts)

    await pageSrc.setViewport(viewPort) // viewport
    await pageSrc.screenshot(itemOpts)

    // ------ show thumbnail
    const pageThumbnail = await browser.newPage()
    await pageThumbnail.goto(`file:///${outpathname}`, {
      waitUntil: 'domcontentloaded',
    })

    // ------

    await actUponNext(current + 1)
  }

  return actUponNext(0) // 0
}

// .................. doit
async function doit (data) {
  let { state, options } = data
  let { browseOpts, closebrowser } = options
  let { headless, devtools, debuggingPort, window } = browseOpts
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
  await doItems(data) // doItems
  if (closebrowser) await browser.close()
}

// .................. help
async function help (data) {
  let { state, options } = data
  let { prgname } = state
  console.log(`generate preview.png [600x400] and thumbnail.png [230x120]
      node ${prgname} {[pattern], [ext]}
      from eon-z-...{pattern}...{ext}, where ext in {html, gif, mov}
      eg. node ${prgname} 793d doit`)
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
