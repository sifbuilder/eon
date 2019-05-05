/**********************
 *    @eonitem
 */
;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
      ? define(['exports'], factory)
      : factory((global.eonitem = global.eonitem || {}))
})(this, function (exports) {
  'use strict'

  // ....................... eonitem
  async function eonitem (__eo = {}) {
    const fs = require('fs')

    // ....................... fs

    const isFile = d => fs.lstatSync(d).isFile()

    let filename = __filename // full path name of the current module
    let prgname = path.basename(filename) // file name of current module
    let dirname = path.dirname(require.main.filename) // __dirname
    let dircwd = process.cwd() //
    let outdir = dircwd

    // .......................

    const camelize = str => str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => index === 0 ? letter.toLowerCase() : letter.toUpperCase())
      .replace(/\s+/g, '') // remove white space
      .replace(/-+/g, '') // remove hyphen

    // https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
    function escapeRegExp (string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
    }

    const includes = (a, b) => a.includes(b) // is element b in array a

    const newLine = '\n'

    // .......................

    let state = {
      inScopeRegExp: '',
      fileName: '',
      fileparts: {},
      filePath: '',
      args: {},
    }

    let options = {
      cwdDirPath: process.cwd(), // directory of invocation
      prgDirPath: __dirname, // directory of calling js file
      inDirPath: process.cwd(), // directory of in files

      partsPatternEon: new RegExp(`^(?<prefix>eon)-(?<codename>[^.]*).(?<ext>.*)$`, 'i'),

      newHtmlText: `<script src="./eon-x-eonify.js"></script>
      <script>eonXEonify.eonify({ anitem: eonXEonify.getEonItem(location.href)})</script>`,
      regexFileNameParts: new RegExp('^(eon-z)(.*).(js)', 'i'),
    }

    state._ = options

    // .................. todo
    async function todo (data, context) {
      let __ = context

      let inScopePattern = `^eon-.*${__.args.inPattern}.*.(js)$`
      let inScopeRegExp = new RegExp(`${inScopePattern}`, 'i')
      __ = enty.updState({ inScopeRegExp })

      let indexfiles = fs.readdirSync(__._.cwdDirPath)
        .filter(d => isFile(d))
        .filter(d => inScopePattern.test(d))

      if (includes(__.args.args, 'debug')) {
        console.log('infiles', indexfiles)
      }

      for (let i = 0; i < indexfiles.length; i++) {
        let fileItemName = indexfiles[i]
        let fileItemParts = fileItemName.match(__._.regexFileNameParts) // eg. [ 'eon-z-021a.html', 'eon-z', '-', '021a', 'html' ]

        let eonPart = fileItemParts[1]
        let corePart = fileItemParts[2]

        const newFileHtmlName = `${eonPart}${corePart}.html`
        const newFileHtmlPath = `${outdir}/${newFileHtmlName}`
        if (includes(__.args.actions, 'debug')) console.log('newFileHtmlPath:', newFileHtmlPath)

        if (includes(__.args.actions, 'debug')) {
          console.log(` ---- will create ${newFileHtmlPath}`) // eon-z-815e-d2bernoulli.html
        }

        if (includes(__.args.actions, 'debug')) {
          console.log(` ---- text of ${newFileHtmlPath}`)
          console.log(`${newHtmlText}`)
        }

        if (includes(__.args.actions, 'doit')) {
          fs.writeFile(`${newFileHtmlPath}`, `${__._.newHtmlText}`, function (err) { // eon-z815e-d2bernoulli.html
            if (err) throw err
            console.log(` ----Updated ${newFileHtmlPath}`)
          })
        }

        if (includes(__.args.actions, 'delete')) {
          fs.unlinkSync(`${newFileHtmlPath}`, function (err) { // eon-z815e-d2bernoulli.html
            if (err) throw err
            console.log(` ----Deleted ${newFileHtmlPath}`)
          })
        }
      }
    }

    // ....................... parseArgs
    let parseArgs = function (data = {}, context = {}) {
      let res = {}
      res.args = data
      res.actions = []
      res.dotype = ''
      res.inPattern = ''

      let optsq = res.args.length
      if (optsq === 0) {
        res.actions.push('help')
      }

      if (optsq < 2) {
        res.actions.push('help')
      }

      if (includes(res.args, 'help')) {
        res.actions.push('help')
      }
      if (includes(res.args, 'doit')) {
        res.actions.push('doit')
      }
      if (includes(res.args, 'debug')) {
        res.actions.push('debug')
      }

      if (optsq >= 1) {
        if (res.args[0] === '.') {
          res.inPattern = '.*' // default to all files
        } else {
          res.inPattern = res.args[0] // pattern in first param
        }
      }
      return res
    }

    // ....................... doit
    let doit = function (data, context) {
      let __ = context
      let args = enty.parseArgs(data, __)
      __ = enty.updState({ args })

      if (includes(__.args.actions, 'help')) {
        let help = getHelp({}, __)
        __ = enty.updState({ help })
        console.log(__.help.helpText)
      }

      if (includes(__.args.actions, 'doit') ||
        includes(__.args.actions, 'debug')
      ) {
        todo({}, __)
      }
    }

    // .................. getHelp
    function getHelp (data = {}, context) {
      const helpline = getHeline()
      let res = {
        helpText: '',
      }
      res.helpText += `${helpline}`
      return res
    }

    // .................. getHeline
    function getHeline () {
      let defin = 'gen eon htmls '
      let def = defin.padEnd(24, ' ')
      let mod = ' :: node do html . debug'
      return `${def}${mod}`
    }

    // ....................... enty
    let enty = () => {}

    enty.getHelp = getHelp
    enty.getHeline = getHeline
    enty.doit = doit
    enty.parseArgs = parseArgs
    enty.getState = () => state
    enty.setState = v => { state = v; return state }
    enty.updState = v => { state = Object.assign(state, v); return state }
    enty.getOptions = () => state.options

    return enty
  }

  exports.eonitem = eonitem
})
