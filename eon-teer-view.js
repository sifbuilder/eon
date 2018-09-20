
// node _eonify-teer-view eonpattern

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
let toviewpattern = new RegExp(`^eon-z-___none___.*\.html$`, 'i') // none pattern
if (opts.length === 0) {
  action = 'help'
} else if (opts.length === 1 && opts[0] !== 'help') {
  action = 'view'
  let codepattern = '.*' // default to all
  if (opts[0] === '.') {
    codepattern = '.*'
  } else {
    codepattern = opts[0]
  }
  toviewpattern = new RegExp(`^eon-z-${codepattern}.*\.html$`, 'i') // view pattern
}

const options = {
  fullPage: false,
  clip: {
    x: 0,
    y: 0,
    width: 600,
    height: 400,
  },
}

let viewPort = { width: 900, height: 600 }
let indir = './'
let indirpath = (dirname + '/').replace(/\\/g, '/') // z-indexes
let closebrowser = 0
let tracing = 0
let tracingpath = './___trace.json'

let files = fs.readdirSync(indir) // to view
  .filter(file => isFile(file))
  .filter(d => toviewpattern.test(d))

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

if (action === 'help') {
  console.log(`node ${prgname} {[help], viewpattern} on eon-z- files`)
} else if (action === 'view') {
  console.log(`view ${toviewpattern} eon files`)
  run(files, options)
} else {
  console.log(`node ${prgname} {[help], viewpattern} on eon-z- files`)
}
