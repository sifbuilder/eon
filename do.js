let [cmd, scp, eoteer, ...data] = process.argv
;(async function () {
  const path = require('path')
  const fs = require('fs')
  const cwdDirPath = process.cwd()
  const isFile = d => fs.lstatSync(d).isFile()

  let options = {
    inScopePattern: new RegExp(
      `^(?<prefixCodeName>(?<prefixCode>(?<prefix>eon)-(?<code>do))[-]?(?<name>.*)).(?<ext>js)$`,
      'i'
    ),
  }
  let files = fs
    .readdirSync(cwdDirPath)
    .filter(file => isFile(file))
    .filter(d => options.inScopePattern.test(d))

  if (eoteer !== undefined) {
    let doPattern = new RegExp(
      `^.*${eoteer}.*$`,
      'i'
    )
    let dofiles = files
      .filter(d => doPattern.test(d))

    let res = null
    if (dofiles === undefined) {
      console.log(`do file not defined`)
    } else if (!Array.isArray(dofiles)) {
      console.log(`do files not array`)
    } else if (dofiles.length === 0) {
      console.log(`do file not found`)
    } else if (dofiles.length > 1) {
      console.log(`ambiguous do file pattern, ${dofiles.length} found`)
    } else {
      let file = dofiles[0]
      const eon = require('./' + path.basename(file, '.js') + '.js')
      const eonitem = await eon.eonitem()
      res = eonitem.doit(data, eonitem.getState())
    }

    return res
  } else {
    for (let file of files) {
      let basename = path.basename(file, '.js')
      let baselabel = basename.padEnd(24, ' ')
      const eon = require('./' + basename + '.js')
      const eonitem = await eon.eonitem()
      let heline = eonitem.getHeline !== undefined
        ? `${baselabel}: ` + eonitem.getHeline()
        : `${baselabel}`
      console.log(heline)
    }
  }
}())
