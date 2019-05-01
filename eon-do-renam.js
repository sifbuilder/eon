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

  async function eonitem (__eo = {}) {
    const fs = require('fs')
    const path = require('path')
    const http = require('http')
    const puppeteer = require('puppeteer')

    // ....................... fs

    const isDirectory = d => fs.lstatSync(d).isDirectory()
    const isFile = d => fs.lstatSync(d).isFile()
    const existsFile = d => fs.existsSync(d)

    // .......................

    // https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
    function escapeRegExp (string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
    }

    const includes = (a, b) => a.includes(b) // is element b in array a

    function toPathname (dirname, relativePath) {
      let pathname = path.resolve(dirname, relativePath).replace(/\\/g, '/')
      if (pathname[0] !== '/') {
        pathname = '/' + pathname
      }
      return pathname
    }

    function toFileUrl (dirname, relativePath) {
      return 'file://' + toPathname(dirname, relativePath)
    }

    const newLine = '\n'
    const endOfLine = '  '

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
      partsPatternEon: new RegExp(
        `^(?<prefix>eon)-(?<codename>[^.]*).(?<ext>.*)$`,
        'i'
      ),
      fromReplace: '(^__from)',
      toReplace: '(^__to$)',
    }
    state._ = options

    // .................. todo
    async function todo (data, context) {
      let __ = context
      console.log('__:', __)

      let inScopePattern = `^eon-.*${__.args.inPattern}.*$`
      let inScopeRegExp = new RegExp(`${inScopePattern}`, 'i')
      __ = enty.updState({ inScopeRegExp })

      let infiles = fs
        .readdirSync(__._.inDirPath)
        .filter(file => isFile(file))
        .filter(d => __.inScopeRegExp.test(d))

      let promises = infiles.map(fileName => {
        Promise.resolve(fileName)
          .then(fileName => {
            let fileparts = fileName.match(__._.partsPatternEon).groups
            let filePath = `${__._.inDirPath}/${fileName}`
            let filePathname = toPathname(__._.inDirPath, fileName)
            let fileUrl = toFileUrl(__._.inDirPath, fileName)
            __ = enty.updState({ fileName, fileparts, filePath, filePathname, fileUrl })

            // ... apply
            function apply (data, context) {
              let __ = context
              let eonfile = __.filePath
              if (includes(__.args.actions, 'debug')) console.log('check name:', eonfile)
              if (fs.existsSync(eonfile)) { // if md file
                if (includes(__.args.actions, 'debug')) console.log('doing name:', eonfile)

                let {fromReplace, toReplace} = __.args
                if (includes(__.args.actions, 'debug')) console.log('doing:', fromReplace, toReplace)
                let regex = new RegExp(`${fromReplace}`, 'i')

                let newFileName = fileName.replace(regex, toReplace)
                let newFilePath = `${__._.inDirPath}/${newFileName}`
                if (1 && 1) console.log(`${filePath} -> ${newFilePath}`)

                if (includes(__.args.actions, 'doit')) {
                  fs.renameSync(fileName, newFileName)
                }
              }
            }

            apply({}, __)
          })
      })
      Promise.all(promises)
        .then(() => { console.log('done') })
    }
    // ....................... parseArgs
    let parseArgs = function (data = {}, context = {}) {
      let __ = context
      let res = {}
      res.args = data
      res.actions = []
      res.dotype = ''
      res.inPattern = ''

      let opts = res.args
      let optsq = opts.length
      if (optsq === 0) {
        res.actions.push('help')
      }

      if (optsq < 4) { // from to debug doit
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

      if (optsq >= 2) { // from to debug
        let frompattern = res.args[0]
        let toReplace = res.args[1]
        res.fromReplace = `(${frompattern})`
        res.toReplace = `${toReplace}`
      }

      if (optsq >= 3) {
        let inpattern = res.args[2]
        if (inpattern === '.') {
          res.inPattern = '.*' // default to all files
        } else {
          res.inPattern = inpattern // pattern in first param
        }
      }

      return res
    }

    // ....................... doit
    let doit = function (data, context) {
      let __ = context
      let args = enty.parseArgs(data, __)
      __ = enty.updState({ args })
      if (includes(__.args.actions, 'debug')) console.log('args:', args)

      if (includes(__.args.actions, 'help')) {
        let help = getHelp({}, __)
        __ = enty.updState({ help })
        console.log(__.help.helpText)
      }

      if (includes(__.args.actions, 'doit')) {
        if (includes(__.args.actions, 'debug')) console.log('do doit')
        todo({}, __)
      }

      if (includes(__.args.actions, 'debug')) {
        let help = getHelp({}, __)
        __ = enty.updState({ help })
        console.log(__.help.helpText)
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
`
      return res
    }
    // .................. getHeline
    function getHeline () {
      return 'rename files: from to pattern action'
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
