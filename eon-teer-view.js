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
    const prgFileName = path.basename(fileName) // file name of current module
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
      partsPattern: new RegExp(
        `^(?<prefixCodeName>(?<prefixCode>(?<prefix>eon)-(?<code>[^-.]*))[-]?(?<name>.*)).(?<ext>js)$`,
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
      inScopeExt: 'js',
    }

    options.outFilePath = `${rootDirPath}${options.outMdFile}`
    options.rootUrl = `${options.contentUrl}${options.user}/${options.repo}/${options.branch}/`
    options.rootImgUrl = `${options.contentUrl}${options.user}/${options.repo}/${options.folder}/${options.branch}/`
    options.rootRepoUrl = `https://${options.hostUrl}${options.user}/${options.repo}/`
    options.rootImgUrl = `https://${options.user}.${options.hostUrl}/${options.repo}/img/`
    options.rootVidUrl = `https://${options.user}.${options.hostUrl}/${options.repo}/vid/`
    options.rootRepoUrl = `https://${options.user}.${options.hostUrl}/${options.repo}/`
    options.col = coler(options.qcols)

    options.browseopts = {
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
        x: 0,
        y: 0,
        width: 600,
        height: 400,
      },
      viewPort: {
        // pageSrc.setViewport
        width: 600,
        height: 400,
      },
      delay: 3000, // waitInPromise
      timeout: 50000, // pageSrc.goto
      pageSelector: '#viewframe', // pageSrc.waitForSelector
    }
    // state

    let state = {
      outText: '',
      where: 'local',
      inScopePattern: new RegExp(`^eon-z___none___.*.*$`, 'i'), // none pattern
      options: options, // options
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

      if (optsq < 3) {
        res.actions.push('help')
      }

      if (res.args[optsq - 1] === 'help') {
        // last opt
        res.actions.push('help')
      } else if (res.args[optsq - 1] === 'doit') {
        res.actions.push('doit')
      } else if (res.args[optsq - 1] === 'debug') {
        res.actions.push('debug')
      } else if (res.args[optsq - 1] === 'dodebug') {
        res.actions.push('doit')
        res.actions.push('debug')
      }

      if (optsq >= 2) {
        // first param
        if (res.args[0] === '.') {
          res.codepattern = '.*' // default to all files
        } else {
          res.codepattern = res.args[0] // pattern in first param
        }
      }

      return res

    }

    // .................. actUponItems
    async function actUponItems (_) {
      let files = fs
        .readdirSync(_.options.eonDirPath) // to actView
        .filter(file => isFile(file))
        .filter(d => _.inScopePattern.test(d))

      let { eonDirPath, tracing, tracingpath } = _.options
      let { viewPort, timeout, pageSelector, delay } = _.options.browseopts

      // .................. actUponNext
      async function actUponNext (current) {
        
        if (current >= files.length) return
        let fileName = files[current]
        console.log('fileName:', eonDirPath, fileName)

        let file = fileName.match(_.options.partsPattern).groups
        _ = enty.updState({ file: file })
        if (includes(_.args.actions, 'debug')) console.log('file:', _.file)

        let index = fwddir(`${eonDirPath}`) + `index.html`
        let eonUri = `${index}#${_.file.prefixCodeName}`        

        if (includes(_.args.actions, 'debug')) console.log(`doing:  ${eonUri}`)

        const pageSrc = await _.browser.newPage()
        pageSrc.setViewport(viewPort) // viewport

        if (tracing) {
          await pageSrc.tracing.start({
            path: tracingpath,
            screenshots: true,
          })
        }

        await pageSrc.goto(`file:///${eonUri}`, {
          waitUntil: 'domcontentloaded',
          timeout: timeout, // timeout
        })
        await pageSrc.waitForSelector(pageSelector)
        await waitInPromise(delay)(pageSrc.content())

        pageSrc.on('pageerror', function (err) {
          let theTempValue = err.toString()
          console.log('pageSrc error: ' + theTempValue)
        })
        pageSrc.on('error', function (err) {
          let theTempValue = err.toString()
          console.log('Error: ' + theTempValue)
        })
        pageSrc.on('console', msg => {
          for (let i = 0; i < msg.args.length; ++i) {
            console.log(`${i}: ${msg.args[i]}`)
          }
        })
        await pageSrc.evaluate(() => console.log(`url is ${location.href}`))

        if (tracing) await pageSrc.tracing.stop()

        await actUponNext(current + 1)
      }

      return actUponNext(0) // 0
    }

    // .................. todo
    async function todo (data, context) {
      let _ = context
      let { headless, devtools, debuggingPort, window } = _.options.browseopts
      let { actions } = _.args
      if (includes(actions, 'debug')) console.log('would do:', _)

      const browser = await puppeteer.launch({
        headless: headless,
        devtools: devtools, // open DevTools when window launches
        args: [
          `--remote-debugging-port=${debuggingPort}`,
          `--window-size=${window.width},${window.height}`, // Window size
        ],
      })

      await browser.pages()
      _ = enty.updState({ browser: browser })

      await actUponItems(_) // actUponItems
      if (_.options.closebrowser) await browser.close()
    }

    // .................. getHelp
    function getHelp (data, _) {
      let res = {
        helpText: '',
      }
      res.helpText = `
  node ${_.prgFileName} inScopePattern {debug | doit}}
     inScopePattern applies to eon-z files
  call puppeteer and show html eon
  eg.: node ${_.prgFileName} .*
  eg.: node ${_.prgFileName} 793
  eg.: node ${_.prgFileName} 793d debug
  eg.: node ${_.prgFileName} 793d doit
  `
      return res
    }

    // .................. doit
    let doit = function (data, _) {
      let args = enty.parseArgs(data, _)
      _ = enty.updState({ args })

      let inScopeText = `^eon-.*${_.args.codepattern}.*${_.options.inScopeExt}$`
      let inScopePattern = new RegExp(`${inScopeText}`, 'i')
      _ = enty.updState({ inScopeText, inScopePattern })
      if (includes(_.args.actions, 'debug')) console.log('_:', _)

      if (includes(_.args.actions, 'help')) {
        let help = getHelp({}, _)
        _ = enty.updState({ help })
        console.log(_.help.helpText)
      }
      if (includes(_.args.actions, 'doit')) {
        todo({}, _)
      }
    }

    // ....................... enty
    let enty = () => {}

    enty.getHelp = getHelp
    enty.doit = doit
    enty.parseArgs = parseArgs
    enty.getState = () => state
    enty.setState = _ => ((state = _), state)
    enty.updState = _ => ((state = Object.assign(state, _)), state)
    enty.getoptions = () => state.options

    return enty
  }

  exports.eonitem = eonitem
})
