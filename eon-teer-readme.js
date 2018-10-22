const fs = require('fs')
const path = require('path')
const http = require('http')

let inDir = './'
let files = fs.readdirSync(inDir)

let outDir = './'
let outFile = 'README.md'
let outText = ''
let outPath = `${outDir}${outFile}`
console.log(`::${outPath}`)

let root = 'https://sifbuilder.github.io/eons/'

let indexpattern = new RegExp('^' + 'eon-z' + '.*' + '.*(.html)', 'i')
let eonpattern = new RegExp('^' + 'eon' + '.*' + '.*(.js)', 'i')
let testpattern = new RegExp('(.*)\.test\.(.*)$', 'i') //  test
let mdpattern = new RegExp('(.*)\.md\.(.*)$', 'i') //  md
let zpattern = new RegExp('^' + 'eon-z' + '.*' + '.*(.js)', 'i')

let newLine = '\n'
let endOfLine = '  '
let header = `# eons ${newLine}${newLine}**time space manyfolds** ${endOfLine}${newLine}${newLine}`
let footer = `${newLine}# license${endOfLine}${newLine}MIT${endOfLine}`

outText += `${header}`

let body = ''
let zfiles = fs.readdirSync(inDir) // index files in inDir
  .filter(d => indexpattern.test(d))
  .filter(d => !testpattern.test(d))
  .filter(d => !mdpattern.test(d))

let qzs = zfiles.length
let itemsinrow = 7
let erebody = ''
// | [<img src="https://avatars2.githubusercontent.com/u/4060187?v=4" width="100px;"/><br /><sub><b>Jared Palmer</b></sub>](http://jaredpalmer.com)| :---: | :---: | :---: | :---: | :---: | :---: |${newLine}
// | :---: | :---: | :---: | :---: | :---: | :---: | :---: |${newLine}
// `

let row = q => n => Math.floor(n/q)
let col = q => n => n%q
// if (1 && 1) console.log('qzs', qzs)
// if (1 && 1) console.log(` 2 row: ${row(7)( 2)}, cols: ${col(7)( 2)}` )
// if (1 && 1) console.log(`12 row: ${row(7)(12)}, cols: ${col(7)(12)}` )
// if (1 && 1) console.log(`20 row: ${row(7)(20)}, cols: ${col(7)(20)}` )

for (let i = 0; i < qzs; i++) {
  let fileName = zfiles[i]

  let regex2 = new RegExp('^(((eon-z-)?(((?!-).)*)-(.*))\.(html))', 'i')
  let parts = fileName.match(regex2)

  let fullname = parts[0]
  let part = parts[1]
  let name = parts[2]
  let code = parts[4]
  let type = parts[6]
  
// if (1 && 1) console.log('parts', parts)

  
  let preline = `${code}` //
  // let bodyline = `[${name}](${root}${fullname})` //
  let bodyline = `` //
  let mdfullname = `${name}.md`
  let imgfullname = `${name}.png`
  

  if (fs.existsSync(imgfullname)) {
    
    bodyline += `| [<img src="${imgfullname}" width="100px;"/><br /><sub><b>${name}</b></sub>](${root}${fullname}) |`
    
  } else {
    
    bodyline += `| [<b>${name}</b>](${root}${fullname}) |`
    
  }
if (1 && 1) console.log('bodyline', bodyline)
  
  let line = `${preline} - ${bodyline} `

  body += `${line}${endOfLine}${newLine}`
}
outText += `${erebody}${body}${newLine}${newLine}`

let eontext = ''
let eonfiles = fs.readdirSync(inDir) // eonfiles in inDir
  .filter(d => eonpattern.test(d))
  .filter(d => !testpattern.test(d))
  .filter(d => !mdpattern.test(d))

for (let i = 0; i < eonfiles.length; i++) {
  let fileName = eonfiles[i]

  let regex2 = new RegExp('^(((eon-)?(((?!-).)*)-(.*))\.(js))', 'i')
  let parts = fileName.match(regex2)
  let fullname = parts[0]
  let name = parts[2]
  let code = parts[4]

  let preline = `${code}` //
  let bodyline = `[${name}](${root}${fullname})` //

  let mdfullname = `${name}.md` // mdfile
  if (fs.existsSync(mdfullname)) { // eon has mdfile
    preline = `**[${preline}](${root}${mdfullname})**`
  }
  let line = `${preline} - ${bodyline} `

  eontext += `${line}${endOfLine}${newLine}`
}
outText += `${eontext}`

outText += `${footer}`
if (0 && 1) console.log('outText', outText)

fs.writeFileSync(outPath, outText)
