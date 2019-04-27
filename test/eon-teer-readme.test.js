const eon = require('../eon-teer-readme.js')

test('test parseArgs', async () => {
  let eonitem = await eon.eonitem()

  expect(eonitem.parseArgs()).toEqual({
    actions: [],
    args: {},
    codepattern: '',
    dotype: '',
  })
  expect(eonitem.parseArgs(['eon-teer-readme'])).toEqual({
    actions: ['help'],
    args: ['eon-teer-readme'],
    codepattern: '',
    dotype: '',
  })
  expect(
    eonitem.parseArgs(['eon-teer-readme', '813r', 'local', 'list', 'debug'])
  ).toEqual({
    actions: ['debug'],
    args: ['eon-teer-readme', '813r', 'local', 'list', 'debug'],
    codepattern: 'eon-teer-readme',
    dotype: 'list',
    where: 'local',
  })
  expect(
    eonitem.parseArgs(['eon-teer-readme', '813r', 'local', 'list', 'doit'])
  ).toEqual({
    actions: ['doit'],
    args: ['eon-teer-readme', '813r', 'local', 'list', 'doit'],
    codepattern: 'eon-teer-readme',
    dotype: 'list',
    where: 'local',
  })
  expect(
    eonitem.parseArgs(['eon-teer-readme', '813r', 'local', 'list', 'dodebug'])
  ).toEqual({
    actions: ['doit', 'debug'],
    args: ['eon-teer-readme', '813r', 'local', 'list', 'dodebug'],
    codepattern: 'eon-teer-readme',
    dotype: 'list',
    where: 'local',
  })
})

test('test getUri', async () => {
  let eonitem = await eon.eonitem()

  expect(
    eonitem.getUri({
      where: 'local',
      prefix: 'eon-z',
      code: '105a',
      ext: 'gif',
      name: 'nat-cube',
      outdirpath: 'E:/eons/eons/',
      rootMediaUrl: 'https://sifbuilder.github.com//eons/',
    })
  ).toEqual('E:/eons/eons//eon-z105a-nat-cube.gif')
})

test('test getEonHtmlUri', async () => {
  let eonitem = await eon.eonitem()

  expect(
    eonitem.getEonHtmlUri({
      where: 'local',
      prefix: 'eon-z',
      code: '105a',
      ext: 'gif',
      name: 'nat-cube',
      prefixCodeName: 'eon-z105a-nat-cube',
      outdirpath: 'E:/eons/eons/',
      rootMediaUrl: 'https://sifbuilder.github.com//eons/',
    })
  ).toEqual('E:/eons/eons/index.html#eon-z105a-nat-cube')

  expect(
    eonitem.getEonHtmlUri({
      where: 'remote',
      prefix: 'eon-z',
      code: '105a',
      ext: 'gif',
      name: 'nat-cube',
      prefixCodeName: 'eon-z105a-nat-cube',
      outdirpath: 'E:/eons/eons/',
      rootMediaUrl: 'https://sifbuilder.github.com//eons/',
    })
  ).toEqual('https://sifbuilder.github.com//eons/index.html#eon-z105a-nat-cube')
})

test('test getEonUri', async () => {
  let eonitem = await eon.eonitem()

  expect(
    eonitem.getEonUri({
      where: 'local',
      prefix: 'eon-z',
      code: '105a',
      ext: 'js',
      name: 'nat-cube',
      prefixCodeName: 'eon-z105a-nat-cube',
      outdirpath: 'E:/eons/eons/',
      rootMediaUrl: 'https://sifbuilder.github.com//eons/',
    })
  ).toEqual('E:/eons/eons/eon-z105a-nat-cube.js')
})

test('test file filter', async () => {
  let eonitem = await eon.eonitem()

  let zfiles = [
    'eon-z098.js',
    'eon-z100a-anima.js',
    'eon-z100b-anima.js',
    'eon-z101.js',
    'eon-z105a-nat-cube.js',
    'eon-z105b-nat.js',
    'eon-z106.js',
  ]

  let inScopeText = '^eon-z.*z100b.*.js$'
  let inScopePattern = /^eon-z.*100b.*.js$/i

  expect(zfiles.filter(d => inScopePattern.test(d))).toEqual([
    'eon-z100b-anima.js',
  ])
})

