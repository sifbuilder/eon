// node <program>

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

const rower = q => n => Math.floor(n / q)
const coler = q => n => n % q

// fs

let filename = __filename // full path name of the current module
let prgname = path.basename(filename) // file name of current module
let dirname = path.dirname(require.main.filename) // __dirname

// state

const state = {
  inDir: './',
  outDir: './',
  outFile: 'README.md',
  outText: '',
  where: 'local',
  qcols: 3, // number of thumbnails per row
  contentUrl: 'https://raw.githubusercontent.com/', // rsc host
  user: 'sifbuilder', // gh user
  repo: 'eons', // gh repo
  branch: 'master', // gh branch
  hostUrl: 'https://github.com/', //
  folder: 'blob', //

  indexpattern: new RegExp('^' + 'eon-z' + '.*' + '.*(.html)', 'i'), // z.eons
  gifpattern: new RegExp('^' + 'eon-z' + '.*' + '.*(.gif)', 'i'), // z.gif
  eonpattern: new RegExp('^' + 'eon' + '.*' + '.*(.js)', 'i'), // eons
  testpattern: new RegExp('(.*).test.(.*)$', 'i'), //  test
  mdpattern: new RegExp('(.*).md.(.*)$', 'i'), //  md
  zpattern: new RegExp('^' + 'eon-z' + '.*' + '.*(.js)', 'i'),

  // partsPattern: new RegExp('^((((eon-z-)?(((?!-).)*))-(.*))\.(html))', 'i'),
  partsPattern: new RegExp('^((((eon-z-)?(((?!-).)*))-?(.*))?\.(gif))', 'i'),

  newLine: '\n',
  endOfLine: '  ',

  outdirpath: (__dirname + '/').replace(/\\/g, '/'),
  tileimg: `thumbnail`,
  tileext: `png`,
  notile: 'notile.png',
  tileview: {
    width: 230,
    height: 120,
  },
  gifext: `gif`,
  eonext: `html`,

  codepattern: `.*`,

  coreZfile: 'eon-z-000a.html',
  toreplace: 'eon-z-000a',
}

// args

let args = process.argv
let [cmd, scp, ...opts] = args

let action = 'help' // {[help] pattern}
if (opts.length === 0) { // action: help
  action = 'help'
} else if (opts.length >= 1 && opts[0] === 'help') { // help
  action = 'help'
} else if (opts.length >= 1 && opts[0] === 'debug') { // debug
  action = 'debug'
} else { // action:doAction
  action = 'doAction'
  let codepattern = '.*' // default to all
  if (opts[1] !== undefined) state.codepattern = opts[1] // in scope
}

function doAction (stat = {}) { // return outText
  let outText = ''

  let { qcols, partsPattern, outdirpath, tileimg, tileext, tileview, notile, where, contentUrl, user, repo, branch, hostUrl, folder, endOfLine, newLine, gifext, inDir, indexpattern, testpattern, mdpattern, gifpattern, coreZfile, toreplace, outDir} = stat

  let infiles = fs.readdirSync(inDir) // index files in inDir
    .filter(d => gifpattern.test(d))
    .filter(d => !testpattern.test(d))
    .filter(d => !mdpattern.test(d))

  for (let i = 0; i < infiles.length; i++) {
    let fileName = infiles[i]

    let parts = fileName.match(partsPattern)
    let fullname = parts[0] // full name
    let part = parts[1] // full name
    let rootAndName = parts[2] // rootAndName
    let root = parts[3] // rootAndName
    let code = parts[5] // code
    let ext = parts[8] // ext

    let zPattern = new RegExp(`^${rootAndName}.*.html`, 'i') // z.eons

    let zfiles = fs.readdirSync(inDir) // index files in inDir
      .filter(d => zPattern.test(d))
      .filter(d => !testpattern.test(d))

    if (zfiles.length === 0) { // if z eon not exists
      let newZfileName = `${rootAndName}.html`

      if (fs.existsSync(coreZfile)) { // if md file
        let fileTxt = fs.readFileSync(coreZfile, 'utf8')
        let replacepattern = rootAndName
        fileTxt = fileTxt.replace(toreplace, replacepattern)
        let outFilePath = `${outDir}${rootAndName}.html`

        fs.writeFileSync(outFilePath, fileTxt)
      }
    }
  }

  return outText
}

if (action === 'doAction') {
  doAction(state)
} else if (action === 'debug') {
  console.log(`doAction`)
} else if (action === 'help') {
  console.log(`node ${prgname} {[help], [debug], [do]}
      generate core eons for orphan gifs
  `)
}
