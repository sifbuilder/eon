// node _eonify-teer-uncom eonpattern [doit]
const fs = require('fs')
const path = require('path')
const http = require('http')

const isFile = d => fs.lstatSync(d).isFile()

let filename = __filename // full path name of the current module
let prgname = path.basename(filename) // file name of current module
let dirname = path.dirname(require.main.filename) // __dirname

// args

let [cmd, scp, ...opts] = process.argv

let HELP = 'help'
let UNCOMMENT = 'uncomment'
let DOIT = 'doit'
let action = HELP

let doit = 0

// command
let inscopeexp = new RegExp(`^eon-.*___none___.*(html|js)$`, 'i') // none pattern

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
  inscopeexp = new RegExp(`^eon-.*${codepattern}.*(html|js)$`, 'i') // view pattern
}

if (opts.length === 2) {
  doit = (opts[1] === DOIT) ? 1 : 0
}

// outdir
let outdirname = '.'
let outdir = `${dirname}/./${outdirname}/` // eg. eons/./eons_dist

// in files
let indir = './'
let files = fs.readdirSync(indir) // to view
  .filter(file => isFile(file))
  .filter(d => inscopeexp.test(d))

// pattern
let scopeexp = new RegExp('^(((eon-)?(((?!-).)*)-(.*)).(html|js))', 'i')

let searchpattern = '.*(0|1) \&\& (0|1).*(\r\n|\n|\r)'
let searchexp = RegExp(`${searchpattern}`, 'g')
let replacepattern = ''

if (1 && 1) console.log('searchpattern', searchpattern)

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
        let parts = fileName.match(scopeexp) || []
        let fullName = parts[0]
        let rootname = parts[2] || 'eons' // ----------------
        let pckfolder = `${outdir}${rootname}/` // pckfolder

        // ... apply
        function apply (pckfolder, fullName, rootname) {
          let eonfile = `${indir}${fullName}`

          if (fs.existsSync(eonfile)) { // if md file
            let fileTxt = fs.readFileSync(eonfile, 'utf8')

            var arr
            while ((arr = searchexp.exec(fileTxt)) !== null) {
              let toreplace = arr[0]
              fileTxt = fileTxt.replace(toreplace, replacepattern)
            }

            if (doit) {
              if (1 && 1) console.log('apply', eonfile)
              fs.writeFileSync(eonfile, fileTxt)
            }
          }
        }

        apply(pckfolder, fullName, rootname)
      })
  })
  Promise.all(promises)
    .then(() => { console.log('done') })
}

if (action === 'help') {
  console.log(`node ${prgname} {[help], inscopeexp} [doit]`)
} else if (action === UNCOMMENT) {
  console.log(`do ${inscopeexp} eon files ${files}`)
  run(files, options)
} else {
  console.log(`node ${prgname} {[help], inscopeexp} on eon- files`)
}
