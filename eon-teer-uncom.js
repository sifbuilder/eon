
// ... publish eons to npm and unpkg
// ... node _eonify-teer-npm { eons, all, eonclass }
// ... create npm project in eons_dist and npm publish

const fs = require('fs')
const path = require('path')
const http = require('http')
const { spawn } = require('child_process')
const { exec } = require('child_process')
const npm = require('npm')

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

// package version
let xVersion = require('./eon-x-version.js')
let xversion = xVersion.xVersion().version()
let packver = (xversion) || '0.0.1-rc2'

console.log(`package version ${packver}`)

// args

let args = process.argv
let [cmd, scp, ...opts] = args

// action.scope
let action = 'help'
let scope = 'eons' // default to root
let doit = 0

if (opts.length === 0) {

  // action help

} else if (opts.length === 1) {
  if (opts[0] === 'help') {

    // action help

  } else if (opts[0] === 'eons') {
    action = 'uncom'
    scope = 'eons'
    doit = 0
  } else if (opts[0] === 'eonitems') {
    action = 'uncom'
    scope = 'eonitems' // cover all eons in scope
    doit = 0
  } else {
    action = 'uncom'
    scope = opts[0] // filter eonitems
    doit = 0
  }
} else if (opts.length === 2) {
  action = 'uncom'
  scope = opts[0] // filter eonitems
  doit = (opts[1] === 'doit') ? 1 : 0
}

// indir

const eonpattern = new RegExp('^' + 'eon' + '.*' + '.*(.html|js)', 'i')
const testpattern = new RegExp('(.*).test.(.*)$', 'i')
const mdpattern = /\/\/.?md:(.*)/mg // // md (global multiline)
const imgpattern = new RegExp('(.*)(.jpg)$', 'i')

let indir = './'
let fromfile = ''

let infiles = []
if (scope === 'eons') { // eonify is root
  // ... if scope is eons, get root
  infiles = [ 'eons' ] // if not all eons in param opts then publish eons
} else if (scope === 'eonitems') {
  // ... if scope is eonitems, cover all eons items
  infiles = fs.readdirSync(indir)
    .filter(file => isFile(file))
    .filter(d => eonpattern.test(d))
    .filter(d => !testpattern.test(d))
    .filter(d => !mdpattern.test(d))
    .filter(d => !imgpattern.test(d))
} else {
  // ... if scope is pattern, select eons
  const eonitemspattern = new RegExp('^' + '.*' + scope + '.*(.html|js)', 'i')
  infiles = fs.readdirSync(indir)
    .filter(file => isFile(file))
    .filter(d => eonitemspattern.test(d))
    .filter(d => !testpattern.test(d))
    .filter(d => !mdpattern.test(d))
    .filter(d => !imgpattern.test(d))
}
console.log('infiles', infiles)

// outdir

let outdirpath = (dirname + '/pacs/').replace(/\\/g, '/') // images
let outfilename = 'eon-z-722e-fractals10.pac'
let outpathname = `${outdirpath}${outfilename}`
let outext = '.png'

let outdirname = 'eons_dist'
let outdir = `${dirname}/../${outdirname}/` // eg. eons/../eons_dist
fs.existsSync(outdir) || fs.mkdirSync(outdir); console.log('create dist folder ', outdir) // CREATE

// promise

let uncom = function () {
  let promises = infiles.map(fileName => {
    Promise.resolve(fileName)
      .then(fileName => {
        console.log('out root dir', outdir)

        let regex2 = new RegExp('^(((eon-)?(((?!-).)*)-(.*)).(html|js))', 'i')

        let parts = fileName.match(regex2) || []
        let fullName = parts[0]
        let rootname = parts[2] || 'eons' // ----------------
        let pckfolder = `${outdir}${rootname}/` // pckfolder

        // ... uncomment
        function uncomment (pckfolder, fullName, rootname) {
          // ... uncommnet fullName file

          let findPattern = '.*(0|1) \&\& (0|1).*(\r\n|\n|\r)' // pattern: (0|1) && (0|1)
          let replacePattern = '' // pattern: (0|1) && (0|1)
          let exp = RegExp(`${findPattern}`, 'g')

          let eonfile = `${indir}${fullName}`

          if (fs.existsSync(eonfile)) { // if md file
            let fileTxt = fs.readFileSync(eonfile, 'utf8')

            var arr
            while ((arr = exp.exec(fileTxt)) !== null) {
              let toreplace = arr[0]

              if (1 && 1) console.log('toreplace', toreplace)

              fileTxt = fileTxt.replace(toreplace, replacePattern)
            }

            if (1 && 1) console.log(`pattern found in ${eonfile}`)
            if (1 && 1) console.log('fileTxt', fileTxt)
            if (doit) fs.writeFileSync(eonfile, fileTxt)
          }
        }

        uncomment(pckfolder, fullName, rootname)
      })
  })
  Promise.all(promises)
    .then(() => { console.log('done') })
}

if (action === 'uncom') {
  uncom()
} else if (action === 'help') {
  console.log(`node ${prgname} {[help], eons, eonitems, pattern} [doit]`)
  console.log(`eg. node ${prgname} eon-muon-animation [doit]`)
} else {
  console.log(`node ${prgname} {[help], eons, eonitems, pattern} [doit]`)
}
