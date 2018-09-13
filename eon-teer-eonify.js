
// https://eonify.netlify.com/
// https://github.com/sifbuilder/eonify

// https://github.com/sifbuilder/eons
// https://sifbuilder.github.io/eons/

const fs = require('fs')
const path = require('path')
const http = require('http')
const { spawn } = require('child_process')
const { exec } = require('child_process')
const npm = require('npm')
const util = require('util')
const execFile = util.promisify(require('child_process').execFile)

const waitInPromise = delay => arg =>
  Number.isFinite(delay) && delay > 0
    ? new Promise(resolve => setTimeout(() => resolve(arg), delay))
    : Promise.resolve(arg)

const isDirectory = d => fs.lstatSync(d).isDirectory()
const isFile = d => fs.lstatSync(d).isFile()

// args

let args = process.argv
let [cmd, scp, ...opts] = args
// action: {[help] deoploy, browse}
let action = (opts[0] !== undefined) ? opts[0] : 'help'
let option = 'nohelp'
if (opts[1] !== undefined && opts[1] === 'help') option = 'help'

let filename = __filename // full path name of the current module
let prgname = path.basename(filename) // file name of current module
let dirname = path.dirname(require.main.filename) // __dirname

// indir

let indir = './'
let fromsitedir = '../eonify_site' // folder with initial static site files
let fromfile = ''
let indirpath = (dirname + '/').replace(/\\/g, '/') // z-indexes
let infilename = 'infilename.html'
let inpathname = `${indirpath}${infilename}`

let rootdirname = 'eons' // root folder
let netlifysite = 'eonify' // site folder
let rootdirpath = `${dirname}/../`
let sitepath = `${rootdirpath}${netlifysite}` // eg. ./../eonify

const htmlpattern = new RegExp('^(eon.*)\.html$', 'i')
const eonpattern = new RegExp('^' + 'eon' + '.*' + '.*(.html|js)', 'i')
const eonifypattern = new RegExp('^' + 'eonify' + '.*' + '.*(.html|js)', 'i')
const testpattern = new RegExp('(.*)\.test\.(.*)$', 'i')
const mdpattern = /\/\/.?md:(.*)/mg // // md (global multiline)
const imgpattern = new RegExp('(.*)(.jpg)$', 'i')
const zpattern = new RegExp('(.*)(.html)$', 'i')

let infiles = []
infiles = fs.readdirSync(indir)
  .filter(file => isFile(file))
  .filter(d => eonifypattern.test(d))
  .filter(d => !testpattern.test(d))
  .filter(d => !mdpattern.test(d))
  .filter(d => !imgpattern.test(d))

let filelog = {} // touched files

let api = {}

api.d00 = () => {
  if (option === 'help') {
    console.log('get Gatsby CLI (https://www.gatsbyjs.org/docs/) ')
    console.log('in http://www.netlifycms.org get the gatsby cms  https://app.netlify.com/start/deploy?repository=https://github.com/AustinGreen/gatsby-starter-netlify-cms&stack=cms')
    console.log('connect to github')
    console.log('select site name - eg. eonify')
    console.log('site settings, change site name - eg. eonify')
  } else {

  }
}

api.d01 = () => {
  if (option === 'help') {
    console.log(`01.- create site container`)
    console.log(`the site will be located in ${sitepath}: rootdirpath/sitename`)
  } else {
    if (fs.existsSync(rootdirpath)) {
      console.log(`root folder ${rootdirpath} already exists`) // ROOT DIR exists
    } else {
      console.log(`create root folder ${rootdirpath}`) // CREATE ROOT DIR
      fs.mkdir(rootdirpath)
    }
  }
}

api.d02 = () => {
  // 02.- site clone to folder under container
  // ${sitepath} : path to the site
  // ${sitepath}/package.json : site mark for pckExists

  let packPath = `${sitepath}/package.json`
  let pckExists = fs.existsSync(packPath)
  if (pckExists) {
    console.log(`2.- folder ${sitepath} already has a npm project`)
    console.log(`     check ${packPath}`)
  } else {
    console.log(`2.- create npm project ${netlifysite} in ${sitepath}`)
    const { stdout } = exec(`git clone https://github.com/sifbuilder/eonify.git`,
      {cwd: `${rootdirpath}`}
    ) // cd to root dir
    console.log(stdout)
  }
}

api.d03 = () => {
  // 03.- build local site
  //  installMark: `${sitepath}/node_modules`
  //  if not npm installed, yarn site

  let installMark = `${sitepath}/node_modules`
  if (fs.existsSync(installMark)) {
    console.log(`3.- config ${installMark} already exist, no yarn`)
  } else {
    console.log(`3.- yarn project ${netlifysite} in ${sitepath}`)
    const { stdout } = exec(`yarn`, // yarn install, yarn start
      {cwd: `${sitepath}`}
    ) // cd to root dir
    console.log(stdout)
  }
}

