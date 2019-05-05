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
      searchpattern: '(?<!\s)[ \t]{2,}',  // tabs
      replacepattern: escapeRegExp(''),
    }
    options.searchexp = RegExp(options.searchpattern, 'g')
    state._ = options

    // .................. todo
    async function todo (data, context) {
      let __ = context

      let inScopePattern = `^eon-.*${__.args.inPattern}.*$`
      let inScopeRegExp = new RegExp(`${inScopePattern}`, 'i')
      __ = enty.updState({ inScopeRegExp })

      let infiles = fs
        .readdirSync(__._.inDirPath)
        .filter(file => isFile(file))
        .filter(d => __.inScopeRegExp.test(d))

      if (includes(__.args.args, 'debug')) {
        console.log('infiles', infiles)
      }

      let promises = infiles.map(fileName => {
        Promise.resolve(fileName)
          .then(fileName => {
            let fileparts = fileName.match(__._.partsPatternEon).groups
            let filePath = `${__._.inDirPath}/${fileName}`
            __ = enty.updState({ fileName, fileparts, filePath })

            // ... apply
            function apply (data, context) {
              let __ = context
              let eonfile = __.filePath
              if (includes(__.args.actions, 'debug')) console.log('eonfile:', eonfile)

              if (fs.existsSync(eonfile)) { // if md file
                let fileTxt = fs.readFileSync(eonfile, 'utf8')
                if (includes(__.args.actions, 'debug')) console.log(`debug: will search "${__._.searchexp}" in ${eonfile} ${newLine}`)

                let isInFile = __._.searchexp.test(fileTxt)
                if (isInFile == false) {
                  console.log(`search pattern "${__._.searchexp}" not found`)
                } else {
                  console.log(`search pattern "${__._.searchexp}" found in ${eonfile}`)
                  let arr
                  while ((arr = __._.searchexp.exec(fileTxt)) != null) {
                    if (includes(__.args.actions, 'debug')) console.log(`pattern ${__._.searchexp} found in file ${eonfile}`)
                    let toreplace = arr[0]
                    console.log(`replace pattern ${toreplace} by ${__._.replacepattern}`)
                    fileTxt = fileTxt.replace(toreplace, __._.replacepattern)
                  }

                  if (includes(__.args.actions, 'debug')) {
                    console.log('debug: replaced text:')
                    let lines = fileTxt.split('\n')
                    for (let i = 0; i < lines.length; i++) {
                      let line = lines[i]
                      console.log(line)
                    }
                  }

                  if (includes(__.args.actions, 'doit')) {
                    console.log(`${newLine} apply ${eonfile} ${newLine}`)
                    fs.writeFileSync(eonfile, fileTxt)
                  }
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
      let defin = 'remove tabs '
      let def = defin.padEnd(24, ' ')
      let mod = ' :: node do untab . debug'
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
