
// ... **maintains eonify netlify site**
// ... https://eonify.netlify.com/
// ... https://github.com/sifbuilder/eonify
// ... https://github.com/sifbuilder/eons
// ... https://sifbuilder.github.io/eons/

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

let action = (opts[0] !== undefined) ? opts[0] : 'help'
let option = 'none'
if (opts[1] !== undefined) option = opts[1]

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

const htmlpattern = new RegExp('^(eon.*).html$', 'i')
const eonpattern = new RegExp('^' + 'eon' + '.*' + '.*(.html|js)', 'i')
const eonifypattern = new RegExp('^' + 'eonify' + '.*' + '.*(.html|js)', 'i')
const testpattern = new RegExp('(.*).test.(.*)$', 'i')
const mdpattern = /\/\/ ...:(.*)/mg // // md (global multiline)
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

api.d00 = (p = {opt: 'help'}) => {
  if (p.opt === 'help') {
    console.log('get Gatsby CLI (https://www.gatsbyjs.org/docs/) ')
    console.log('in http://www.netlifycms.org get the gatsby cms  https://app.netlify.com/start/deploy?repository=https://github.com/AustinGreen/gatsby-starter-netlify-cms&stack=cms')
    console.log('connect to github')
    console.log('select site name - eg. eonify')
    console.log('site settings, change site name - eg. eonify')
  } else {
    console.log('nothing to do')
  }
}

