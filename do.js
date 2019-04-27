let [cmd, scp, eoteer, ...data] = process.argv
;(async function () {
  const eon = require('./' + eoteer + '.js')
  const eonitem = await eon.eonitem()
  return eonitem.doit(data, eonitem.getState())
}())
