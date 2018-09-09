
// md: publish eons
// md: node _eonify-teer-npm { eons, all, eonclass }
// nd: create npm project in eons_dist and npm publish

const fs = require('fs')
const path = require('path')
const http = require('http')
const { spawn } = require('child_process')
const { exec } = require('child_process')
var npm = require('npm')

const waitInPromise = delay => arg =>
  Number.isFinite(delay) && delay > 0
    ? new Promise(resolve => setTimeout(() => resolve(arg), delay))
    : Promise.resolve(arg)

const isDirectory = d => fs.lstatSync(d).isDirectory()
const isFile = d => fs.lstatSync(d).isFile()

let dirpathname = path.dirname(require.main.filename)
let dirname = __dirname

let args = process.argv
let [cmd, scp, ...opts] = args


// will publish

let dopublish = 0 // default to no publish
if (opts.length < 2) {
  // dopublish is 0
} else {
  if (opts[1] === 'publish') dopublish = 1
}

// set scope

let scope = 'eons' // default to root
if (opts.length === 0) {
    console.log(`node _eonify-teer-npm eons [publish]
node _eonify-teer-npm eonitems [publish]
`)
    dopublish = 0
    scope = 'eons'
    
} else if (opts.length === 1) {
  
  if (opts[0] === 'publish') {
    scope = 'eonitems'  // cover all eons in scope
    dopublish = 1
  } else {
    
    scope = opts[0] // filter eonitems
    dopublish = 0
  }
  
} else if (opts.length === 2) {
    scope = opts[0] // filter eonitems
    dopublish = (opts[1] === 'publish') ? 1 : 0
    
}

console.log(`scope ${scope}`)
console.log(`dopublish ${dopublish}`)
  

// md: getReadhtml
// md: get eons html page

