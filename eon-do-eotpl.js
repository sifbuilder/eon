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
    const path = require('path')
    const http = require('http')
    const puppeteer = require('puppeteer')

    const waitInPromise = delay => arg =>
      Number.isFinite(delay) && delay > 0
        ? new Promise(resolve => setTimeout(() => resolve(arg), delay))
        : Promise.resolve(arg)

    const eoname = elems => elems.filter(d => d !== '').join('-')
    const includes = (a, b) => a.includes(b) // is element b in array a

    const rower = q => n => Math.floor(n / q)
    const coler = q => n => n % q

    const fwddir = d => (d + '/').replace(/\\/g, '/')
    const getindex = d => (d + '/').replace(/\\/g, '/') + `index.html`
    const anchored = (d, a) => getindex(d) + '#' + a

    const newLine = '\n'
    const endOfLine = '  '

    // fs

    const isDirectory = d => fs.lstatSync(d).isDirectory()
    const isFile = d => fs.lstatSync(d).isFile()
    const existsFile = d => fs.existsSync(d)

    const fileName = __filename // full path name of the current module
    const cwdDirPath = process.cwd() // directory of invocation
    const prgDirPath = __dirname // directory of calling js file
    const rootDirPath = cwdDirPath

    // .................. replaceInText
    function replaceInText (data) {
      let {pretext, postext, intext} = data

      let searchexp = RegExp(`${pretext}`, 'g')

      let arr
      while ((arr = searchexp.exec(intext)) !== null) {
        let toreplace = arr[0]
        intext = intext.replace(toreplace, postext)
      }

      return intext
    }

    const camelize = str => str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => index === 0 ? letter.toLowerCase() : letter.toUpperCase())
      .replace(/\s+/g, '') // remove white space
      .replace(/-+/g, '') // remove hyphen

    function escapeRegExp (string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
    }

    const capitalize = s => (s == null) ? '' : s.charAt(0).toUpperCase() + s.slice(1)

    const prefixy = codename => 'eon' + capitalize(codename)

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

      eonDirPath: process.cwd(),
      teerDirPath: path.resolve(cwdDirPath, 'eonitem'),
      imgDirPath: path.resolve(cwdDirPath, 'img'),
      vidDirPath: path.resolve(cwdDirPath, 'vid'),
      prgFileName: path.basename(fileName),
      isJsFile: new RegExp(
        `^(?<prefix>eon)-(?<codename>[^.]*).(?<ext>js)$`,
        'i'
      ),
      partsPatternEon: new RegExp(
        `^(?<prefix>eon)-(?<codename>[^.]*).(?<ext>.*)$`,
        'i'
      ),
      newHtmlText: `<script src="./eon-x-eonify.js"></script>
      <script>eonXEonify.eonify({ anitem: eonXEonify.getEonItem(location.href)})</script>`,
    }
    state._ = options

    // ....................... parseArgs
    let parseArgs = function (data, context) {
      let __ = context
      let res = {
        args: data,
        actions: [],
        dotype: '',
        todoCodeName: '',
      }

      let optsq = res.args.length
      if (optsq === 0) {
        res.actions.push('help')
      }

      if (optsq < 2) {
        res.actions.push('help')
      }

      if (includes(res.args, 'help')) {
        // last opt
        res.actions.push('help')
      }
      if (includes(res.args, 'doit')) {
        res.actions.push('doit')
      }
      if (includes(res.args, 'debug')) {
        res.actions.push('debug')
      }

      if (optsq >= 1) {
        res.todoCodeName = res.args[0] // eoncode
      }

      if (optsq >= 2) {
        let fromFile = res.args[1]
        let fromRegExp = new RegExp(`${fromFile}`, 'i')

        const fromFiles = fs.readdirSync(__._.inDirPath)
          .filter(file => isFile(file))
          .filter(d => fromRegExp.test(d))
          .filter(d => __._.isJsFile.test(d))

        if (fromFiles && fromFiles.length === 1) {
          res.fromFile = fromFiles[0]
        }
      }

      return res
    }

    // ....................... todo
    let todo = function (data, context) {
      let __ = context
      if (includes(__.args.actions, 'debug')) {
        console.log('__', __)
      }

      let newCodeName = `${__.args.todoCodeName}`
      let newNameHtml = `eon-${newCodeName}.html`
      let newNameJs = `eon-${newCodeName}.js`
      let newHtmlText = __._.newHtmlText

      let fromFile = __.args.fromFile

      if (fromFile === undefined) {
        if (includes(__.args.actions, 'debug')) {
          console.log(`will write: ${newNameHtml}`)
          console.log(`   with text: ${newHtmlText}`)
          console.log(`will write: ${newNameJs}`)
          console.log(`   with text: ''`)
        }
        if (includes(__.args.actions, 'doit')) {
          fs.writeFile(`${newNameHtml}`, `${newHtmlText}`, function (err) { // eon-z815e-d2bernoulli.html
            if (err) throw err
            console.log(` ---- created ${newNameHtml}`)
          })
          fs.writeFile(`${newNameJs}`, ``, function (err) { // eon-z815e-d2bernoulli.js
            if (err) throw err
            console.log(` ---- created ${newNameJs}`)
          })
        }
      } else {
        let fileparts = fromFile.match(__._.partsPatternEon).groups
        const newEonName = prefixy(camelize(newCodeName))
        const preEonName = prefixy(camelize(fileparts.codename))
        if (includes(__.args.actions, 'debug')) {
          console.log(`will write: ${newNameHtml} 
                         with text: ${newHtmlText}`)
          console.log(`will write: ${newNameJs}
                        fromFile: ${fromFile}
                        replacing: ${preEonName} with ${newEonName}                        
                        `)
        }

        let fileJsText = fs.readFileSync(fromFile, 'utf8')

        fileJsText = replaceInText({pretext: preEonName, postext: newEonName, intext: fileJsText})
        if (includes(__.args.actions, 'debug')) console.log('fileJsText', fileJsText)

        if (includes(__.args.actions, 'doit')) {
          fs.writeFile(`${newNameHtml}`, `${newHtmlText}`, function (err) { // eon-z815e-d2bernoulli.html
            if (err) throw err
            console.log(` ---- created ${newNameHtml}`)
          })
          fs.writeFile(`${newNameJs}`, fileJsText, function (err) { // eon-z815e-d2bernoulli.js
            if (err) throw err
            console.log(` ---- created ${newNameJs}`)
          })
        }
      }
    }

    // ....................... doit
    let doit = function (data, context) {
      let __ = context
      let args = enty.parseArgs(data, __)
      __ = enty.updState({ args })

      if (includes(__.args.actions, 'help') ||
      includes(__.args.actions, 'debug') ||
      includes(__.args.actions, 'doit')
      ) {
        console.log(`doing: ${__._.prgFileName}`)
      }

      if (includes(__.args.actions, 'help')) {
        let help = getHelp({}, __)
        __ = enty.updState({ help })
        console.log(__.help.helpText)
      }

      if (includes(__.args.actions, 'doit') ||
      includes(__.args.actions, 'debug')) {
        todo({}, __)
      }
    }

    // .................. getHelp
    function getHelp (data = {}, context) {
      let __ = context
      let res = {
        helpText: '',
      }
      res.helpText = `
  ${getHeline()}
  node ${__._.prgFileName} {show, doit, debug, dofrom}
  node ${__._.prgFileName} eoncode (eg. 708w-torus-interleaved)
  doit: create html file from model, js file
  if dofrom: copy html, js, update js
`
      return res
    }

    // .................. getHeline
    function getHeline () {
      let defin = 'generate eon template'
      let def = defin.padEnd(24, ' ')
      let mod = ' :: node do eotpl . z999z-zzz z189a debug'
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
