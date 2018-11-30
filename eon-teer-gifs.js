
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
const existsFile = d => fs.existsSync(d)

// fs

let filename = __filename // full path name of the current module
let prgname = path.basename(filename) // file name of current module
let dirname = path.dirname(require.main.filename) // __dirname

// options

const options = {
  closebrowser: true,
  headless: true,  // puppeteer.launch
  devtools: false,  // puppeteer.launch
  debuggingPort: 9222,  // puppeteer.launch
  window: { // puppeteer.launch
    width: 1200,
    height: 900,
  },
  fullPage: false,
  viewPort: {
    preview: { // page.setViewport
      width: 600,
      height: 400
    },
    thumbnail: { // page.setViewport
      width: 230,
      height: 120,
    },
  },
  delay: 7000,  // waitInPromise
  timeout: 50000,  // page.goto
  pageSelector: '#viewframe', // page.waitForSelector
  outext: 'png',
  imgdirpath: (__dirname + '/images/').replace(/\\/g, '/'),
  outdirpath: (__dirname + '/').replace(/\\/g, '/'),
  imgtypes: ['preview'], // ['thumbnail'], // ['preview', 'thumbnail'],
  inScopeExt: 'html', // {html | gif} src file
}

// args

let args = process.argv
let [cmd, scp, ...opts] = args

let action = 'help' // {[help] pattern}
let inScopePattern = new RegExp(`^eon-z-___none___.*.*$`, 'i') // none pattern

if (opts.length === 0) { // action: help
  action = 'help'
} else if (opts.length >= 1 && opts[0] !== 'help') { // action:actView
  action = 'actView'
  let codepattern = '.*' // default to all
  if (opts[0] === '.') {
    codepattern = '.*'  // include all
  } else {
    codepattern = opts[0]
  }
  
  if (opts[1] !== undefined) options.inScopeExt = opts[1] // set src ext
  inScopePattern = new RegExp(`^eon-z-${codepattern}.*\.${options.inScopeExt}$`, 'i')
}


let indir = './'
let indirpath = (dirname + '/').replace(/\\/g, '/') // z-indexes
let closebrowser = 0
let tracing = 0
let tracingpath = './___trace.json'

let files = fs.readdirSync(indir) // to actView
  .filter(file => isFile(file))
  .filter(d => inScopePattern.test(d))


// .................. actScreenShots
async function actScreenShots (browser, fls, opts) {

  async function actUponNext (current) {  // n+1
    if (current >= fls.length) { return }

    let inFileName = fls[current]
    let inFullPath = `${indirpath}${inFileName}`

    // ------
    let filePartsPatter = new RegExp(`^(((eon-z)-(.*))[-]?(.*))\.(${options.inScopeExt})`, 'i')  // gif|html
    let parts = inFileName.match(filePartsPatter)
    let fullname = parts[0]
    let rootAndName = parts[1]
    let root = parts[2]
    let prefix = parts[3]
    let code = parts[4]
    let name = parts[5]
    let type = parts[6]
    
    // ------ show 
    
    let viewPort, outfile, outpathname, itemOpts, typeimg
    let imgtypes = opts.imgtypes  // 'preview', 'thumbnail'
    
    const pageSrc = await browser.newPage()
    await pageSrc.goto(`file:///${inFullPath}`, {waitUntil: 'domcontentloaded'})
      
    await waitInPromise(opts.delay)(pageSrc.content())
    
      typeimg = 'preview'
      console.assert(typeimg !== undefined, `screenshot type undefined`)
      viewPort = opts.viewPort[typeimg]
      console.assert(viewPort !== undefined, `viewPort size undefined`)
      await pageSrc.setViewport(viewPort) // viewport
      outfile = `${prefix}-${code}-${typeimg}.${opts.outext}`  // preview, thumbnail
      outpathname = `${opts.outdirpath}${outfile}`
      itemOpts = Object.assign({}, opts)
      itemOpts.path = outpathname
      console.log('screenshot: ', inFullPath, outpathname)
      await pageSrc.screenshot(itemOpts)

        // ------ show preview
    
      const pagePreview = await browser.newPage()
      await pagePreview.goto(`file:///${outpathname}`, {waitUntil: 'domcontentloaded'})
      
      typeimg = 'thumbnail'
      viewPort = opts.viewPort[typeimg]
      await pagePreview.setViewport(viewPort) // viewport
      outfile = `${prefix}-${code}-${typeimg}.${opts.outext}`  // preview, thumbnail
      outpathname = `${opts.outdirpath}${outfile}`
      itemOpts = Object.assign({}, opts)
      itemOpts.path = outpathname
      console.log('screenshot: ', inFullPath, outpathname)
      await pagePreview.screenshot(itemOpts)    
      
        // ------ show thumbnail
      const pageThumbnail = await browser.newPage()
      await pageThumbnail.goto(`file:///${outpathname}`, {waitUntil: 'domcontentloaded'})
    
    

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

  await actScreenShots(browser, fls, opts)  // actScreenShots preview

  if (opts.closebrowser) await browser.close()
}

if (action === 'actView') {
  console.log(`actView ${inScopePattern} eon files`)
  actView(files, options)
} else {
  console.log(`node ${prgname} {[help], eon-z filePattern, fileExt{html, gif}}`)
}