test('test named eoparts', async () => {
  let fileName = 'eon-z105a-nat-cube.js'
  let partsPattern = new RegExp(`^(((eon-z)([^-.]*))[-]?(.*)).(js)$`, 'i')

  expect(JSON.stringify(fileName.match(partsPattern).sort()))
    .toEqual(JSON.stringify(['eon-z105a-nat-cube.js', 'eon-z105a-nat-cube', 'eon-z105a', 'eon-z', '105a', 'nat-cube', 'js'].sort()))
})

test('test eoparts', async () => {
  let fileName = 'eon-z105a-nat-cube.js'
  let partsPattern = new RegExp(
    `^(?<g0>(?<g1>(?<g2>eon)-(?<g3>[^-.]*))[-]?(?<g4>.*)).(?<g5>js)$`,
    'i'
  )

  expect(JSON.stringify(fileName.match(partsPattern).sort()))
    .toEqual(JSON.stringify(["eon","eon-z105a","eon-z105a-nat-cube","eon-z105a-nat-cube.js","js","nat-cube","z105a"].sort()))
})

test('test named eoparts', async () => {
  let fileName = 'eon-z105a-nat-cube.js'
  let partsPattern = new RegExp(
    `^(?<g0>(?<g1>(?<g2>eon)-(?<g3>[^-.]*))[-]?(?<g4>.*)).(?<g5>js)$`,
    'i'
  )

  let parts = fileName.match(partsPattern)
  expect(JSON.stringify(parts.groups)).toEqual(JSON.stringify({
    g2: 'eon',
    g3: 'z105a',
    g1: 'eon-z105a',
    g4: 'nat-cube',
    g0: 'eon-z105a-nat-cube',
    g5: 'js',
  }))
})

test('test named eoparts', async () => {
  let eoname = elems => elems.join('-')

  let fileName = 'eon-z105a-nat-cube.js'
  let partsPattern = new RegExp(
    `^(?<prefixCodeName>(?<prefixCode>(?<prefix>eon)-(?<code>[^-.]*))[-]?(?<name>.*)).(?<ext>js)$`,
    'i'
  )

  let file = fileName.match(partsPattern).groups
  expect(JSON.stringify(file)).toEqual(JSON.stringify({
    prefix: 'eon',
    code: 'z105a',
    prefixCode: 'eon-z105a',
    name: 'nat-cube',
    prefixCodeName: 'eon-z105a-nat-cube',
    ext: 'js',
  }))
  expect(eoname([file.prefix, file.code])).toEqual(file.prefixCode)  
  expect(eoname([file.prefix, file.code, file.name])).toEqual(file.prefixCodeName)  
})

test('test named eoparts', async () => {
  let eoname = elems => elems.filter(d => d !=='').join('-')

  let fileName = 'eon-z101.js'
  let partsPattern = new RegExp(
    `^(?<prefixCodeName>(?<prefixCode>(?<prefix>eon)-(?<code>[^-.]*))[-]?(?<name>.*)).(?<ext>js)$`,
    'i'
  )

  let file = fileName.match(partsPattern).groups
  expect(JSON.stringify(file)).toEqual(JSON.stringify({
    prefix: 'eon',
    code: 'z101',
    prefixCode: 'eon-z101',
    name: '',
    prefixCodeName: 'eon-z101',
    ext: 'js',
  }))
  expect(eoname([file.prefix, file.code])).toEqual(file.prefixCode)  
  expect(eoname([file.prefix, file.code, file.name])).toEqual(file.prefixCodeName)
})

test('test named eoparts', async () => {
  let eoname = elems => elems.filter(d => d !=='').join('-')

  let fileName = 'eon-z813r-radi-frame.js'
  let partsPattern = new RegExp(
    `^(?<prefixCodeName>(?<prefixCode>(?<prefix>eon)-(?<code>[^-.]*))[-]?(?<name>.*)).(?<ext>js)$`,
    'i'
  )

  let file = fileName.match(partsPattern).groups
  expect(JSON.stringify(file)).toEqual(JSON.stringify({
    prefix: 'eon',
    code: 'z813r',
    prefixCode: 'eon-z813r',
    name: 'radi-frame',
    prefixCodeName: 'eon-z813r',
    ext: 'js',
  }))
  expect(eoname([file.prefix, file.code])).toEqual(file.prefixCode)  
  expect(eoname([file.prefix, file.code, file.name])).toEqual(file.prefixCodeName)
})
