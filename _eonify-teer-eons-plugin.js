const fs = require('fs')
const path = require('path')
const http = require('http')
const { spawn } = require('child_process')
const { exec } = require('child_process')
var npm = require('npm')
const util = require('util');
const execFile = util.promisify(require('child_process').execFile);

let args = process.argv
let [cmd, scp, ...opts] = args

let scope = opts[0] // scope {eons (default), eonify, all}
if (scope === undefined) scope = "eons"  // default to eons

let dirname = path.dirname(require.main.filename)

const waitInPromise = delay => arg =>
  Number.isFinite(delay) && delay > 0
    ? new Promise(resolve => setTimeout(() => resolve(arg), delay))
    : Promise.resolve(arg)


const isDirectory = d => fs.lstatSync(d).isDirectory()
const isFile = d => fs.lstatSync(d).isFile()


// indir

const htmlpattern = new RegExp('^(eon.*)\.html$', 'i')
const eonpattern = new RegExp('^' + 'eon' + '.*' + '.*(.html|js)', 'i')
const eonifypattern = new RegExp('^' + 'eonify' + '.*' + '.*(.html|js)', 'i')
const testpattern = new RegExp('(.*)\.test\.(.*)$', 'i')
const mdpattern = /\/\/.?md:(.*)/mg // // md (global multiline)
const imgpattern = new RegExp('(.*)(.jpg)$', 'i')
const zpattern = new RegExp('(.*)(.html)$', 'i')

let indir = './'
let fromfile = ''

let infiles = []
  
infiles = fs.readdirSync(indir)
.filter(file => isFile(file))
  .filter(d => eonifypattern.test(d))
  .filter(d => !testpattern.test(d))
  .filter(d => !mdpattern.test(d))
  .filter(d => !imgpattern.test(d))  
  

let indirpath = (__dirname + '/').replace(/\\/g, '/') // z-indexes
let infilename = 'infilename.html'
let inpathname = `${indirpath}${infilename}`



let rootdirname = 'eons'
let netlifysite = "eons"
let netlifyurl = "https://github.com/gatsbyjs/gatsby-starter-hello-world"
let rootdirpath = `${__dirname}/../${rootdirname}/`
let sitepath = `${rootdirpath}${netlifysite}`



async function deploy() {
  await exec('node --version',
        {},
        function (error, stdout, stderr) {
           console.log('stdout: ' + stdout);
      })    
     
  if (fs.existsSync(rootdirpath)) {
    console.log(`root folder ${rootdirpath} exists`) // ROOT DIR exists
  } else {
    console.log(`create dist folder ${rootdirpath}`) // CREATE ROOT DIR
    fs.mkdirSync(rootdirpath)
  }
      
      
  let packPath = `${sitepath}/package.json`
  let pckExists = fs.existsSync(packPath)
  if (pckExists) {
    console.log(`folder ${sitepath} already has a npm project`)
  } else {
    console.log(`create npm project ${netlifysite} in ${sitepath}`)
    const { stdout } = await exec (`gatsby new ${netlifysite} ${netlifyurl}`,
      {cwd: `${rootdirpath}`}
    )  // cd to root dir
    console.log(stdout)
  }      
      
      
  console.log(`install cms plugin`)
  await exec('npm install --save netlify-cms gatsby-plugin-netlify-cms',
        {},
        function (error, stdout, stderr) {
           console.log('stdout: ' + stdout);
           // console.log('stderr: ' + stderr)
           // if (error !== null) { console.log('exec error: ' + error) }
      })    
      
      
  let tofile = `${sitepath}/gatsby-config.js`
  let fromtext = `module.exports = {
  plugins: ["gatsby-plugin-netlify-cms"],
}
`
  await fs.writeFile(tofile, fromtext)    
      
      
  let staticfolder =   `${sitepath}/static`  
  if (fs.existsSync(staticfolder)) {
    console.log(`root folder ${staticfolder} exists`) // static DIR exists
  } else {
    console.log(`create dist folder ${staticfolder}`) // static ROOT DIR
    fs.mkdirSync(staticfolder)
  }      
   
  let toConfigFile =   `${sitepath}/config.yml`
  let fromConfigText = `backend:
  name: test-repo
media_folder: static/assets
public_folder: assets

collections:
  - name: blog
    label: Blog
    folder: blog
    create: true
    fields:
      - { name: path, label: Path }
      - { name: date, label: Date, widget: date }
      - { name: title, label: Title }
      - { name: body, label: Body, widget: markdown }      
`      
  await fs.writeFile(toConfigFile, fromConfigText)       
      
      
      
  console.log('done')      
      
}



  deploy() 
  








