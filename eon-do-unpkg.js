/**********************
 *    @eonitem
 */
;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
      ? define(['exports'], factory)
      : factory((global.eonitem = global.eonitem || {}))
})(this, function (exports) {
  'use strict'

  // ....................... eonitem
  async function eonitem (__eo = {}) {
    const fs = require('fs')
    const path = require('path')
    const http = require('http')
    const { spawn } = require('child_process')
    const { exec } = require('child_process')
    const npm = require('npm')

    // ....................... fs

    const isDirectory = d => fs.lstatSync(d).isDirectory()
    const isFile = d => fs.lstatSync(d).isFile()

    let filename = __filename // full path name of the current module
    let prgname = path.basename(filename) // file name of current module
    let dirname = path.dirname(require.main.filename) // __dirname
    let dircwd = process.cwd() //
    let outdir = dircwd

    // .......................

    const camelize = str => str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => index === 0 ? letter.toLowerCase() : letter.toUpperCase())
      .replace(/\s+/g, '') // remove white space
      .replace(/-+/g, '') // remove hyphen

    // https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
    function escapeRegExp (string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
    }

    const waitInPromise = delay => arg =>
      Number.isFinite(delay) && delay > 0
        ? new Promise(resolve => setTimeout(() => resolve(arg), delay))
        : Promise.resolve(arg)

    const includes = (a, b) => {
      return a.includes(b)
    } // is element b in array a

    const newLine = '\n'

    // package version
    let xVersion = require('./eon-x-version.js')
    let xversion = xVersion.xVersion().version()
    let packver = (xversion) || '0.0.1-rc2'

    // .......................

    let state = {
      inScopeRegExp: '',
      fileName: '',
      fileparts: {},
      filePath: '',
      args: {},
    }

    let options = {
      cwdDirPath: process.cwd(), // directory of invocation
      prgDirPath: __dirname, // directory of calling js file
      inDirPath: process.cwd(), // directory of in files

      partsPatternEon: new RegExp(`^(?<prefix>eon)-(?<codename>[^.]*).(?<ext>.*)$`, 'i'),

      newHtmlText: `<script src="./eon-x-eonify.js"></script>
      <script>eonXEonify.eonify({ anitem: eonXEonify.getEonItem(location.href)})</script>`,
      regexFileNameParts: new RegExp('^(eon-z)(.*).(js)', 'i'),

      root: 'https://sifbuilder.github.io/eons/',

      indexpattern: new RegExp('^' + 'eon-z' + '.*' + '.*(.html)', 'i'),
      testpattern: new RegExp('(.*).test.(.*)$', 'i'), //  test
      mdpattern: new RegExp('(.*).md.(.*)$', 'i'), //  md

      newLine: '\n',
      endOfLine: '  ',

    }

    state._ = options

    // .................. methods

    // ... getReadhtml
    // ... get eons html page

    function getReadhtml (inDir, root) {
      root = root !== undefined ? root : 'https://sifbuilder.github.io/eon/'
      let outText = ''

      let indexpattern = new RegExp('^' + 'eon-z' + '.*' + '.*(.html)', 'i')
      let testpattern = new RegExp('(.*).test.(.*)$', 'i') //  test
      let mdpattern = new RegExp('(.*).md.(.*)$', 'i') //  md

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

        let regex2 = new RegExp('^(((eon-z-)?(((?!-).)*)-(.*)).(html))', 'i')
        let parts = fileName.match(regex2)

        let fullname = parts[0]
        let name = parts[2]
        let code = parts[4]

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

    // ... getMdCore
    // ... build the .md text
    // ... @name
    // ... the md depends if the global package (eons)
    // ... or an individual eon is passed

    function getMdCore (name) {
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

    // ... getMdText
    // ... get md text from file
    // ... @name file

    function getMdText (file) {
      let header = ''
      let newLine = '\n'
      let endOfLine = '  '
      let outText = ''
      let fileName = file

      let fileTxt = fs.readFileSync(fileName, 'utf8')
      let nameFindPattern = /... (\{filename\})/mg // filename
      let nameReplacePattern = /... \{filename\}/i // ignoring case
      var nameArr
      while ((nameArr = nameFindPattern.exec(fileTxt)) !== null) {
        fileTxt = fileTxt.replace(nameReplacePattern, fileName)
      }
      const mdpattern = /\/\/... (.*)/mg // // md (global multiline)
      var arr
      while ((arr = mdpattern.exec(fileTxt)) !== null) {
        outText += arr[1] + endOfLine + newLine
      }

      return outText
    }

    // ... getPackobj
    // ... build the package.json text
    // ... @fullName
    // ... @name
    // ... @ver         version
    // ... @desc        description
    // ... @ncdfolder   package folder

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
    // ... LICENSE
    // ... add license file to dist folder
    function createLicense (pckfolder) {
      let fromfilename = 'LICENSE' // place LICENSE
      let outfile = 'LICENSE'
      let fromfile = `${indir}${fromfilename}`
      let tofile = `${pckfolder}${outfile}`
      if (fs.existsSync(fromfile)) {
        console.log('copy file to file ', fromfile, tofile)
        fs.copyFileSync(fromfile, tofile)
      } else {
        console.log('file does not exsist ')
      }
    }

    // ... README
    function createReadme (pckfolder, fullName, rootname) {
      // ... create text and save README file
      // ... README text combines md segments
      // ... mddoc: md documentation in file
      // ... mdtext: eons shared md text

      let mdtext = getMdCore(fullName) // place README
      let mdfilename = rootname + '.md'
      let outfile = 'README.md'
      let fromfile = `${indir}${mdfilename}`
      let eonfile = `${indir}${fullName}`
      let tofile = `${pckfolder}${outfile}`
      let newLine = '\n'

      let mddoc = getMdText(eonfile)

      let outtext = `${mddoc} ${newLine} ${newLine} ${mdtext}`

      if (fs.existsSync(tofile)) {
        fs.unlinkSync(tofile, (err) => {
          if (err) throw err
        })
        console.log(`successfully deleted ${tofile}`)
      }

      if (fs.existsSync(fromfile)) { // if md file
        console.log('copy file to file ', fromfile, tofile)
        fs.copyFileSync(fromfile, tofile)
      } else {
        console.log('copy text to file ', tofile)
        fs.writeFileSync(tofile, outtext)
      }
    }
    function createPckDir (pckfolder) {
      console.log('dist dir:', pckfolder)
      if (!fs.existsSync(pckfolder)) {
        fs.mkdirSync(pckfolder) // create dist folder
        console.log('create dist folder ', pckfolder)
      }
    }
    // ... PACKAGE
    // ... add package.json file to dist folder
    function createPackage (pckfolder, fullName, rootname, packver) {
      let outfile = 'package.json'
      let packagetext = getPackobj(fullName, rootname, packver, `${rootname}`, './')
      let tofile = `${pckfolder}${outfile}`
      fs.writeFileSync(tofile, packagetext)
    }
    // ... EONFILE
    function createEonfile (pckfolder, fileName, fullName) {
      if (fileName === 'eons') { // if root
        console.log('build eons file')

        let fromtext = getReadhtml(indir)

        let outfile = `${fileName}.html`

        let ncdfolder = '.' // versus build, dist
        let pckdistfolder = `${pckfolder}${ncdfolder}/`
        fs.existsSync(pckdistfolder) || fs.mkdirSync(pckdistfolder)
        console.log('create pck dist folder ', pckdistfolder)

        let tofile = `${pckdistfolder}${outfile}`
        if (fs.existsSync(fromfile)) {
          console.log('copy text to file ', fromtext, tofile)
          fs.writeFileSync(tofile, fromtext)
        } else {
          console.log(`no eon file ${fromfile} in dist `)
        }
      } else {
        let fromfile = `${indir}${fullName}` // place EON as fullName in build
        let outfile = fullName // "index.js" //

        let ncdfolder = '.' // versus build, dist
        let pckdistfolder = `${pckfolder}${ncdfolder}/`
        fs.existsSync(pckdistfolder) || fs.mkdirSync(pckdistfolder)
        console.log('create pck dist folder ', pckdistfolder)

        let tofile = `${pckdistfolder}${outfile}`
        if (fs.existsSync(fromfile)) {
          console.log('copy file to file ', fromfile, tofile)
          fs.copyFileSync(fromfile, tofile)
        } else {
          console.log(`no eon file ${fromfile} in dist `)
        }
      }
    }
    // ... unmdEonfile
    function unmdEonfile (pckfolder, fullName, rootname) {
      let findPattern = '.*//... .*(?:\r\n|\n|\r)' // pattern: '//... '
      let replacePattern = ''
      let exp = RegExp(`${findPattern}`, '') // un mg

      let ncdfolder = '.'
      let pckdistfolder = `${pckfolder}${ncdfolder}/`
      let eonfile = 'nofile'

      if (fileName === 'eons') {
        let outfile = `${fileName}.html`
        eonfile = `${pckdistfolder}${outfile}`
      } else {
        let outfile = fullName
        eonfile = `${pckdistfolder}${outfile}`
      }
      console.log('unmd', eonfile)
      if (fs.existsSync(eonfile)) { // if md file
        let fileTxt = fs.readFileSync(eonfile, 'utf8')

        var arr
        while ((arr = exp.exec(fileTxt)) !== null) {
          let toreplace = arr[0]
          fileTxt = fileTxt.replace(toreplace, replacePattern)
        }
        fs.writeFileSync(eonfile, fileTxt)
      }
    }

    // ... NPM PUBLISH
    function npmPublish (pckfolder, dopublish) {
      console.log(`could publish ${pckfolder}`)
      if (dopublish === 1) {
        console.log(`publish ${pckfolder}`)
        exec('npm publish',
          {cwd: `${pckfolder}`},
          function (error, stdout, stderr) {
            console.log('stdout: ' + stdout)
            console.log('stderr: ' + stderr)
            if (error !== null) { console.log('exec error: ' + error) }
          })
      }
    }

    // unpkg
    let unpkg = function () {
      let promises = infiles.map(fileName => {
        Promise.resolve(fileName)
          .then(fileName => {
            console.log('out root dir', outdir)

            let regex2 = new RegExp('^(((eon-)?(((?!-).)*)-(.*)).(html|js))', 'i')

            let parts = fileName.match(regex2) || []
            let fullName = parts[0]
            let rootname = parts[2] || 'eons' // ----------------
            let pckfolder = `${outdir}${rootname}/` // pckfolder

            createPckDir(pckfolder)
            createReadme(pckfolder, fullName, rootname)
            createLicense(pckfolder)
            createPackage(pckfolder, fullName, rootname, packver)
            createEonfile(pckfolder, fileName, fullName)
            unmdEonfile(pckfolder, fullName, rootname)
            npmPublish(pckfolder, dopublish)
          })
      })
      Promise.all(promises)
        .then(() => { console.log('done') })
    }

    // .................. todo
    async function todo (data, context) {
      let __ = context
      let infiles = []
      let scope = __.args.scop
      if (scope === 'eons') {
        // ... if scope is eons, get root
        infiles = [ 'eons' ] // if not all eons in param opts then publish eons
      } else if (scope === 'eonitems') {
        // ... if scope is eonitems, cover all eons items
        infiles = fs.readdirSync(__._.indir)
          .filter(file => isFile(file))
          .filter(d => __._.eonpattern.test(d))
          .filter(d => !__._.testpattern.test(d))
          .filter(d => !__._.mdpattern.test(d))
          .filter(d => !__._.imgpattern.test(d))
      } else {
        // ... if scope is pattern, select eons
        const eonitemspattern = new RegExp('^' + '.*' + scope + '.*(.html|js)', 'i')
        infiles = fs.readdirSync(__._.indir)
          .filter(file => isFile(file))
          .filter(d => eonitemspattern.test(d))
          .filter(d => !__._.testpattern.test(d))
          .filter(d => !__._.mdpattern.test(d))
          .filter(d => !__._.imgpattern.test(d))
      }

      __ = enty.updState({ infiles })

      if (includes(__.args.actions, 'unpkg')) {
        unpkg(data, __)
      }
    }

    // ....................... doit
    let doit = function (data, context) {
      let __ = context
      let args = enty.parseArgs(data, __)
      __ = enty.updState({ args })

      if (includes(__.args.actions, 'help')) {
        let help = getHelp({}, __)
        __ = enty.updState({ help })
        console.log(__.help.helpText)
      }

      if (includes(__.args.actions, 'doit') ||
        includes(__.args.actions, 'debug')
      ) {
        todo({}, __)
      }
    }

    // ....................... parseArgs
    let parseArgs = function (data = {}, context = {}) {
      let res = {}
      res.args = data
      res.actions = []
      res.scope = ''

      let optsq = res.args.length
      if (optsq === 0) {
        res.actions.push('help')
      }
      if (includes(res.args, 'help')) {
        res.actions.push('help')
      }
      if (includes(res.args, 'doit')) {
        res.actions.push('doit')
      }
      if (includes(res.args, 'publish')) {
        res.actions.push('publish')
      }
      if (includes(res.args, 'unpkg')) {
        res.actions.push('unpkg')
      }
      if (includes(res.args, 'debug')) {
        res.actions.push('debug')
      }
      if (includes(res.args, 'eons')) {
        res.scope = 'eons'
      } else if (includes(res.args, 'eonitems')) {
        res.scope = 'eonitems'
      }

      return res
    }

    // .................. getHelp
    function getHelp (data = {}, context) {
      const helpline = getHeline()
      let res = {
        helpText: '',
      }
      res.helpText += `${helpline}`
      res.helpText += `   { eons, all, eonclass }`
      res.helpText += ` create npm project in eons_dist and npm publish`
      return res
    }

    // .................. getHeline
    function getHeline () {
      let defin = 'publish eons to npm and unpkg '
      let def = defin.padEnd(24, ' ')
      let mod = ' :: node do unpkg eons eonitems pattern publish'
      return `${def}${mod}`
    }

    // ....................... enty
    let enty = () => {}

    enty.getHelp = getHelp
    enty.getHeline = getHeline
    enty.doit = doit
    enty.parseArgs = parseArgs
    enty.getState = () => state
    enty.setState = v => { state = v; return state }
    enty.updState = v => { state = Object.assign(state, v); return state }
    enty.getOptions = () => state.options

    return enty
  }

  exports.eonitem = eonitem
})
