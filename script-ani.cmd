#!/usr/bin/env node
const fs = require('fs')
const http = require('http')
// const { entlist } = require('./script-entlist.js')
const minimist = require('./script-minimist.js')
const fetch = require('./script-node-fetch.js')


  // md: # md:{filename}
  // md: **out of system interactions**
  // md:
  // md: * ### entlist
  // md:  update script-enls.js and script-ents.js
  // md:  script-enls.js may be replaced by script-enxl.js for network access
  // md:  script-enxl.js is maintained manually
  // md:  prefixes included in enls: 'd3', 'topojson', 'three', 'tfjs', maintained in action
  // md:
  // md: # license
  // md: MIT

const header = `
# d3animas

- space-time manifolds

## a story by

- sifbuilder

based on an original idea from

- [x] [Mike Bostock] (https://github.com/d3) and
- [x] [Ricardo Cabello] (https://threejs.org/)

with references to

- [x] [Vasco Asturiano] (https://bl.ocks.org/vasturiano)
- [x] [Philippe Rivière] (https://bl.ocks.org/fil)

# License

- MIT` // md string end

// ...................... entlist
function entlist (files=[], gens=[], opts) {
  for (let k=0; k<gens.length; k++) {
      let payload = ''

      let gen = gens[k]
      let tags = gens[k].tags
      let outfile =  gens[k].file
      let regCode = gens[k].regCode

      for (let i=0; i<tags.length; i++) {
        let tag = tags[i]
        let regex = new RegExp( '^' + tag + regCode, 'i')
        let filtered = files.filter(d => regex.test(d)).sort(function(a, b) {
            return  -a.localeCompare(b) // . < -
          })

        payload +=  '/* ' + tag + '*/' + '\n'

        filtered.forEach( file => {

          payload +=  'document.write("<script src=\'' + file + '\'><\\/script>")' + '\n'

        })

      }

      if (opts.stdout) {
        if (opts.files) console.log(`\n<files ${opts.files}>`);
        console.log('writing to ' + outfile + ': \n' + payload)
      } else {
        fs.writeFileSync(outfile,payload);
        console.log('Wrote '+outfile);
      }

  }
}


const args = minimist(process.argv.slice(2), {
  alias: {a: 'action',
            o: 'stdout',
            d: 'debug',
            v: 'version',
            h: 'help',
            s: 'serve',
            t: 'mdeeFile',
            z: ['zindex', 'index']
           },
  boolean: ['l',
            'o',
            'd',
            'v',
            'm',
            'serve'
            ],
  string: ['t',
            'p',
            'z',
            'a'
            ],
  default: {
            t: 0.1,
            p: 6
            }
})

const usage = `
Usage: script-ani [options]

Options:
 -a, --action        Script action in {samplify,entlist,mdfy,mdeefy}
 -d, --debug         Debug output
 -v, --version       Output the version
 -h, --help          Show this help message
 -f, --files         Files to entities
 -m, --appdir        App directory path
 -t, --mdeeFile      File to extract md to README eg. -a mdeefy -t halo.ent
 -l, --libsFile      Output libs file
 -p, --entsFile      Output entity file
 -s, --serve         Server
 -o, --stdout        Output to stdout
 -z, --zindex        From zfile index


Examples:

 script-ani -a entlist
 script-ani -a samplify -z 852d
 script-ani -a mdeefy -t 852d

`.trim()

const entlistFile = args._[0]
if (args.version) console.log(entlistVersion)
if (args.help) process.exit(console.log(usage))

const options = {
  layers: args.layers,
  debug: args.debug,
  appdir: args.appdir || '.',
  entsFile: args.entsFile || 'script-ents.js',
  libsFile: args.libsFile || 'script-enls.js',
  mdeeFile: args.mdeeFile,
  serve: args.serve,
  enxlFile: args.enxlFile || 'script-enxl.js',
  zindex: args.zindex,
  action: args.action
}

let appdir = options.appdir // app dir
let entsFile = options.entsFile // ents file
let libsFile = options.libsFile // libs file
let enxlFile = options.enxlFile // ext libs file
let mdeeFile = options.mdeeFile // to md file
let zFile = options.zindex // from zindex file
let action = options.action // action


