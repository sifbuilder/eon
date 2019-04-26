
// args

let args = process.argv
console.log('args:', args)
let [cmd, scp, eoteer, ...opts] = args

;(async function () {
  const eon = require('eon-teer-readme')
  console.log('eon:', eon)
  // let teer = await eon.teer()

  // let res = teer.sum(3, 5)
  // console.log('res:', res)

  // let enty = teer.setargs(opts)
  // console.log('enty:', enty)

  // let a = teer.getargs()
  // console.log('a:', a)

}())
