const fs = require('fs')
const path = require('path')
const http = require('http')

//eg: node eon-teer-renam zindex ___eon-z- 1

let args = process.argv
let [cmd, scp, ...opts] = args

let indir = './'
let files = fs.readdirSync(indir)

let fromreplace = `(${opts[0]})` || '(^__from)'
let toreplace = `${opts[1]}` || '(^__to$)'
let regex = new RegExp(`${fromreplace}`, 'i')

let doreplace = Number.parseInt(opts[2]) || 0

let fzs = files.filter(d => regex.test(d))
for (let i = 0; i < fzs.length; i++) {
  let fileName = fzs[i]
  let parts = fileName.match(regex)
  let newFileName = fileName.replace( regex, toreplace)
  if (1 && 1) console.log(`${fileName} -> ${newFileName}`)
  if (doreplace === 1) {
    if (1 && 1) console.log('do replace')
    fs.renameSync(fileName, newFileName)
  }
}
