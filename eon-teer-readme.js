/**********************
 *    @teer
 */
;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
      ? define(['exports'], factory)
      : factory((global.teer = global.teer || {}))
})(this, function (exports) {
  'use strict'

  async function teer (__eo = {}) {
    let args = []

    const fs = require('fs')
    const path = require('path')
    const http = require('http')
    const puppeteer = require('puppeteer')

    const waitInPromise = delay => arg =>
      Number.isFinite(delay) && delay > 0
        ? new Promise(resolve => setTimeout(() => resolve(arg), delay))
        : Promise.resolve(arg)

    const includes = (a, b) => a.includes(b) // is element b in array a

    const rower = q => n => Math.floor(n / q)
    const coler = q => n => n % q

    // fs

    const isDirectory = d => fs.lstatSync(d).isDirectory()
    const isFile = d => fs.lstatSync(d).isFile()
    const existsFile = d => fs.existsSync(d)
    
    let filename = __filename // full path name of the current module
    let prgname = path.basename(filename) // file name of current module
    let dirname = path.dirname(require.main.filename) // __dirname
    let cwdir = process.cwd() // directory of invocation
    let prgdir = __dirname // directory of calling js file
    
    let teerPath = path.resolve(cwdir, 'teer')
    let imgPath = path.resolve(cwdir, 'img')
    let vidPath = path.resolve(cwdir, 'vid')
    console.assert(fs.existsSync(teerPath), `teer dir does not exist`)
    console.assert(fs.existsSync(imgPath), `img dir does not exist`)
    console.assert(fs.existsSync(vidPath), `vid dir does not exist`)

    // options
    const options = {
      teerPath,
      imgPath,
      vidPath,
    }
    

    // state
    const state = {
      outDir: './',
      outMdFile: 'README.md',
      outText: '',
      rootdirpath: (cwdname + '/').replace(/\\/g, '/'),
      outdirpath: (cwdname + '/../').replace(/\\/g, '/'),
      where: 'local',
      qcols: 1, // 3, // number of thumbnails per row
      contentUrl: 'https://raw.githubusercontent.com/', // rsc host
      user: 'sifbuilder', // gh user
      repo: 'eons', // gh repo
      branch: 'master', // gh branch
      hostUrl: 'github.com/', //
      folder: 'blob', //

      indexpattern: new RegExp(`^eon-z.*.js`, 'i'), // z.eons
      eonpattern: new RegExp('^' + 'eon' + '.*' + '.*(.js)', 'i'), // eons
      testpattern: new RegExp('(.*).test.(.*)$', 'i'), //  test
      mdpattern: new RegExp('(.*).md.(.*)$', 'i'), //  md
      tspattern: new RegExp('(.*).ts.(.*)$', 'i'), //  ts
      zpattern: new RegExp('^' + 'eon-z' + '.*' + '.*(.js)', 'i'),

      partsPattern: new RegExp(`^(((eon-z)([^-.]*))[-]?(.*))(.js)$`, 'i'),

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

      inScopePattern: new RegExp(`^eon-z___none___.*.*$`, 'i'), // none pattern
      inScopeExt: 'js',
      inDir: './',
      indirpath: (dirname + '/').replace(/\\/g, '/'), // z-indexes
    }
    state.outPath = `${state.outDir}${state.outMdFile}`
    state.picDirPath = `${state.rootdirpath}/pic`
    state.vidDirPath = `${state.rootdirpath}/vid`
    state.tstDirPath = `${state.rootdirpath}/tst`

    let col = coler(state.qcols)

    state.rooturl = `${state.contentUrl}${state.user}/${state.repo}/${
      state.branch
    }/`
    state.rootMediaUrl = `${state.contentUrl}${state.user}/${state.repo}/${
      state.folder
    }/${state.branch}/`
    state.rootRepoUrl = `https://${state.hostUrl}${state.user}/${state.repo}/`
    state.rootMediaUrl = `https://${state.user}.${state.hostUrl}/${state.repo}/`
    state.rootRepoUrl = `https://${state.user}.${state.hostUrl}/${state.repo}/`

    // ....................... getargs
    let getargs = function (data) {}

    // ....................... setargs
    let setargs = function (data) {
      let args = data
      let _state = {}
      _state.actions = []

      let optsq = args.length
      if (optsq === 0) {
        _state.actions.push('help')
      }

      if (optsq < 3) {
        _state.actions.push('help')
      }

      if (args[optsq - 1] === 'help') {
        // last opt
        _state.actions.push('help')
      } else if (args[optsq - 1] === 'doit') {
        _state.actions.push('doit')
      } else if (args[optsq - 1] === 'debug') {
        _state.actions.push('debug')
      } else if (args[optsq - 1] === 'dodebug') {
        _state.actions.push('doit')
        _state.actions.push('debug')
      }

      if (optsq >= 2) {
        if (args[optsq - 2] === 'frame') {
          _state.dotype = 'frame'
        } else if (args[optsq - 2] === 'rows') {
          _state.dotype = 'rows'
        } else {
          _state.dotype = 'list' // default
        }
      }

      if (optsq >= 2) {
        // first param
        if (args[0] === '.') {
          _state.codepattern = '.*' // default to all files
        } else {
          _state.codepattern = args[0] // pattern in first param
        }
      }

      if (optsq >= 2) {
        let where = args[1] // first param {local | remote}
        _state.where = where === 'remote' ? 'remote' : 'local' // defaul to local
      }
      return _state
    }
// .................. help
function help (data) {
  let res = `
  generate README.md file

  usage: node ${prgname} {pattern} {local|remote} {frame, rows, [list]} {doit, debug, dodebug}
      eg: node ${prgname} . local list doit
      eg: node ${prgname} 813r local rows dodebug
      eg: node ${prgname} 852d remote frame dodebug

  takes html files from pattern, eg 7*
  builds content for local or remote README
  create matrix of thumbnail tiles
  each tile points to:
    - tweet (from .json)
    - gif anima (.gif)
    - eon (.html)
`
  console.log(res)
}



    // ....................... doit
    let doit = function (args) {
      let data = enty.setargs(args)
      let options = enty.getoptions()
      let state = enty.getstate()
      state = Object.assign(state, data)

      if (includes(state.actions, 'help')) {
        help()
      }
      if (includes(state.actions, 'doit')) {
        let outText = doing({ state, options })
        console.log('write', state.outPath)
        fs.writeFileSync(state.outPath, outText)
      }
      if (includes(state.actions, 'debug')) {
        let outText = doing({ state, options })
        console.log('would text', outText)
        console.log('would write', state.outPath)
      }
    }


    // ....................... enty
    let enty = () => {}
    enty.help = help
    enty.doit = doit
    enty.setargs = setargs
    enty.getargs = getargs
    enty.getstate = () => state
    enty.getoptions = () => options
    enty.getdata = () => ({state: enty.getstate(), options: enty.getoptions()})

    return enty
  }

  exports.teer = teer
})
