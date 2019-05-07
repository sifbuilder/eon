/* ******************************************
   *    @eonZ791hCs06ChamferedTruncatedIcosahedron
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.eonZ791hCs06ChamferedTruncatedIcosahedron = global.eonZ791hCs06ChamferedTruncatedIcosahedron || {})))
}(this, function (exports) {
  'use strict'

  async function anitem (__eo) {
    let [
      d3,
      d3Geo,
      THREE,
      eonCtlWen,
      eonEohalMars,
      eonEohalSol,
      eonMuonGeom,
      eonMuonProps,
      eonMuonGeovoro,
      eonRenderPortview,
      eonRenderWebgl,
    ] = await Promise.all([
      __eo('xs').b('d3'),
      __eo('xs').b('d3-geo'),
      __eo('xs').b('three'),
      __eo('xs').b('eon-ctl-wen'),
      __eo('xs').b('eon-eohal-mars'),
      __eo('xs').b('eon-eohal-sol'),
      __eo('xs').b('eon-muon-geom'),
      __eo('xs').b('eon-muon-props'),
      __eo('xs').b('eon-muon-geovoro'),
      __eo('xs').b('eon-render-portview'),
      __eo('xs').b('eon-render-webgl'),
    ])
    try { eonRenderSvg.scenecolor('black') } catch (e) {}
    let z = function () {
      // .................. pics

      let epsilon = 1e-6, epsilon2 = epsilon * epsilon, asin = Math.asin
      let atan = Math.atan, abs = Math.abs
      let sqrt = Math.sqrt
      let pi = Math.PI, degrees = 180 / pi, asin1_3 = Math.asin(1 / 3)
      let theta = atan(0.5) * degrees

      const eotim = {'td': 16800, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1}

      // .................. facesAni anima
      let facesAni = {

        eotim: eotim,
        eoric: {gid: 'facesAni', cid: 'facesAni', fid: 'facesAni'},
        eohal: eonEohalMars,

        eofold: anitem => {
          let eoload = anitem.eoload
          let json = {
            type: 'Feature',
            geometry: {
              type: 'MultiPoint',
              coordinates: eoload.vertices(eoload.pars),
            },
            properties: {
              sort: 'form',
              eoMultiPolygon: 1,
              faces: eoload.faces(eoload.pars).reduce((p, q) => [...p, ...eonMuonGeom.convextriang(q)], []),
              lights: eoload.lights(eoload.pars),
            },
          }

          return json
        },

        eocrom: {'csx': 0, 'cf': 999, 'cs': 777, 'cw': 0.6, 'co': 0.999, 'cp': 0.999},

        eomot: {
          proform: {

            projection: 'uniwen',
            translate: [
              0,
              0,
              0,
            ],

            scale: [
              100,
              100,
              100,
            ],

            rotate: [ [[[90, 36, 90]]], [[[0, 2 * 360]]], [[[9, 24, 9]]] ],
            lens: [0, 1, Infinity ],

          },
        },
        eoload: {
        /*
            Dave McCooey
            dmccooey@mac.com

            hamfered Truncated Icosahedron (canonical)

          */
          pars: {
            C0: 0.0898379030570008555434182513042,
            C1: 0.105092850786526747295398017654,
            C2: 0.145360780624245466290276984406,
            C3: 0.180817104297880861355798313076,
            C4: 0.199874128641355139126007320946,
            C5: 0.2080985155781758886628291567148,
            C6: 0.210185701573053494590796035308,
            C7: 0.323403133613481456841881533847,
            C8: 0.3508609088451022583387891508953,
            C9: 0.391681877600195612858605314327,
            C10: 0.397661071287832672324047763299,
            C11: 0.407972644219531027788836477661,
            C12: 0.46261202504852732201164058346504,
            C13: 0.481519780657196468402023565631,
            C14: 0.502753922074359419619445780953,
            C15: 0.52090471339232365532177998871504,
            C16: 0.626880561281441934692300550037,
            C17: 0.6326558295957487189946314212848,
            C18: 0.660113604827369520491539038333,
            C19: 0.672797726621580816602436618773,
            C20: 0.731375777833012484630718011508,
            C21: 0.737748680382275466290029438939,
            C22: 0.7791153713587380654914764705552,
            C23: 0.853614830919461677958234931848,
            C24: 0.859987733468724659617546359279,
            C25: 0.868953274415738921034894721859,
            C26: 0.918565784680156327645827752014,
            C27: 0.924476151982983531781753454961,
            C28: 0.983516738440850977333420572180,
          },
          vertices: pars =>
            [[pars.C5, 0.0, pars.C28],
              [pars.C5, 0.0, -pars.C28],
              [-pars.C5, 0.0, pars.C28],
              [-pars.C5, 0.0, -pars.C28],
              [pars.C28, pars.C5, 0.0],
              [pars.C28, -pars.C5, 0.0],
              [-pars.C28, pars.C5, 0.0],
              [-pars.C28, -pars.C5, 0.0],
              [0.0, pars.C28, pars.C5],
              [0.0, pars.C28, -pars.C5],
              [0.0, -pars.C28, pars.C5],
              [0.0, -pars.C28, -pars.C5],
              [pars.C1, pars.C3, pars.C28],
              [pars.C1, pars.C3, -pars.C28],
              [pars.C1, -pars.C3, pars.C28],
              [pars.C1, -pars.C3, -pars.C28],
              [-pars.C1, pars.C3, pars.C28],
              [-pars.C1, pars.C3, -pars.C28],
              [-pars.C1, -pars.C3, pars.C28],
              [-pars.C1, -pars.C3, -pars.C28],
              [pars.C28, pars.C1, pars.C3],
              [pars.C28, pars.C1, -pars.C3],
              [pars.C28, -pars.C1, pars.C3],
              [pars.C28, -pars.C1, -pars.C3],
              [-pars.C28, pars.C1, pars.C3],
              [-pars.C28, pars.C1, -pars.C3],
              [-pars.C28, -pars.C1, pars.C3],
              [-pars.C28, -pars.C1, -pars.C3],
              [pars.C3, pars.C28, pars.C1],
              [pars.C3, pars.C28, -pars.C1],
              [pars.C3, -pars.C28, pars.C1],
              [pars.C3, -pars.C28, -pars.C1],
              [-pars.C3, pars.C28, pars.C1],
              [-pars.C3, pars.C28, -pars.C1],
              [-pars.C3, -pars.C28, pars.C1],
              [-pars.C3, -pars.C28, -pars.C1],
              [pars.C9, 0.0, pars.C27],
              [pars.C9, 0.0, -pars.C27],
              [-pars.C9, 0.0, pars.C27],
              [-pars.C9, 0.0, -pars.C27],
              [pars.C27, pars.C9, 0.0],
              [pars.C27, -pars.C9, 0.0],
              [-pars.C27, pars.C9, 0.0],
              [-pars.C27, -pars.C9, 0.0],
              [0.0, pars.C27, pars.C9],
              [0.0, pars.C27, -pars.C9],
              [0.0, -pars.C27, pars.C9],
              [0.0, -pars.C27, -pars.C9],
              [pars.C6, pars.C8, pars.C26],
              [pars.C6, pars.C8, -pars.C26],
              [pars.C6, -pars.C8, pars.C26],
              [pars.C6, -pars.C8, -pars.C26],
              [-pars.C6, pars.C8, pars.C26],
              [-pars.C6, pars.C8, -pars.C26],
              [-pars.C6, -pars.C8, pars.C26],
              [-pars.C6, -pars.C8, -pars.C26],
              [pars.C26, pars.C6, pars.C8],
              [pars.C26, pars.C6, -pars.C8],
              [pars.C26, -pars.C6, pars.C8],
              [pars.C26, -pars.C6, -pars.C8],
              [-pars.C26, pars.C6, pars.C8],
              [-pars.C26, pars.C6, -pars.C8],
              [-pars.C26, -pars.C6, pars.C8],
              [-pars.C26, -pars.C6, -pars.C8],
              [pars.C8, pars.C26, pars.C6],
              [pars.C8, pars.C26, -pars.C6],
              [pars.C8, -pars.C26, pars.C6],
              [pars.C8, -pars.C26, -pars.C6],
              [-pars.C8, pars.C26, pars.C6],
              [-pars.C8, pars.C26, -pars.C6],
              [-pars.C8, -pars.C26, pars.C6],
              [-pars.C8, -pars.C26, -pars.C6],
              [pars.C13, pars.C2, pars.C25],
              [pars.C13, pars.C2, -pars.C25],
              [pars.C13, -pars.C2, pars.C25],
              [pars.C13, -pars.C2, -pars.C25],
              [-pars.C13, pars.C2, pars.C25],
              [-pars.C13, pars.C2, -pars.C25],
              [-pars.C13, -pars.C2, pars.C25],
              [-pars.C13, -pars.C2, -pars.C25],
              [pars.C25, pars.C13, pars.C2],
              [pars.C25, pars.C13, -pars.C2],
              [pars.C25, -pars.C13, pars.C2],
              [pars.C25, -pars.C13, -pars.C2],
              [-pars.C25, pars.C13, pars.C2],
              [-pars.C25, pars.C13, -pars.C2],
              [-pars.C25, -pars.C13, pars.C2],
              [-pars.C25, -pars.C13, -pars.C2],
              [pars.C2, pars.C25, pars.C13],
              [pars.C2, pars.C25, -pars.C13],
              [pars.C2, -pars.C25, pars.C13],
              [pars.C2, -pars.C25, -pars.C13],
              [-pars.C2, pars.C25, pars.C13],
              [-pars.C2, pars.C25, -pars.C13],
              [-pars.C2, -pars.C25, pars.C13],
              [-pars.C2, -pars.C25, -pars.C13],
              [pars.C11, pars.C7, pars.C24],
              [pars.C11, pars.C7, -pars.C24],
              [pars.C11, -pars.C7, pars.C24],
              [pars.C11, -pars.C7, -pars.C24],
              [-pars.C11, pars.C7, pars.C24],
              [-pars.C11, pars.C7, -pars.C24],
              [-pars.C11, -pars.C7, pars.C24],
              [-pars.C11, -pars.C7, -pars.C24],
              [pars.C24, pars.C11, pars.C7],
              [pars.C24, pars.C11, -pars.C7],
              [pars.C24, -pars.C11, pars.C7],
              [pars.C24, -pars.C11, -pars.C7],
              [-pars.C24, pars.C11, pars.C7],
              [-pars.C24, pars.C11, -pars.C7],
              [-pars.C24, -pars.C11, pars.C7],
              [-pars.C24, -pars.C11, -pars.C7],
              [pars.C7, pars.C24, pars.C11],
              [pars.C7, pars.C24, -pars.C11],
              [pars.C7, -pars.C24, pars.C11],
              [pars.C7, -pars.C24, -pars.C11],
              [-pars.C7, pars.C24, pars.C11],
              [-pars.C7, pars.C24, -pars.C11],
              [-pars.C7, -pars.C24, pars.C11],
              [-pars.C7, -pars.C24, -pars.C11],
              [pars.C1, pars.C15, pars.C23],
              [pars.C1, pars.C15, -pars.C23],
              [pars.C1, -pars.C15, pars.C23],
              [pars.C1, -pars.C15, -pars.C23],
              [-pars.C1, pars.C15, pars.C23],
              [-pars.C1, pars.C15, -pars.C23],
              [-pars.C1, -pars.C15, pars.C23],
              [-pars.C1, -pars.C15, -pars.C23],
              [pars.C23, pars.C1, pars.C15],
              [pars.C23, pars.C1, -pars.C15],
              [pars.C23, -pars.C1, pars.C15],
              [pars.C23, -pars.C1, -pars.C15],
              [-pars.C23, pars.C1, pars.C15],
              [-pars.C23, pars.C1, -pars.C15],
              [-pars.C23, -pars.C1, pars.C15],
              [-pars.C23, -pars.C1, -pars.C15],
              [pars.C15, pars.C23, pars.C1],
              [pars.C15, pars.C23, -pars.C1],
              [pars.C15, -pars.C23, pars.C1],
              [pars.C15, -pars.C23, -pars.C1],
              [-pars.C15, pars.C23, pars.C1],
              [-pars.C15, pars.C23, -pars.C1],
              [-pars.C15, -pars.C23, pars.C1],
              [-pars.C15, -pars.C23, -pars.C1],
              [pars.C16, pars.C0, pars.C22],
              [pars.C16, pars.C0, -pars.C22],
              [pars.C16, -pars.C0, pars.C22],
              [pars.C16, -pars.C0, -pars.C22],
              [-pars.C16, pars.C0, pars.C22],
              [-pars.C16, pars.C0, -pars.C22],
              [-pars.C16, -pars.C0, pars.C22],
              [-pars.C16, -pars.C0, -pars.C22],
              [pars.C22, pars.C16, pars.C0],
              [pars.C22, pars.C16, -pars.C0],
              [pars.C22, -pars.C16, pars.C0],
              [pars.C22, -pars.C16, -pars.C0],
              [-pars.C22, pars.C16, pars.C0],
              [-pars.C22, pars.C16, -pars.C0],
              [-pars.C22, -pars.C16, pars.C0],
              [-pars.C22, -pars.C16, -pars.C0],
              [pars.C0, pars.C22, pars.C16],
              [pars.C0, pars.C22, -pars.C16],
              [pars.C0, -pars.C22, pars.C16],
              [pars.C0, -pars.C22, -pars.C16],
              [-pars.C0, pars.C22, pars.C16],
              [-pars.C0, pars.C22, -pars.C16],
              [-pars.C0, -pars.C22, pars.C16],
              [-pars.C0, -pars.C22, -pars.C16],
              [pars.C14, pars.C12, pars.C21],
              [pars.C14, pars.C12, -pars.C21],
              [pars.C14, -pars.C12, pars.C21],
              [pars.C14, -pars.C12, -pars.C21],
              [-pars.C14, pars.C12, pars.C21],
              [-pars.C14, pars.C12, -pars.C21],
              [-pars.C14, -pars.C12, pars.C21],
              [-pars.C14, -pars.C12, -pars.C21],
              [pars.C21, pars.C14, pars.C12],
              [pars.C21, pars.C14, -pars.C12],
              [pars.C21, -pars.C14, pars.C12],
              [pars.C21, -pars.C14, -pars.C12],
              [-pars.C21, pars.C14, pars.C12],
              [-pars.C21, pars.C14, -pars.C12],
              [-pars.C21, -pars.C14, pars.C12],
              [-pars.C21, -pars.C14, -pars.C12],
              [pars.C12, pars.C21, pars.C14],
              [pars.C12, pars.C21, -pars.C14],
              [pars.C12, -pars.C21, pars.C14],
              [pars.C12, -pars.C21, -pars.C14],
              [-pars.C12, pars.C21, pars.C14],
              [-pars.C12, pars.C21, -pars.C14],
              [-pars.C12, -pars.C21, pars.C14],
              [-pars.C12, -pars.C21, -pars.C14],
              [pars.C4, pars.C18, pars.C20],
              [pars.C4, pars.C18, -pars.C20],
              [pars.C4, -pars.C18, pars.C20],
              [pars.C4, -pars.C18, -pars.C20],
              [-pars.C4, pars.C18, pars.C20],
              [-pars.C4, pars.C18, -pars.C20],
              [-pars.C4, -pars.C18, pars.C20],
              [-pars.C4, -pars.C18, -pars.C20],
              [pars.C20, pars.C4, pars.C18],
              [pars.C20, pars.C4, -pars.C18],
              [pars.C20, -pars.C4, pars.C18],
              [pars.C20, -pars.C4, -pars.C18],
              [-pars.C20, pars.C4, pars.C18],
              [-pars.C20, pars.C4, -pars.C18],
              [-pars.C20, -pars.C4, pars.C18],
              [-pars.C20, -pars.C4, -pars.C18],
              [pars.C18, pars.C20, pars.C4],
              [pars.C18, pars.C20, -pars.C4],
              [pars.C18, -pars.C20, pars.C4],
              [pars.C18, -pars.C20, -pars.C4],
              [-pars.C18, pars.C20, pars.C4],
              [-pars.C18, pars.C20, -pars.C4],
              [-pars.C18, -pars.C20, pars.C4],
              [-pars.C18, -pars.C20, -pars.C4],
              [pars.C10, pars.C17, pars.C19],
              [pars.C10, pars.C17, -pars.C19],
              [pars.C10, -pars.C17, pars.C19],
              [pars.C10, -pars.C17, -pars.C19],
              [-pars.C10, pars.C17, pars.C19],
              [-pars.C10, pars.C17, -pars.C19],
              [-pars.C10, -pars.C17, pars.C19],
              [-pars.C10, -pars.C17, -pars.C19],
              [pars.C19, pars.C10, pars.C17],
              [pars.C19, pars.C10, -pars.C17],
              [pars.C19, -pars.C10, pars.C17],
              [pars.C19, -pars.C10, -pars.C17],
              [-pars.C19, pars.C10, pars.C17],
              [-pars.C19, pars.C10, -pars.C17],
              [-pars.C19, -pars.C10, pars.C17],
              [-pars.C19, -pars.C10, -pars.C17],
              [pars.C17, pars.C19, pars.C10],
              [pars.C17, pars.C19, -pars.C10],
              [pars.C17, -pars.C19, pars.C10],
              [pars.C17, -pars.C19, -pars.C10],
              [-pars.C17, pars.C19, pars.C10],
              [-pars.C17, pars.C19, -pars.C10],
              [-pars.C17, -pars.C19, pars.C10],
              [-pars.C17, -pars.C19, -pars.C10]],

          faces: pars =>

            [[12, 48, 120, 124, 52, 16],
              [13, 17, 53, 125, 121, 49],
              [14, 18, 54, 126, 122, 50],
              [15, 51, 123, 127, 55, 19],
              [20, 56, 128, 130, 58, 22],
              [21, 23, 59, 131, 129, 57],
              [24, 26, 62, 134, 132, 60],
              [25, 61, 133, 135, 63, 27],
              [28, 64, 136, 137, 65, 29],
              [30, 31, 67, 139, 138, 66],
              [32, 33, 69, 141, 140, 68],
              [34, 70, 142, 143, 71, 35],
              [168, 224, 176, 232, 184, 216],
              [169, 217, 185, 233, 177, 225],
              [170, 218, 186, 234, 178, 226],
              [171, 227, 179, 235, 187, 219],
              [172, 220, 188, 236, 180, 228],
              [173, 229, 181, 237, 189, 221],
              [174, 230, 182, 238, 190, 222],
              [175, 223, 191, 239, 183, 231],
              [12, 16, 2, 18, 14, 0],
              [13, 1, 15, 19, 3, 17],
              [20, 22, 5, 23, 21, 4],
              [24, 6, 25, 27, 7, 26],
              [28, 29, 9, 33, 32, 8],
              [30, 10, 34, 35, 11, 31],
              [48, 96, 168, 216, 192, 120],
              [49, 121, 193, 217, 169, 97],
              [50, 122, 194, 218, 170, 98],
              [51, 99, 171, 219, 195, 123],
              [52, 124, 196, 220, 172, 100],
              [53, 101, 173, 221, 197, 125],
              [54, 102, 174, 222, 198, 126],
              [55, 127, 199, 223, 175, 103],
              [56, 104, 176, 224, 200, 128],
              [57, 129, 201, 225, 177, 105],
              [58, 130, 202, 226, 178, 106],
              [59, 107, 179, 227, 203, 131],
              [60, 132, 204, 228, 180, 108],
              [61, 109, 181, 229, 205, 133],
              [62, 110, 182, 230, 206, 134],
              [63, 135, 207, 231, 183, 111],
              [64, 112, 184, 232, 208, 136],
              [65, 137, 209, 233, 185, 113],
              [66, 138, 210, 234, 186, 114],
              [67, 115, 187, 235, 211, 139],
              [68, 140, 212, 236, 188, 116],
              [69, 117, 189, 237, 213, 141],
              [70, 118, 190, 238, 214, 142],
              [71, 143, 215, 239, 191, 119],
              [72, 96, 48, 12, 0, 36],
              [73, 37, 1, 13, 49, 97],
              [74, 36, 0, 14, 50, 98],
              [75, 99, 51, 15, 1, 37],
              [76, 38, 2, 16, 52, 100],
              [77, 101, 53, 17, 3, 39],
              [78, 102, 54, 18, 2, 38],
              [79, 39, 3, 19, 55, 103],
              [80, 104, 56, 20, 4, 40],
              [81, 40, 4, 21, 57, 105],
              [82, 41, 5, 22, 58, 106],
              [83, 107, 59, 23, 5, 41],
              [84, 42, 6, 24, 60, 108],
              [85, 109, 61, 25, 6, 42],
              [86, 110, 62, 26, 7, 43],
              [87, 43, 7, 27, 63, 111],
              [88, 112, 64, 28, 8, 44],
              [89, 45, 9, 29, 65, 113],
              [90, 46, 10, 30, 66, 114],
              [91, 115, 67, 31, 11, 47],
              [92, 44, 8, 32, 68, 116],
              [93, 117, 69, 33, 9, 45],
              [94, 118, 70, 34, 10, 46],
              [95, 47, 11, 35, 71, 119],
              [96, 72, 144, 200, 224, 168],
              [97, 169, 225, 201, 145, 73],
              [98, 170, 226, 202, 146, 74],
              [99, 75, 147, 203, 227, 171],
              [100, 172, 228, 204, 148, 76],
              [101, 77, 149, 205, 229, 173],
              [102, 78, 150, 206, 230, 174],
              [103, 175, 231, 207, 151, 79],
              [104, 80, 152, 208, 232, 176],
              [105, 177, 233, 209, 153, 81],
              [106, 178, 234, 210, 154, 82],
              [107, 83, 155, 211, 235, 179],
              [108, 180, 236, 212, 156, 84],
              [109, 85, 157, 213, 237, 181],
              [110, 86, 158, 214, 238, 182],
              [111, 183, 239, 215, 159, 87],
              [112, 88, 160, 192, 216, 184],
              [113, 185, 217, 193, 161, 89],
              [114, 186, 218, 194, 162, 90],
              [115, 91, 163, 195, 219, 187],
              [116, 188, 220, 196, 164, 92],
              [117, 93, 165, 197, 221, 189],
              [118, 94, 166, 198, 222, 190],
              [119, 191, 223, 199, 167, 95],
              [120, 192, 160, 164, 196, 124],
              [121, 125, 197, 165, 161, 193],
              [122, 126, 198, 166, 162, 194],
              [123, 195, 163, 167, 199, 127],
              [128, 200, 144, 146, 202, 130],
              [129, 131, 203, 147, 145, 201],
              [132, 134, 206, 150, 148, 204],
              [133, 205, 149, 151, 207, 135],
              [136, 208, 152, 153, 209, 137],
              [138, 139, 211, 155, 154, 210],
              [140, 141, 213, 157, 156, 212],
              [142, 214, 158, 159, 215, 143],
              [36, 74, 146, 144, 72],
              [37, 73, 145, 147, 75],
              [38, 76, 148, 150, 78],
              [39, 79, 151, 149, 77],
              [40, 81, 153, 152, 80],
              [41, 82, 154, 155, 83],
              [42, 84, 156, 157, 85],
              [43, 87, 159, 158, 86],
              [44, 92, 164, 160, 88],
              [45, 89, 161, 165, 93],
              [46, 90, 162, 166, 94],
              [47, 95, 167, 163, 91]],

          lights: pars =>
            [
              // {
            // type: 'AmbientLight',
            // name: 'AmbientLight',
            // color: 0xeeeeee,
            // intensity: 0.9,
            // position: [110, 110, 110],
              // },
              // {
            // type: 'DirectionalLight',
            // name: 'DirectionalLight',
            // color: 0xe4eef9,
            // intensity: 0.7,
            // position: [0, 0, 120],
            // normalize: 1,
            // castShadow: 1,
              // },
              // {
            // type: 'PointLight',
            // color: 0xe4eef9,
            // intensity: 0.7,
            // position: [0, 0, 120],
            // normalize: 1,
            // castShadow: 1,
              // },
              {
                type: 'SpotLight',
                color: 0xe4eef9,
                intensity: 0.01,
                position: [0, 0, 2120],
                normalize: 1,
                castShadow: 1,
              },

            ],

        },
      }

      // .................. cameraOrthoAni anima
      let lightHemisphereAni = {

        eotim: eotim,
        eoric: {gid: 'camera', cid: 'camera', fid: 'lightHemisphereAni'},
        eohal: eonEohalSol,

        eofold: anitem => {
          let eoload = anitem.eoload
          let json = { // Feature
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [0, 0, 0] },
            properties: anitem.eoload.light,
          }

          return json
        },
        eoload: {
          light: {
            sort: 'light',
            type: 'HemisphereLight',
            name: 'HemisphereLight',
            skyColor: [[[222, 999]]],
            groundColor: 111,
            intensity: 0.2,
            position: [0, 0, 200],
          },
        },

      }

      // .................. spotLight anima
      let spotLight = {

        eotim: eotim,
        eoric: {gid: 'camera', cid: 'camera', fid: 'spotLight'},
        eohal: eonEohalSol,

        eofold: anitem => {
          let eoload = anitem.eoload
          let json = { // Feature
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [0, 0, 0] },
            properties: anitem.eoload.light,
          }

          return json
        },
        eoload: {
          light: {
            sort: 'light',
            type: 'SpotLight',
            name: 'spotLight',
            color: [[[222, 777]]], // 0xe4eef9,
            intensity: 0.9,
            position: [-200, 200, 200],
            normalize: 1,
            castShadow: 1,
          },
        },

      }
      // .................. cameraOrthoAni anima
      let cameraOrthoAni = {

        eotim: eotim,
        eoric: {gid: 'camera', cid: 'camera', fid: 'cameraOrthoAni'},
        eohal: eonEohalSol,

        eofold: anitem => {
          let eoload = anitem.eoload
          let json = { // Feature
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [0, 0, 0] },
            properties: {
              sort: 'camera',
              type: 'OrthographicCamera',
              name: 'Orthographic',
              left: -eonRenderPortview.width() / 2,
              right: eonRenderPortview.width() / 2,
              top: eonRenderPortview.height() / 2,
              bottom: -eonRenderPortview.height() / 2,
              near: -200,
              far: 200,

              position: [0, 0, 20],
              rotation: [0, 60, 0],
              distance2nodesFactor: 300,
              lookAt: [0, 0, 0],
            },
          }

          return json
        },

      }

      // .................. cameraOrthoAni anima
      let cameraOrthoHelper = {

        eotim: eotim,
        eoric: {gid: 'camera', cid: 'camera', fid: 'cameraOrthoHelper'},
        eohal: eonEohalSol,

        eofold: anitem => {
          let eoload = anitem.eoload
          let json = { // Feature
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [0, 0, 0] },
            properties: {
              sort: 'cameraHelper',
              type: 'OrthographicCamera',
              name: 'Orthographic',
              left: -eonRenderPortview.width() / 2,
              right: eonRenderPortview.width() / 2,
              top: eonRenderPortview.height() / 2,
              bottom: -eonRenderPortview.height() / 2,
              near: -200,
              far: 200,

              position: [-200, 0, 200],
              rotation: [0, 0, 0],
              distance2nodesFactor: 300,
              lookAt: [0, 0, 0],
            },
          }

          return json
        },

      }

      // .................. cameraPersAni anima
      let cameraPersAni = {

        eotim: eotim,
        eoric: {gid: 'camera', cid: 'camera', fid: 'cameraPersAni'},
        eohal: eonEohalSol,

        eofold: anitem => {
          let eoload = anitem.eoload
          let json = { // Feature
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [0, 0, 0] },
            properties: anitem.eoload.camera,
          }

          return json
        },
        eoload: {
          camera: {
            sort: 'camera',
            type: 'PerspectiveCamera',
            name: 'Perspective',
            fov: 100, // field of view
            aspect: eonRenderPortview.width() / eonRenderPortview.height(),
            near: 0.001,
            far: 300,

            position: [0, 0, 200 ],
            rotation: [0, 60, 0],
            distance2nodesFactor: 100,
            lookAt: [0, 0, 0],
          },
        },
      }
      // .................. cameraPersHelper anima
      let cameraPersHelper = {

        eotim: eotim,
        eoric: {gid: 'camera', cid: 'camera', fid: 'cameraPersHelper'},
        eohal: eonEohalSol,

        eofold: anitem => {
          let eoload = anitem.eoload
          let json = { // Feature
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [0, 0, 0] },
            properties: anitem.eoload.camera,
          }

          return json
        },
        eoload: {
          camera: {
            sort: 'cameraHelper',
            type: 'PerspectiveCamera',
            name: 'cameraPersHelper',

            fov: 90, // field of view
            aspect: eonRenderPortview.width() / eonRenderPortview.height(),
            near: -100,
            far: 100,

            position: [200, 200, 200],
            rotation: [0, 0, 0],
            // distance2nodesFactor: 300,
            lookAt: [0, 0, 0],
          },
        },
      }
      // .................. gridHelper anima
      let gridHelper = {

        eotim: eotim,
        eoric: {gid: 'camera', cid: 'camera', fid: 'gridHelper'},
        eohal: eonEohalSol,

        eofold: anitem => {
          let eoload = anitem.eoload
          let json = { // Feature
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [0, 0, 0] },
            properties: {
              sort: 'gridHelper',
              type: 'GridHelper',
              name: 'gridHelper',
              isToUpdate: 0,

              size: 200, // field of view
              divisions: 5,

              position: [0, -100, 0 ],
            },
          }

          return json
        },

      }
      // .................. animas
      let animas = [

        facesAni, // h.mars
        cameraPersAni, // h.sol
        // cameraPersHelper, // h.sol
        // cameraOrthoAni, // h.sol
        // cameraOrthoHelper, // h.sol
        // gridHelper, // h.sol
        lightHemisphereAni, // h.sol
        spotLight, // h.sol

      ]
      return animas
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.eonZ791hCs06ChamferedTruncatedIcosahedron = anitem
}))
