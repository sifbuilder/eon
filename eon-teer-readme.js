const fs = require('fs')
const path = require('path')
const http = require('http')

const isDirectory = d => fs.lstatSync(d).isDirectory()
const isFile = d => fs.lstatSync(d).isFile()
const existsFile = d => fs.existsSync(d)

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

let rower = q => n => Math.floor(n / q)
let coler = q => n => n % q
let qcols = 3
let col = coler(qcols)

for (let i = 0; i < qzs; i++) {
  let fileName = zfiles[i]
  let icol = col(i)

  let regex2 = new RegExp('^((((eon-z-)?(((?!-).)*))-(.*))\.(html))', 'i')
  let parts = fileName.match(regex2)

  let fullname = parts[0]
  let part = parts[1]
  let name = parts[2]
  let root = parts[3]
  let code = parts[5]
  let type = parts[7]

  let ithumbnailpath = `${root}-thumbnail.png`

  let typeuri = 'local' // 'remote'
  let outdirpath = (__dirname + '/').replace(/\\/g, '/')
  let typeimg = `thumbnail`
  let outext = `png`
  
  let outThumbnailFile = `${root}-${typeimg}.${outext}`  // preview, thumbnail
  let outThumbnailPath = `${outdirpath}${outThumbnailFile}`
  
  let rooturl = `https://raw.githubusercontent.com/sifbuilder/eons/master/`
  let outThumbnailUrl = `${rooturl}${outThumbnailFile}`
if (1 && 1) console.log('outThumbnailUrl', outThumbnailUrl)

  
  let outEonFile
  let outEonUrl = `${rooturl}${fullname}`
if (1 && 1) console.log('outEonUrl', outEonUrl)

  let outGifPath = `${outdirpath}${root}.gif` 
  let rootGifUrl = `https://github.com/sifbuilder/eons/blob/master/`
  let outGifFile = `${root}.gif` 
  let outGifUrl = `${rootGifUrl}${outGifFile}`
if (1 && 1) console.log('outGifUrl', outGifUrl)

  
  
  let thumbnailUri = (typeuri === 'local') ? outThumbnailPath : outThumbnailPath

  let preline = `${code}` //
  let bodyline = ``
  let mdfullname = `${name}.md`
  let imgfullname = `${name}.png`

 // if (icol === 0 ) { // begin row
    // outText += `| `
    if (existsFile(outThumbnailPath)) {
      if (existsFile(outGifPath)) {
          outText += `[![${code}](${thumbnailUri})](${outGifUrl})`
      } else {
         outText += `[![${code}](${thumbnailUri})](${root}${fullname})`
      }
    } else {
      // outText += code
      outText +=  `[<img src="${imgfullname}" width="230px;" height="120px;"/>](${root}${fullname})`

    }
    // outText += `| `
  // } else if (icol < qcols - 1  ) { // in row
    // if (existsFile(outThumbnailPath)) {
      // if (existsFile(outGifPath)) {
          // outText += `[![${code}](${thumbnailUri})](${outGifUrl})`
      // } else {
         // outText += `[![${code}](${thumbnailUri})](${root}${fullname})`
      // }
    // } else {
      // outText += code
      // outText +=  `[<img src="${imgfullname}" width="230px;" height="120px;"/>](${root}${fullname})`
    // }
    // outText += ` |`
 // } else if  (icol === qcols -1  ){ // end row
  if  (icol === qcols -1  ){ // end row
    // if (existsFile(outThumbnailPath)) {
      // if (existsFile(outGifPath)) {
          // outText += `[![${code}](${thumbnailUri})](${outGifUrl})`
      // } else {
         // outText += `[![${code}](${thumbnailUri})](${root}${fullname})`
      // }
    // } else {
      // outText += code
      // outText +=  `[<img src="${imgfullname}" width="230px;" height="120px;"/>](${root}${fullname})`

    // }
    // outText += ` |`
    outText += `${endOfLine}${newLine}`
 }


  // let imgfullname = `${name}.png`
  // if (fs.existsSync(imgfullname)) {
    // bodyline += `| [<img src="${imgfullname}" width="100px;"/><br /><sub><b>${name}</b></sub>](${root}${fullname}) |`
  // } else {
    // bodyline += `| [<b>${name}</b>](${root}${fullname}) |`
  // }
  // if (1 && 1) console.log('bodyline', bodyline)
  // let line = `${preline} - ${bodyline} `
  // body += `${line}${endOfLine}${newLine}`
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
outText += `` // `${eontext}`

outText += `${footer}`
if (0 && 1) console.log('outText', outText)

fs.writeFileSync(outPath, outText)