api.d04 = () => {
  // 04.- eon:src_static_admin_eon-page.js

  filelog['fromFile04'] = `${fromsitedir}/_static_admin_index`
  filelog['toFile04'] = `${sitepath}/static/admin/index.js`
  filelog['toFile04_bck'] = `${sitepath}/static/admin/index.js.000`
  if (fs.existsSync(filelog['toFile04'])) {
    console.log(`04.- admin index file ${filelog['toFile04']} already exists, bck and copy`)
    fs.copyFileSync(filelog['toFile04'], filelog['toFile04_bck'])
    fs.copyFileSync(filelog['fromFile04'], filelog['toFile04'])
  } else {
    console.log(`04.- create admin index file ${filelog['toFile04']}`)
    fs.copyFileSync(filelog['fromFile04'], filelog['toFile04'])
  }
}

api.d04a = () => {
  // 04a build to call admin locally

  console.log('npm run build')
  console.log('npm run serve')
  console.log('sign up to site - from email notification')
}

api.d05 = () => {
  // 05.- eon:src_templates_eon-page.js

  filelog['fromFile05'] = `${fromsitedir}/src_templates_eon-page.js`
  filelog['toFile05'] = `${sitepath}/src/templates/eon-page.js`
  filelog['toFile05_bck'] = `${sitepath}/src/templates/eon-page.js.000`
  if (fs.existsSync(filelog['toFile05'])) {
    console.log(`05.- ${filelog['toFile05']} already exist`)
    if (!fs.existsSync(filelog['toFile05_bck'])) fs.copyFileSync(filelog['toFile05'], filelog['toFile05_bck'])
    fs.copyFileSync(filelog['fromFile05'], filelog['toFile05'])
  } else {
    console.log(`05.- copy file ${filelog['fromFile05']} to ${filelog['toFile05']}`)
    fs.copyFileSync(filelog['fromFile05'], filelog['toFile05'])
  }
}

api.d06 = () => {
  // 06.- eon:src_cms_preview-templates_EonPagePreview.js

  filelog['fromFile06'] = `${fromsitedir}/src_cms_preview-templates_EonPagePreview.js`
  filelog['toFile06'] = `${sitepath}/src/cms/preview-templates/EonPagePreview.js`
  filelog['toFile06_bck'] = `${sitepath}/src/cms/preview-templates/EonPagePreview.js.000`
  if (fs.existsSync(filelog['toFile06'])) {
    console.log(`06.- ${filelog['toFile06']} already exist`)
    if (!fs.existsSync(filelog['toFile06_bck'])) fs.copyFileSync(filelog['toFile06'], filelog['toFile06_bck'])
    fs.copyFileSync(filelog['fromFile06'], filelog['toFile06'])
  } else {
    console.log(`06.- copy file ${filelog['fromFile06']} to ${filelog['toFile06']}`)
    fs.copyFileSync(filelog['fromFile06'], filelog['toFile06'])
  }
}

api.d07 = () => {
  // eon:src_cms_cms.js - upd - import from eon template

  filelog['fromFile07'] = `${fromsitedir}/src_cms_cms.js`
  filelog['toFile07'] = `${sitepath}/src/cms/cms.js`
  filelog['toFile07_bck'] = `${sitepath}/src/cms/cms.js.000`
  if (fs.existsSync(filelog['toFile07'])) {
    console.log(`07.- ${filelog['toFile07']} already exist`)
    if (!fs.existsSync(filelog['toFile07_bck'])) fs.copyFileSync(filelog['toFile07'], filelog['toFile07_bck'])
    fs.copyFileSync(filelog['fromFile07'], filelog['toFile07'])
  } else {
    console.log(`07.- copy file ${filelog['fromFile07']} to ${filelog['toFile07']}`)
    fs.copyFileSync(filelog['fromFile07'], filelog['toFile07'])
  }
}

api.d08 = () => {
  // src/img/logo.svg - upd
  filelog['fromFile08'] = `${fromsitedir}/src_img_logo.svg`
  filelog['toFile08'] = `${sitepath}/src/img/logo.svg`
  filelog['toFile08_bck'] = `${sitepath}/src/img/logo.svg.000`
  if (fs.existsSync(filelog['toFile08'])) {
    console.log(`08.- ${filelog['toFile08']} already exist`)
    if (!fs.existsSync(filelog['toFile08_bck'])) fs.copyFileSync(filelog['toFile08'], filelog['toFile08_bck'])
    fs.copyFileSync(filelog['fromFile08'], filelog['toFile08'])
  } else {
    console.log(`08.- copy file ${filelog['fromFile08']} to ${filelog['toFile08']}`)
    fs.copyFileSync(filelog['fromFile08'], filelog['toFile08'])
  }
}

