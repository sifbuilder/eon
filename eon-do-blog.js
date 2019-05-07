/** ********************
 *    @eonitem
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
      ? define(['exports'], factory)
      : factory((global.eonitem = global.eonitem || {}))
}(this, (exports) => {
  async function eonitem (__eo = {}) {
    const path = require('path')

    const includes = (a, b) => a.includes(b) // is element b in array a

    const coler = q => n => n % q

    // fs

    const fileName = __filename // full path name of the current module
    const cwdDirPath = process.cwd() // directory of invocation
    const rootDirPath = cwdDirPath

    // options

    const options = {
      qcols: 1, // 3, // number of thumbnails per row

      contentUrl: 'https://raw.githubusercontent.com/', // rsc host
      user: 'sifbuilder', // gh user
      repo: 'eons', // gh repo
      branch: 'master', // gh branch
      hostUrl: 'github.com/', //
      folder: 'blob', //

      eonDirPath: cwdDirPath,
      teerDirPath: path.resolve(cwdDirPath, 'eonitem'),
      imgDirPath: path.resolve(cwdDirPath, ''),
      vidDirPath: path.resolve(cwdDirPath, 'vid'),
      prgFileName: path.basename(fileName),

      outMdFile: 'README.md',

      picDirPath: `${rootDirPath}/pic`,
      tstDirPath: `${rootDirPath}/tst`,

      header: '---',
      footer: '---',

      indexpattern: new RegExp('^eon-z.*.js', 'i'), // z.eons
      eonpattern: new RegExp('^' + 'eon' + '.*' + '.*(.js)', 'i'), // eons
      testpattern: new RegExp('(.*).test.(.*)$', 'i'), //  test
      mdpattern: new RegExp('(.*).md.(.*)$', 'i'), //  md
      tspattern: new RegExp('(.*).ts.(.*)$', 'i'), //  ts

      newLine: '\n',
      endOfLine: '  ',

      tileimg: 'thumbnail',
      tileext: 'png',
      notile: 'notile.png',
      tileview: {
        width: 230,
        height: 120,
      },
      previewimg: 'preview',
      previewext: 'png',
      gifext: 'gif',
      eonext: 'html',
      previewview: {
        width: 600,
        height: 400,
      },
      prefix: 'eon-z',
      inScopeExt: 'js',
    }

    options.outFilePath = `${rootDirPath}/${options.outMdFile}`
    options.rootUrl = `${options.contentUrl}${options.user}/${options.repo}/${options.branch}/`
    options.rootImgUrl = `${options.contentUrl}${options.user}/${options.repo}/${options.folder}/${options.branch}/`
    options.rootRepoUrl = `https://${options.hostUrl}${options.user}/${options.repo}/`
    options.rootImgUrl = `https://${options.user}.${options.hostUrl}/${options.repo}/`
    options.rootVidUrl = `https://${options.user}.${options.hostUrl}/${options.repo}/vid/`
    options.rootRepoUrl = `https://${options.user}.${options.hostUrl}/${options.repo}/`
    options.baseUri = options.rootRepoUrl
    options.col = coler(options.qcols)

    // state

    let state = {
      outText: '',
      where: 'local',
      inScopePattern: new RegExp('^eon-z___none___.*.*$', 'i'), // none pattern
      eoblogs: {
        b0: `--- 0 eoblogs init
        `,
      },
      _: options, // options
    }

    // ....................... parseArgs
    const parseArgs = function (data, context) {
      const res = {}
      res.args = data
      res.actions = []
      res.dotype = ''
      res.codepattern = ''

      const optsq = res.args.length
      if (optsq === 0) {
        res.actions.push('help')
      }

      if (includes(res.args, 'help')) {
        res.actions.push('help')
      }
      if (includes(res.args, 'doit')) {
        res.actions.push('doit')
      }
      if (includes(res.args, 'debug')) {
        res.actions.push('debug')
      }

      res.dotype = 'list' // default
      if (includes(res.args, 'tile')) {
        res.dotype = 'tile'
      } else if (includes(res.args, 'rows')) {
        res.dotype = 'rows'
      } else if (includes(res.args, 'rows')) {
        res.dotype = 'list'
      }

      return res
    }
    // ....................... eoblogs
    state.eoblogs.b1 = `--- 1 eslint
    eslint modules (includes)
    +-- eslint@5.16.0
    +-- eslint-plugin-destructuring@2.1.0
    +-- eslint-plugin-html@5.0.3 

    vscode settings (includes)
    "eslint.enable": true,
    "eslint.run": "onType",
    "eslint.options": { "configFile": ".eslintrc.js" },
    "eslint.nodePath": "%rootDir%\\e\\node.exe",
    "eslint.alwaysShowStatus": true,
    "eslint.autoFixOnSave": false,
    "eslint.validate": [ "javascript", { "language": "html", "autoFix": true } ],

    ./eslintrc.js (includes)    
    "semi": ["error", "never"],

    key seetings
    ctl-alt-run-v eslint.executeAutofix
`
    state.eoblogs.b2 = `---b2 netlify develop netify
      stage == production: proxying, routing, caching, security
      testing, redirect, language rules
      - APIs: environment variables
      - Microservices: serverless functions
      - Global frontend: edge logic
      https://www.youtube.com/watch?v=RL_gtVZ_79Q

      sharing this dev server from a plane to our slack channel
      this is the first time that I really felt like being a cloud provider

      npm netlify
      npm netlify-cli
      netlify dev

      netlify dev C++ lib and deps compiled into webassembly, as universal runtime
      prod edge engine compiled as webassembly and distributed as node module through npm
      functionality managing env variables and addons into the cli
      compile deps for serverless functions

      site generator + edge logic + functions

      $ CD netify
      ^ netify/public/index.html
      ^ netify/netlify.toml
      $ netlify deploy --prod
      '   https://netify.netlify.com/
      $ netlify dev
      '   http://localhost:8888
      ^ netify/public/_redirects 
      '  local API proxies for CORS rules
      $ CD netify
      $ netlify functions:create hello
      $ netlify dev
      '  http://localhost:8888/.netlify/functions/hello
      $ npm init
      $ npm i random-name
      ^ netify/functions/hello/hello.js
      $ netlify deploy --prod
      $ netlify dev
      $ netlify dev --live
      'https://netify-a65f4b.netlify.live
`

    state.eoblogs.b3 = `--- 3 netlify develop nescify
      . https://www.youtube.com/watch?v=FMhVXOA54x8
      $ md nescify && cd nescify
      $ md public
      ^ public/index.html
      $ echo "<body><h1>eon <span id='eon'></span></h1></body>" > public/index.html
      ^ netlify.toml
      $ echo [build] > netlify.toml
      $ echo   publish="public" >> netlify.toml
      $ netlify init
      . To deploy to this site. Run your site build and then netlify deploy
      $ netlify dev
      . localhost:888
      ~ configure redirects in ~/public/_redirects
      ^ public/_redirects
      . /api/* https://jsonplaceholder.typicode.com:splat 200
      . will use json api : https://jsonplaceholder.typicode.com/
      . eg. https://jsonplaceholder.typicode.com/users
      . use without domain - cors
      . localhost:888/users
      ~ add lambda function: register folder in netlify.toml, netlfy create function, edit function
      ^ netlify.toml
      . [build]
      .   publish="public"
      .   functions="functions"
      $ md nescify/functions
      $ netlify functions:create getword

      . > [hello-world] Basic function that shows async/await usage, and response formatting
      .   [node-fetch] Fetch function: uses node-fetch to hit an external API without CORS issues
      .   [auth-fetch] Use 'node-fetch' library and Netlify Identity to access APIs
      .   [fauna-crud] CRUD function using Fauna DB
      .   [fauna-graphql] GraphQL Backend using Fauna DB
      .   [google-analytics] Google Analytics: proxy for GA on your domain to avoid adblock
      .   [graphql-gateway] Apollo Server Lambda Gateway stitching schemas from other GraphQL Functions!

      ~ redirect page to function
      $ netlify dev
      . localhost:8888/.netlify/functions/getword/getword.js

      ~ get function data in page
      ^ _redirects
      .   /getword /.netlify/functions/getword/getword.js 200
      . http://localhost:8888/getword
      ~ install node pack to render server side
      $ cd nescify && npm init && npm i random-words
      ~ adapt the function to call the server package
      ^ functions/getword/getword.js
      .  const randomWords = require('random-words')
      .  exports.handler = async (event, context) => {
      .    const word = await randomWords().toUpperCase()
      .    try {
      .      const res = event.queryStringParameters.name || word
      .      return { statusCode: 200, body: res }
      .    } catch (err) {
      .      return { statusCode: 500, body: err.toString() }
      .    }
      .  }
      $ netlify dev
      ~ now the page is redirected to the function that gets data from the server
      . localhost:8888/getword

      ~ to get function data in the html page, create span
      ^ public/index.html 
      . <h1>Random word: <span id="random-word"></span></h1>
      . <script src="js/main.js"></script>
      $ CD nescify/public
      $ md js && CD js
      ~ the function is call from the home page script and instantiates the span
      $ touch main.js
      .  const getWord = async () => {
      .    const res = await fetch('/getword')
      .    const word = await res.text()
      .    document.getElementById('random-word').innerText = word
      .  }
      .  getWord()
      ~ show the server rendered function res in the home page
      ^ http://localhost:8888/

      netlify deploy --prod

`

    state.eoblogs.b4 = `--- 4 netlify service worker
    https://www.netlify.com/blog/2017/10/31/service-workers-explained/
    A bad HTTP response code (404) was received when fetching the script.
    Failed to load resource: net::ERR_INVALID_RESPONSE  
    http://localhost:8888/sw.js
`
    state.eoblogs.b5 = `--- 5 eons series 791 polyhedra
    see http://dmccooey.com/polyhedra/
    Copyright © 2015 David I. McCooey
    Email: dmccooey@mac.com
    twitter: https://twitter.com/cooey_d
    https://archive.bridgesmathart.org/2010/bridges2010-479.html
`
    state.eoblogs.b6 = `--- 6 eons series 793 polyhedra nets
    https://github.com/paaatrick
    https://github.com/paaatrick/polyhedra-folding
    http://netlib.org/polyhedra/
    https://github.com/qbotics/Rpolyhedra   
`
    // ....................... todo
    function todo (data = {}, context = {}) {
      const __ = context
      let outText = ''

      outText += __._.header + __._.endOfLine + __._.newLine
      const eob = `b${__.eob}`
      if (includes(__.args.actions, 'debug')) console.log('eob:', eob)

      if (__.eoblogs[eob]) {
        outText += __.eoblogs[eob]
      } else {
        let bs = Object.keys(__.eoblogs)
        let lines = bs.map(b => __.eoblogs[b].split(`\n`)[0])
        outText += lines.join('\n')
      }
      outText += __._.newLine

      return outText
    }

    // ....................... doit
    const doit = function (data, context) {
      let __ = context
      const args = enty.parseArgs(data, __)

      __ = enty.updState({ args })
      if (includes(__.args.actions, 'debug')) console.log('__:', __)

      let eob = -1
      const index = Math.max(__.args.args.indexOf('--blog'), __.args.args.indexOf('-b'))
      if (includes(__.args.actions, 'debug')) console.log('eoblog index', index)
      if (index !== -1) {
        eob = +__.args.args[index + 1]
      }
      __ = enty.updState({ eob })

      if (includes(__.args.actions, 'help')) {
        const help = getHelp({}, __)
        console.log(help.helpText)
      }
      if (1 ||
        includes(__.args.actions, 'doit') ||
        includes(__.args.actions, 'debug')) {
        const outText = todo({}, __)
        console.log(outText)
      }
    }

    // .................. getHelp
    function getHelp (data = {}, context = {}) {
      const helpline = getHeline()
      const res = {
        helpText: '',
      }
      res.helpText = `${helpline}`
      return res
    }

    // .................. getHeline
    function getHeline () {
      let defin = 'show blog'
      let def = defin.padEnd(24, ' ')
      let mod = ' node do eoblog -b 0 debug'
      return `${def}${mod}`
    }

    // ....................... enty
    let enty = () => {}

    enty.getHelp = getHelp
    enty.getHeline = getHeline
    enty.doit = doit
    enty.parseArgs = parseArgs
    enty.getState = () => state
    enty.setState = (v) => { state = v; return state }
    enty.updState = (v) => { state = Object.assign(state, v); return state }
    enty.getoptions = () => state.options

    return enty
  }

  exports.eonitem = eonitem
}))
