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

let root = 'https://sifbuilder.github.io/eon/'

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
let indexfiles = fs.readdirSync(inDir) // index files in inDir
  .filter(d => indexpattern.test(d))
  .filter(d => !testpattern.test(d))
  .filter(d => !mdpattern.test(d))

for (let i = 0; i < indexfiles.length; i++) {
  let fileName = indexfiles[i]

  let regex2 = new RegExp('^(((eon-z-)?(((?!-).)*)-(.*))\.(html))', 'i')
  let parts = fileName.match(regex2)

  let fullname = parts[0]
  let part = parts[1]
  let name = parts[2]
  let code = parts[4]

  let type = parts[6]

  let preline = `${code}` //
  let bodyline = `[${name}](${root}${fullname})` //

  let mdfullname = `${name}.md`
  let postline = ''
  if (fs.existsSync(mdfullname)) {
    preline = `**[${preline}](${root}${mdfullname})**`
  }
  let line = `${preline} - ${bodyline} `

  body += `${line}${endOfLine}${newLine}`
}
outText += `${body}${newLine}${newLine}`

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
if (1 && 1) console.log('outText', outText)

fs.writeFileSync(outPath, outText)
