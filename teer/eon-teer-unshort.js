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

const capitalize = d => d.charAt(0).toUpperCase() + d.slice(1)
let eonify = d => 'eon' + capitalize(d)

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
let eonPattern = new RegExp('^(eon-)(.*)(.js)', 'i')
let inScopePattern = new RegExp('^(eon-)(.*)(.js)', 'i')
let zjsPattern = new RegExp('^(eon-)z(.*)(.js)', 'i')
let zhtmlPattern = new RegExp('^(eon-)z(.*)(.html)', 'i')

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
  inScopePattern = new RegExp(`^(eon-)(.*${argpattern}.*)(.js)`, 'i')
}

const appdir = '.'

let eonFiles = fs.readdirSync(appdir)
  .filter(d => eonPattern.test(d))
  .filter(d => !zjsPattern.test(d))

let inScopeFiles = fs.readdirSync(appdir)
  .filter(d => inScopePattern.test(d))
  .filter(d => !zhtmlPattern.test(d))

const regexEonFileNameParts = new RegExp('^(?<eon>eon)-(?<type>.*)-(?<name>.*)(.js)$')

if (action === 'debug') console.log('inScopeFiles:', inScopeFiles)

// .................. jsToJs
function rep (data) {
  let {fromPattern, toPattern, text} = data

  let searchexp = RegExp(escapeRegExp(`${fromPattern}`), 'g')

  let arr
  while ((arr = searchexp.exec(text)) !== null) {
    let toreplace = arr[0]
    text = text.replace(toreplace, toPattern)
  }

  return text
}

function doit (data) {
  let {action} = data

  let pairs = []
  for (let i = 0; i < eonFiles.length; i++) {
    let fileName = eonFiles[i]
    if (action === 'debug') console.log('pair from:', fileName)
    let fileNameParts = fileName.match(regexEonFileNameParts)
    let {eon, type, name} = fileNameParts.groups
    pairs.push([type.charAt(0),
      name,
      type + capitalize(name),
      eonify(type + capitalize(name)),
      snakefy(eonify(type + capitalize(name))) ])
  }
  if (action === 'debug') console.log('pairs', pairs)

  for (let i = 0; i < inScopeFiles.length; i++) {
    let fileName = inScopeFiles[i]
    let fileText = fs.readFileSync(fileName, 'utf8')

    let text = fileText
    for (let i = 0; i < pairs.length; i++) {
      let pair = pairs[i]
      let fromPattern, toPattern

      let code = pair[0]
      let name = pair[1]
      let varname = pair[2]
      let eonified = pair[3]
      let snake = pair[4]

      fromPattern = `async function ${varname}` //  async function eohalNatform
      toPattern = `async function eonitem` //  => async function eonitem
      text = rep({fromPattern, toPattern, text})

      fromPattern = `exports.${varname} = ${varname}` //  exports.eohalNatform = eohalNatform
      toPattern = `exports.${varname} = eonitem` //  => exports.eohalNatform = eonitem
      text = rep({fromPattern, toPattern, text})

      fromPattern = varname // renderSvg
      toPattern = eonified //  => eonRenderSvg
      text = rep({fromPattern, toPattern, text})

      fromPattern = `__eo('xs').${code}('${name}')` // __eo('xs').r('svg')
      toPattern = `__eo('xs').u('${snake}')` // => __eo('xs').u('eon-render-svg')
      text = rep({fromPattern, toPattern, text})
    }
    if (action === 'debug') console.log('fileText:', text)

    if (action === 'show' || action === 'debug') {
      console.log(` ---- will update ${fileName}`)
    }
    if (action === 'debug') {
      console.log(` ---- new text of ${fileName}:`)
      console.log(text)
    }

    if (action === 'doit') {
      fs.writeFile(`${fileName}`, `${text}`, function (err) {
        if (err) throw err
        console.log(` ---- Updated ${fileName}`)
      })
    }
  }
}
function help (data = {}) {
  console.log(`node ${prgname} [inScopePatter] {doit | show | debug }`)
  console.log(`eg: `)
  console.log(`   node tee/eon-teer-unshort natform debug`)
}

if (action === 'show' || action === 'doit' || action === 'debug') {
  doit({action})
} else if (action === 'help') {
  help()
}
