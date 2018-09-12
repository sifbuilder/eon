
// https://eonify.netlify.com/
// https://github.com/sifbuilder/eonify

// https://github.com/sifbuilder/eons
// https://sifbuilder.github.io/eons/


const fs = require('fs')
const path = require('path')
const http = require('http')
const { spawn } = require('child_process')
const { exec } = require('child_process')
var npm = require('npm')
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

let filename = __filename // full path name of the current module
let prgname = path.basename(filename) // file name of current module
let dirname = path.dirname(require.main.filename) // __dirname


// indir

let indir = './'
let fromsitedir = './eons_site' // folder with initial static site files
let fromfile = ''
let indirpath = (dirname + '/').replace(/\\/g, '/') // z-indexes
let infilename = 'infilename.html'
let inpathname = `${indirpath}${infilename}`

let rootdirname = "eons"      // root folder
let netlifysite = "eonify"    // site folder 
let rootdirpath = `${dirname}/../${rootdirname}/`   
let sitepath = `${rootdirpath}${netlifysite}`       // eg. ./../eons/eonify


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
  


let filelog = {}

async function deploy() {

  console.log(`0.- deploy cms site`)

  // 01.- create site container
  // the site will be located in ${sitepath}: rootdirpath/sitename
  
  if (fs.existsSync(rootdirpath)) {
    console.log(`1.- root folder ${rootdirpath} already exists`) // ROOT DIR exists
  } else {
    console.log(`1.- create root folder ${rootdirpath}`) // CREATE ROOT DIR
    await fs.mkdir(rootdirpath)
  }

  // 02.- install site in site folder under container
  // the site is in ${sitepath}
  // if ${sitepath}/package.json, the site has been created, do nothing
  
  let packPath = `${sitepath}/package.json`
  let pckExists = fs.existsSync(packPath)
  if (pckExists) {
    console.log(`2.- folder ${sitepath} already has a npm project`)
    console.log(`     check ${packPath}`)
  } else {
    console.log(`2.- create npm project ${netlifysite} in ${sitepath}`)
    const { stdout } = await exec (`git clone https://github.com/sifbuilder/eonify.git`,
      {cwd: `${rootdirpath}`}
    )  // cd to root dir
    console.log(stdout)
  }        
  
  // 03.- build local site with yarn
  //  gatsby-config.js is the yarn mark
  //  if not exists, yarn site
  
  let installMark = `${sitepath}/npm_modules`
  if (fs.existsSync(installMark)) {
    console.log(`3.- config ${installMark} already exist, no yarn`)
  } else {
    console.log(`3.- yarn project ${netlifysite} in ${sitepath}`)
    const { stdout } = await exec (`yarn`,  // yarn install, yarn start
      {cwd: `${sitepath}`}
    )  // cd to root dir
    console.log(stdout)
  }   
  
  
  // 04.- eon:src_static_admin_eon-page.js
  
  filelog['fromFile04'] = `${fromsitedir}/_eonify_static_admin_index`
  filelog['toFile04'] = `${sitepath}/static/admin/index.js`
  filelog['toFile04_bck'] = `${sitepath}/static/admin/index.js.000`
  if (fs.existsSync(filelog['toFile04'])) {    
    if (1 && 1) console.log(`04.- admin index file ${filelog['toFile04']} already exists, bck and copy`)
    fs.copyFileSync(filelog['toFile04'], filelog['toFile04_bck'])      
    fs.copyFileSync(filelog['fromFile04'], filelog['toFile04'])      
  } else {
    if (1 && 1) console.log(`04.- create admin index file ${filelog['toFile04']}`)
    fs.copyFileSync(filelog['fromFile04'], filelog['toFile04'])
  }    

  // 04a.- npm run build
  // 04a.- npm run serve
  
  // 05.- eon:src_templates_eon-page.js
  
  filelog['fromFile05'] = `${fromsitedir}/_eonify_src_templates_eon-page.js`
  filelog['toFile05'] = `${sitepath}/src/templates/eon-page.js`
  filelog['toFile05_bck'] = `${sitepath}/src/templates/eon-page.js.000`
  if (fs.existsSync(filelog['toFile05'])) {
    if (1 && 1) console.log(`05.- ${filelog['toFile05']} already exist`)
    if (!fs.existsSync(filelog['toFile05_bck'])) fs.copyFileSync(filelog['toFile05'], filelog['toFile05_bck'])      
    fs.copyFileSync(filelog['fromFile05'], filelog['toFile05'])       
  } else {
    if (1 && 1) console.log(`05.- copy file ${filelog['fromFile05']} to ${filelog['toFile05']}`)
    fs.copyFileSync(filelog['fromFile05'], filelog['toFile05'])
  }  
  
  // 06.- eon:src_cms_preview-templates_EonPagePreview.js
  
  filelog['fromFile06']    = `${fromsitedir}/_eonify_src_cms_preview-templates_EonPagePreview.js`
  filelog['toFile06']      = `${sitepath}/src/cms/preview-templates/EonPagePreview.js`
  filelog['toFile06_bck']  = `${sitepath}/src/cms/preview-templates/EonPagePreview.js.000`
  if (fs.existsSync(filelog['toFile06'])) {
    if (1 && 1) console.log(`06.- ${filelog['toFile06']} already exist`)
    if (!fs.existsSync(filelog['toFile06_bck'])) fs.copyFileSync(filelog['toFile06'], filelog['toFile06_bck'])      
    fs.copyFileSync(filelog['fromFile06'], filelog['toFile06'])       
  } else {
    if (1 && 1) console.log(`06.- copy file ${filelog['fromFile06']} to ${filelog['toFile06']}`)
    fs.copyFileSync(filelog['fromFile06'], filelog['toFile06'])
  }   
    
  // 07.- eon:src_cms_cms.js - upd - import from eon template
  
  filelog['fromFile07']    = `${fromsitedir}/_eonify_src_cms_cms.js`
  filelog['toFile07']      = `${sitepath}/src/cms/cms.js`
  filelog['toFile07_bck']  = `${sitepath}/src/cms/cms.js.000`
  if (fs.existsSync(filelog['toFile07'])) {
    if (1 && 1) console.log(`07.- ${filelog['toFile07']} already exist`)
    if (!fs.existsSync(filelog['toFile07_bck'])) fs.copyFileSync(filelog['toFile07'], filelog['toFile07_bck'])      
    fs.copyFileSync(filelog['fromFile07'], filelog['toFile07'])       
  } else {
    if (1 && 1) console.log(`07.- copy file ${filelog['fromFile07']} to ${filelog['toFile07']}`)
    fs.copyFileSync(filelog['fromFile07'], filelog['toFile07'])
  }   
    
    
  // 08.- src/img/logo.svg - upd
  filelog['fromFile08']    = `${fromsitedir}/_eonify_src_img_logo.svg`
  filelog['toFile08']      = `${sitepath}/src/img/logo.svg`
  filelog['toFile08_bck']  = `${sitepath}/src/img/logo.svg.000`
  if (fs.existsSync(filelog['toFile08'])) {
    if (1 && 1) console.log(`08.- ${filelog['toFile08']} already exist`)
    if (!fs.existsSync(filelog['toFile08_bck'])) fs.copyFileSync(filelog['toFile08'], filelog['toFile08_bck'])      
    fs.copyFileSync(filelog['fromFile08'], filelog['toFile08'])       
  } else {
    if (1 && 1) console.log(`08.- copy file ${filelog['fromFile08']} to ${filelog['toFile08']}`)
    fs.copyFileSync(filelog['fromFile08'], filelog['toFile08'])
  }   
    
  // 09.- src/img/twitter_icon - create
  filelog['fromFile09']    = `${fromsitedir}/_eonify_src_img_twitter_icon.svg`
  filelog['toFile09']      = `${sitepath}/src/img/twitter_icon.svg`
  filelog['toFile09_bck']  = `${sitepath}/src/img/twitter_icon.svg.000`
  if (fs.existsSync(filelog['toFile09'])) {
    if (1 && 1) console.log(`09.- ${filelog['toFile09']} already exist`)
    if (!fs.existsSync(filelog['toFile09_bck'])) fs.copyFileSync(filelog['toFile09'], filelog['toFile09_bck'])      
    fs.copyFileSync(filelog['fromFile09'], filelog['toFile09'])       
  } else {
    if (1 && 1) console.log(`09.- copy file ${filelog['fromFile09']} to ${filelog['toFile09']}`)
    fs.copyFileSync(filelog['fromFile09'], filelog['toFile09'])
  }  
       
  // 10.- src/components/Navbar
  filelog['fromFile10']    = `${fromsitedir}/_eonify_src_components_Navbar.js`
  filelog['toFile10']      = `${sitepath}/src/components/Navbar.js`
  filelog['toFile10_bck']  = `${sitepath}/src/components/Navbar.js.000`
  if (fs.existsSync(filelog['toFile10'])) {
    if (1 && 1) console.log(`10.- ${filelog['toFile10']} already exist`)
    if (!fs.existsSync(filelog['toFile10_bck'])) fs.copyFileSync(filelog['toFile10'], filelog['toFile10_bck'])      
    fs.copyFileSync(filelog['fromFile10'], filelog['toFile10'])       
  } else {
    if (1 && 1) console.log(`10.- copy file ${filelog['fromFile10']} to ${filelog['toFile10']}`)
    fs.copyFileSync(filelog['fromFile10'], filelog['toFile10'])
  }   
    
  // 11.- create tiles component
  console.log(`should create tiles component src/components/Eontiles.js`)
  
  // 12.- create about page
  filelog['fromFile12']    = `${fromsitedir}/_eonify_src_pages_about_index.md`
  filelog['toFile12']      = `${sitepath}/src/pages/about/index.md`
  filelog['toFile12_bck']  = `${sitepath}/src/pages/about/index.md.000`
  if (fs.existsSync(filelog['toFile12'])) {
    if (1 && 1) console.log(`12.- ${filelog['toFile12']} already exist`)
    if (!fs.existsSync(filelog['toFile12_bck'])) fs.copyFileSync(filelog['toFile12'], filelog['toFile12_bck'])      
    fs.copyFileSync(filelog['fromFile12'], filelog['toFile12'])       
  } else {
    if (1 && 1) console.log(`12.- copy file ${filelog['fromFile12']} to ${filelog['toFile12']}`)
    fs.copyFileSync(filelog['fromFile12'], filelog['toFile12'])
  } 

  // 13.- create eons folder
  console.log(`create eons folder`)
  let eonsfolder = `${sitepath}/src/pages/eons`
  if (fs.existsSync(eonsfolder)) {
    console.log(`folder ${eonsfolder} exists`)
  } else {
    console.log(`create dist folder ${eonsfolder}`)
    fs.mkdirSync(eonsfolder)
  }
  
  // 14.- create eons page
  console.log(`src/pages/eons/index.md`)
  filelog['fromFile14']    = `${fromsitedir}/_eonify_src_pages_eons_index.md`
  filelog['toFile14']      = `${sitepath}/src/pages/eons/index.md`
  filelog['toFile14_bck']  = `${sitepath}/src/pages/eons/index.md.000`
  if (fs.existsSync(filelog['toFile14'])) {
    if (1 && 1) console.log(`14.- ${filelog['toFile14']} already exist`)
    if (!fs.existsSync(filelog['toFile14_bck'])) fs.copyFileSync(filelog['toFile14'], filelog['toFile14_bck'])      
    fs.copyFileSync(filelog['fromFile14'], filelog['toFile14'])       
  } else {
    if (1 && 1) console.log(`14.- copy file ${filelog['fromFile14']} to ${filelog['toFile14']}`)
    fs.copyFileSync(filelog['fromFile14'], filelog['toFile14'])
  } 

  // 15.- create tiles
  //  create node _eonify-teer-pngs.js
  console.log(`generate  public/img/*`)
  
  
  console.log('filelog: ', filelog)
}

