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

// fs

let filename = __filename // full path name of the current module
let prgname = path.basename(filename) // file name of current module
let dirname = path.dirname(require.main.filename) // __dirname

// args - define action

let args = process.argv
let [cmd, scp, ...opts] = args

let action, eoncode, eon, fromeon, infile, tofile, eonName, preEonName

if (opts.length === 0) { // action: help
  action = 'help'
} else if (opts.length >= 1) { // action || doit
  if (opts.length === 2 && opts[1] === 'doit') {
    // create zeon.html and zeon.js
    action = 'doit'
    eoncode = opts[0]
  } else if (opts.length === 3 && opts[2] === 'dofrom') {
    // debug create zeon.html and zeon.js from zeon.js

    fromeon = opts[1]

    const indir = '.'
    const eonpattern = new RegExp(`^eon-z${fromeon}.*.js`, 'i')
    const infiles = fs.readdirSync(indir)
      .filter(file => isFile(file))
      .filter(d => eonpattern.test(d))

    if (infiles.length === 1) {
      console.log('infiles', infiles)
      action = 'dofrom'
      infile = `eon-z${opts[1]}.js`
      eoncode = opts[0]
      tofile = `eon-z${eoncode}`
    } else {
      console.log(' *** dofrom failed')
      action = 'none'
    }
  } else if (opts.length === 2 && opts[1] === 'debug') {
    // debug create zeon.html and zeon.js
    action = 'debug'
    eoncode = opts[0]
  } else if (opts.length === 1 || (opts.length === 2 && opts[1] === 'show')) {
    // show create zeon.html and zeon.js
    action = 'show'
    eoncode = opts[0]
  } else if (opts.length === 1 || (opts.length === 2 && opts[1] === 'del')) {
    // delete zeon.html zeon.js
    action = 'del'
    eoncode = opts[0]
  }
}

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
  let {action, eoncode, newHtmlText, infile, tofile} = data

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

  if (action === 'dofrom') {
    console.log('dofrom')
    console.log('eonName, preEonName', eonName, preEonName)

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

    let fileJsText = fs.readFileSync(infile, 'utf8')

    // fileJsText = jsToJs({eonName, preEonName, text: fileJsText})

    // console.log('fileJsText', infile, fileJsText)

    // fs.writeFile(`${newNameHtml}`, `${newHtmlText}`, function (err) { // eon-z815e-d2bernoulli.html
    //   if (err) throw err
    //   console.log(` ---- created ${newNameHtml}`)
    // })
    // fs.writeFile(`${newNameJs}`, ``, function (err) { // eon-z815e-d2bernoulli.js
    //   if (err) throw err
    //   console.log(` ---- created ${newNameJs}`)
    // })
  }
}

if (action === 'show' || action === 'doit' || action === 'debug' || action === 'dofrom') {
  doit({action, eoncode, newHtmlText, infile, tofile})
} else if (action === 'help') {
  console.log(`node ${prgname} eoncode (eg. 708w-torus-interleaved)`)
}