api.d01 = (p = {opt: 'help'}) => {
  if (p.opt === 'help') {
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

api.d02 = (p = {opt: 'help'}) => {
  if (p.opt === 'help') {
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
}

api.d03 = (p = {opt: 'help'}) => {
  if (p.opt === 'help') {
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
}

api.d04 = (p = {opt: 'help'}) => {
  if (p.opt === 'help') {
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
}

api.d04a = (p = {opt: 'help'}) => {
  if (p.opt === 'help') {
  // 04a build to call admin locally

    console.log('npm run build')
    console.log('npm run serve')
    console.log('sign up to site - from email notification')
  }
}

api.d6 = (p = {opt: 'help'}) => {
  // 06.- create about page
  let fromFile06 = `${fromsitedir}/src_pages_about_index.md`
  let toFile06 = `${sitepath}/src/pages/about/index.md`
  let toFile06_bck = `${sitepath}/src/pages/about/index.md.000`

  if (p.opt === 'help') {
    console.log(`show ${fromFile06} to ${toFile06}`)
  } else {
    filelog['fromFile06'] = `${fromFile06}`
    filelog['toFile06'] = `${toFile06}`
    filelog['toFile06_bck'] = `${toFile06_bck}`
    if (fs.existsSync(filelog['toFile06'])) {
      console.log(`06.- ${filelog['toFile06']} already exist`)
      if (!fs.existsSync(filelog['toFile06_bck'])) fs.copyFileSync(filelog['toFile06'], filelog['toFile06_bck'])
      fs.copyFileSync(filelog['fromFile06'], filelog['toFile06'])
    } else {
      console.log(`06.- copy file ${filelog['fromFile06']} to ${filelog['toFile06']}`)
      fs.copyFileSync(filelog['fromFile06'], filelog['toFile06'])
    }
  }
}

api.d07 = (p = {opt: 'help'}) => {
  // src/img/eons-logo.svg - upd
  filelog['fromFile07'] = `${fromsitedir}/src_img_eons-logo.svg`
  filelog['toFile07'] = `${sitepath}/src/img/eons-logo.svg`
  filelog['toFile07_bck'] = `${sitepath}/src/img/eons-logo.svg.000`
  if (p.opt === 'help') {
    console.log(`copy ${filelog['fromFile07']} to ${filelog['toFile07']}`)
  } else {
    if (fs.existsSync(filelog['toFile07'])) {
      console.log(`07.- ${filelog['toFile07']} already exist`)
      if (!fs.existsSync(filelog['toFile07_bck'])) fs.copyFileSync(filelog['toFile07'], filelog['toFile07_bck'])
      fs.copyFileSync(filelog['fromFile07'], filelog['toFile07'])
    } else {
      console.log(`07.- copy file ${filelog['fromFile07']} to ${filelog['toFile07']}`)
      fs.copyFileSync(filelog['fromFile07'], filelog['toFile07'])
    }
  }
}

api.d08 = (p = {opt: 'help'}) => {
  // src/img/twitter-icon - create
  filelog['fromFile08'] = `${fromsitedir}/src_img_twitter-icon.svg`
  filelog['toFile08'] = `${sitepath}/src/img/twitter-icon.svg`
  filelog['toFile08_bck'] = `${sitepath}/src/img/twitter-icon.svg.000`
  if (p.opt === 'help') {
    console.log(`copy ${filelog['fromFile08']} to ${filelog['toFile08']}`)
  } else {
    if (fs.existsSync(filelog['toFile08'])) {
      console.log(`08.- ${filelog['toFile08']} already exist`)
      if (!fs.existsSync(filelog['toFile08_bck'])) fs.copyFileSync(filelog['toFile08'], filelog['toFile08_bck'])
      fs.copyFileSync(filelog['fromFile08'], filelog['toFile08'])
    } else {
      console.log(`08.- copy file ${filelog['fromFile08']} to ${filelog['toFile08']}`)
      fs.copyFileSync(filelog['fromFile08'], filelog['toFile08'])
    }
  }
}

// 09.- src/components/Navbar
api.d09 = (p = {opt: 'help'}) => {
  filelog['fromFile09'] = `${fromsitedir}/src_components_Navbar.js`
  filelog['toFile09'] = `${sitepath}/src/components/Navbar.js`
  filelog['toFile09_bck'] = `${sitepath}/src/components/Navbar.js.000`
  if (p.opt === 'help') {
    console.log(`copy ${filelog['fromFile09']} to ${filelog['toFile09']}`)
  } else {
    if (fs.existsSync(filelog['toFile09'])) {
      console.log(`09.- ${filelog['toFile09']} already exist`)
      if (!fs.existsSync(filelog['toFile09_bck'])) fs.copyFileSync(filelog['toFile09'], filelog['toFile09_bck'])
      fs.copyFileSync(filelog['fromFile09'], filelog['toFile09'])
    } else {
      console.log(`09.- copy file ${filelog['fromFile09']} to ${filelog['toFile09']}`)
      fs.copyFileSync(filelog['fromFile09'], filelog['toFile09'])
    }
  }
}

// 10.- src/pages/index.js
api.d10 = (p = {opt: 'help'}) => {
  filelog['fromFile10'] = `${fromsitedir}/src_pages_index.js`
  filelog['toFile10'] = `${sitepath}/src/pages/index.js`
  filelog['toFile10_bck'] = `${sitepath}/src/pages/index.js.000`
  if (p.opt === 'help') {
    console.log(`copy ${filelog['fromFile10']} to ${filelog['toFile10']}`)
  } else {
    if (fs.existsSync(filelog['toFile10'])) {
      console.log(`10.- ${filelog['toFile10']} already exist`)
      if (!fs.existsSync(filelog['toFile10_bck'])) fs.copyFileSync(filelog['toFile10'], filelog['toFile10_bck'])
      fs.copyFileSync(filelog['fromFile10'], filelog['toFile10'])
    } else {
      console.log(`10.- copy file ${filelog['fromFile10']} to ${filelog['toFile10']}`)
      fs.copyFileSync(filelog['fromFile10'], filelog['toFile10'])
    }
  }
}

// 11.- src/pages/blog/*
api.d11 = (p = {opt: 'help'}) => {
  filelog['fromDir11'] = `${fromsitedir}/src_pages_blog/`
  filelog['toDir11'] = `${sitepath}/src/pages/blog`
  filelog['toDir11_bck'] = `${sitepath}/src/pages/blog.000`
  if (p.opt === 'help') {
    console.log(`copy ${filelog['fromDir11']} to ${filelog['toDir11']}`)
  } else {
    if (fs.existsSync(filelog['toDir11'])) {
      console.log(`11.- ${filelog['toDir11']} already exist`)
      console.log(`11.- copy dir ${filelog['fromDir11']} to ${filelog['toDir11']}`)

      if (!fs.existsSync(filelog['toDir11_bck'])) {
        console.log(`rename ${filelog['toDir11']} to ${filelog['toDir11_bck']}`)
        fs.renameSync(filelog['toDir11'], filelog['toDir11_bck'])
      }

      // let prefiles = fs.readdirSync(filelog['toDir11'])
      // for (let i=0; i<prefiles.length; i++) {
      // let fileToDelete = `${filelog['toDir11']}/${prefiles[i]}`
      // console.log(`del: ${fileToDelete}`)
      // fs.unlinkSync(fileToDelete);
      // }
      if (!fs.existsSync(filelog['toDir11'])) {
        console.log(`create ${filelog['toDir11']}`)
        fs.mkdirSync(filelog['toDir11'])
      }
    }

    // git clean -df
    // git checkout -- .

    let fromfiles = fs.readdirSync(filelog['fromDir11'])
    for (let i = 0; i < fromfiles.length; i++) {
      let fromFileToCopy = `${filelog['fromDir11']}/${fromfiles[i]}`
      let toFileToCopy = `${filelog['toDir11']}/${fromfiles[i]}`
      console.log(` copy: ${fromFileToCopy} to: ${toFileToCopy}`)

      fs.copyFileSync(fromFileToCopy, toFileToCopy)
    }
  }
}

// 12.- src/pages/static_img/
api.d12 = (p = {opt: 'help'}) => {
  filelog['fromDir12'] = `${fromsitedir}/static_img/`
  filelog['toDir12'] = `${sitepath}/static/img`
  filelog['toDir12_bck'] = `${sitepath}/static/img.000`
  if (p.opt === 'help') {
    console.log(`copy ${filelog['fromDir12']} to ${filelog['toDir12']}`)
  } else {
    if (fs.existsSync(filelog['toDir12'])) {
      console.log(`12.- ${filelog['toDir12']} already exist`)
      console.log(`12.- copy dir ${filelog['fromDir12']} to ${filelog['toDir12']}`)

      console.log(`rename ${filelog['toDir12']} to ${filelog['toDir12_bck']}`)
      fs.renameSync(filelog['toDir12'], filelog['toDir12_bck'])

      // let prefiles = fs.readdirSync(filelog['toDir12'])
      // for (let i=0; i<prefiles.length; i++) {
      // let fileToDelete = `${filelog['toDir12']}/${prefiles[i]}`
      // console.log(`del: ${fileToDelete}`)
      // fs.unlinkSync(fileToDelete);
      // }
      console.log(`create ${filelog['toDir12']}`)
      fs.mkdirSync(filelog['toDir12'])
    }

    // git clean -df
    // git checkout -- .

    let fromfiles = fs.readdirSync(filelog['fromDir12'])
    for (let i = 0; i < fromfiles.length; i++) {
      let fromFileToCopy = `${filelog['fromDir12']}/${fromfiles[i]}`
      let toFileToCopy = `${filelog['toDir12']}/${fromfiles[i]}`
      console.log(` copy: ${fromFileToCopy} to: ${toFileToCopy}`)

      fs.copyFileSync(fromFileToCopy, toFileToCopy)
    }
  }
}

// 13.- eon:src_templates_eon-page.js
api.d13 = (opt = 'help') => {
  filelog['fromFile13'] = `${fromsitedir}/src_templates_eon-page.js`
  filelog['toFile13'] = `${sitepath}/src/templates/eon-page.js`
  filelog['toFile13_bck'] = `${sitepath}/src/templates/eon-page.js.000`
  if (fs.existsSync(filelog['toFile13'])) {
    console.log(`13.- ${filelog['toFile13']} already exist`)
    if (!fs.existsSync(filelog['toFile13_bck'])) fs.copyFileSync(filelog['toFile13'], filelog['toFile13_bck'])
    fs.copyFileSync(filelog['fromFile13'], filelog['toFile13'])
  } else {
    console.log(`13.- copy file ${filelog['fromFile13']} to ${filelog['toFile13']}`)
    fs.copyFileSync(filelog['fromFile13'], filelog['toFile13'])
  }
}

// 14.- eon:src_cms_preview-templates_EonPagePreview.js
api.d14 = (opt = 'help') => {
  filelog['fromFile14'] = `${fromsitedir}/src_cms_preview-templates_EonPagePreview.js`
  filelog['toFile14'] = `${sitepath}/src/cms/preview-templates/EonPagePreview.js`
  filelog['toFile14_bck'] = `${sitepath}/src/cms/preview-templates/EonPagePreview.js.000`
  if (fs.existsSync(filelog['toFile14'])) {
    console.log(`14.- ${filelog['toFile14']} already exist`)
    if (!fs.existsSync(filelog['toFile14_bck'])) fs.copyFileSync(filelog['toFile14'], filelog['toFile14_bck'])
    fs.copyFileSync(filelog['fromFile14'], filelog['toFile14'])
  } else {
    console.log(`14.- copy file ${filelog['fromFile14']} to ${filelog['toFile14']}`)
    fs.copyFileSync(filelog['fromFile14'], filelog['toFile14'])
  }
}

// eon:src_cms_cms.js - upd - import from eon template
api.d15 = (opt = 'help') => {
  filelog['fromFile15'] = `${fromsitedir}/src_cms_cms.js`
  filelog['toFile15'] = `${sitepath}/src/cms/cms.js`
  filelog['toFile15_bck'] = `${sitepath}/src/cms/cms.js.000`
  if (fs.existsSync(filelog['toFile15'])) {
    console.log(`15.- ${filelog['toFile15']} already exist`)
    if (!fs.existsSync(filelog['toFile15_bck'])) fs.copyFileSync(filelog['toFile15'], filelog['toFile15_bck'])
    fs.copyFileSync(filelog['fromFile15'], filelog['toFile15'])
  } else {
    console.log(`15.- copy file ${filelog['fromFile15']} to ${filelog['toFile15']}`)
    fs.copyFileSync(filelog['fromFile15'], filelog['toFile15'])
  }
}

api.d16 = (opt = 'help') => {
  // create tiles component
  console.log(`should create tiles component src/components/Eontiles.js`)
}

api.d17 = () => {
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

api.d18 = (opt = 'help') => {
  // create eons page
  console.log(`src/pages/eons/index.md`)
  filelog['fromFile18'] = `${fromsitedir}/src_pages_eons_index.md`
  filelog['toFile18'] = `${sitepath}/src/pages/eons/index.md`
  filelog['toFile18_bck'] = `${sitepath}/src/pages/eons/index.md.000`
  if (fs.existsSync(filelog['toFile18'])) {
    console.log(`18.- ${filelog['toFile18']} already exist`)
    if (!fs.existsSync(filelog['toFile18_bck'])) fs.copyFileSync(filelog['toFile18'], filelog['toFile18_bck'])
    fs.copyFileSync(filelog['fromFile18'], filelog['toFile18'])
  } else {
    console.log(`18.- copy file ${filelog['fromFile18']} to ${filelog['toFile18']}`)
    fs.copyFileSync(filelog['fromFile18'], filelog['toFile18'])
  }
}

api.d19 = (opt = 'help') => {
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




if (action === 'help') {
  console.log(`node ${prgname} {[help], browse, action} [help]`)
  console.log(`project info from ${fromsitedir}`)
  console.log(`browse: launch server: cd ${sitepath}; npm start develop`)
  console.log(`action {[help] deploy, browse}`)
  console.log(`d02 create npm project`)
  console.log(`d03 yarn project`)
  console.log(`d04 create admin index`)
  console.log(`d06 create about page`)
  console.log(`d07 site logo`)
  console.log(`d08 twitter logo`)
  console.log(`d09 navbar`)
  console.log(`d10 index.js`)
  console.log(`d11 blog/*`)
  console.log(`d12 static_img/`)
  console.log(`d13 eons folder`)
  console.log(`d14 eon-page.js`)
  console.log(`d15 help`)
  if (api[action] !== undefined) {
    api[action]({opt: 'help'})
    console.log('filelog: ', filelog)
  }
} else if (action === 'browse') {
  browse()
} else if (api[action] !== undefined) {
  if (api[action] !== undefined) {
    if (option === 'help') {
      api[action]({opt: 'help'})
    } else {
      api[action]({opt: 'do'})
      console.log('filelog: ', filelog)
    }
  }
}
