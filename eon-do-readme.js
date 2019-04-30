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
      prgFileName: path.basename(fileName),

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
      partsPatternEonJs: new RegExp(
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

    options.outFilePath = `${rootDirPath}/${options.outMdFile}`
    options.rootUrl = `${options.contentUrl}${options.user}/${options.repo}/${options.branch}/`
    options.rootImgUrl = `${options.contentUrl}${options.user}/${options.repo}/${options.folder}/${options.branch}/`
    options.rootRepoUrl = `https://${options.hostUrl}${options.user}/${options.repo}/`
    options.rootImgUrl = `https://${options.user}.${options.hostUrl}/${options.repo}/img/`
    options.rootVidUrl = `https://${options.user}.${options.hostUrl}/${options.repo}/vid/`
    options.rootRepoUrl = `https://${options.user}.${options.hostUrl}/${options.repo}/`
    options.baseUri = options.rootRepoUrl
    options.col = coler(options.qcols)

    // state

    let state = {
      outText: '',
      where: 'local',
      inScopePattern: new RegExp(`^eon-z___none___.*.*$`, 'i'), // none pattern
      options: options, // options
    }

    // .................. getPreviewUri
    function getPreviewUri (_) {
      let { previewview, tileview, srcUri } = _
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

    // .................. getRowsItem
    function getRowsItem (_) {
      // [eon-z813r-radi-frame](https://sifbuilder.github.com//eons//index.html#eon-z813r-radi-frame)
      // [eon-z000a](E:/eons/eons/index.html#eon-z000a)
      let index = fwddir(`${_.options.baseUri}`) + `index.html`
      let res = `${_.options.newLine}[${_.file.prefixCodeName}](${index}#${_.file.prefixCodeName})${_.options.endOfLine}`
      return res
    }

    // .................. getTileItem
    function getTileItem (_) {
      let res = ''
      let index = fwddir(`${_.options.baseUri}`) + `index.html`

      res = `[<img id="${_.fileidx}" 
      alt="${_.file.code}"
      code="${_.file.code}" 
      where="${_.args.where}" 
      ext=${_.thumbnailext}
      type="preview" 
      prefix="eon"  
      outDirPath="${_.outDirPath}"
      rootImgUrl="${_.rootImgUrl}"
      src="${_.thumbnailuri}"
      width="${_.options.tileview.width}px;"
       height="${_.options.tileview.height}px;"/>](${index}#${
  _.file.prefixCodeName
})`
      return res
    }

    // .................. getListItem
    function getListItem (_) {
      let res = ''
      let index = fwddir(`${_.options.baseUri}`) + `index.html`
      let prefixCodeName = _.file.prefixCodeName.padEnd(60, ' ')
      res = ` 
${prefixCodeName} [<img id="${_.i}" alt="${
  _.file.code
}" 
        code="${_.file.code}" where="${_.args.where}"
      ext="png" type="preview" 
      prefix="eon"
      outDirPath="${_.outDirPath}"  
      rootImgUrl="${_.rootImgUrl}"
      src="${_.thumbnailuri}"
      width="${_.options.tileview.width}px;" height="${
  _.options.tileview.height
}px;"/>](${index}#${_.file.prefixCodeName})${_.options.endOfLine}

`

      return res
    }

    // ....................... parseArgs
    let parseArgs = function (data = {}, _ = {}) {
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

      if (optsq >= 2) {
        if (includes(res.args, 'tile')) {
          res.dotype = 'tile'
        } else if (includes(res.args, 'rows')) {
          res.dotype = 'rows'
        } else {
          res.dotype = 'list' // default
        }
      }

      if (optsq >= 2) {
        if (res.args[0] === '.') {
          res.codepattern = '.*' // default to all files
        } else {
          res.codepattern = res.args[0] // pattern in first param
        }
      }

      if (includes(res.args, 'remote')) {
        res.where = 'remote'
      } else {
        res.where = 'local' // default
      }

      return res
    }

    // .................. getHelp
    function getHelp (data = {}, _ = {}) {
      let res = {
        helpText: '',
      }
      res.helpText = `
  generate README.md file

  usage: node ${
  _.options.prgFileName
} {pattern} {local|remote} {tile, rows, [list]} {doit, debug, dodebug}
      eg: node ${_.options.prgFileName} . local list doit
      eg: node ${_.options.prgFileName} 813r local rows dodebug
      eg: node ${_.options.prgFileName} 852d remote tile dodebug

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
    // .................. getHeline
    function getHeline () {
      return 'create readme file'
    }
    // ....................... todo
    function todo ({}, _) {
      let outText = ''

      outText += _.options.header

      let zfiles = fs
        .readdirSync(_.options.eonDirPath) // index files in inDir
        .filter(d => _.options.indexpattern.test(d))
        .filter(d => _.inScopePattern.test(d))
        .filter(d => !_.options.testpattern.test(d))
        .filter(d => !_.options.mdpattern.test(d))
        .filter(d => !_.options.tspattern.test(d))

      let erebody = ''
      let body = ''

      for (let i = 0; i < zfiles.length; i++) {
        _ = enty.updState({ fileidx: i })

        let fileName = zfiles[i]
        if (includes(_.args.actions, 'debug')) console.log('doit ', i, fileName)

        let icol = _.options.col(i)

        let file = fileName.match(_.options.partsPatternEonJs).groups
        _ = enty.updState({ file: file })
        if (includes(_.args.actions, 'debug')) console.log('file:', _.file)

        let eonPath = `${_.eonDirPath}${_.file.prefixCodeName}`
        let eonUrl = `${_.rootImgUrl}${_.file.prefixCodeName}`
        let eonUri = _.args.where === 'local' ? eonPath : eonUrl
        let baseUri =
          _.args.where === 'local' ? _.options.eonDirPath : _.rootImgUrl
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
          _.args.where === 'local' ? thumbnailpath : thumbnailurl
        _ = enty.updState({
          thumbnailuri: thumbnailuri,
          thumbnailext: 'png',
        })

        if (_.args.dotype === 'tile') {
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

    // ....................... doit
    let doit = function (data, _) {
      let args = enty.parseArgs(data, _)
      _ = enty.updState({ args })

      let inScopeText = `^eon-.*${_.args.codepattern}.*\.${
        _.options.inScopeExt
      }$`
      let inScopePattern = new RegExp(`${inScopeText}`, 'i')
      _ = enty.updState({ inScopeText, inScopePattern })
      if (includes(_.args.actions, 'debug')) console.log('_:', _)

      if (includes(_.args.actions, 'help')) {
        let help = getHelp({}, _)
        _ = enty.updState({ help })
        console.log(_.help.helpText)
      }
      if (includes(_.args.actions, 'doit')) {
        let outText = todo({}, _)

        console.log('write', _.options.outFilePath)
        fs.writeFileSync(_.options.outFilePath, outText)
      }
      if (includes(_.args.actions, 'debug')) {
        let outText = todo({}, _)
        console.log('would text', outText)
        console.log('would write', _.options.outFilePath)
      }
    }

    // ....................... enty
    let enty = () => {}

    enty.getPreviewUri = getPreviewUri
    enty.getTileItem = getTileItem
    enty.getRowsItem = getRowsItem
    enty.getListItem = getListItem

    enty.getHelp = getHelp
    enty.getHeline = getHeline
    enty.doit = doit
    enty.parseArgs = parseArgs
    enty.getState = () => state
    enty.setState = v => { state = v; return state }
    enty.updState = v => { state = Object.assign(state, v); return state }
    enty.getoptions = () => state.options

    return enty
  }

  exports.eonitem = eonitem
})
