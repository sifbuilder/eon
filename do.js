let [cmd, scp, eoteer, ...data] = process.argv
;(async function () {
  const path = require('path')
  const fs = require('fs')
  const cwdDirPath = process.cwd()
  const isFile = d => fs.lstatSync(d).isFile()

  if (eoteer !== undefined) {
    const eon = require('./' + path.basename(eoteer, '.js') + '.js')
    const eonitem = await eon.eonitem()
    return eonitem.doit(data, eonitem.getState())
  } else {
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