function getReadhtml (inDir, root) {
  
root = root !== undefined ? root : 'https://sifbuilder.github.io/eon/'
let outText = ''  
  
let indexpattern = new RegExp('^' + 'eon-z' + '.*' + '.*(.html)', 'i')
let eonpattern = new RegExp('^' + 'eon' + '.*' + '.*(.js)', 'i')
let testpattern = new RegExp('(.*)\.test\.(.*)$', 'i') //  test
let mdpattern = new RegExp('(.*)\.md\.(.*)$', 'i') //  md
let zpattern = new RegExp('^' + 'eon-z' + '.*' + '.*(.js)', 'i')

let newLine = '\n'
let endOfLine = '  '
let header = `<h1>eons</h1> ${newLine}${newLine}`
let footer = `${newLine}# license${endOfLine}${newLine}MIT${endOfLine}`

outText += `${header}`  
  

let body = ''
let indexfiles = fs.readdirSync(inDir) // index files in inDir
  .filter(d => indexpattern.test(d))
  .filter(d => !testpattern.test(d))
  .filter(d => !mdpattern.test(d))

body += `<ol class="list-unstyled">${newLine}`  
for (let i = 0; i < indexfiles.length; i++) {
  let fileName = indexfiles[i]

  let regex2 = new RegExp('^(((eon-z-)?(((?!-).)*)-(.*))\.(html))', 'i')
  let parts = fileName.match(regex2)

  let fullname = parts[0]
  let part = parts[1]
  let name = parts[2]
  let code = parts[4]

  let type = parts[6]

  let preline = `${code}` //
  let bodyline = `[${name}](${root}${fullname})` //
  let urlline = `<li><a href="${root}${fullname}">${name}</a></li>` //

  let mdfullname = `${name}.md`
  let postline = ''
  if (fs.existsSync(mdfullname)) {
    preline = `**[${preline}](${root}${mdfullname})**`
  }
  // let line = `${preline} - ${bodyline} `
  let line = `${urlline} `

  body += `${line}${endOfLine}${newLine}`
}
body += `</ol>${newLine}`  
outText += `${body}${newLine}${newLine}`  
outText += `${footer}`  
  
  


  let eons = ''
  let html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  
  <title>eons</title>
  
  
</head>
<body>

  ${outText}
  
</body>
</html>`

  return html
}

// md: getMdtext
// md: build the .md text
// md: @name
// md: the md depends if the global package (eons)
// md: or an individual eon is passed

function getMdtext (name) {
  let title, subtitle
  if (name !== undefined) { // eon
    title = `eon ${name}`
    subtitle = `an imagine of **space-time manifolds**`
  } else { // eons -
    title = `eons`
    subtitle = `imagining **space-time manifolds**`
  }

  let md = `# ${title}

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

// md: getPackobj
// md: build the package.json text
// md: @fullName
// md: @name
// md: @ver         version
// md: @desc        description
// md: @ncdfolder   package folder

function getPackobj (fullName, name, ver, desc = '', ncdfolder = './') {
  let unpkg = (fullName !== undefined) ? `${ncdfolder}${fullName}` : `${ncdfolder}`

  if (fullName === undefined) fullName = 'eons.html'
  
  let pkg = {
    name: `${name}`,
    version: `${ver}`,
    description: `${desc}`,
    author: {
      name: 'sifbuilder@gmail.com',
    },
    license: 'MIT',
    repository: {
      type: 'git',
      url: `github.com/sifbuilder/eons.git`,
    },
    unpkg: `${unpkg}`,
    files: [
      `${ncdfolder}`,
    ],
    main: `${fullName}`,
  }
  return JSON.stringify(pkg, 0, 2)
}

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


if (scope === 'eons') { // eonify is root

  // md: if scope is eons, get root
  
  infiles = [ 'eons' ] // if not all eons in param opts then publish eons


} else if (scope === 'eonitems') {
  
  // md: if scope is eonitems, cover all eons items
  
  infiles = fs.readdirSync(indir)
    .filter(file => isFile(file))
    .filter(d => eonpattern.test(d))
    .filter(d => !testpattern.test(d))
    .filter(d => !mdpattern.test(d))
    .filter(d => !imgpattern.test(d))


} else {
  
  // md: if scope is pattern, select eons
  
  const eonitemspattern = new RegExp('^' + '.*' + scope + '.*(.html|js)', 'i')

  infiles = fs.readdirSync(indir)
    .filter(file => isFile(file))
    .filter(d => eonitemspattern.test(d))
    .filter(d => !testpattern.test(d))
    .filter(d => !mdpattern.test(d))
    .filter(d => !imgpattern.test(d))
    
}

let indirpath = (dirname + '/').replace(/\\/g, '/') // z-indexes
let infilename = 'eon-z-722e-fractals10.html'
let inpathname = `${indirpath}${infilename}`

if (1 && 1) console.log('infiles', infiles)

// outdir

let outdirpath = (dirname + '/pacs/').replace(/\\/g, '/') // images
let outfilename = 'eon-z-722e-fractals10.pac'
let outpathname = `${outdirpath}${outfilename}`
let outext = '.png'

let outdirname = 'eons_dist'
let outdir = `${dirname}/./${outdirname}/`
fs.existsSync(outdir) || fs.mkdirSync(outdir); console.log('create dist folder ', outdir) // CREATE

let tofile = 'NOFILE'
let outtext = 'NOTEXT'

// package version

let packver = '0.0.1-rc2'

// promise

let promises = infiles.map(fileName => {
  Promise.resolve(fileName)
    .then(fileName => {
      if (1 && 1) console.log('out root dir', outdir)

      let regex2 = new RegExp('^(((eon-)?(((?!-).)*)-(.*))\.(html|js))', 'i')
      let parts = fileName.match(regex2) || []
      let fullName = parts[0]
      let name = parts[1]
      let rootname = parts[2] || 'eons' // ----------------
      let label = parts[3]
      let ext = parts[4]

      if (1 && 1) console.log('fileName:', fileName)
      if (1 && 1) console.log('rootname:', rootname)

      let pckfolder = `${outdir}${rootname}/` // pckfolder

      if (1 && 1) console.log('dist dir:', pckfolder)
      if (!fs.existsSync(pckfolder)) {
        fs.mkdirSync(pckfolder) // create dist folder
      // if (1 && 1) console.log('create dist folder ', pckfolder)
      }

      let outfiile = 'NOFILE'
      let fromfile = 'NOFILE'

      // md: README

      let mdtext = getMdtext(fullName) // place README
      let mdfilename = rootname + '.md'
      outfile = 'README.md'
      fromfile = `${indir}${mdfilename}`
      tofile = `${pckfolder}${outfile}`

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

      // md: LICENSE
      // md: add license file to dist folder

      contextfilename = 'LICENSE' // place LICENSE
      outfile = 'LICENSE'
      fromfile = `${indir}${contextfilename}`
      tofile = `${pckfolder}${outfile}`
      if (fs.existsSync(fromfile)) {
        if (1 && 1) console.log('copy file to file ', fromfile, tofile)
        fs.copyFileSync(fromfile, tofile)
      } else {
        if (1 && 1) console.log('file does not exsist ')
      }

      // md: PACKAGE
      // md: add package.json file to dist folder

      contextfilename = 'package.json' // place PACKAGE.json
      outfile = 'package.json'
      let packagetext = getPackobj(fullName, rootname, packver, `${rootname}`, './')
      tofile = `${pckfolder}${outfile}`
      fs.writeFileSync(tofile, packagetext)

      // md: EONFILE

      if (fileName === 'eons')     {  // if root
      
          console.log('build eons file')
          
          fromtext = getReadhtml(indir)
          
          outfile = `${fileName}.html`

          let ncdfolder = '.' // versus build, dist
          let pckdistfolder = `${pckfolder}${ncdfolder}/`
          fs.existsSync(pckdistfolder) || fs.mkdirSync(pckdistfolder)
          console.log('create pck dist folder ', pckdistfolder)

          tofile = `${pckdistfolder}${outfile}`
          if (fs.existsSync(fromfile)) {
            if (1 && 1) console.log('copy text to file ', fromtext, tofile)
            fs.writeFileSync(tofile, fromtext)
          } else {
            if (1 && 1) console.log(`no eon file ${fromfile} in dist `)
          }          
          
      } else {
        
          fromfile = `${indir}${fullName}` // place EON as fullName in build
          outfile = fullName // "index.js" //

          let ncdfolder = '.' // versus build, dist
          let pckdistfolder = `${pckfolder}${ncdfolder}/`
          fs.existsSync(pckdistfolder) || fs.mkdirSync(pckdistfolder)
          console.log('create pck dist folder ', pckdistfolder)

          tofile = `${pckdistfolder}${outfile}`
          if (fs.existsSync(fromfile)) {
            if (1 && 1) console.log('copy file to file ', fromfile, tofile)
            fs.copyFileSync(fromfile, tofile)
          } else {
            if (1 && 1) console.log(`no eon file ${fromfile} in dist `)
          }
      }
      
      // md: NPM PUBLISH

      if (dopublish === 1) {
        console.log(`publish ${pckfolder}`)
        let child = exec('npm publish',
          {cwd: `${pckfolder}`},
          function (error, stdout, stderr) {
            console.log('stdout: ' + stdout)
            console.log('stderr: ' + stderr)
            if (error !== null) { console.log('exec error: ' + error) }
          })
      }
    })
})
Promise.all(promises)
  .then(() => { console.log('done') })
