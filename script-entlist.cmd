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
    
    
     // md string begin
      let header = ` 
# d3animas

- space-time manifolds
  
## a story by 

- sifbuilder

based on an original idea from

- [x] [Mike Bostock's d3] (https://github.com/d3)

with references to

- [x] [Mike Bostock] (https://bl.ocks.org/mbostock)
- [x] [Ricardo Cabello] (https://threejs.org/)
- [x] [Vasco Asturiano] (https://bl.ocks.org/vasturiano)
- [x] [Philippe Rivière] (https://bl.ocks.org/fil)

# License

- MIT`            // md string end



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
        
        let found = fileTxt.match(pattern)
     
      
      }
      
      
      fs.writeFileSync(readmefile,readmetxt);

      
  }

             
             


