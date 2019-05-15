/* ******************************************
   *    @eonZ110bImgs
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ110bImgs = global.eonZ110bImgs || {})))
  }(this, function (exports) {
    'use strict'
  
    async function anitem (__eo) {
  // .................. eons
  let [
    eonEohalImgform,
    eonEohalNatform,
    eonEohalMars,
    eonMuonAnimas,
    eonMuonProps,
    eonRenderSvg,
  ] = await Promise.all([
    __eo('xs').b('eon-eohal-imgform'),
    __eo('xs').b('eon-eohal-natform'),
    __eo('xs').b('eon-eohal-mars'),
    __eo('xs').b('eon-muon-animas'),
    __eo('xs').b('eon-muon-props'),
    __eo('xs').b('eon-render-svg'),
  ])
  try { eonRenderSvg.scenecolor('black') } catch (e) {}
  // .................. animas
  let z = function () {
    // .................. pics
    let eotim = {td: 16800, t0: 0, t1: 1, t2: 1, t3: 1}

    // width, height
    // m x n  rows, columns
    // {p: [xi,yi], v: [dx, dy]}
    // if q = 4 => m:2, n:2
    let tile = (i = 1, q = 1, extent = [ [-1, -1], [1, 1]]) => {
      let p = [], v = []
      let res = {
        p: [0, 0],
        v: [1, 1],
      }
      let w = extent[1][0] - extent[0][0]
      let h = extent[1][1] - extent[0][1]
      let dx = extent[0][0]
      let dy = extent[0][1]

      let m, n
      if (q === 1) {
        m = 1, n = 1
        let wi = w / m
        let hi = h / n

        let xy = eonMuonProps.ridx(2, 2)(i)

        let p = [
          dx + xy[0] * wi,
          -(dy + xy[1] * hi), // invert y translate
        ]
        let v = [wi, hi]

        res = {p, v}
      } else if (q === 4) {
        m = 2, n = 2
        let wi = w / m
        let hi = h / n

        let xy = eonMuonProps.ridx(2, 2)(i)

        let p = [
          dx + xy[0] * wi,
          -(dy + xy[1] * hi),
        ]
        let v = [wi, hi]

        res = {p, v}
      }

      return res
    }

    let quad = extent => (i, q) => tile(i, q, extent)

    let extent = [ [-270, -200], [270, 200] ]

    // ............................. natAni
    let natAni = (i = 0, n = 1, img = '') => ({
      eohal: 'imgform',
      eofold: p => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [ 0, 0 ],
        },
        properties: {
          sort: 'img',
          attr: {
            'width': p.eoload.img.style.width,
            'height': p.eoload.img.style.height,
            'rotate': p.eoload.img.style.rotate,
            'xlink:href': p.eoload.img.url,
          },
          'xlink:href': p.eoload.img.url,
          style: p.eoload.img.style,
        },
      }),

      eotim,
      eoric: {gid: 'nat', cid: 'nat', fid: 'nat' + '_' + i},
      eocrom: { 'csx': 0, 'cf': [[[500, 888, 650]]], 'co': [[[0.9, 0.9]]], 'cs': [[[111, 666]]], 'cw': [[[0.3, 0.9]]], 'cp': [[[0.7, 0.9]]]},

      eomot: {
        proform: {
          projection: 'uniwen',
          translate: quad(extent)(i, n).p, // [ -230, 140 ],
        },
      },
      eoload: {
        img: {
          url: img,
          style: {
            width: quad(extent)(i, n).v[0], // 400,
            height: quad(extent)(i, n).v[1], // 300,
            rotate: 0,
          },
        },
      },
    })

    // ............................. animas
    let animas = [
      // natAni(0,4,'market01.jpg'),
      natAni(0, 4, 'eon-z110b-imgs-f01.jpg'),
      natAni(1, 4, 'eon-z110b-imgs-f02.jpg'),
      natAni(2, 4, 'eon-z110b-imgs-f03.jpg'),
      natAni(3, 4, 'eon-z110b-imgs-f04.jpg'),

    ]

    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ110bImgs = anitem
}))