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
  outFile: 'README.md',
  outText: '',
  where: 'local',
  qcols: 3, // number of thumbnails per row
  contentUrl: 'https://raw.githubusercontent.com/', // rsc host
  user: 'sifbuilder', // gh user
  repo: 'eons', // gh repo
  branch: 'master', // gh branch
  hostUrl: 'github.com/', //
  folder: 'blob', //

  indexpattern: new RegExp(`^eon-z.*.html`, 'i'), // z.eons
  eonpattern: new RegExp('^' + 'eon' + '.*' + '.*(.js)', 'i'), // eons
  testpattern: new RegExp('(.*).test.(.*)$', 'i'), //  test
  mdpattern: new RegExp('(.*).md.(.*)$', 'i'), //  md
  tspattern: new RegExp('(.*).ts.(.*)$', 'i'), //  ts
  zpattern: new RegExp('^' + 'eon-z' + '.*' + '.*(.js)', 'i'),

  partsPattern: new RegExp(`^((eon-z-)([^-.]*))[-]?(.*).html$`, 'i'),

  newLine: '\n',
  endOfLine: '  ',

  outdirpath: (__dirname + '/').replace(/\\/g, '/'),
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
  prefix: `eon-z-`,

  inScopePattern: new RegExp(`^eon-z-___none___.*.*$`, 'i'), // none pattern
  inScopeExt: 'html',
  inDir: './',
  indirpath: (dirname + '/').replace(/\\/g, '/'), // z-indexes
}

// args

let args = process.argv
let [cmd, scp, ...opts] = args

let action = 'help' // {[help] pattern}
let optsnb = opts.length
if (opts.length === 0) { // action: help
  action = 'help'
} else if (opts[optsnb - 1] === 'help') { // help
  action = 'help'
} else if (opts[optsnb - 1] === 'debug') { // debug
  action = 'debug'
} else if (opts[optsnb - 1] === 'do') { // do
  action = 'doAction'
} 
if (action === 'doAction' || action === 'debug' ) {
  
  let codepattern
  if (optsnb === 1) { // no pattern defined 
    codepattern = '.*' // default to all
  } else {  // optsnb > 1,  pattern is first opt
    codepattern = opts[0]
  }
  state.inScopePattern = new RegExp(`^eon-z-.*${codepattern}.*\.${state.inScopeExt}$`, 'i')

  if (optsnb === 2) { // where is opt 1
    state.where = opts[1] // {local | remote}
  }
}


function getUri (p = {}) {
  let {where, prefix, type, code, ext, name, outdirpath, rootMediaUrl} = p
  let file = ''
  file = (name !== undefined) ? `${prefix}${code}-${name}.${ext}` : `${prefix}${code}.${ext}`
  let path = `${outdirpath}${file}`
  let url = `${rootMediaUrl}${file}`
  let uri = (where === 'local') ? path : url
  return uri
}
function getThumbnailUri (p = {}) {
  let pars = Object.assign({}, p)
  pars.prefix = 'eon-z-'
  pars.ext = 'png'
  pars.type = 'thumbnail'
  return getUri(pars)
}

function getGifUri (p = {}) {
  let pars = Object.assign({}, p)
  pars.prefix = 'eon-z-'
  pars.ext = 'gif'
  pars.type = ''
  return getUri(pars)
}
function getEonUri (p = {}) {
  let {where, prefix, type, code, ext = 'html', name, outdirpath, rootMediaUrl} = p
  let file = `${prefix}${code}-${name}.${ext}`
  let path = `${outdirpath}${file}`
  let url = `${rootMediaUrl}${file}`
  let uri = (where === 'local') ? path : url
  return uri
}

