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
  zpattern: new RegExp('^(((eon-z)(.*))-([^-.]*))[-]?(.*).(html)', 'i'),
  inScopeExt: 'html',
  outext: 'png',  // 'jpg', // 
  outImgType: 'png', // 'jpeg', // 
  snapTypes: ['preview', 'thumbnail'],
}

// state

const state = {
  eonDirPath: (cwdir + '/').replace(/\\/g, '/'),
  imgDirPath: (cwdir + '/img/').replace(/\\/g, '/'),
  inDir: './',
  inDirPath: (cwdir + '/').replace(/\\/g, '/'),
  teerDirPath: (prgdir + '/').replace(/\\/g, '/'),
  outDirPath: (cwdir + '/img/').replace(/\\/g, '/'),

  prgname,
  actions: [],
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
  clip: {
    // body default margin is 8px on all sides
    preview: {
      x: 8,
      y: 8,
      width: 600,
      height: 400,
    },
    thumbnail: {
      x: 8,
      y: 8,
      width: 180,
      height: 120,
    },
  },
  viewPort: {
    // page.setViewport
    preview: {
      // page.setViewport
      width: 600 + 8 + 8, // add body margin
      height: 400 + 8 + 8, // add body margin
    },
    thumbnail: {
      // page.setViewport
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

// .................. doItem
async function doItem (data) {
  let { state, options } = data
  let { files, inDirPath, browser } = state

  async function doItem (current) {
    // n+1
    if (current >= files.length) return
    state.inFileName = files[current]
    let inPathName = path.resolve(inDirPath, state.inFileName)
    if (includes(state.actions, 'debug')) {
      console.assert(
        existsFile(inPathName),
        `file ${inPathName} does not exist`
      )
    }
    if (includes(state.actions, 'debug')) console.log(`doing:  ${inPathName}`)

    let parts = state.inFileName.match(options.zpattern)
    if (includes(state.actions, 'debug')) console.log('parts:', parts)
    state.fullnamewithext = parts[0]
    state.fullname = parts[1]
    state.rootname = parts[2]
    state.prefix = parts[3]
    state.code = parts[4]
    state.name = parts[5]
    state.vide = parts[6]
    state.exten = parts[7]

    // .................. doType
    const doType = async function (data) {
      let { options, state } = data
      if (includes(state.actions, 'debug')) { console.log('snapType:', state.snapType) }
      state.outFileName = `${state.rootname}-${state.snapType}.${
        options.outext
      }` // preview, thumbnail
      state.outPathName = path.resolve(state.outDirPath, state.outFileName)

      let viewPort = options.browseOpts.viewPort[state.snapType]
      let itemOpts = Object.assign({}, options, {
        path: state.outPathName,
        type: options.outImgType,
        clip: options.browseOpts.clip[state.snapType],
      })
      if (includes(state.actions, 'debug')) { console.log('screenshot: ', state.outPathName, itemOpts) }

      console.assert(state.snapType !== undefined, `screenshot type undefined`)
      console.assert(viewPort !== undefined, `viewPort size undefined`)

      let pageSrc = await browser.newPage()
      await pageSrc.goto(`file:///${state.inPathName}`, {
        waitUntil: 'domcontentloaded',
      })
      await waitInPromise(options.browseOpts.delay)(pageSrc.content())

      await pageSrc.setViewport(viewPort) // viewport

      console.log('do:', `${state.inPathName} to ${state.outPathName}`)
      await pageSrc.screenshot(itemOpts)

      if (includes(state.actions, 'debug')) console.log('state:', state)
      return state
    }

    state.inPathName = path.resolve(state.inDirPath, state.inFileName) // first
    for (let snapType of options.snapTypes) {
      // ['preview', 'thumbnail']   // next
      state.snapType = snapType
      state = await doType({ state, options }) // do each type
      state.inPathName = state.outPathName
    }

    await doItem(current + 1)
  }

  return doItem(0) // 0
}

// .................. doit
async function doit (data) {
  let { state, options } = data
  let { headless, devtools, debuggingPort, window } = options.browseOpts
  let { actions } = state
  if (includes(actions, 'doit')) console.log('doing ...')
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
  await doItem(data) // doItem
  if (options.closebrowser) await browser.close()
}

// .................. help
async function help (data) {
  let { state, options } = data
  let { prgname } = state
  console.log(`
      ${prgname} help:

      generate eons preview and thumbnail files
        .jpg [600x400] and .jpg [180x120]

      usage: node ${prgname} pattern {debug, doit, dodebug}
          eg. node ${prgname} 793d doit

      for each eon html files in scope, wait 5 seconds and take screen shot`)
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
