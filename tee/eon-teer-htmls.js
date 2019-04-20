#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const http = require('http')

const isDirectory = d => fs.lstatSync(d).isDirectory()
const isFile = d => fs.lstatSync(d).isFile()
const existsFile = d => fs.existsSync(d)

const camelize = str => str
  .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => index === 0 ? letter.toLowerCase() : letter.toUpperCase())
  .replace(/\s+/g, '') // remove white space
  .replace(/-+/g, '') // remove hyphen

function escapeRegExp (string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

// fs

let filename = __filename // full path name of the current module
let prgname = path.basename(filename) // file name of current module
let dirname = path.dirname(require.main.filename) // __dirname
let dircwd = process.cwd() //
let outdir = dircwd
console.log('outdir:', outdir)

// args - define action

let args = process.argv
let [cmd, scp, ...opts] = args

let action
let inScopePattern = new RegExp('^' + '(eon-z.*).(js)', 'i')

if (opts.length === 0) { // action: help
  action = 'help'
} else if (opts.length >= 1) { // action || doit
  if (opts.length === 2 && opts[1] === 'doit') {
    action = 'doit'
  } else if (opts.length === 2 && opts[1] === 'debug') {
    action = 'debug'
  } else {
    action = 'show'
  }

  let argpattern = '.*' // default to all
  if (opts[0] === '.') {
    argpattern = '.*'
  } else {
    argpattern = opts[0]
  }
  inScopePattern = new RegExp(`^(eon-z${argpattern}.*).(js)`, 'i')
}

const appdir = '.'

let indexfiles = fs.readdirSync(appdir) // eon-z-.*.html files
  .filter(d => inScopePattern.test(d))

const regexFileNameParts = new RegExp('^(eon-z)(.*).(js)', 'i')

//  <script>xEonify.eonify({ anitem: xEonify.getEonItem(location.href)})</script>`
const newHtmlText = `<script src="./eon-x-eonify.js"></script>
<script>eonXEonify.eonify({ anitem: eonXEonify.getEonItem(location.href)})</script>`

function doit (data) {
  let {action} = data

  for (let i = 0; i < indexfiles.length; i++) {
    let fileItemName = indexfiles[i]
    let fileItemParts = fileItemName.match(regexFileNameParts) // eg. [ 'eon-z-021a.html', 'eon-z', '-', '021a', 'html' ]

    let eonPart = fileItemParts[1]
    let corePart = fileItemParts[2]
    let estPart = fileItemParts[3]

    const newFileHtmlName = `${eonPart}${corePart}.html`
    const newFileHtmlPath = `${outdir}/${newFileHtmlName}`
    console.log('newFileHtmlPath:', newFileHtmlPath)

    if (action === 'show' || action === 'debug') {
      console.log(` ---- will create ${newFileHtmlPath}`) // eon-z-815e-d2bernoulli.html
    }

    if (action === 'debug') {
      console.log(` ---- text of ${newFileHtmlPath}`)
      console.log(`${newHtmlText}`)
    }

    if (action === 'doit') {
      fs.writeFile(`${newFileHtmlPath}`, `${newHtmlText}`, function (err) { // eon-z815e-d2bernoulli.html
        if (err) throw err
        console.log(` ----Updated ${newFileHtmlPath}`)
      })
    }

    if (action === 'delete') {
      fs.unlinkSync(`${newFileHtmlPath}`, function (err) { // eon-z815e-d2bernoulli.html
        if (err) throw err
        console.log(` ----Deleted ${newFileHtmlPath}`)
      })
    }
  }
}

function help (data = {}) {
  console.log(`create html file for eonitems`)
  console.log(`html are identical. call eonitme from href`)
  console.log(`node ${prgname} [inScopePatter] {show | debug | doit}`)
  console.log(`eg:`)
  console.log(`   node ${prgname} 813p show`)
}

if (action === 'show' || action === 'doit' || action === 'debug') {
  doit({action})
} else if (action === 'help') {
  help()
}