function doAction (stat = {}) { // return outText
  let outText = ''

  let { qcols, partsPattern, outdirpath, tileimg, tileext, tileview, notile, where, contentUrl, user, repo, branch, hostUrl, folder, endOfLine, newLine, gifext, inDir, indexpattern, testpattern, tspattern, mdpattern, inScopePattern, previewimg, previewext, prefix, previewview} = stat

  let erebody = ''
  let body = ''
  let header = `# eons ${newLine}${newLine}**time space manyfolds** ${endOfLine}${newLine}${newLine}`
  let footer = `${newLine}# license${endOfLine}${newLine}MIT${endOfLine}`

  outText += `${header}`

  let zfiles = fs.readdirSync(inDir) // index files in inDir
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

  function getPreviewUri (p = {}) {
    let outdirpath = p.outdirpath
    let rootMediaUrl = p.rootMediaUrl
    let where = p.where
    let code = p.code
    let ext = 'png'
    let type = 'preview'
    let file = 'eon-z-'
    file = file.concat(code, '-', type, '.', ext)
    let path = outdirpath.concat(file)
    let url = rootMediaUrl.concat(file)
    let uri = (where === 'local') ? path : url
    return uri
  }

  for (let i = 0; i < zfiles.length; i++) {
    let fileName = zfiles[i]
    let icol = col(i)

    let parts = fileName.match(partsPattern)
    let fullname = parts[0] // eon
    let prefixAndCode = parts[1]
    let prefix = parts[2]
    let code = parts[3] // thumb, gif
    let name = parts[4] // thumb, gif

    let p = {
      where: where,
      prefix: prefix,
      code: code,
      type: undefined,
      outdirpath: outdirpath,
      rootMediaUrl: rootMediaUrl,
    }

    let outThumbnailPath = getUri(Object.assign({}, p, {name: 'thumbnail', type: 'thumbnail', ext: 'png', where: 'local'}))
    let outThumbnailUri = getUri(Object.assign({}, p, {name: 'thumbnail', type: 'thumbnail', ext: 'png'}))
    let outPreviewUri = getUri(Object.assign({}, p, {name: 'preview', type: 'preview', ext: 'png'}))
    let outGifPath = getUri(Object.assign({}, p, {type: 'gif', ext: 'gif', where: 'local'}))
    let outGifUri = getUri(Object.assign({}, p, {type: 'gif', ext: 'gif'}))
    let outEonUri = getUri(Object.assign({}, p, {type: 'zeon', name: name, ext: 'html'}))

    let targetUri
    if (existsFile(outGifPath)) {
      targetUri = outGifUri
    } else {
      targetUri = outEonUri
    }

    let srcUri
    if (existsFile(outThumbnailPath)) {
      srcUri = outThumbnailUri
    } else {
      srcUri = notile
    }

    let t = `onmouseover="(function(that){
              that.width='${previewview.width}'
              that.height='${previewview.height}'
                  let outdirpath = that.outdirpath 
                  if (1 && 1) console.log('outdirpath', outdirpath)
                  let rootMediaUrl = that.rootMediaUrl
                  let where = that.where
                  let code = that.code || '10'
                  let ext = 'png'
                  let type = 'preview'
                  let file = 'eon-z-'
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

    outText += `[<img id="${i}" alt="${code}"
          code="${code}" where="${where}" ext="png" type="preview" prefix="eon-z-"  outdirpath="${outdirpath}"  rootMediaUrl="${rootMediaUrl}"
          src="${srcUri}"
          width="${tileview.width}px;" height="${tileview.height}px;"/>](${targetUri})`

    if (icol === qcols - 1) { // end row
      outText += `${endOfLine}${newLine}`
    }
  }
  outText += `${erebody}${body}${newLine}${newLine}`
  outText += ``
  outText += `${footer}`

  return outText
}

if (action === 'doAction') {
  console.log(`doAction ${state.where} eon files`)
  let outPath = `${state.outDir}${state.outFile}`
  let outText = doAction(state)
  fs.writeFileSync(outPath, outText)
} else if (action === 'debug') {
  console.log(`doAction ${state.where} eon files`)
  let outPath = `${state.outDir}${state.outFile}`
  let outText = doAction(state)
  if (1 && 1) console.log('outText', outPath, outText)
} else if (action === 'help') {
  console.log(`node ${prgname} {[pattern]} {local|remote} {[help], [debug], [do]}
      generate README.md file
      takes html files from pattern, eg 7*
      builds content for local or remote README
      create matrix of thumbnail tiles
      each tile points in precedence to:
        - tweet (from .json)
        - gif anima (.gif)
        - eon (.html)
  `)
}
