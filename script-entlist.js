module.exports = {
	entlist:entlist
};


const fs = require('fs');


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


