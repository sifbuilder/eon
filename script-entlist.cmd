#!/usr/bin/env node
const fs = require('fs');
const { entlist } = require('./script-entlist.js');


const args = require('minimist')(process.argv.slice(2), {
	alias:  {a:'action',o:'stdout',d:'debug',v:'version',h:'help',z:['zindex','index']},
	boolean:['l','o','d','v','m'],
	string: ['t','p','z','a'],
	default:{t:0.1, p:6}
});
const { neatJSON } = require('neatjson');

const usage = `
Usage: entlist [options]

Options:
 -a, --action        Script action in {samplify,entlist,mdfy}
 -d, --debug         Debug output
 -v, --version       Output the version
 -h, --help          Show this help message
 -f, --files         Files to entities
 -m, --appdir        App directory path
 -l, --libsFile      Output libs file
 -p, --entsFile      Output entity file
 -o, --stdout        Output to stdout
 -z, --zindex        From zfile index
`.trim();

const entlistFile = args._[0];
if (args.version) console.log(entlistVersion);
if (args.help) process.exit(console.log(usage));

const options = {
	layers:    args.layers,
	debug:     args.debug,
  appdir:    args.appdir || '.',
  entsFile:  args.entsFile || 'script-ents.js',
  libsFile:  args.libsFile || 'script-enls.js',
  enxlFile:  args.enxlFile || 'script-enxl.js',
  zindex:    args.zindex,
  action:    args.action,
};

let appdir = options.appdir     // app dir
let entsFile = options.entsFile // ents file
let libsFile = options.libsFile // libs file
let enxlFile = options.enxlFile // ext libs file
let zFile = options.zindex // from zindex file
let action = options.action // action



if (0 && 1) console.log("action", action)
  
  if (action === 'samplify') {
    
      let files = fs.readdirSync(appdir)
    
      let libsInXFile = fs.readFileSync(enxlFile,"utf8");
      let toText =  libsInXFile
      let fromText =  '<script src="script-enls.js"></script>'
      let regex = new RegExp( '^.*' + zFile + '.*.html', 'i')
      let fzs = files.filter(d => regex.test(d))
      if (fzs.length > 0) {
        
        let fz = fzs[0]
        if (2 && 2) console.log("zfile", fz)

        let outzFile = 'index.html'
        let zfileTxt = fs.readFileSync(fz,"utf8");
        let newzText = zfileTxt.replace(fromText, toText)
        fs.writeFileSync(outzFile,newzText)
          
      }
    
  } else if (action === 'entlist') {
    
      let files = fs.readdirSync(appdir)
                  
      let gens = [
        
        { // libs: 
          tags: ['d3', 'topojson', 'three'],
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
     
  } else if (action === 'mdfy') {
      
      let header = `
# d3animas

- space-time manifolds
  
## Author

- sifbuilder

based upon

- [x] [Mike Bostock's D3jsv4] (https://github.com/d3)

with references including

- [x] [three.js] (https://threejs.org/)
- [x] [Mike Bostock’s Blocks] (https://bl.ocks.org/mbostock)
- [x] [Vasco Asturiano’s Blocks] (https://bl.ocks.org/vasturiano)
- [x] [Philippe Rivière’s Blocks] (https://bl.ocks.org/fil)
- [x] [Mike Bostock’s Superformula Explorer Block](http://bl.ocks.org/mbostock/1021103)
- [x] [Johan Giellis’s paper] (http://www.amjbot.org/content/90/3/333.full.pdf)
- [x] [Christophe Viau’s D3 plugin based on superformulas.] (https://github.com/d3/d3-plugins/)
- [x] [Dan Abramov's Redux] (https://github.com/reactjs/redux)
- [x] [TJ Holowaychuk's frontend-boilerplate] (https://github.com/tj/frontend-boilerplate)
- [x] [Kent C. Dodds' How to Contribute to an Open Source Project on GitHub] (https://github.com/eggheadio-github/stack-overflow-copy-paste)

# License

- MIT`

      let scriptpattern = new RegExp( '^' + 'script', 'i')
      let pattern = '// ///.*' 
      let regex = new RegExp( pattern, 'i')      
      let readmefile = 'README.md'
      const isDirectory = d => fs.lstatSync(d).isDirectory()
      const isFile = d => fs.lstatSync(d).isFile()
      let files = fs.readdirSync(appdir)
        .filter(file => isFile(file))
        .filter(d => !scriptpattern.test(d))

        
        let readmetxt = header + '\n'
        
      for (let i=0; i<files.length; i++) {
        let file = files[i]
        let fileTxt = fs.readFileSync(file,"utf8");        
        
      const pattern = /\/\/md:(.*)/mg   // //md: 
      // const found = pattern.exec(fileTxt)
        
    
          
         var arr;  
         while ((arr = pattern.exec(fileTxt)) !== null) {  
            // New line:  
            console.log ('0', arr[1]);  
            
            readmetxt += arr[1] + '\n'
         }          
        
        // let found = fileTxt.match(pattern)
        
        // if (0 && 1) console.log("readmetxt", readmetxt)
          
        // if (found) console.log("file", i, file, found.length)
        // if (found) console.log("0:", found[0].trim())
        // if (found) console.log("1:", found[1].trim())
        // if (found) console.log("index:", pattern)
        
      
      
      }
      
      
      fs.writeFileSync(readmefile,readmetxt);

      
  }

             
             