function browse() {
  let packPath = `${sitepath}/package.json`  
  let pckExists = fs.existsSync(packPath)
  if (pckExists) {
    console.log(`CD ${sitepath} && npm run develop`)
    const { stdout } = exec (`npm run develop`,
      {cwd: `${sitepath}`}  // cd to root dir
    )  
    console.log(stdout)
  } else {
    console.log(`folder ${sitepath} npm project does not exist, no run`)
  }
  
}      
  

if (action === 'build') {
  console.log('have Gatsby CLI (https://www.gatsbyjs.org/docs/) available')
  console.log('http://www.netlifycms.org')
  console.log(' get the gatsby site" https://app.netlify.com/start/deploy?repository=https://github.com/AustinGreen/gatsby-starter-netlify-cms&stack=cms')
  console.log('connect to github')
  console.log('select site name - eonify')
  console.log('site settings, change site name - eonify')
  console.log('clone git site - eonify')
  console.log('sign up to site - from email notification')
  console.log('got to git site folder')
  console.log('git checkout -b dev')
} else if (action === 'deploy') {
  deploy() 
} else if (action === 'browse') {
  browse()
} else if (action === 'help') {
  console.log(`node ${prgname} {[help], browse, deploy}`)
} else {
  console.log(`usage: node ${prgname} {[help], browse, deploy}`)
}


