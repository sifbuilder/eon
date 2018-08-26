const fs = require('fs')
const path = require('path')
const http = require('http')

let indir = './'
let files = fs.readdirSync(indir)

let fromreplace = '(^animas)'
let restreplace = '(.*.gif$)'
let replacepart = 2
let toreplace = 'eon'
let doreplace = 0

let regex = new RegExp(`${fromreplace}${restreplace}`, 'i')

let fzs = files.filter(d => regex.test(d))
for (let i = 0; i < fzs.length; i++) {
  let fileName = fzs[i]

  let parts = fileName.match(regex)

  let newFileName = toreplace + parts[replacepart]

  console.log('from to:', fileName, newFileName)
  if (doreplace === 1) fs.renameSync(fileName, newFileName)
}
