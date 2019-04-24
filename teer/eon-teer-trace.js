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
let inScopePattern = new RegExp('^' + '(eon-z-.*).(html)', 'i')

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
  inScopePattern = new RegExp(`^(eon-z-${argpattern}.*).(html)`, 'i')
}

const appdir = '.'

let indexfiles = fs.readdirSync(appdir) // eon-z-.*.html files
  .filter(d => inScopePattern.test(d))

const regexFileNameParts = new RegExp('^(eon-z)(-)?(.*).(html)', 'i')

const newHtmlText = `<script src="./eon-x-eonify.js"></script>
<script>
  function getHtmlFilename(input) {
    const rfile = /^.*\\/(?<filename>[^\/]+)(?=\.html).*$/u
    const match = rfile.exec(input)
    return (match !== null) ? match.groups.filename : null
  }
  const fileName = getHtmlFilename(document.location.href)
  window.xEonify.eonify({ anitem: fileName, time: undefined })
</script>`

// .................. htmlToJs
function htmlToJs (data) {
  let {eonName, text} = data

  // .................. header

  let newHeader = `/* ******************************************
   *    @${eonName}
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.${eonName} = global.${eonName} || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem`

  // .................. footer
  let regexJsHeader = new RegExp(`^(.*async function anitem)`, 'si')
  let partsJsHeader = text.match(regexJsHeader)
  if (partsJsHeader === null) {
    console.log(`footer not found`)
  }
  text = text.replace(partsJsHeader[0], newHeader)

  let newFooter = `
  exports.${eonName} = anitem
}))`
  let textFooter = '\n</script>'
  textFooter = escapeRegExp(textFooter)
  let regexJsFooter = new RegExp(`${textFooter}`, 'si')
  let partsJsFooter = text.match(regexJsFooter)
  text = text.replace(partsJsFooter[0], newFooter)

  const newJsText = text
  return newJsText
}

// .................. jsToJs
function jsToJs (data) {
  let {eonName, preEonName, text} = data

  let topattern = eonName
  let searchexp = RegExp(`${preEonName}`, 'g')

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
    let fileNameHtml = indexfiles[i]
    let fileHtmlText = fs.readFileSync(fileNameHtml, 'utf8')
    let fileHtmlParts = fileNameHtml.match(regexFileNameParts) // eg. [ 'eon-z-021a.html', 'eon-z', '-', '021a', 'html' ]

    let eonPart = fileHtmlParts[1]
    let interHyphenPart = fileHtmlParts[2]
    let corePart = fileHtmlParts[3]
    let htmlPart = fileHtmlParts[4]

    const preFileHtml = `${fileHtmlParts[1]}${fileHtmlParts[2]}${fileHtmlParts[3]}.html`
    const preFileJs = `${fileHtmlParts[1]}${fileHtmlParts[2]}${fileHtmlParts[3]}.js`

    const newName = `${eonPart}${corePart}`
    const newNameHtml = newName + '.html'
    const newNameJs = newName + '.js'
    const eonName = camelize(newName)
    const preEonName = camelize(`z${corePart}`)

    if (existsFile(preFileJs)) { // .html + .js
      if (action === 'show' || action === 'debug') {
        console.log(` *********** HTML + JS`)
        console.log(`${preFileHtml}`) // eon-z-815e-d2bernoulli.html
        console.log(`  +  ${preFileJs}`) // eon-z-815e-d2bernoulli.js
        console.log(` ---- will create ${newNameHtml}`)
      }

      if (action === 'debug') {
        console.log(` ---- text of ${newNameHtml}`)
        console.log(`${newHtmlText}`)
      }

      if (action === 'doit') {
        fs.writeFile(`${newNameHtml}`, `${newHtmlText}`, function (err) { // eon-z815e-d2bernoulli.html
          if (err) throw err
          console.log(` ----Updated ${newNameHtml}`)
        })

        fs.writeFile(`${newNameJs}`, '', function (err) { // eon-z815e-d2bernoulli.js
          if (err) throw err
          console.log(` ----Updated ${newNameJs}`)
        })
      }

      let fileJsText = fs.readFileSync(preFileJs, 'utf8')
      fileJsText = jsToJs({eonName, preEonName, text: fileJsText})

      if (action === 'show' || action === 'debug') {
        console.log(` ---- will create ${newNameJs}`)
        console.log(` ----   from ${preFileJs}`)
        console.log(` ---- replace pre-eno: ${preEonName}`) // z419ePacerNatEoloadAnify
        console.log(` ----   by new eon name: ${eonName}`) // eonZ419ePacerNatEoloadAnify
      }
      if (action === 'debug') {
        console.log(` ---- text of ${newNameJs}`)
        console.log(`${fileJsText}`)
      }

      if (action === 'show' || action === 'debug') {
        console.log(` ---- will delete ${preFileJs}`)
        console.log(` ---- will delete ${preFileHtml}`)
      }

      if (action === 'doit') {
        fs.writeFile(`${newNameJs}`, `${fileJsText}`, function (err) { // eon-z815e-d2bernoulli.js
          if (err) throw err
          console.log(` ---- Updated ${newNameJs}`)
        })
        fs.unlinkSync(`${preFileJs}`, function (err) { // eon-z-815e-d2bernoulli.js
          if (err) throw err
          console.log(` ---- Deleted ${preFileJs}`)
        })
        fs.unlinkSync(`${preFileHtml}`, function (err) { // eon-z-815e-d2bernoulli.html
          if (err) throw err
          console.log(` ---- Deleted ${preFileHtml}`)
        })
      }
    } else { // .html
      if (action === 'show' || action === 'debug') {
        console.log(` *********** HTML`)
        console.log(`${preFileHtml}`) // eon-z-815e-d2bernoulli.html
        console.log(` ---- will create ${newNameHtml}`)
      }
      if (action === 'debug') {
        console.log(` ---- new text of ${newNameHtml}:`)
        console.log(newHtmlText)
      }

      if (action === 'doit') {
        fs.writeFile(`${newNameHtml}`, `${newHtmlText}`, function (err) { // eon-z815e-d2bernoulli.html
          if (err) throw err
          console.log(` ---- Updated ${newNameHtml}`)
        })
      }

      let fileHtmlText = fs.readFileSync(preFileHtml, 'utf8')
      let fileJsText = htmlToJs({eonName, text: fileHtmlText})

      if (action === 'show' || action === 'debug') {
        console.log(` ---- will create ${newNameJs}`)
      }
      if (action === 'debug') {
        console.log(` ---- new text of ${newNameJs}:`)
        console.log(fileJsText)
      }

      if (action === 'show' || action === 'debug') {
        console.log(` ---- will delete ${preFileHtml}`)
      }

      if (action === 'doit') {
        fs.writeFile(`${newNameJs}`, `${fileJsText}`, function (err) { // eon-z815e-d2bernoulli.js
          if (err) throw err
          console.log(` ---- Updated ${newNameJs}`)
        })

        fs.unlinkSync(`${preFileHtml}`, function (err) { // eon-z-815e-d2bernoulli.html
          if (err) throw err
          console.log(` ---- Deleted ${preFileHtml}`)
        })
      }
    }
  }
}
// fs.writeFileSync(outfile, outText)

if (action === 'show' || action === 'doit' || action === 'debug') {
  doit({action})
} else if (action === 'help') {
  console.log(`node ${prgname} [inScopePatter]`)
}
