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

    // fs

    const isDirectory = d => fs.lstatSync(d).isDirectory()
    const isFile = d => fs.lstatSync(d).isFile()
    const existsFile = d => fs.existsSync(d)

    let fileName = __filename // full path name of the current module
    let prgFileName = path.basename(fileName) // file name of current module
    let cwdDirPath = process.cwd() // directory of invocation
    let prgDirPath = __dirname // directory of calling js file

    let eonDirPath = cwdDirPath
    let teerDirPath = path.resolve(cwdDirPath, 'eonitem')
    let imgDirPath = path.resolve(cwdDirPath, 'img')
    let vidDirPath = path.resolve(cwdDirPath, 'vid')
    console.assert(fs.existsSync(teerDirPath), `eonitem dir does not exist`)
    console.assert(fs.existsSync(imgDirPath), `img dir does not exist`)
    console.assert(fs.existsSync(vidDirPath), `vid dir does not exist`)

    let newLine = '\n'
    let endOfLine = '  '

    let fwddir = d => (d + '/').replace(/\\/g, '/')
    let getindex = d => (d + '/').replace(/\\/g, '/') + `index.html`
    let anchored = (d, a) => getindex(d) + '#' + a

    // options
    const options = {
      eonDirPath,
      teerDirPath,
      imgDirPath,
      vidDirPath,
      header: `# eons ${newLine}${newLine}**time space manyfolds** ${endOfLine}${newLine}${newLine}`,
      footer: `${newLine}# license${endOfLine}${newLine}MIT${endOfLine}`,
    }

    // state
    let state = {
      outDir: './',
      outMdFile: 'README.md',
      outText: '',
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

      inScopePattern: new RegExp(`^eon-z___none___.*.*$`, 'i'), // none pattern
      inScopeExt: 'js',

      options: options, // options
    }
    state.outPath = `${state.outDir}${state.outMdFile}`
    state.picDirPath = `${state.rootdirpath}/pic`
    state.vidDirPath = `${state.rootdirpath}/vid`
    state.tstDirPath = `${state.rootdirpath}/tst`

    let col = coler(state.qcols)

    state.rooturl = `${state.contentUrl}${state.user}/${state.repo}/${
      state.branch
    }/`
    state.rootImgUrl = `${state.contentUrl}${state.user}/${state.repo}/${
      state.folder
    }/${state.branch}/`
    state.rootRepoUrl = `https://${state.hostUrl}${state.user}/${state.repo}/`
    state.rootImgUrl = `https://${state.user}.${state.hostUrl}/${
      state.repo
    }/img/`
    state.rootVidUrl = `https://${state.user}.${state.hostUrl}/${
      state.repo
    }/vid/`
    state.rootRepoUrl = `https://${state.user}.${state.hostUrl}/${state.repo}/`

    // ....................... parseArgs
    let parseArgs = function (data = {}, context = {}) {
      let res = {}
      res.args = data
      res.actions = []
      res.dotype = ''
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
        if (res.args[optsq - 2] === 'frame') {
          res.dotype = 'frame'
        } else if (res.args[optsq - 2] === 'rows') {
          res.dotype = 'rows'
        } else {
          res.dotype = 'list' // default
        }
      }

      if (optsq >= 2) {
        // first param
        if (res.args[0] === '.') {
          res.codepattern = '.*' // default to all files
        } else {
          res.codepattern = res.args[0] // pattern in first param
        }
      }

      if (optsq >= 2) {
        let where = res.args[1] // first param {local | remote}
        res.where = where === 'remote' ? 'remote' : 'local' // defaul to local
      }

      return res
    }

    // .................. getHelp
    function getHelp (data = {}, context = {}) {
      let res = {
        helpText: '',
      }
      res.helpText = `
  generate README.md file

  usage: node ${
  context.prgFileName
} {pattern} {local|remote} {frame, rows, [list]} {doit, debug, dodebug}
      eg: node ${context.prgFileName} . local list doit
      eg: node ${context.prgFileName} 813r local rows dodebug
      eg: node ${context.prgFileName} 852d remote frame dodebug

  takes html files from pattern, eg 7*
  builds content for local or remote README
  create matrix of thumbnail tiles
  each tile points to:
    - tweet (from .json)
    - gif anima (.gif)
    - eon (.html)
`
      return res
    }

    // .................. getPreviewUri
    function getPreviewUri (data) {
      let { previewview, tileview, srcUri } = data
      let res = `onmouseover="(function(that){
    that.width='${previewview.width}'
    that.height='${previewview.height}'
        let outDirPath = that.outDirPath 
        if (1 && 1) console.log('outDirPath', outDirPath)
        let rootImgUrl = that.rootImgUrl
        let where = that.where
        let code = that.code || '10'
        let ext = 'png'
        let type = 'preview'
        let file = 'eon-z'
        file = file.concat(code, '-', type, '.', ext)
        let path = outDirPath.concat(file)
        let url = rootImgUrl.concat(file)
        let uri = (where === 'local') ? path : url              
    that.src = uri
    console.log('***uri: ',uri)
  })(this);"
  onmouseout="(function(that){
    that.width='${tileview.width}'
    that.height='${tileview.height}'
    that.src='${srcUri}'
  })(this);"`
      return res
    }

    // .................. getTileItem
    function getTileItem (data) {
      let {
        i,
        code,
        where,
        outDirPath,
        rootImgUrl,
        srcUri,
        tileview,
        targetUri,
      } = data
      let res = `[<img id="${i}" alt="${code}"
    code="${code}" where="${where}" ext="png" type="preview" prefix="eon-z"  outDirPath="${outDirPath}"  rootImgUrl="${rootImgUrl}"
    src="${srcUri}"
    width="${tileview.width}px;" height="${
  tileview.height
}px;"/>](${targetUri})`
      return res
    }

    // .................. getRowsItem
    function getRowsItem (_) {
      // [eon-z813r-radi-frame](https://sifbuilder.github.com//eons//index.html#eon-z813r-radi-frame)
      // [eon-z000a](E:/eons/eons/index.html#eon-z000a)
      let index = fwddir(`${_.baseUri}`) + `index.html`
      let res = `[${_.file.prefixCodeName}](${index}#${_.file.prefixCodeName})`
      return res
    }

    // .................. getListItem
    function getListItem (_) {
      let res = ''

      let prefixCodeName = _.file.prefixCodeName.padEnd(45, ' ')
      let index = fwddir(`${_.baseUri}`) + `index.html`

      res = ` ${prefixCodeName} [<img id="${_.i}" alt="${_.file.code}" 
        code="${_.file.code}" where="${_.args.where}"
      ext="png" type="preview" 
      prefix="eon-z"
      outDirPath="${_.outDirPath}"  
      rootImgUrl="${_.rootImgUrl}"
      src="${_.thumbnailuri}"
      width="${_.tileview.width}px;" height="${
  _.tileview.height
}px;"/>](${index}#${_.file.prefixCodeName})`

      return res
    }

    // ....................... doit
    let doit = function (data, state) {
      let args = enty.parseArgs(data, state)

      state = enty.updState({ args })

      let inScopeText = `^eon-z.*${state.args.codepattern}.*\.${
        state.inScopeExt
      }$`
      let inScopePattern = new RegExp(`${inScopeText}`, 'i')
      state = enty.updState({ inScopeText, inScopePattern })
      if (includes(state.args.actions, 'debug')) console.log('state:', state)

      if (includes(state.args.actions, 'help')) {
        let help = getHelp({}, state)
        state = enty.updState({ help })
        console.log(state.help.helpText)
      }
      if (includes(state.args.actions, 'doit')) {
        let outText = todo({}, state)
        console.log('write', state.outPath)
        fs.writeFileSync(state.outPath, outText)
      }
      if (includes(state.args.actions, 'debug')) {
        let outText = todo({}, state)
        console.log('would text', outText)
        console.log('would write', state.outPath)
      }
    }

    // ....................... todo
    function todo ({}, context) {
      let outText = ''
      let _ = context

      outText += _.options.header

      let zfiles = fs
        .readdirSync(_.options.eonDirPath) // index files in inDir
        .filter(d => _.indexpattern.test(d))
        .filter(d => _.inScopePattern.test(d))
        .filter(d => !_.testpattern.test(d))
        .filter(d => !_.mdpattern.test(d))
        .filter(d => !_.tspattern.test(d))

      let erebody = ''
      let body = ''

      for (let i = 0; i < zfiles.length; i++) {
        let fileName = zfiles[i]
        if (includes(_.args.actions, 'debug')) console.log('doit ', i, fileName)

        let icol = col(i)

        let file = fileName.match(_.partsPattern).groups
        _ = enty.updState({ file: file })
        if (includes(_.args.actions, 'debug')) console.log('file:', _.file)

        let eonPath = `${_.eonDirPath}${_.file.prefixCodeName}`
        let eonUrl = `${_.rootImgUrl}${_.file.prefixCodeName}`
        let eonUri = _.args.where === 'local' ? eonPath : eonUrl
        let baseUri =
          ( _.args.where === 'local' ) ? _.options.eonDirPath : _.rootImgUrl
        _ = enty.updState({ eonUri: eonUri, baseUri: baseUri })

        let thumbnailPrefixCodeName = eoname([
          _.file.prefix,
          _.file.code,
          'thumbnail',
        ])
        let thumbnailName = `${thumbnailPrefixCodeName}.png`
        let thumbnailpath = `${_.options.imgDirPath}/${thumbnailName}`
        let thumbnailurl = `${_.rootImgUrl}/${thumbnailName}`
        let thumbnailuri =
          ( _.args.where === 'local' ) ? thumbnailpath : thumbnailurl
        _ = enty.updState({ thumbnailuri: thumbnailuri })

        if (_.args.dotype === 'frame') {
          outText += getTileItem(_)
        } else if (_.args.dotype === 'list') {
          outText += getListItem(_)
        } else if (_.args.dotype === 'rows') {
          outText += getRowsItem(_)
        }
      }

      outText += `${_.options.footer}`

      return outText
    }

    // ....................... enty
    let enty = () => {}
    enty.getHelp = getHelp
    enty.doit = doit
    enty.parseArgs = parseArgs
    enty.getState = () => state

    enty.getPreviewUri = getPreviewUri

    enty.getTileItem = getTileItem
    enty.getRowsItem = getRowsItem
    enty.getListItem = getListItem
    enty.setState = _ => ((state = _), state)
    enty.updState = _ => ((state = Object.assign(state, _)), state)
    enty.getoptions = () => state.options

    return enty
  }

  exports.eonitem = eonitem
})
