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

let indir = './'
let files = fs.readdirSync(indir)

// args

let args = process.argv
let [cmd, scp, ...opts] = args

let action = 'help' // {[help] pattern}
let fromreplace = '(^__from)'
let toreplace = '(^__to$)'
let doreplace = 0

if (opts.length === 0) {
  action = 'help'
} else if (opts.length === 3 && (Number.parseInt(opts[2]) === 1)) {
  action = 'renam'
  fromreplace = `(${opts[0]})` || '(^__from)'
  toreplace = `${opts[1]}` || '(^__to$)'
} else if (opts.length === 2 || (opts.length === 3 && (Number.parseInt(opts[2]) !== 1))) {
  action = 'show'

  fromreplace = `(${opts[0]})` || '(^__from)'
  toreplace = `${opts[1]}` || '(^__to$)'
}

function renam (data) {
  let {doreplace, fromreplace, toreplace} = data
  let regex = new RegExp(`${fromreplace}`, 'i')

  let fzs = files.filter(d => regex.test(d))
  for (let i = 0; i < fzs.length; i++) {
    let fileName = fzs[i]
    let parts = fileName.match(regex)
    let newFileName = fileName.replace(regex, toreplace)
    if (1 && 1) console.log(`${fileName} -> ${newFileName}`)
    if (doreplace === 1) {
      if (1 && 1) console.log('do replace')
      fs.renameSync(fileName, newFileName)
    }
  }
}

if (action === 'help') {
  console.log(`rename files in cwd ${indir}`)
  console.log(`node ${prgname} frompattern, topattern, {0,1}`)
} else if (action === 'show') {
  console.log(`show`)
  renam({doreplace: 0, fromreplace, toreplace})
} else if (action === 'renam') {
  console.log(`rename`)
  renam({doreplace: 1, fromreplace, toreplace})
} else {
  console.log(`usage: node ${prgname} frompattern, topattern, {0,1}`)
}
