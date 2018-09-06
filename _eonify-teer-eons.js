const fs = require('fs')
const path = require('path')
const http = require('http')
const { spawn } = require('child_process')
const { exec } = require('child_process')
var npm = require('npm')


let args = process.argv
let [cmd, scp, ...opts] = args


let scope = opts[0] // scope {eons (default), eonify, all}

let dirname = path.dirname(require.main.filename)

const waitInPromise = delay => arg =>
  Number.isFinite(delay) && delay > 0
    ? new Promise(resolve => setTimeout(() => resolve(arg), delay))
    : Promise.resolve(arg)


function getMdtext (name) {

  let title, subtitle

  if (name !== undefined) { // eon

    title = `eon ${name}`
    subtitle = `an imagine of **space-time manifolds**`

  } else  {  // eons

    title = `eons`
    subtitle = `imagining **space-time manifolds**`

  }

  let md = `

  # ${title}

  ## ${subtitle}

  ## a story by

    sifbuilder

  based on an original idea by

  - [x] [Mike Bostock] (https://github.com/d3) and
  - [x] [Ricardo Cabello] (https://threejs.org/)

  with influences from among others

  - [x] [Vasco Asturiano] (https://bl.ocks.org/vasturiano)
  - [x] [Philippe Rivière] (https://bl.ocks.org/fil)

  # License

  - MIT`

  return md
}

function getPackobj (fullname, name, ver, desc='', ncdfolder='./' ) {
  
  let unpkg = (fullname !== undefined) ? `${ncdfolder}${fullname}` :  `${ncdfolder}`
  
  let pkg = {
    name: `${name}`,
    version: `${ver}`,
    description: `${desc}`,
    author: {
      name: 'sifbuilder@gmail.com'
    },
    license: 'MIT',
    repository: {
      type: "git",
      url: `github.com/sifbuilder/eons.git`
    },
    unpkg: `${unpkg}`,
    files: [
          `${ncdfolder}`
    ],
    scripts: {},
    main: `${ncdfolder}${fullname}`,
  }
  return JSON.stringify(pkg,0,2)
}

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

if (scope === "eons") {

  infiles = [ 'eons' ]  // if not all eons in param opts then publish eons

} else if (scope === "eonify") {
  
  infiles = fs.readdirSync(indir)
  .filter(file => isFile(file))
    .filter(d => eonifypattern.test(d))
    .filter(d => !testpattern.test(d))
    .filter(d => !mdpattern.test(d))
    .filter(d => !imgpattern.test(d))  
  
} else {
  
  infiles = fs.readdirSync(indir)
  .filter(file => isFile(file))
    .filter(d => eonpattern.test(d))
    .filter(d => !testpattern.test(d))
    .filter(d => !mdpattern.test(d))
    .filter(d => !imgpattern.test(d))

}

let indirpath = (__dirname + '/').replace(/\\/g, '/') // z-indexes
let infilename = 'eon-z-722e-fractals10.html'
let inpathname = `${indirpath}${infilename}`


if (1 && 1) console.log('infiles', infiles)


// outdir

let outdirpath = (__dirname + '/pacs/').replace(/\\/g, '/') // images
let outfilename = 'eon-z-722e-fractals10.pac'
let outpathname = `${outdirpath}${outfilename}`
let outext = '.png'

let outdirname = 'd3animas_dist'
let outdir = `${__dirname}/./${outdirname}/`
fs.existsSync(outdir) || fs.mkdirSync(outdir); console.log('create dist folder ', outdir) // CREATE

let tofile = 'NOFILE'
let outtext = 'NOTEXT'


// package

let packver = '0.0.1-rc1'


// promise

let promises = infiles.map(fileName => {
  Promise.resolve(fileName)
  .then (fileName => {

    if (1 && 1) console.log("out root dir", outdir)

      let regex2 = new RegExp('^(((eon-)?(((?!-).)*)-(.*))\.(js))', 'i')
      let parts = fileName.match(regex2) || []
      let fullname = parts[0]
      let name = parts[1]
      let rootname = parts[2]   || 'eons' // ----------------
      let label = parts[3]
      let ext = parts[4]

    if (1 && 1) console.log('fileName:', fileName)
    if (1 && 1) console.log('rootname:', rootname)

    let pckfolder = `${outdir}${rootname}/`     // pckfolder

    if (1 && 1) console.log('dist dir:', pckfolder)
    if (!fs.existsSync(pckfolder)) {
      fs.mkdirSync(pckfolder)  // create dist folder
      // if (1 && 1) console.log('create dist folder ', pckfolder)
    }

    let outfiile = "NOFILE"
    let fromfile = "NOFILE"


    let mdtext = getMdtext(fullname)  // place README
    let mdfilename = rootname+'.md'
    outfile = "README.md"
    fromfile = `${indir}${mdfilename}`
    tofile = `${pckfolder}${outfile}`
          // if (1 && 1) console.log('README fromfile ', fromfile)
          // if (1 && 1) console.log('tofile ', tofile)
          // if (1 && 1) console.log('mdtext ', mdtext)

      if (fs.existsSync(tofile)) {
        fs.unlinkSync(tofile, (err) => {
        if (err) throw err
          })
        console.log(`successfully deleted ${tofile}`)
      }

      if (fs.existsSync(fromfile)) {
          if (1 && 1) console.log('copy file to file ', fromfile, tofile)
           fs.copyFileSync(fromfile, tofile)
      } else {
          if (1 && 1) console.log('copy text to file ', tofile)
          fs.writeFileSync(tofile, mdtext)
      }



    contextfilename = 'LICENSE' // place LICENSE
    outfile = "LICENSE"
    fromfile = `${indir}${contextfilename}`
    tofile = `${pckfolder}${outfile}`
      if (fs.existsSync(fromfile)) {
          if (1 && 1) console.log('copy file to file ', fromfile, tofile)
           fs.copyFileSync(fromfile, tofile)
      } else {
          if (1 && 1) console.log('file does not exsist ')
      }

      contextfilename = 'package.json'  // place PACKAGE.json
      outfile = 'package.json'
      let packagetext = getPackobj(fullname, rootname, packver, `${rootname}`, "./")
      // if (1 && 1) console.log("packatetext", packagetext)
      tofile = `${pckfolder}${outfile}`
      fs.writeFileSync(tofile, packagetext)

      contextfilename = fullname  // place EON as fullname in build
      outfile = fullname // "index.js" //
      fromfile = `${indir}${contextfilename}`

     let ncdfolder = "build"
     let pckdistfolder = `${pckfolder}${ncdfolder}/`
      fs.existsSync(pckdistfolder) || fs.mkdirSync(pckdistfolder); console.log('create pck dist folder ', pckdistfolder)

      tofile = `${pckdistfolder}${outfile}`
      if (fs.existsSync(fromfile)) {
          if (1 && 1) console.log('copy file to file ', fromfile, tofile)
           fs.copyFileSync(fromfile, tofile)
      } else {
          if (1 && 1) console.log(`no eon file ${fromfile} in dist `)
      }

      let child = exec('npm install',
        {cwd: `${pckfolder}`},
        function (error, stdout, stderr) {
           console.log('stdout: ' + stdout);
           console.log('stderr: ' + stderr)
           if (error !== null) { console.log('exec error: ' + error) }
      })    
    
 
      child


    
  })

})
Promise.all(promises)
.then(() => {console.log('done')})


