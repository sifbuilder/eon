const eonitem = require('../eon-teer-readme.js')

test('test', async () => {

   let teer = await eonitem.teer()

  let args = [1, 2, 3]
  let res = {"actions": [], "codepattern": 1, "dotype": "list", "where": "local"}

  // getUri local eon-z 105a gif undefined E:/Dropbox/dBox/e/c/eons/eons/ https://sifbuilder.github.com//eons/
  // getUri uri E:/Dropbox/dBox/e/c/eons/eons//eon-z105a.gif

  expect(teer.setargs(args)).toEqual(res)
})

