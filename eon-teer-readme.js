// node <program>

const fs = require('fs')
const path = require('path')
const http = require('http')
const puppeteer = require('puppeteer')

const waitInPromise = delay => arg =>
  Number.isFinite(delay) && delay > 0
    ? new Promise(resolve => setTimeout(() => resolve(arg), delay))
    : Promise.resolve(arg)

const isDirectory = d => fs.lstatSync(d).isDirectory()
const isFile = d => fs.lstatSync(d).isFile()
const existsFile = d => fs.existsSync(d)

const rower = q => n => Math.floor(n / q)
const coler = q => n => n % q

// fs

let filename = __filename // full path name of the current module
let prgname = path.basename(filename) // file name of current module
let dirname = path.dirname(require.main.filename) // __dirname

// state

const state = {
  outDir: './',
  outMdFile: 'README.md',
  outText: '',
  rootdirpath: (__dirname + '/').replace(/\\/g, '/'),
  outdirpath: (__dirname + '/').replace(/\\/g, '/'),
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

// args

let args = process.argv
let [cmd, scp, ...opts] = args

let action = 'help' // {[help] pattern}
let optsnb = opts.length
if (opts.length === 0) {
  action = 'help'
} else if (opts[optsnb - 1] === 'help') {
  action = 'help'
} else if (opts[optsnb - 1] === 'debug') {
  action = 'debug'
} else if (opts[optsnb - 1] === 'doframe') {
  action = 'doframe'
} else if (opts[optsnb - 1] === 'dolist') {
  action = 'dolist'
}
state.action = action

if (
  action === 'doframe' ||
  action === 'dolist' ||
  action === 'dorow' ||
  action === 'debug'
) {
  let codepattern
  if (optsnb === 1) {
    codepattern = '.*'
  } else {
    codepattern = opts[0]
  }

  let inScopeText = `^eon-z.*${codepattern}.*\.${state.inScopeExt}$`
  state.inScopePattern = new RegExp(`${inScopeText}`, 'i')

  if (optsnb >= 2) {
    state.where = opts[1] // {local | remote}
  }
}

function getUri (data) {
  let { where, prefix, code, ext, name, outdirpath, rootMediaUrl } = data
  let file = name !== undefined
    ? `${prefix}${code}-${name}.${ext}`
    : `${prefix}${code}.${ext}`
  let path = `${outdirpath}/${file}`
  let url = `${rootMediaUrl}/${file}`
  let uri = where === 'local' ? path : url

  return uri
}

function getEonHtmlUri (data) {
  let { where, prefixAndCodeAndName, outdirpath, rootMediaUrl } = data
  let fileName =`index.html#${prefixAndCodeAndName}`
  let path = `${outdirpath}${fileName}`
  let url = `${rootMediaUrl}${fileName}`
  let uri = where === 'local' ? path : url

  console.log('getEonHtmlUri:', uri)
  return uri
}

function getThumbnailUri (p = {}) {
  let pars = Object.assign({}, p)
  pars.prefix = 'eon-z'
  pars.ext = 'png'
  pars.type = 'thumbnail'
  return getUri(pars)
}

function getGifUri (p = {}) {
  let pars = Object.assign({}, p)
  pars.prefix = 'eon-z'
  pars.ext = 'gif'
  pars.type = ''
  return getUri(pars)
}
function getEonUri (p = {}) {
  let {
    where,
    prefix,
    type,
    code,
    ext = 'html',
    name,
    outdirpath,
    rootMediaUrl,
  } = p
  let file = `${prefix}${code}-${name}.${ext}`
  let path = `${outdirpath}${file}`
  let url = `${rootMediaUrl}${file}`
  let uri = where === 'local' ? path : url
  return uri
}

function getPreviewUri (data) {
  let { outdirpath, rootMediaUrl, where, code } = data
  let ext = 'png'
  let type = 'preview'
  let file = 'eon-z'
  file = file.concat(code, '-', type, '.', ext)
  let path = outdirpath.concat(file)
  let url = rootMediaUrl.concat(file)
  let uri = where === 'local' ? path : url
  return uri
}

function getPreviewUri (data) {
  let { previewview, tileview, srcUri } = data
  let res = `onmouseover="(function(that){
    that.width='${previewview.width}'
    that.height='${previewview.height}'
        let outdirpath = that.outdirpath 
        if (1 && 1) console.log('outdirpath', outdirpath)
        let rootMediaUrl = that.rootMediaUrl
        let where = that.where
        let code = that.code || '10'
        let ext = 'png'
        let type = 'preview'
        let file = 'eon-z'
        file = file.concat(code, '-', type, '.', ext)
        let path = outdirpath.concat(file)
        let url = rootMediaUrl.concat(file)
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

function getRowItem (data) {
  let {
    i,
    preline,
    bodyline,
    code,
    where,
    outdirpath,
    rootMediaUrl,
    srcUri,
    tileview,
    targetHtml,
  } = data
  // '<a href="' + href + '">' + text + '</a>'
  // bodyline += `[${code} : ${name}](${root}${prefixAndCodeAndName})`
  let res = `${preline} - ${bodyline}`
  return res
}

function getTileItem (data) {
  let {
    i,
    code,
    where,
    outdirpath,
    rootMediaUrl,
    srcUri,
    tileview,
    targetHtml,
  } = data
  let res = `[<img id="${i}" alt="${code}"
    code="${code}" where="${where}" ext="png" type="preview" prefix="eon-z"  outdirpath="${outdirpath}"  rootMediaUrl="${rootMediaUrl}"
    src="${srcUri}"
    width="${tileview.width}px;" height="${
  tileview.height
}px;"/>](${targetUri})`
  return res
}

function getListItem (data) {

  let {
    i,
    code,
    where,
    outdirpath,
    rootMediaUrl,
    srcUri,
    tileview,
    targetHtml,
    prefixAndCodeAndName,
  } = data

  let outHtmlUri = getEonHtmlUri(data) // file:///E:/Dropbox/dBox/e/c/eons/eons/eon-z021a.html

  srcUri = getUri(
    Object.assign({}, data, { outdirpath: data.picDirPath, name: 'thumbnail', type: 'thumbnail', ext: 'png' })
  )
 
  // let targetHtml = existsFile(outHtmlUri) ? outHtmlUri : outEonUri
  // let srcUri = existsFile(outThumbnailPath) ? outThumbnailUri : notile
  // let targetUri = existsFile(outGifPath) ? outGifUri : outEonUri
  let width = tileview.width
  let height = tileview.height
  prefixAndCodeAndName = prefixAndCodeAndName.padEnd(45, ' ')
  
  let res = ` ${prefixAndCodeAndName} [<img id="${i}" alt="${code}" code="${code}" where="${where}" 
      ext="png" type="preview" prefix="eon-z"  
      outdirpath="${outdirpath}"  rootMediaUrl="${rootMediaUrl}"
      src="${srcUri}"
      width="${width}px;" height="${height}px;"/>](${outHtmlUri})`
  
  return res
}

function getHelpItem (data) {
  let res = `node ${prgname} {[pattern]} {local|remote} {[help], [debug], [doframe], [dolist]}
  eg: node eon-teer-readme . local do
  eg: node eon-teer-readme . remote do
  generate README.md file
  takes html files from pattern, eg 7*
  builds content for local or remote README
  create matrix of thumbnail tiles
  each tile points in precedence to:
    - tweet (from .json)
    - gif anima (.gif)
    - eon (.html)
`
  return res
}

function doit (data) {

  // return outText

  let outText = ''

  let {
    qcols,
    partsPattern,
    outdirpath,
    tileimg,
    tileext,
    tileview,
    notile,
    where,
    contentUrl,
    user,
    repo,
    branch,
    hostUrl,
    folder,
    endOfLine,
    newLine,
    gifext,
    inDir,
    indexpattern,
    testpattern,
    tspattern,
    mdpattern,
    inScopePattern,
    previewimg,
    previewext,
    prefix,
    previewview,
  } = data

  let erebody = ''
  let body = ''
  let header = `# eons ${newLine}${newLine}**time space manyfolds** ${endOfLine}${newLine}${newLine}`
  let footer = `${newLine}# license${endOfLine}${newLine}MIT${endOfLine}`

  outText += `${header}`

  let zfiles = fs
    .readdirSync(inDir) // index files in inDir
    .filter(d => indexpattern.test(d))
    .filter(d => inScopePattern.test(d))
    .filter(d => !testpattern.test(d))
    .filter(d => !mdpattern.test(d))
    .filter(d => !tspattern.test(d))

  let col = coler(qcols)
  let rooturl = `${contentUrl}${user}/${repo}/${branch}/`
  let rootMediaUrl = `${contentUrl}${user}/${repo}/${folder}/${branch}/`
  let rootRepoUrl = `https://${hostUrl}${user}/${repo}/`
  rootMediaUrl = `https://${user}.${hostUrl}/${repo}/`
  rootRepoUrl = `https://${user}.${hostUrl}/${repo}/`

  for (let i = 0; i < zfiles.length; i++) {
    let fileName = zfiles[i]
    let icol = col(i)

    let parts = fileName.match(partsPattern)
    let [fullname, prefixAndCodeAndName, prefixAndCode, prefix, code, name] = parts
    let fileParts = {fullname, prefixAndCodeAndName, prefixAndCode, prefix, code, name}

    let fileData = Object.assign({}, data, fileParts, {i})

    let outThumbnailPath = getUri(
      Object.assign({}, fileData, {name: 'thumbnail',type: 'thumbnail',ext: 'png',where: 'local'})
    )
    let outThumbnailUri = getUri(
      Object.assign({}, fileData, { name: 'thumbnail', type: 'thumbnail', ext: 'png' })
    )

    let outPreviewUri = getUri(
      Object.assign({}, fileData, { name: 'preview', type: 'preview', ext: 'png' })
    )
    let outGifPath = getUri(
      Object.assign({}, fileData, { type: 'gif', ext: 'gif', where: 'local' })
    )
    let outGifUri = getUri(
      Object.assign({}, fileData, { type: 'gif', ext: 'gif' }))
    let outEonUri = getUri(
      Object.assign({}, fileData, { type: 'zeon', name: name, ext: 'html' })
    )

    if (action === 'doframe') {
      outText += getTileItem(fileData)

    } else if (action === 'dolist') {
      console.log('dolist')
      outText += getListItem(fileData)

    } else if (action === 'dorow') {
      outText += getRowItem(fileData)

    }

    if (icol === qcols - 1) {
      // end row
      outText += `${endOfLine}${newLine}`
    }
  }
  outText += `${erebody}${body}${newLine}${newLine}`
  outText += ``
  outText += `${footer}`

  return outText
}

if (state.action === 'help') {
  console.log(getHelpItem())
} else {
  let outText = doit(state)
  if (state.action === 'debug') {
    console.log('outText', state.outPath, outText)
  } else {
    fs.writeFileSync(state.outPath, outText)
  }
}
