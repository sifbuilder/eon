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
    let args = []

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
    const prgdir = __dirname // directory of calling js file
    const cwdir = process.cwd() // directory of invocation
    const rootDirPath = `${cwdDirPath}/../`

    // options

    const options = {
      qualiprefix: 'eon-z',
      closebrowser: 0,
      tracing: 0,
      tracingpath: './___trace.json',
      zpattern: new RegExp('^(((eon-z)(.*))-([^-.]*))[-]?(.*).(html)', 'i'),

      outext: 'png', // 'jpg', //
      outImgType: 'png', // 'jpeg', //
      snapTypes: ['preview', 'thumbnail'],

      qcols: 1, // 3, // number of thumbnails per row

      contentUrl: 'https://raw.githubusercontent.com/', // rsc host
      user: 'sifbuilder', // gh user
      repo: 'eons', // gh repo
      branch: 'master', // gh branch
      hostUrl: 'github.com/', //
      folder: 'blob', //

      prgFileName: path.basename(fileName), // file name of current module
      eonDirPath: cwdDirPath,
      teerDirPath: path.resolve(cwdDirPath, 'eonitem'),
      imgDirPath: path.resolve(cwdDirPath, 'img'),
      vidDirPath: path.resolve(cwdDirPath, 'vid'),

      outMdFile: 'README.md',

      picDirPath: `${rootDirPath}/pic`,
      tstDirPath: `${rootDirPath}/tst`,

      header: `# eons ${newLine}${newLine}**time space manyfolds** ${endOfLine}${newLine}${newLine}`,
      footer: `${newLine}# license${endOfLine}${newLine}MIT${endOfLine}`,

      indexpattern: new RegExp(`^eon-z.*.js`, 'i'), // z.eons
      eonpattern: new RegExp('^' + 'eon' + '.*' + '.*(.js)', 'i'), // eons
      testpattern: new RegExp('(.*).test.(.*)$', 'i'), //  test
      mdpattern: new RegExp('(.*).md.(.*)$', 'i'), //  md
      tspattern: new RegExp('(.*).ts.(.*)$', 'i'), //  ts

      zPattern: new RegExp(
        `^(?<prefixCodeName>(?<prefixCode>(?<prefix>eon)-(?<code>[^-.]*))[-]?(?<name>.*)).(?<ext>.*)$`,
        'i'
      ),
      partsPatternEonHtml: new RegExp(
        `^(?<prefixCodeName>(?<prefixCode>(?<prefix>eon)-(?<code>[^-.]*))[-]?(?<name>.*)).(?<ext>html)$`,
        'i'
      ),

      newLine: '\n',
      endOfLine: '  ',

      tileimg: `thumbnail`,
      tileext: `png`,
      notile: 'notile.png',
      tileview: {
        width: 230,
        height: 120,
      },
      previewimg: `preview`,
      previewext: `png`,
      gifext: `gif`,
      eonext: `html`,
      previewview: {
        width: 600,
        height: 400,
      },
      prefix: `eon-z`,
      inScopeExt: 'html',
    }

    options.outFilePath = `${rootDirPath}${options.outMdFile}`
    options.rootUrl = `${options.contentUrl}${options.user}/${options.repo}/${options.branch}/`
    options.rootImgUrl = `${options.contentUrl}${options.user}/${options.repo}/${options.folder}/${options.branch}/`
    options.rootRepoUrl = `https://${options.hostUrl}${options.user}/${options.repo}/`
    options.rootImgUrl = `https://${options.user}.${options.hostUrl}/${options.repo}/img/`
    options.rootVidUrl = `https://${options.user}.${options.hostUrl}/${options.repo}/vid/`
    options.rootRepoUrl = `https://${options.user}.${options.hostUrl}/${options.repo}/`
    options.col = coler(options.qcols)

    options.browseOpts = {
      headless: false, // puppeteer.launch
      devtools: false, // puppeteer.launch
      debuggingPort: 9222, // puppeteer.launch
      window: {
        // puppeteer.launch
        width: 1200,
        height: 900,
      },
      fullPage: false,
      clip: {
        // body default margin is 8px on all sides
        preview: {
          x: 8,
          y: 8,
          width: 600,
          height: 400,
        },
        thumbnail: {
          x: 8,
          y: 8,
          width: 180,
          height: 120,
        },
      },
      viewPort: { // page.setViewport

        preview: { // page.setViewport

          width: 600 + 8 + 8, // add body margin
          height: 400 + 8 + 8, // add body margin
        },
        thumbnail: {
          // page.setViewport
          width: 180,
          height: 120,
        },
      },
      delay: 3000, // waitInPromise
      timeout: 50000, // page.goto
      pageSelector: '#viewframe', // page.waitForSelector
    }

    // state

    let state = {
      eonDirPath: (cwdir + '/').replace(/\\/g, '/'),
      imgDirPath: (cwdir + '/img/').replace(/\\/g, '/'),
      inDir: './',
      inDirPath: (cwdir + '/').replace(/\\/g, '/'),
      teerDirPath: (prgdir + '/').replace(/\\/g, '/'),
      outDirPath: (cwdir + '/img/').replace(/\\/g, '/'),

      outText: '',
      where: 'local',
      inScopePattern: new RegExp(`^eon-z___none___.*.*$`, 'i'), // none pattern
      _: options, // options
    }

    // ....................... parseArgs
    let parseArgs = function (data = {}, context = {}) {
      let res = {}
      res.args = data
      res.actions = []
      res.codepattern = ''

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
        // first param
        if (res.args[0] === '.') {
          res.codepattern = '.*' // default to all files
        } else {
          res.codepattern = res.args[0] // pattern in first param
        }
      }

      return res
    }

    // .................. doItems
    async function doItems (__) {
      let files = fs
        .readdirSync(__._.eonDirPath) // to actView
        .filter(file => isFile(file))
        .filter(d => __.inScopePattern.test(d))

      let { eonDirPath, tracing, tracingpath } = __._
      let { timeout, pageSelector, delay } = __._.browseOpts

      // .................. doNextItem
      async function doNextItem (current) {
        if (current >= files.length) return

        let inFileName = files[current]
        let file = inFileName.match(__._.partsPatternEonHtml).groups
        if (includes(__.args.actions, 'debug')) console.log('file:', file)

        __ = enty.updState({ inFileName: inFileName, file: file })
        if (includes(__.args.actions, 'debug')) console.log('file:', __.file)

        let index = fwddir(`${eonDirPath}`) + `index.html`
        let eonUri = `${index}#${__.file.prefixCodeName}`

        if (includes(__.args.actions, 'debug')) console.log(`doing:  ${eonUri}`)

        // .................. doItemType
        let doItemType = async function (__) {
          let outFileName = `${__.file.prefixCode}-${__.snapType}.${
            __._.outext
          }` // preview, thumbnail
          let outPathName = path.resolve(__.outDirPath, outFileName)
          __ = enty.updState({ outFileName, outPathName })

          let viewPort = __._.browseOpts.viewPort[__.snapType]
          let itemOpts = Object.assign({}, __._, {
            path: __.outPathName,
            type: __._.outImgType,
            clip: __._.browseOpts.clip[__.snapType],
          })
          const pageSrc = await __.browser.newPage()
          await pageSrc.goto(`file:///${__.inPathName}`, {
            waitUntil: 'domcontentloaded',
          })
          await waitInPromise(__._.browseOpts.delay)(pageSrc.content())

          pageSrc.setViewport(viewPort) // viewport

          if (includes(__.args.actions, 'debug')) { console.log('screenshot:', itemOpts) }
          await pageSrc.screenshot(itemOpts)
        }

        if (includes(__.args.actions, 'debug')) console.log('state:', __)

        __.inPathName = path.resolve(__.inDirPath, __.inFileName) // first
        for (let snapType of __._.snapTypes) {
          __ = enty.updState({ snapType: snapType })
          await doItemType(__) // do each type
          __ = enty.updState({ inPathName: __.outPathName })
        }

        await doNextItem(current + 1)
      }

      return doNextItem(0) // 0
    }

    // .................. todo
    async function todo (data, context) {
      let __ = context
      let { headless, devtools, debuggingPort, window } = __._.browseOpts
      let { actions } = __.args
      if (includes(actions, 'debug')) console.log('would do:', __)

      const browser = await puppeteer.launch({
        headless: headless,
        devtools: devtools, // open DevTools when window launches
        args: [
          `--remote-debugging-port=${debuggingPort}`,
          `--window-size=${window.width},${window.height}`, // Window size
        ],
      })

      await browser.pages()
      __ = enty.updState({ browser: browser })

      await doItems(__) // doItems
      if (__._.closebrowser) await browser.close()
    }

    // .................. getHelp
    function getHelp (data, __) {
      let res = {
        helpText: '',
      }
      res.helpText = `
      ${__._.prgFileName} help:

      generate eons preview and thumbnail files
        .jpg [600x400] and .jpg [180x120]

      usage: node ${__._.prgFileName} pattern {debug, doit, dodebug}
          eg. node ${__._.prgFileName} 793d doit

      for each eon html files in scope, wait 5 seconds and take screen shot
  `
      return res
    }
    // .................. getHeline
    function getHeline () {
      return 'create preview, thumbnail'
    }
    // .................. doit
    let doit = function (data, __) {
      let args = enty.parseArgs(data, __)
      __ = enty.updState({ args })

      let inScopeText = `^eon-.*${__.args.codepattern}.*${__._.inScopeExt}$`
      let inScopePattern = new RegExp(`${inScopeText}`, 'i')
      __ = enty.updState({ inScopeText, inScopePattern })
      if (includes(__.args.actions, 'debug')) console.log('__:', __)

      if (includes(__.args.actions, 'help')) {
        let help = getHelp({}, __)
        __ = enty.updState({ help })
        console.log(__.help.helpText)
      }
      if (includes(__.args.actions, 'doit')) {
        todo({}, __)
      }
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
