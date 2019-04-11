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

let action, eoncode, eon

if (opts.length === 0) { // action: help
  action = 'help'
} else if (opts.length >= 1) { // action || doit
  if (opts.length === 2 && opts[1] === 'doit') {
    action = 'doit'
    eoncode = opts[0]
  } else if (opts.length === 2 && opts[1] === 'debug') {
    action = 'debug'
    eoncode = opts[0]
  } else if (opts.length === 1 || (opts.length === 2 && opts[1] === 'show')) {
    action = 'show'
    eoncode = opts[0]
  }

}

const appdir = '.'



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



function doit (data) {
  let {action, eoncode, newHtmlText} = data

  let eon = `eon-z${eoncode}`
  let fileName = `${eon}`
  let newNameHtml = `${fileName}.html`
  let newNameJs = `${fileName}.js`



  if (action === 'show' || action === 'debug') {
    console.log(` ---- will create ${newNameHtml}`)
  }
  if (action === 'debug') {      
    console.log(` ---- new text of ${newNameHtml}:`)
    console.log(newHtmlText)
  }

  if (action === 'show' || action === 'debug') {
    console.log(` ---- will create ${newNameJs}`)
  }

  if (action === 'doit') {
    fs.writeFile(`${newNameHtml}`, `${newHtmlText}`, function (err) { // eon-z815e-d2bernoulli.html
      if (err) throw err
      console.log(` ---- created ${newNameHtml}`)
    })
    fs.writeFile(`${newNameJs}`, ``, function (err) { // eon-z815e-d2bernoulli.js
      if (err) throw err
      console.log(` ---- created ${newNameJs}`)
    })

  }


}


if (action === 'show' || action === 'doit' || action === 'debug') {
  doit({action, eoncode, newHtmlText})
} else if (action === 'help') {
  console.log(`node ${prgname} eoncode (eg. 708w-torus-interleaved)`)
}
