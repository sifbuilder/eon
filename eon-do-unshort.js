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

    // .......................

    const camelize = str => str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => index === 0 ? letter.toLowerCase() : letter.toUpperCase())
      .replace(/\s+/g, '') // remove white space
      .replace(/-+/g, '') // remove hyphen

    const snakefy = str => str
      .replace(/([a-z][A-Z])/g, function (g) { return g[0] + '-' + g[1].toLowerCase() })

    const capitalize = d => d.charAt(0).toUpperCase() + d.slice(1)
    let eonify = d => 'eon' + capitalize(d)

    // https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
    function escapeRegExp (string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
    }

    const includes = (a, b) => a.includes(b) // is element b in array a

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
      searchexp: RegExp(escapeRegExp(` XXXXXX `), 'm'),
      replacepattern: escapeRegExp(`YYYYYYYYYYYY`),
    }
    state._ = options

    // .................. todo
    async function todo (data, context) {
      let __ = context

      let inScopeRegExp = __.args.inScopeRegExp
      __ = enty.updState({ inScopeRegExp })

      let eonPattern = new RegExp('^(eon-)(.*)(.js)', 'i')
      let zjsPattern = new RegExp('^(eon-)z(.*)(.js)', 'i')
      let eonFiles = fs.readdirSync(__._.inDirPath)
        .filter(d => eonPattern.test(d))
        .filter(d => !zjsPattern.test(d))

      let zhtmlPattern = new RegExp('^(eon-)z(.*)(.html)', 'i')
      let inScopeFiles = fs.readdirSync(__._.inDirPath)
        .filter(d => inScopeRegExp.test(d))
        .filter(d => !zhtmlPattern.test(d))

      if (includes(__.args.args, 'debug')) {
        console.log('inScopeFiles', inScopeFiles)
      }

      const regexEonFileNameParts = new RegExp('^(?<eon>eon)-(?<type>.*)-(?<name>.*)(.js)$')

      let pairs = []
      for (let i = 0; i < eonFiles.length; i++) {
        let fileName = eonFiles[i]
        if (includes(__.args, 'debug')) console.log('pair from:', fileName)
        let fileNameParts = fileName.match(regexEonFileNameParts)
        let {eon, type, name} = fileNameParts.groups
        pairs.push([type.charAt(0),
          name,
          type + capitalize(name),
          eonify(type + capitalize(name)),
          snakefy(eonify(type + capitalize(name))) ])
      }
      if (includes(__.args, 'debug')) console.log('pairs', pairs)

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
        if (includes(__.args, 'doit')) {
          console.log('fileText:', text)
        }

        if (includes(__.args, 'debug')) {
          console.log(` ---- will update ${fileName}`)
        }
        if (includes(__.args, 'debug')) {
          console.log(` ---- new text of ${fileName}:`)
          console.log(text)
        }

        if (includes(__.args, 'doit')) {
          fs.writeFile(`${fileName}`, `${text}`, function (err) {
            if (err) throw err
            console.log(` ---- Updated ${fileName}`)
          })
        }
      }
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
        res.inScopePattern = `^(eon-)(.*${res.inPattern}.*)(.js)`
        res.inScopeRegExp = new RegExp(res.inScopePattern, 'i')
      }
      return res
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
      let defin = 'unshort eon refs'
      let def = defin.padEnd(24, ' ')
      let mod = ' :: node do unshort natform debug'
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
