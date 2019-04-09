#!/usr/bin/env node
const fs = require('fs')

let outText = ''
let outfile = 'README.md'
console.log(`generate ${outfile}`)

let appdir = '.'

const camelize = str => str
.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => index === 0 ? letter.toLowerCase() : letter.toUpperCase())
.replace(/\s+/g, '') // remove white space
.replace(/-+/g, '') // remove hyphen

function escapeRegExp (string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

let indexpattern = new RegExp('^' + '(eon-z-.*).(html)', 'i')
let testpattern = new RegExp('^' + '(eon-z-021a.*).(html)', 'i')


let newLine = '\n'
let endOfLine = '  '
let header = `# eons ${newLine}${newLine}**time space manyfolds** ${endOfLine}${newLine}${newLine}`
let footer = `${newLine}# license${endOfLine}${newLine}MIT${endOfLine}`

let htmljs = `<script src="./eon-x-eonify.js"></script>
<script>
  function getFileName() {
    var url = document.location.href
    url = url.substring( 0, url.indexOf("#") == -1 ? url.length : url.indexOf("#") )
    url = url.substring( 0, url.indexOf("?") == -1 ? url.length : url.indexOf("?") )
    url = url.substring(url.lastIndexOf("/") + 1, url.length)
    url = url.substring( 0, url.indexOf(".") == -1 ? url.length : url.indexOf(".") )
    if (url.length == 0) { url = "index" }
    return url
  }
  window.xEonify.eonify({ anitem: getFileName(), time: undefined })
</script>`

outText += `${header}`

let body = ''
let indexfiles = fs.readdirSync(appdir) // index files
  .filter(d => indexpattern.test(d))
  .filter(d => testpattern.test(d))

// eon-z-xxxa.*.html 
//  => eon-zxxxa.*.js
//  => create eon-zxxxa.*.html

for (let i = 0; i < indexfiles.length; i++) {
  let fileName = indexfiles[i]

  let fileText = fs.readFileSync(fileName, 'utf8')

  let regex2 = new RegExp('^(eon-z-)?(.*).(html)', 'i')
  let parts = fileName.match(regex2)


  let newName = 'eon-z' + parts[2]
  let newNameHtml = newName + '.html'
  let newNameJs = newName + '.js'
  let eonName = camelize(newName)

  console.log(`fileName: ${fileName}` )
  console.log(`for eon: ${eonName}` )
  console.log(`fileName: ${fileName}` )
  console.log(`create: ${newNameHtml} with txt: ${htmljs}`)
  console.log(`create: ${newNameJs}  with contents of ${fileName}`)


  let tx2a = '</script>'
  let tx2b = `exports.${eonName} = anitem
})`
  // console.log(`replace ${tx2a} with ${tx2b}`)

  // let findPattern = /<\/script>/mg // filename
  // let replacePattern = /tx2b/i // ignoring case
  // var nameArr
  // while ((nameArr = findPattern.exec(fileText)) !== null) {
  //   fileText = fileText.replace(tx2a, tx2b)
  // }
  // console.log(`fileText ${fileText}`)




  let cpsearchpattern = `.................. anitem`
  let searchpattern = escapeRegExp(cpsearchpattern)   
  let searchexp = RegExp(`${searchpattern}`, 'm')

  // let findPattern2 = /.................. anitem/mg // filename

  let tx3a = `.................. anitem`
  let tx3b = `/* ******************************************
   *    @${eonName}
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.${eonName} = global.${eonName} || {})))
  }(this, function (exports) {
    'use strict'
  
    // ... ** **
    // .................. anitem`

    let findPattern2 = /anitem/mg // filename
    let replacePattern2 = /tx2b/i // ignoring case
    var nameArr2
    while ((nameArr2 = findPattern2.exec(fileText)) !== null) {
      fileText = fileText.replace(tx2a, tx3a)
    }
    console.log(`fileText ${fileText}`)



    // console.log(`replace ${tx3a} with ${tx3b}`)
    // console.log(`delete ${fileName}`)

}



// fs.writeFileSync(outfile, outText)
