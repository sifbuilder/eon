let [cmd, scp, eoteer, ...data] = process.argv
;(async function () {
  const eonitem = require('./' + eoteer + '.js')
  const teer = await eonitem.teer()
  return teer.doit(data)
}())