api.d09 = () => {
  // src/img/twitter_icon - create
  filelog['fromFile09'] = `${fromsitedir}/src_img_twitter_icon.svg`
  filelog['toFile09'] = `${sitepath}/src/img/twitter_icon.svg`
  filelog['toFile09_bck'] = `${sitepath}/src/img/twitter_icon.svg.000`
  if (fs.existsSync(filelog['toFile09'])) {
    console.log(`09.- ${filelog['toFile09']} already exist`)
    if (!fs.existsSync(filelog['toFile09_bck'])) fs.copyFileSync(filelog['toFile09'], filelog['toFile09_bck'])
    fs.copyFileSync(filelog['fromFile09'], filelog['toFile09'])
  } else {
    console.log(`09.- copy file ${filelog['fromFile09']} to ${filelog['toFile09']}`)
    fs.copyFileSync(filelog['fromFile09'], filelog['toFile09'])
  }
}

api.d10 = () => {
  // src/components/Navbar
  filelog['fromFile10'] = `${fromsitedir}/src_components_Navbar.js`
  filelog['toFile10'] = `${sitepath}/src/components/Navbar.js`
  filelog['toFile10_bck'] = `${sitepath}/src/components/Navbar.js.000`
  if (fs.existsSync(filelog['toFile10'])) {
    console.log(`10.- ${filelog['toFile10']} already exist`)
    if (!fs.existsSync(filelog['toFile10_bck'])) fs.copyFileSync(filelog['toFile10'], filelog['toFile10_bck'])
    fs.copyFileSync(filelog['fromFile10'], filelog['toFile10'])
  } else {
    console.log(`10.- copy file ${filelog['fromFile10']} to ${filelog['toFile10']}`)
    fs.copyFileSync(filelog['fromFile10'], filelog['toFile10'])
  }
}

api.d11 = () => {
  // create tiles component
  console.log(`should create tiles component src/components/Eontiles.js`)
}

api.d12 = () => {
  // create about page
  let fromFile12 = `${fromsitedir}/src_pages_about_index.md`
  let toFile12 = `${sitepath}/src/pages/about/index.md`
  let toFile12_bck = `${sitepath}/src/pages/about/index.md.000`
  
  if (option === 'help') {
    
    console.log(`show ${fromFile12} to ${toFile12}`)
    
  } else {
    filelog['fromFile12'] = `${fromFile12}`
    filelog['toFile12'] = `${toFile12}`
    filelog['toFile12_bck'] = `${toFile12_bck}`
    if (fs.existsSync(filelog['toFile12'])) {
      console.log(`12.- ${filelog['toFile12']} already exist`)
      if (!fs.existsSync(filelog['toFile12_bck'])) fs.copyFileSync(filelog['toFile12'], filelog['toFile12_bck'])
      fs.copyFileSync(filelog['fromFile12'], filelog['toFile12'])
    } else {
      console.log(`12.- copy file ${filelog['fromFile12']} to ${filelog['toFile12']}`)
      fs.copyFileSync(filelog['fromFile12'], filelog['toFile12'])
    }
  }
}

api.d13 = () => {
  // create eons folder
  console.log(`create eons folder`)
  let eonsfolder = `${sitepath}/src/pages/eons`
  if (fs.existsSync(eonsfolder)) {
    console.log(`folder ${eonsfolder} exists`)
  } else {
    console.log(`create dist folder ${eonsfolder}`)
    fs.mkdirSync(eonsfolder)
  }
}

api.d14 = () => {
  // create eons page
  console.log(`src/pages/eons/index.md`)
  filelog['fromFile14'] = `${fromsitedir}/src_pages_eons_index.md`
  filelog['toFile14'] = `${sitepath}/src/pages/eons/index.md`
  filelog['toFile14_bck'] = `${sitepath}/src/pages/eons/index.md.000`
  if (fs.existsSync(filelog['toFile14'])) {
    console.log(`14.- ${filelog['toFile14']} already exist`)
    if (!fs.existsSync(filelog['toFile14_bck'])) fs.copyFileSync(filelog['toFile14'], filelog['toFile14_bck'])
    fs.copyFileSync(filelog['fromFile14'], filelog['toFile14'])
  } else {
    console.log(`14.- copy file ${filelog['fromFile14']} to ${filelog['toFile14']}`)
    fs.copyFileSync(filelog['fromFile14'], filelog['toFile14'])
  }
}

api.d15 = () => {
  // create tiles
  //  create node _eonify-teer-pngs.js
  console.log(`generate  public/img/*`)
}

function browse () {
  let packPath = `${sitepath}/package.json`
  let pckExists = fs.existsSync(packPath)
  if (pckExists) {
    console.log(`CD ${sitepath} && npm run develop`)
    const { stdout } = exec(`npm run develop`,
      {cwd: `${sitepath}`} // cd to root dir
    )
    console.log(stdout)
  } else {
    console.log(`folder ${sitepath} npm project does not exist, no run`)
  }
}

function isFunction (functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
}

if (action === 'help') {
  console.log(`node ${prgname} {[help], browse, action} [help]`)
} else if (action === 'browse') {
  browse()
} else if (api[action] !== undefined) {
  api[action]()
  console.log('filelog: ', filelog)
}
