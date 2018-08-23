#!/usr/bin/env node
const fs = require('fs')

let outText = ''
let outfile = 'README.md'
console.log(`generate ${outfile}`)

let appdir = '.'
let root = 'https://sifbuilder.github.io/eon/'

let indexpattern = new RegExp('^' + 'eon-z' + '.*' + '.*(.html)', 'i')
let eonpattern = new RegExp('^' + 'eon' + '.*' + '.*(.js)', 'i')
let testpattern = new RegExp('(.*).test.(.*)$', 'i') //  test
let mdpattern = new RegExp('(.*).md.(.*)$', 'i') //  md

let newLine = '\n'
let endOfLine = '  '
let header = `# eons ${newLine}${newLine}**time space manyfolds** ${endOfLine}${newLine}${newLine}`
let footer = `${newLine}# license${endOfLine}${newLine}MIT${endOfLine}`

outText += `${header}`

let body = ''
let indexfiles = fs.readdirSync(appdir) // index files
  .filter(d => indexpattern.test(d))
  .filter(d => !testpattern.test(d))
  .filter(d => !mdpattern.test(d))

for (let i = 0; i < indexfiles.length; i++) {
  let fileName = indexfiles[i]

  let regex2 = new RegExp('^(((eon-z-)?(((?!-).)*)-(.*)).(html))', 'i')
  let parts = fileName.match(regex2)

  let fullname = parts[0]
  let name = parts[2]
  let code = parts[4]

  let preline = `${code}` //
  let bodyline = `[${name}](${root}${fullname})` //

  let mdfullname = `${name}.md`
  let postline = ''
  if (fs.existsSync(mdfullname)) {
    preline = `**[${preline}](${root}${mdfullname})**`
  }
  let line = `${preline} - ${bodyline} ${postline}`

  body += `${line}${endOfLine}${newLine}`
}
outText += `${body}${newLine}${newLine}`

let eontext = ''
let eonfiles = fs.readdirSync(appdir) // index files
  .filter(d => eonpattern.test(d))
  .filter(d => !testpattern.test(d))
  .filter(d => !mdpattern.test(d))

for (let i = 0; i < eonfiles.length; i++) {
  let fileName = eonfiles[i]

  let regex2 = new RegExp('^(((eon-)?(((?!-).)*)-(.*)).(js))', 'i')
  let parts = fileName.match(regex2)

  let fullname = parts[0]
  let name = parts[2]
  let code = parts[4]

  let preline = `${code}` //
  let bodyline = `[${name}](${root}${fullname})` //

  let mdfullname = `${name}.md` // mdfile
  let postline = ''
  if (fs.existsSync(mdfullname)) { // eon has mdfile
    preline = `**[${preline}](${root}${mdfullname})**`
  }
  let line = `${preline} - ${bodyline} ${postline}`

  eontext += `${line}${endOfLine}${newLine}`
}

outText += `${eontext}`
outText += `${footer}`

fs.writeFileSync(outfile, outText)