// ...................... actions
if (action === 'samplify') {    // ........... samplify create index.html with enls
if (1 && 1) console.log('options', options)

  let files = fs.readdirSync(appdir)

  let libsInXFile = fs.readFileSync(enxlFile, 'utf8')
  let toText = libsInXFile
  let fromText = '<script src="script-enls.js"></script>' // will be replaced
  let regex = new RegExp('^.*' + zFile + '.*.html', 'i')
  let fzs = files.filter(d => regex.test(d))
  if (fzs.length > 0) {
    let fz = fzs[0]
    if (2 && 2) console.log('zfile', fz)

    let outzFile = 'index.html'
    let zfileTxt = fs.readFileSync(fz, 'utf8')
    let newzText = zfileTxt.replace(fromText, toText)
    fs.writeFileSync(outzFile, newzText)
  } else {
      if (2 && 2) console.log('no zfile found')
  }




} else if (action === 'entlist') { // ........... entlist update ents and enls

  let testpattern = new RegExp('(.*)\.test\.(.*)$', 'i')

  let files = fs.readdirSync(appdir)
      .filter(d => !testpattern.test(d))

  let gens = [

    { // libs:
      tags: ['d3', 'topojson', 'three', 'tfjs'],
      file: libsFile,
      regCode: '\\b.*'
    },

    { // ents
      tags: ['control', 'data', 'force', 'geo', 'lib', 'muon', 'halo', 'x', 'render'],
      file: entsFile,
      regCode: '\\b.*'
    }

  ]

  entlist(files, gens, args)


} else if (action === 'mdfy') {  // ........... mdfy create md file


  // md string begin

  let scriptpattern = new RegExp('^' + 'script', 'i')
  let htmlpattern = new RegExp('(.*)\.html$', 'i')
  let jspattern = new RegExp('(.*)\.js$', 'i')
  let pattern = '// ///.*'
  let regex = new RegExp(pattern, 'i')

  const isDirectory = d => fs.lstatSync(d).isDirectory()
  const isFile = d => fs.lstatSync(d).isFile()

  let files = fs.readdirSync(appdir)
    .filter(file => isFile(file))
    .filter(d => !scriptpattern.test(d))
    .filter(d => jspattern.test(d) || htmlpattern.test(d))

  let readmefile = 'README.md'

  let readmetxt = header + '\n'   // header from props

  for (let i = 0; i < files.length; i++) {
    let fileName = files[i]
    let fileTxt = fs.readFileSync(fileName, 'utf8')

    let nameFindPattern = /md:(\{filename\})/mg
    let nameReplacePattern = /md:\{filename\}/i
    var nameArr
    while ((nameArr = nameFindPattern.exec(fileTxt)) !== null) {
      fileTxt = fileTxt.replace(nameReplacePattern, fileName)
    }

    const mdpattern = /\/\/md:(.*)/mg // // md:
    var arr
    while ((arr = mdpattern.exec(fileTxt)) !== null) {
      console.log('0', arr[1])
      readmetxt += arr[1] + '\n'
    }
  }

  fs.writeFileSync(readmefile, readmetxt)

} else if (action === 'jest') { // ........... jest

  jest

} else if (action === 'eslint') { // ........... eslint

  eslint

} else if (action === 'mdeefy') { // ........... mdeefy
  let files = fs.readdirSync(appdir)
  let infile = mdeeFile
  let outfile = 'README.md'

  let regex = new RegExp('^.*' + infile + '.*(.html|js)?', 'i')



  let fzs = files.filter(d => regex.test(d))

  let header = ''
  let newLine = '\n'
  let endOfLine = '  '
  let outText = header

  for (let i = 0; i < fzs.length; i++) {
    let fileName = fzs[i]

  let regex2 = new RegExp('^(zindex)?(.*)-(.*)\.(html|js)', 'i')
  let parts = fileName.match(regex2)

  let fullname = parts[0]
  let part = parts[1]
  let code = parts[2]
  let name = parts[3]
  let type = parts[4]



    let fileTxt = fs.readFileSync(fileName, 'utf8')

    let nameFindPattern = /md:(\{filename\})/mg // filename
    let nameReplacePattern = /md:\{filename\}/i // ignoring case
    var nameArr
    while ((nameArr = nameFindPattern.exec(fileTxt)) !== null) {
      if (type === 'html') {
        fileTxt = fileTxt.replace(nameReplacePattern, code + ' ' + name)
      } else if (type === 'js') {
        fileTxt = fileTxt.replace(nameReplacePattern, fileName)
      } else {
        if (2 && 2) console.log('type not recognized', type)

      }
    }

    const mdpattern = /\/\/.?md:(.*)/mg // // md (global multiline)
    var arr
    while ((arr = mdpattern.exec(fileTxt)) !== null) {
      outText += arr[1] + endOfLine + newLine
    }
  }

  fs.writeFileSync(outfile, outText)

} else if (action === 'uncomment') { // ........... uncomment
  let scriptpattern = new RegExp('^' + 'script', 'i')
  let htmlpattern = new RegExp('(.*)\.html$', 'i')
  let jspattern = new RegExp('(.*)\.js$', 'i')
  let pattern = '// ///.*'
  let regex = new RegExp(pattern, 'i')

  const isDirectory = d => fs.lstatSync(d).isDirectory()
  const isFile = d => fs.lstatSync(d).isFile()

  let files = fs.readdirSync(appdir)
    .filter(file => isFile(file))
    .filter(d => !scriptpattern.test(d))
    .filter(d => jspattern.test(d) || htmlpattern.test(d))

  for (let i = 0; i < files.length; i++) {
    let fileName = files[i]
    let fileTxt = fs.readFileSync(fileName, 'utf8')
    let findPattern = /^.*(0|1) \&\& 1.*$/mg // pattern: (0|1) && 1
    let replacePattern = /^.*(0|1) \&\& 1.*$/i // pattern: (0|1) && 1

    let exp = RegExp('^.*(0|1) \&\& 1.*$', 'mg')
    let infile = exp.test(fileTxt)

    if (infile) {
      var arr
      while ((arr = findPattern.exec(fileTxt)) !== null) {
        let toreplace = arr[0]
        fileTxt = fileTxt.replace(toreplace, '')
      }
      fs.writeFileSync(fileName, fileTxt)
    }
  }
} else if (action === 'serve') { // ........... serve
  console.log('serve')

      let file = 'zindex503-3symplectic.html'
      fs.readFile(file,function (err, html){
          if (err) {
              throw err;
          }
          http.createServer(function(request, response) {
              response.writeHeader(200, {"Content-Type": "text/html"});
              response.write(html);
              response.end();
          }).listen(8000);
      });


  if (1 && 1)  console.log("Running at Port 8000");
} else {
    if (2 && 2) console.log("action not found");
}
