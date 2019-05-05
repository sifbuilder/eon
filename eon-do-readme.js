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
      imgDirPath: path.resolve(cwdDirPath, ''),
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
    options.rootImgUrl = `https://${options.user}.${options.hostUrl}/${options.repo}/`
    options.rootVidUrl = `https://${options.user}.${options.hostUrl}/${options.repo}/vid/`
    options.rootRepoUrl = `https://${options.user}.${options.hostUrl}/${options.repo}/`
    options.baseUri = options.rootRepoUrl
    options.col = coler(options.qcols)

    // state

    let state = {
      outText: '',
      where: 'local',
      inScopePattern: new RegExp(`^eon-z___none___.*.*$`, 'i'), // none pattern
      _: options, // options
    }

    // .................. getPreviewUri
    function getPreviewUri (context) {
      let __ = context
      let { previewview, tileview, srcUri } = __
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
    function getRowsItem (context) {
      let __ = context
      // [eon-z813r-radi-frame](https://sifbuilder.github.com//eons//index.html#eon-z813r-radi-frame)
      // [eon-z000a](E:/eons/eons/index.html#eon-z000a)
      let index = fwddir(`${__._.baseUri}`) + `index.html`
      let res = `${__._.newLine}[${__.file.prefixCodeName}](${index}#${__.file.prefixCodeName})${__._.endOfLine}`
      return res
    }

    // .................. getTileItem
    function getTileItem (context) {
      let __ = context
      let res = ''
      let index = fwddir(`${__._.baseUri}`) + `index.html`

      res = `[<img id="${__.fileidx}" 
      alt="${__.file.code}"
      code="${__.file.code}" 
      where="${__.args.where}" 
      ext=${__.thumbnailext}
      type="preview" 
      prefix="eon"  
      outDirPath="${__.outDirPath}"
      rootImgUrl="${__.rootImgUrl}"
      src="${__.thumbnailuri}"
      width="${__._.tileview.width}px;"
       height="${__._.tileview.height}px;"/>](${index}#${
  __.file.prefixCodeName
})`
      return res
    }

    // .................. getListItem
    function getListItem (context) {
      let __ = context
      let res = ''
      let index = fwddir(`${__._.baseUri}`) + `index.html`
      let prefixCodeName = __.file.prefixCodeName.padEnd(60, ' ')
      res = ` 
${prefixCodeName} [<img id="${__.i}" alt="${
  __.file.code
}" 
        code="${__.file.code}" where="${__.args.where}"
      ext="png" type="preview" 
      prefix="eon"
      outDirPath="${__.outDirPath}"  
      rootImgUrl="${__.rootImgUrl}"
      src="${__.thumbnailuri}"
      width="${__._.tileview.width}px;" height="${
  __._.tileview.height
}px;"/>](${index}#${__.file.prefixCodeName})${__._.endOfLine}

`
      return res
    }

    // ....................... parseArgs
    let parseArgs = function (data, context) {
      let __ = context
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

      res.dotype = 'list' // default
      if (includes(res.args, 'tile')) {
        res.dotype = 'tile'
      } else if (includes(res.args, 'rows')) {
        res.dotype = 'rows'
      } else if (includes(res.args, 'rows')) {
        res.dotype = 'list'
      }

      if (includes(res.args, 'remote')) {
        res.where = 'remote'
      } else {
        res.where = 'local' // default
      }

      if (optsq >= 2) {
        if (res.args[0] === '.') {
          res.codepattern = '.*' // default to all files
        } else {
          res.codepattern = res.args[0] // pattern in first param
        }
      }

      return res
    }

    // .................. getHelp
    function getHelp (data = {}, context = {}) {
      let __ = context
      let res = {
        helpText: '',
      }
      res.helpText = `
  generate README.md file

  usage: node ${__._.prgFileName} {pattern} {local|remote} {tile, rows, [list]} {doit, debug, dodebug}
      eg: node ${__._.prgFileName} . local list doit
      eg: node ${__._.prgFileName} 813r local rows dodebug
      eg: node ${__._.prgFileName} 852d remote tile dodebug

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
      let defin = 'gen readme'
      let def = defin.padEnd(24, ' ')
      let mod = ' node do readme . remote tile doit'
      return `${def}${mod}`
    }

    // ....................... todo
    function todo (data = {}, context = {}) {
      let __ = context
      let outText = ''

      outText += __._.header

      let zfiles = fs
        .readdirSync(__._.eonDirPath) // index files in inDir
        .filter(d => __._.indexpattern.test(d))
        .filter(d => __.inScopePattern.test(d))
        .filter(d => !__._.testpattern.test(d))
        .filter(d => !__._.mdpattern.test(d))
        .filter(d => !__._.tspattern.test(d))

      let erebody = ''
      let body = ''

      for (let i = 0; i < zfiles.length; i++) {
        __ = enty.updState({ fileidx: i })

        let fileName = zfiles[i]
        if (includes(__.args.actions, 'debug')) console.log('doit ', i, fileName)

        let icol = __._.col(i)

        let file = fileName.match(__._.partsPatternEonJs).groups
        __ = enty.updState({ file: file })
        if (includes(__.args.actions, 'debug')) console.log('file:', __.file)

        let eonPath = `${__.eonDirPath}${__.file.prefixCodeName}`
        let eonUrl = `${__.rootImgUrl}${__.file.prefixCodeName}`
        let eonUri = __.args.where === 'local' ? eonPath : eonUrl
        let baseUri =
          __.args.where === 'local' ? __._.eonDirPath : __.rootImgUrl
        __ = enty.updState({ eonUri: eonUri, baseUri: baseUri })

        let thumbnailPrefixCodeName = eoname([
          __.file.prefix,
          __.file.code,
          'thumbnail',
        ])
        let thumbnailName = `${thumbnailPrefixCodeName}.png`
        let thumbnailpath = `${__._.imgDirPath}/${thumbnailName}`
        let thumbnailurl = `${__.rootImgUrl}/${thumbnailName}`
        let thumbnailuri =
          __.args.where === 'local'
            ? thumbnailpath
            : `${thumbnailName}`
        __ = enty.updState({
          thumbnailuri: thumbnailuri,
          thumbnailext: 'png',
        })

        if (__.args.dotype === 'tile') {
          outText += getTileItem(__)
        } else if (__.args.dotype === 'list') {
          outText += getListItem(__)
        } else if (__.args.dotype === 'rows') {
          outText += getRowsItem(__)
        }
      }

      outText += `${__._.footer}`

      return outText
    }

    // ....................... doit
    let doit = function (data, context) {
      let __ = context
      let args = enty.parseArgs(data, __)
      __ = enty.updState({ args })

      let inScopeText = `^eon-.*${__.args.codepattern}.*\.${__._.inScopeExt}$`
      let inScopePattern = new RegExp(`${inScopeText}`, 'i')
      __ = enty.updState({ inScopeText, inScopePattern })
      if (includes(__.args.actions, 'debug')) console.log('__:', __)

      if (includes(__.args.actions, 'help')) {
        let help = getHelp({}, __)
        __ = enty.updState({ help })
        console.log(__.help.helpText)
      }
      if (includes(__.args.actions, 'doit')) {
        let outText = todo({}, __)

        console.log('write', __._.outFilePath)
        fs.writeFileSync(__._.outFilePath, outText)
      }
      if (includes(__.args.actions, 'debug')) {
        let outText = todo({}, __)
        console.log('would text', outText)
        console.log('would write', __._.outFilePath)
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
