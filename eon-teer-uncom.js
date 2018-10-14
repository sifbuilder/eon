
// node _eonify-teer-uncom eonpattern [doit]

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

// fs

let filename = __filename // full path name of the current module
let prgname = path.basename(filename) // file name of current module
let dirname = path.dirname(require.main.filename) // __dirname

// args

let args = process.argv
let [cmd, scp, ...opts] = args

let HELP = 'help'
let UNCOMMENT = 'uncomment'
let DOIT = 'doit'
let action = HELP

let doit = 0

// command
let inscopepattern = new RegExp(`^eon-.*___none___.*(html|js)$`, 'i') // none pattern

// opts

if (opts.length === 0) {
  
  action = HELP
  
} else if (opts.length >= 1 && opts[0] !== HELP) { // pattern in arg[1]
  
  action = UNCOMMENT
  let codepattern = '.*' // default to all
  if (opts[0] === '.') {
    codepattern = '.*'
  } else {
    codepattern = opts[0]
  }
  inscopepattern = new RegExp(`^eon-.*${codepattern}.*(html|js)$`, 'i') // view pattern
  
} 

if (opts.length === 2) {
  
  doit = (opts[1] === DOIT) ? 1 : 0
  
}

// outdir

let outdirpath = (dirname + '/eons/').replace(/\\/g, '/') // images
let outdirname = '.'
let outdir = `${dirname}/./${outdirname}/` // eg. eons/./eons_dist

// in files
let indir = './'
let files = fs.readdirSync(indir) // to view
  .filter(file => isFile(file))
  .filter(d => inscopepattern.test(d))

// options
const options = {}
options.doit = doit
options.outdir = outdir
  
// .................. run 
async function run (infiles, opts) {
  
  let doit = opts.doit
  
  let promises = infiles.map(fileName => {
    Promise.resolve(fileName)
      .then(fileName => {
        let regex2 = new RegExp('^(((eon-)?(((?!-).)*)-(.*)).(html|js))', 'i')

        let parts = fileName.match(regex2) || []
        let fullName = parts[0]
        let rootname = parts[2] || 'eons' // ----------------
        let pckfolder = `${outdir}${rootname}/` // pckfolder

        // ... uncomment
        function uncomment (pckfolder, fullName, rootname) {

          let findPattern = '.*(0|1) \&\& (0|1).*(\r\n|\n|\r)' // pattern: (0|1) && (0|1)
          let replacePattern = '' // comment pattern: (0|1) && (0|1)
          let exp = RegExp(`${findPattern}`, 'g')

          let eonfile = `${indir}${fullName}`

          if (fs.existsSync(eonfile)) { // if md file
            let fileTxt = fs.readFileSync(eonfile, 'utf8')

            var arr
            while ((arr = exp.exec(fileTxt)) !== null) {
              let toreplace = arr[0]
              fileTxt = fileTxt.replace(toreplace, replacePattern)
            }

            if (doit) {
              if (1 && 1) console.log('uncomment', eonfile)
              fs.writeFileSync(eonfile, fileTxt)
            }
          }
        }

        uncomment(pckfolder, fullName, rootname)
      })
  })
  Promise.all(promises)
    .then(() => { console.log('done') })
  

}


if (action === 'help') {
  console.log(`node ${prgname} {[help], inscopepattern} on eon- files`)
} else if (action === UNCOMMENT) {
  console.log(`do ${inscopepattern} eon files`)
  run(files, options)
} else {
  console.log(`node ${prgname} {[help], inscopepattern} on eon- files`)
}
