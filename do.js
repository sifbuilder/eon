let [cmd, scp, eoteer, ...data] = process.argv
;(async function () {
  const eon = require(eoteer)
  const eonitem = await eon.eonitem()
  return eonitem.doit(data, eonitem.getState())
}())
