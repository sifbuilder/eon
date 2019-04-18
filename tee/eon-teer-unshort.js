#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const http = require('http')
const puppeteer = require('puppeteer')

const isDirectory = d => fs.lstatSync(d).isDirectory()
const isFile = d => fs.lstatSync(d).isFile()
const existsFile = d => fs.existsSync(d)

const camelize = str => str
  .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => index === 0 ? letter.toLowerCase() : letter.toUpperCase())
  .replace(/\s+/g, '') // remove white space
  .replace(/-+/g, '') // remove hyphen

const snakefy = str => str  
  .replace(/([a-z][A-Z])/g, function (g) { return g[0] + '-' + g[1].toLowerCase() })

function escapeRegExp (string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

// fs

let filename = __filename // full path name of the current module
let prgname = path.basename(filename) // file name of current module
let dirname = path.dirname(require.main.filename) // __dirname

// args - define action

let args = process.argv
let [cmd, scp, ...opts] = args

let action
let inScopePattern = new RegExp('^(eon-)(.*)(.js)', 'i')

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
  inScopePattern = new RegExp(`^(eon-)(${argpattern}.*)(.js)`, 'i')
}

const appdir = '.'

let indexfiles = fs.readdirSync(appdir) // eon-z-.*.html files
  .filter(d => inScopePattern.test(d))

console.log('indexfiles:', indexfiles)

const regexFileNameParts = new RegExp('^(eon-z)(.*).(js)', 'i')

const newHtmlText = `-`

// .................. jsToJs
function rep (data) {
  let {frompattern, topattern, text} = data

  let searchexp = RegExp(escapeRegExp(`${frompattern}`), 'g')

  let arr
  while ((arr = searchexp.exec(text)) !== null) {
    let toreplace = arr[0]
    text = text.replace(toreplace, topattern)
  }

  return text
}

function doit (data) {
  let {action} = data

  for (let i = 0; i < indexfiles.length; i++) {
    let fileName = indexfiles[i]
    let fileText = fs.readFileSync(fileName, 'utf8')

    // const regexEonParts = []
    let regexEonParts = new RegExp('renderSvg', 'i')

    // let fileTextParts = fileText.match(regexEonParts) // eg. [ 'eon-z-021a.html', 'eon-z', '-', '021a', 'html' ]

    fileText = rep({frompattern: 'renderSvg', topattern: 'eonRenderSvg', text: fileText})
    fileText = rep({frompattern: "r('svg')", topattern: "o('eonRenderSvg')", text: fileText})
    console.log('fileText:', fileText)
    return

    const eonName = camelize(newName)
    const preEonName = camelize(`z${corePart}`)

    if (existsFile(preFileJs)) { // .html + .js

      // if (action === 'show' || action === 'debug') {
      //   console.log(` *********** HTML`)
      //   console.log(`${preFileHtml}`) // eon-z-815e-d2bernoulli.html
      //   console.log(` ---- will create ${newNameHtml}`)
      // }
      // if (action === 'debug') {
      //   console.log(` ---- new text of ${newNameHtml}:`)
      //   console.log(newHtmlText)
      // }

      // if (action === 'doit') {
      //   fs.writeFile(`${newNameHtml}`, `${newHtmlText}`, function (err) { // eon-z815e-d2bernoulli.html
      //     if (err) throw err
      //     console.log(` ---- Updated ${newNameHtml}`)
      //   })

      // }

      // let fileHtmlText = fs.readFileSync(preFileHtml, 'utf8')
      // let fileJsText = htmlToJs({eonName, text: fileHtmlText})

      // if (action === 'show' || action === 'debug') {
      //   console.log(` ---- will create ${newNameJs}`)
      // }
      // if (action === 'debug') {
      //   console.log(` ---- new text of ${newNameJs}:`)
      //   console.log(fileJsText)
      // }

      // if (action === 'show' || action === 'debug') {
      //   console.log(` ---- will delete ${preFileHtml}`)
      // }

      // if (action === 'doit') {
      //   fs.writeFile(`${newNameJs}`, `${fileJsText}`, function (err) { // eon-z815e-d2bernoulli.js
      //     if (err) throw err
      //     console.log(` ---- Updated ${newNameJs}`)
      //   })

      //   fs.unlinkSync(`${preFileHtml}`, function (err) { // eon-z-815e-d2bernoulli.html
      //     if (err) throw err
      //     console.log(` ---- Deleted ${preFileHtml}`)
      //   })
      // }
    }
  }
}
// fs.writeFileSync(outfile, outText)

if (action === 'show' || action === 'doit' || action === 'debug') {
  doit({action})
} else if (action === 'help') {
  console.log(`node ${prgname} [inScopePatter]`)
}
