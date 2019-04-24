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
let SHOW = 'show'
let CHANGE = 'change'
let action = HELP

let doit = 0
let show = 0

// command
let inscopeexp = new RegExp(`^eon-.*___none___.*(html|js)$`, 'i') // none pattern

// opts

if (opts.length === 0) {
  action = HELP
}

if (opts.length >= 1 && opts[0] === CHANGE) { // pattern in arg[1]
  action = CHANGE
  let codepattern = '.*' // default to all
  if (opts[1] === '.') {
    codepattern = '.*'
  } else {
    codepattern = opts[1]
  }
  inscopeexp = new RegExp(`^eon-.*${codepattern}.*(html|js)$`, 'i') // view pattern
}

if (opts.length === 3) { // eg.: change, 723d, doit
  if (opts[2] === DOIT) {
    doit = 1
  } else if (opts[2] === SHOW) {
    show = 1
  }
}

// outdir
let outdirname = '.'
let outdir = `${dirname}/./${outdirname}/` // eg. eons/./eons_dist

// in files
let indir = './'
let files = fs.readdirSync(indir) // to view
  .filter(file => isFile(file))
  .filter(d => inscopeexp.test(d))

// where
let scopeexp = new RegExp('^(((eon-)?(((?!-).)*)-(.*)).(html|js))', 'i')

// toBeReplace pattern
//
//
let cpsearchpattern = `
<script src="./eon-x-eonify.js"></script>
`

// https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
function escapeRegExp (string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

let searchpattern = escapeRegExp(cpsearchpattern) // .split(/\r?\n/) // .map(d=> `${d}(\r\n|\n|\r)`)

let searchexp = RegExp(`${searchpattern}`, 'm')

// replacepattern
//
//
let _replacepattern = `<script src="d3-require.js"></script>

<script src="./eon-x-eonify.js"></script>

`
let replacepattern = escapeRegExp(_replacepattern)

// options
const options = {}
options.doit = doit
options.show = show
options.outdir = outdir

// .................. run
async function run (infiles, opts) {
  let doit = opts.doit
  let show = opts.show

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

            let arr
            while ((arr = searchexp.exec(fileTxt)) !== null) {
              let toreplace = arr[0]
              fileTxt = fileTxt.replace(toreplace, replacepattern)
            }

            if (show) {
              console.log('-----------------------------------')
              let lines = fileTxt.split('\n')
              for (let i = 0; i < lines.length; i++) {
                let line = lines[i]
                console.log(line)
              }
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
  console.log(` replace cpsearchpattern by replacepattern in files in scope`)
  console.log(`node ${prgname} {[help], inscopeexp} [doit]`)
  console.log(`node ${prgname} action pattern trigger`)
  console.log(`eg.: node ${prgname} change . doit`)
  console.log(` inScopePattern: eg: z-0 filters files on eon-name`)
  console.log(` toBeReplacePattern: cpsearchpattern`)
  console.log(` toReplaceWithPattern: replacepattern`)
  console.log(` inscopeexp: ${inscopeexp}`)
} else if (action === CHANGE) {
  console.log(`do replace ${cpsearchpattern} by ${replacepattern} in ${files}`)
  if (SHOW) {
    run(files, options)
  } else if (DOIT) {
    run(files, options)
  }
} else {
  console.log(`node ${prgname} {[help], inscopeexp} on eon- files`)
}
