/** ********************
 *    @eonitem
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
      ? define(['exports'], factory)
      : factory((global.eonitem = global.eonitem || {}))
}(this, (exports) => {
  async function eonitem (__eo = {}) {
    const fs = require('fs')
    const path = require('path')
    const http = require('http')
    const puppeteer = require('puppeteer')

    const waitInPromise = delay => arg =>
      (Number.isFinite(delay) && delay > 0
        ? new Promise(resolve => setTimeout(() => resolve(arg), delay))
        : Promise.resolve(arg))

    const eoname = elems => elems.filter(d => d !== '').join('-')
    const includes = (a, b) => a.includes(b) // is element b in array a

    const rower = q => n => Math.floor(n / q)
    const coler = q => n => n % q

    const fwddir = d => (`${d}/`).replace(/\\/g, '/')
    const getindex = d => `${(`${d}/`).replace(/\\/g, '/')}index.html`
    const anchored = (d, a) => `${getindex(d)}#${a}`


    // fs

    const isDirectory = d => fs.lstatSync(d).isDirectory()
    const isFile = d => fs.lstatSync(d).isFile()
    const existsFile = d => fs.existsSync(d)

    const fileName = __filename // full path name of the current module
    const cwdDirPath = process.cwd() // directory of invocation
    const prgDirPath = __dirname // directory of calling js file
    const rootDirPath = cwdDirPath

    // options

    const options = {
      qcols: 1, // 3, // number of thumbnails per row

      contentUrl: 'https://raw.githubusercontent.com/', // rsc host
      user: 'sifbuilder', // gh user
      repo: 'eons', // gh repo
      branch: 'master', // gh branch
      hostUrl: 'github.com/', //
      folder: 'blob', //

      eonDirPath: cwdDirPath,
      teerDirPath: path.resolve(cwdDirPath, 'eonitem'),
      imgDirPath: path.resolve(cwdDirPath, ''),
      vidDirPath: path.resolve(cwdDirPath, 'vid'),
      prgFileName: path.basename(fileName),

      outMdFile: 'README.md',

      picDirPath: `${rootDirPath}/pic`,
      tstDirPath: `${rootDirPath}/tst`,

      header: '---',
      footer: '---',

      indexpattern: new RegExp('^eon-z.*.js', 'i'), // z.eons
      eonpattern: new RegExp('^' + 'eon' + '.*' + '.*(.js)', 'i'), // eons
      testpattern: new RegExp('(.*).test.(.*)$', 'i'), //  test
      mdpattern: new RegExp('(.*).md.(.*)$', 'i'), //  md
      tspattern: new RegExp('(.*).ts.(.*)$', 'i'), //  ts

      newLine: '\n',
      endOfLine: '  ',

      tileimg: 'thumbnail',
      tileext: 'png',
      notile: 'notile.png',
      tileview: {
        width: 230,
        height: 120,
      },
      previewimg: 'preview',
      previewext: 'png',
      gifext: 'gif',
      eonext: 'html',
      previewview: {
        width: 600,
        height: 400,
      },
      prefix: 'eon-z',
      inScopeExt: 'js',
    }

    options.outFilePath = `${rootDirPath}/${options.outMdFile}`
    options.rootUrl = `${options.contentUrl}${options.user}/${options.repo}/${options.branch}/`
    options.rootImgUrl = `${options.contentUrl}${options.user}/${options.repo}/${options.folder}/${options.branch}/`
    options.rootRepoUrl = `https://${options.hostUrl}${options.user}/${options.repo}/`
    options.rootImgUrl = `https://${options.user}.${options.hostUrl}/${options.repo}/`
    options.rootVidUrl = `https://${options.user}.${options.hostUrl}/${options.repo}/vid/`
    options.rootRepoUrl = `https://${options.user}.${options.hostUrl}/${options.repo}/`
    options.baseUri = options.rootRepoUrl
    options.col = coler(options.qcols)

    // state

    let state = {
      outText: '',
      where: 'local',
      inScopePattern: new RegExp('^eon-z___none___.*.*$', 'i'), // none pattern
      eoblogs: {
        b0: 'eoblogs init',
      },
      _: options, // options
    }

    // ....................... parseArgs
    const parseArgs = function (data, context) {
      const __ = context
      const res = {}
      res.args = data
      res.actions = []
      res.dotype = ''
      res.codepattern = ''

      const optsq = res.args.length
      if (optsq === 0) {
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

      res.dotype = 'list' // default
      if (includes(res.args, 'tile')) {
        res.dotype = 'tile'
      } else if (includes(res.args, 'rows')) {
        res.dotype = 'rows'
      } else if (includes(res.args, 'rows')) {
        res.dotype = 'list'
      }

      return res
    }
    // ....................... eoblogs
    state.eoblogs.b1 = `--- b1 -- vscode settings eslint 
    "eslint.enable": true,
    "eslint.run": "onType",
    "eslint.options": { "configFile": ".eslintrc.js" },
    "eslint.nodePath": "%rootDir%\\e\\node.exe",
    "eslint.alwaysShowStatus": true,
    "eslint.autoFixOnSave": false,
    "eslint.validate": [ "javascript", { "language": "html", "autoFix": true } ],
`
    // ....................... todo
    function todo (data = {}, context = {}) {
      const __ = context
      let outText = ''

      outText += __._.header + __._.endOfLine + __._.newLine + __._.newLine

      const eob = `b${__.eob}`
      if (includes(__.args.actions, 'debug')) console.log('eob:', eob)
      if (__.eoblogs[eob]) {
        outText += __.eoblogs[eob]
      }

      outText += __._.newLine + __._.footer

      return outText
    }

    // ....................... doit
    const doit = function (data, context) {
      let __ = context
      const args = enty.parseArgs(data, __)

      __ = enty.updState({ args })
      if (includes(__.args.actions, 'debug')) console.log('__:', __)

      let eob = -1
      const index = Math.max(__.args.args.indexOf('--blog'), __.args.args.indexOf('-b'))
      if (includes(__.args.actions, 'debug')) console.log('eoblog index', index)
      if (index !== -1) {
        eob = +__.args.args[index + 1]
      }
      __ = enty.updState({ eob })

      if (includes(__.args.actions, 'help')) {
        const help = getHelp({}, __)
        console.log(help.helpText)
      }
      if (1 ||
        includes(__.args.actions, 'doit') ||
        includes(__.args.actions, 'debug')) {
        const outText = todo({}, __)
        console.log(outText)
      }
    }

    // .................. getHelp
    function getHelp (data = {}, context = {}) {
      const helpline = getHeline()
      const res = {
        helpText: '',
      }
      res.helpText = `${helpline}`
      return res
    }

    // .................. getHeline
    function getHeline () {
      return 'show blog; node do eoblog -b 0 debug'
    }

    // ....................... enty
    let enty = () => {}

    enty.getHelp = getHelp
    enty.getHeline = getHeline
    enty.doit = doit
    enty.parseArgs = parseArgs
    enty.getState = () => state
    enty.setState = (v) => { state = v; return state }
    enty.updState = (v) => { state = Object.assign(state, v); return state }
    enty.getoptions = () => state.options

    return enty
  }

  exports.eonitem = eonitem
}))
