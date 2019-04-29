let [cmd, scp, eoteer, ...data] = process.argv
;(async function () {
  const path = require('path')
  const eon = require('./' + path.basename(eoteer, '.js') + '.js')
  const eonitem = await eon.eonitem()
  return eonitem.doit(data, eonitem.getState())
}())
