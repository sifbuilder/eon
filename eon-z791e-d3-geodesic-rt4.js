/* ******************************************
   *    @eonZ791eD3GeodesicRt4
   *
   */
  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
      : typeof define === 'function' && define.amd ? define(['exports'], factory)
        : (factory((global.eonZ791eD3GeodesicRt4 = global.eonZ791eD3GeodesicRt4 || {})))
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
    let pi = Math.PI, degrees = 180 / pi, asin1_3 = Math.asin(1 / 3)
    let theta = atan(0.5) * degrees

    const eotim = {'td': 23800, 't0': 0, 't1': 1, 't2': 1, 't3': 1, nostop: 1}

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

          rotate: [ [[[0, 9, 0]]], [[[0, 2 * 360]]], [[[0, 9, 0]]] ],
          lens: [0, 1, Infinity ],

        },
      },
      eoload: {
        /*
            Dave McCooey
            dmccooey@mac.com

            Geodesic Rhombic Triacontahedron Pattern 4 [2,2]

          */
        pars: {
          C0: 0.130856316980679041715062406093,
          C1: 0.183364691682889243997667190771,
          C2: 0.210044322875480944728375403331,
          C3: 0.213388436344685665213445153890,
          C4: 0.235196494982565109085403039376,
          C5: 0.238480078400087554643115993977,
          C6: 0.296690303479559952463471603014,
          C7: 0.311029944924819059200454212862,
          C8: 0.357282985798322523716806842711,
          C9: 0.380555922916634453826311243879,
          C10: 0.421844770082976798640783184747,
          C11: 0.425118404862054371986523547061,
          C12: 0.476126059792573820288118136867,
          C13: 0.503257022407365095872997213099,
          C14: 0.535328369965939697384435193703,
          C15: 0.5569997113292634853461341239446,
          C16: 0.575055348539050325121207879057,
          C17: 0.578096014623731827161044180953,
          C18: 0.590600245792115398554686647210,
          C19: 0.682559175970641260243492115769,
          C20: 0.687856028309942527061196530037,
          C21: 0.718535073562536751104254787761,
          C22: 0.720414776473119669862116083560,
          C23: 0.814286967332184155073451425961,
          C24: 0.825796740774680507640089686586,
          C25: 0.865923867653530504241159306540,
          C26: 0.866179497746968819461668096700,
          C27: 0.901244464654628192274641683928,
          C28: 0.935379000422054350877851023664,
          C29: 0.955611271455684778947519122936,
          C30: 0.979249479450201212706963718784,
          C31: 0.982118116191317857332657671006,
          C32: 1.00651404481473019174599442620,
        },

        vertices: pars =>
          [[0.0, 0.0, pars.C32],
            [0.0, 0.0, -pars.C32],
            [pars.C32, 0.0, 0.0],
            [-pars.C32, 0.0, 0.0],
            [0.0, pars.C32, 0.0],
            [0.0, -pars.C32, 0.0],
            [0.0, pars.C3, pars.C31],
            [0.0, pars.C3, -pars.C31],
            [0.0, -pars.C3, pars.C31],
            [0.0, -pars.C3, -pars.C31],
            [pars.C31, 0.0, pars.C3],
            [pars.C31, 0.0, -pars.C3],
            [-pars.C31, 0.0, pars.C3],
            [-pars.C31, 0.0, -pars.C3],
            [pars.C3, pars.C31, 0.0],
            [pars.C3, -pars.C31, 0.0],
            [-pars.C3, pars.C31, 0.0],
            [-pars.C3, -pars.C31, 0.0],
            [pars.C5, 0.0, pars.C30],
            [pars.C5, 0.0, -pars.C30],
            [-pars.C5, 0.0, pars.C30],
            [-pars.C5, 0.0, -pars.C30],
            [pars.C30, pars.C5, 0.0],
            [pars.C30, -pars.C5, 0.0],
            [-pars.C30, pars.C5, 0.0],
            [-pars.C30, -pars.C5, 0.0],
            [0.0, pars.C30, pars.C5],
            [0.0, pars.C30, -pars.C5],
            [0.0, -pars.C30, pars.C5],
            [0.0, -pars.C30, -pars.C5],
            [pars.C2, pars.C4, pars.C29],
            [pars.C2, pars.C4, -pars.C29],
            [pars.C2, -pars.C4, pars.C29],
            [pars.C2, -pars.C4, -pars.C29],
            [-pars.C2, pars.C4, pars.C29],
            [-pars.C2, pars.C4, -pars.C29],
            [-pars.C2, -pars.C4, pars.C29],
            [-pars.C2, -pars.C4, -pars.C29],
            [pars.C29, pars.C2, pars.C4],
            [pars.C29, pars.C2, -pars.C4],
            [pars.C29, -pars.C2, pars.C4],
            [pars.C29, -pars.C2, -pars.C4],
            [-pars.C29, pars.C2, pars.C4],
            [-pars.C29, pars.C2, -pars.C4],
            [-pars.C29, -pars.C2, pars.C4],
            [-pars.C29, -pars.C2, -pars.C4],
            [pars.C4, pars.C29, pars.C2],
            [pars.C4, pars.C29, -pars.C2],
            [pars.C4, -pars.C29, pars.C2],
            [pars.C4, -pars.C29, -pars.C2],
            [-pars.C4, pars.C29, pars.C2],
            [-pars.C4, pars.C29, -pars.C2],
            [-pars.C4, -pars.C29, pars.C2],
            [-pars.C4, -pars.C29, -pars.C2],
            [0.0, pars.C8, pars.C28],
            [0.0, pars.C8, -pars.C28],
            [0.0, -pars.C8, pars.C28],
            [0.0, -pars.C8, -pars.C28],
            [pars.C28, 0.0, pars.C8],
            [pars.C28, 0.0, -pars.C8],
            [-pars.C28, 0.0, pars.C8],
            [-pars.C28, 0.0, -pars.C8],
            [pars.C8, pars.C28, 0.0],
            [pars.C8, -pars.C28, 0.0],
            [-pars.C8, pars.C28, 0.0],
            [-pars.C8, -pars.C28, 0.0],
            [pars.C0, pars.C11, pars.C27],
            [pars.C0, pars.C11, -pars.C27],
            [pars.C0, -pars.C11, pars.C27],
            [pars.C0, -pars.C11, -pars.C27],
            [-pars.C0, pars.C11, pars.C27],
            [-pars.C0, pars.C11, -pars.C27],
            [-pars.C0, -pars.C11, pars.C27],
            [-pars.C0, -pars.C11, -pars.C27],
            [pars.C27, pars.C0, pars.C11],
            [pars.C27, pars.C0, -pars.C11],
            [pars.C27, -pars.C0, pars.C11],
            [pars.C27, -pars.C0, -pars.C11],
            [-pars.C27, pars.C0, pars.C11],
            [-pars.C27, pars.C0, -pars.C11],
            [-pars.C27, -pars.C0, pars.C11],
            [-pars.C27, -pars.C0, -pars.C11],
            [pars.C11, pars.C27, pars.C0],
            [pars.C11, pars.C27, -pars.C0],
            [pars.C11, -pars.C27, pars.C0],
            [pars.C11, -pars.C27, -pars.C0],
            [-pars.C11, pars.C27, pars.C0],
            [-pars.C11, pars.C27, -pars.C0],
            [-pars.C11, -pars.C27, pars.C0],
            [-pars.C11, -pars.C27, -pars.C0],
            [pars.C14, 0.0, pars.C26],
            [pars.C14, 0.0, -pars.C26],
            [-pars.C14, 0.0, pars.C26],
            [-pars.C14, 0.0, -pars.C26],
            [pars.C26, pars.C14, 0.0],
            [pars.C26, -pars.C14, 0.0],
            [-pars.C26, pars.C14, 0.0],
            [-pars.C26, -pars.C14, 0.0],
            [0.0, pars.C26, pars.C14],
            [0.0, pars.C26, -pars.C14],
            [0.0, -pars.C26, pars.C14],
            [0.0, -pars.C26, -pars.C14],
            [pars.C10, pars.C6, pars.C25],
            [pars.C10, pars.C6, -pars.C25],
            [pars.C10, -pars.C6, pars.C25],
            [pars.C10, -pars.C6, -pars.C25],
            [-pars.C10, pars.C6, pars.C25],
            [-pars.C10, pars.C6, -pars.C25],
            [-pars.C10, -pars.C6, pars.C25],
            [-pars.C10, -pars.C6, -pars.C25],
            [pars.C25, pars.C10, pars.C6],
            [pars.C25, pars.C10, -pars.C6],
            [pars.C25, -pars.C10, pars.C6],
            [pars.C25, -pars.C10, -pars.C6],
            [-pars.C25, pars.C10, pars.C6],
            [-pars.C25, pars.C10, -pars.C6],
            [-pars.C25, -pars.C10, pars.C6],
            [-pars.C25, -pars.C10, -pars.C6],
            [pars.C6, pars.C25, pars.C10],
            [pars.C6, pars.C25, -pars.C10],
            [pars.C6, -pars.C25, pars.C10],
            [pars.C6, -pars.C25, -pars.C10],
            [-pars.C6, pars.C25, pars.C10],
            [-pars.C6, pars.C25, -pars.C10],
            [-pars.C6, -pars.C25, pars.C10],
            [-pars.C6, -pars.C25, -pars.C10],
            [0.0, pars.C16, pars.C24],
            [0.0, pars.C16, -pars.C24],
            [0.0, -pars.C16, pars.C24],
            [0.0, -pars.C16, -pars.C24],
            [pars.C24, 0.0, pars.C16],
            [pars.C24, 0.0, -pars.C16],
            [-pars.C24, 0.0, pars.C16],
            [-pars.C24, 0.0, -pars.C16],
            [pars.C16, pars.C24, 0.0],
            [pars.C16, -pars.C24, 0.0],
            [-pars.C16, pars.C24, 0.0],
            [-pars.C16, -pars.C24, 0.0],
            [pars.C7, pars.C13, pars.C23],
            [pars.C7, pars.C13, -pars.C23],
            [pars.C7, -pars.C13, pars.C23],
            [pars.C7, -pars.C13, -pars.C23],
            [-pars.C7, pars.C13, pars.C23],
            [-pars.C7, pars.C13, -pars.C23],
            [-pars.C7, -pars.C13, pars.C23],
            [-pars.C7, -pars.C13, -pars.C23],
            [pars.C23, pars.C7, pars.C13],
            [pars.C23, pars.C7, -pars.C13],
            [pars.C23, -pars.C7, pars.C13],
            [pars.C23, -pars.C7, -pars.C13],
            [-pars.C23, pars.C7, pars.C13],
            [-pars.C23, pars.C7, -pars.C13],
            [-pars.C23, -pars.C7, pars.C13],
            [-pars.C23, -pars.C7, -pars.C13],
            [pars.C13, pars.C23, pars.C7],
            [pars.C13, pars.C23, -pars.C7],
            [pars.C13, -pars.C23, pars.C7],
            [pars.C13, -pars.C23, -pars.C7],
            [-pars.C13, pars.C23, pars.C7],
            [-pars.C13, pars.C23, -pars.C7],
            [-pars.C13, -pars.C23, pars.C7],
            [-pars.C13, -pars.C23, -pars.C7],
            [pars.C18, pars.C9, pars.C22],
            [pars.C18, pars.C9, -pars.C22],
            [pars.C18, -pars.C9, pars.C22],
            [pars.C18, -pars.C9, -pars.C22],
            [-pars.C18, pars.C9, pars.C22],
            [-pars.C18, pars.C9, -pars.C22],
            [-pars.C18, -pars.C9, pars.C22],
            [-pars.C18, -pars.C9, -pars.C22],
            [pars.C22, pars.C18, pars.C9],
            [pars.C22, pars.C18, -pars.C9],
            [pars.C22, -pars.C18, pars.C9],
            [pars.C22, -pars.C18, -pars.C9],
            [-pars.C22, pars.C18, pars.C9],
            [-pars.C22, pars.C18, -pars.C9],
            [-pars.C22, -pars.C18, pars.C9],
            [-pars.C22, -pars.C18, -pars.C9],
            [pars.C9, pars.C22, pars.C18],
            [pars.C9, pars.C22, -pars.C18],
            [pars.C9, -pars.C22, pars.C18],
            [pars.C9, -pars.C22, -pars.C18],
            [-pars.C9, pars.C22, pars.C18],
            [-pars.C9, pars.C22, -pars.C18],
            [-pars.C9, -pars.C22, pars.C18],
            [-pars.C9, -pars.C22, -pars.C18],
            [pars.C1, pars.C19, pars.C21],
            [pars.C1, pars.C19, -pars.C21],
            [pars.C1, -pars.C19, pars.C21],
            [pars.C1, -pars.C19, -pars.C21],
            [-pars.C1, pars.C19, pars.C21],
            [-pars.C1, pars.C19, -pars.C21],
            [-pars.C1, -pars.C19, pars.C21],
            [-pars.C1, -pars.C19, -pars.C21],
            [pars.C21, pars.C1, pars.C19],
            [pars.C21, pars.C1, -pars.C19],
            [pars.C21, -pars.C1, pars.C19],
            [pars.C21, -pars.C1, -pars.C19],
            [-pars.C21, pars.C1, pars.C19],
            [-pars.C21, pars.C1, -pars.C19],
            [-pars.C21, -pars.C1, pars.C19],
            [-pars.C21, -pars.C1, -pars.C19],
            [pars.C19, pars.C21, pars.C1],
            [pars.C19, pars.C21, -pars.C1],
            [pars.C19, -pars.C21, pars.C1],
            [pars.C19, -pars.C21, -pars.C1],
            [-pars.C19, pars.C21, pars.C1],
            [-pars.C19, pars.C21, -pars.C1],
            [-pars.C19, -pars.C21, pars.C1],
            [-pars.C19, -pars.C21, -pars.C1],
            [pars.C12, pars.C15, pars.C20],
            [pars.C12, pars.C15, -pars.C20],
            [pars.C12, -pars.C15, pars.C20],
            [pars.C12, -pars.C15, -pars.C20],
            [-pars.C12, pars.C15, pars.C20],
            [-pars.C12, pars.C15, -pars.C20],
            [-pars.C12, -pars.C15, pars.C20],
            [-pars.C12, -pars.C15, -pars.C20],
            [pars.C20, pars.C12, pars.C15],
            [pars.C20, pars.C12, -pars.C15],
            [pars.C20, -pars.C12, pars.C15],
            [pars.C20, -pars.C12, -pars.C15],
            [-pars.C20, pars.C12, pars.C15],
            [-pars.C20, pars.C12, -pars.C15],
            [-pars.C20, -pars.C12, pars.C15],
            [-pars.C20, -pars.C12, -pars.C15],
            [pars.C15, pars.C20, pars.C12],
            [pars.C15, pars.C20, -pars.C12],
            [pars.C15, -pars.C20, pars.C12],
            [pars.C15, -pars.C20, -pars.C12],
            [-pars.C15, pars.C20, pars.C12],
            [-pars.C15, pars.C20, -pars.C12],
            [-pars.C15, -pars.C20, pars.C12],
            [-pars.C15, -pars.C20, -pars.C12],
            [pars.C17, pars.C17, pars.C17],
            [pars.C17, pars.C17, -pars.C17],
            [pars.C17, -pars.C17, pars.C17],
            [pars.C17, -pars.C17, -pars.C17],
            [-pars.C17, pars.C17, pars.C17],
            [-pars.C17, pars.C17, -pars.C17],
            [-pars.C17, -pars.C17, pars.C17],
            [-pars.C17, -pars.C17, -pars.C17]],

        faces: pars =>

          [[90, 18, 32, 104],
            [90, 104, 164, 196],
            [90, 196, 130, 194],
            [90, 194, 162, 102],
            [90, 102, 30, 18],
            [91, 19, 31, 103],
            [91, 103, 163, 195],
            [91, 195, 131, 197],
            [91, 197, 165, 105],
            [91, 105, 33, 19],
            [92, 20, 34, 106],
            [92, 106, 166, 198],
            [92, 198, 132, 200],
            [92, 200, 168, 108],
            [92, 108, 36, 20],
            [93, 21, 37, 109],
            [93, 109, 169, 201],
            [93, 201, 133, 199],
            [93, 199, 167, 107],
            [93, 107, 35, 21],
            [94, 22, 39, 111],
            [94, 111, 171, 203],
            [94, 203, 134, 202],
            [94, 202, 170, 110],
            [94, 110, 38, 22],
            [95, 23, 40, 112],
            [95, 112, 172, 204],
            [95, 204, 135, 205],
            [95, 205, 173, 113],
            [95, 113, 41, 23],
            [96, 24, 42, 114],
            [96, 114, 174, 206],
            [96, 206, 136, 207],
            [96, 207, 175, 115],
            [96, 115, 43, 24],
            [97, 25, 45, 117],
            [97, 117, 177, 209],
            [97, 209, 137, 208],
            [97, 208, 176, 116],
            [97, 116, 44, 25],
            [98, 26, 50, 122],
            [98, 122, 182, 190],
            [98, 190, 126, 186],
            [98, 186, 178, 118],
            [98, 118, 46, 26],
            [99, 27, 47, 119],
            [99, 119, 179, 187],
            [99, 187, 127, 191],
            [99, 191, 183, 123],
            [99, 123, 51, 27],
            [100, 28, 48, 120],
            [100, 120, 180, 188],
            [100, 188, 128, 192],
            [100, 192, 184, 124],
            [100, 124, 52, 28],
            [101, 29, 53, 125],
            [101, 125, 185, 193],
            [101, 193, 129, 189],
            [101, 189, 181, 121],
            [101, 121, 49, 29],
            [54, 6, 30, 66],
            [54, 66, 126, 70],
            [54, 70, 34, 6],
            [55, 7, 35, 71],
            [55, 71, 127, 67],
            [55, 67, 31, 7],
            [56, 8, 36, 72],
            [56, 72, 128, 68],
            [56, 68, 32, 8],
            [57, 9, 33, 69],
            [57, 69, 129, 73],
            [57, 73, 37, 9],
            [58, 10, 38, 74],
            [58, 74, 130, 76],
            [58, 76, 40, 10],
            [59, 11, 41, 77],
            [59, 77, 131, 75],
            [59, 75, 39, 11],
            [60, 12, 44, 80],
            [60, 80, 132, 78],
            [60, 78, 42, 12],
            [61, 13, 43, 79],
            [61, 79, 133, 81],
            [61, 81, 45, 13],
            [62, 14, 46, 82],
            [62, 82, 134, 83],
            [62, 83, 47, 14],
            [63, 15, 49, 85],
            [63, 85, 135, 84],
            [63, 84, 48, 15],
            [64, 16, 51, 87],
            [64, 87, 136, 86],
            [64, 86, 50, 16],
            [65, 17, 52, 88],
            [65, 88, 137, 89],
            [65, 89, 53, 17],
            [234, 210, 162, 218],
            [234, 218, 170, 226],
            [234, 226, 178, 210],
            [235, 211, 179, 227],
            [235, 227, 171, 219],
            [235, 219, 163, 211],
            [236, 212, 180, 228],
            [236, 228, 172, 220],
            [236, 220, 164, 212],
            [237, 213, 165, 221],
            [237, 221, 173, 229],
            [237, 229, 181, 213],
            [238, 214, 182, 230],
            [238, 230, 174, 222],
            [238, 222, 166, 214],
            [239, 215, 167, 223],
            [239, 223, 175, 231],
            [239, 231, 183, 215],
            [240, 216, 168, 224],
            [240, 224, 176, 232],
            [240, 232, 184, 216],
            [241, 217, 185, 233],
            [241, 233, 177, 225],
            [241, 225, 169, 217],
            [0, 6, 34, 20],
            [0, 20, 36, 8],
            [0, 8, 32, 18],
            [0, 18, 30, 6],
            [1, 7, 31, 19],
            [1, 19, 33, 9],
            [1, 9, 37, 21],
            [1, 21, 35, 7],
            [2, 10, 40, 23],
            [2, 23, 41, 11],
            [2, 11, 39, 22],
            [2, 22, 38, 10],
            [3, 12, 42, 24],
            [3, 24, 43, 13],
            [3, 13, 45, 25],
            [3, 25, 44, 12],
            [4, 14, 47, 27],
            [4, 27, 51, 16],
            [4, 16, 50, 26],
            [4, 26, 46, 14],
            [5, 15, 48, 28],
            [5, 28, 52, 17],
            [5, 17, 53, 29],
            [5, 29, 49, 15],
            [138, 66, 30, 102],
            [138, 102, 162, 210],
            [138, 210, 178, 186],
            [138, 186, 126, 66],
            [139, 67, 127, 187],
            [139, 187, 179, 211],
            [139, 211, 163, 103],
            [139, 103, 31, 67],
            [140, 68, 128, 188],
            [140, 188, 180, 212],
            [140, 212, 164, 104],
            [140, 104, 32, 68],
            [141, 69, 33, 105],
            [141, 105, 165, 213],
            [141, 213, 181, 189],
            [141, 189, 129, 69],
            [142, 70, 126, 190],
            [142, 190, 182, 214],
            [142, 214, 166, 106],
            [142, 106, 34, 70],
            [143, 71, 35, 107],
            [143, 107, 167, 215],
            [143, 215, 183, 191],
            [143, 191, 127, 71],
            [144, 72, 36, 108],
            [144, 108, 168, 216],
            [144, 216, 184, 192],
            [144, 192, 128, 72],
            [145, 73, 129, 193],
            [145, 193, 185, 217],
            [145, 217, 169, 109],
            [145, 109, 37, 73],
            [146, 74, 38, 110],
            [146, 110, 170, 218],
            [146, 218, 162, 194],
            [146, 194, 130, 74],
            [147, 75, 131, 195],
            [147, 195, 163, 219],
            [147, 219, 171, 111],
            [147, 111, 39, 75],
            [148, 76, 130, 196],
            [148, 196, 164, 220],
            [148, 220, 172, 112],
            [148, 112, 40, 76],
            [149, 77, 41, 113],
            [149, 113, 173, 221],
            [149, 221, 165, 197],
            [149, 197, 131, 77],
            [150, 78, 132, 198],
            [150, 198, 166, 222],
            [150, 222, 174, 114],
            [150, 114, 42, 78],
            [151, 79, 43, 115],
            [151, 115, 175, 223],
            [151, 223, 167, 199],
            [151, 199, 133, 79],
            [152, 80, 44, 116],
            [152, 116, 176, 224],
            [152, 224, 168, 200],
            [152, 200, 132, 80],
            [153, 81, 133, 201],
            [153, 201, 169, 225],
            [153, 225, 177, 117],
            [153, 117, 45, 81],
            [154, 82, 46, 118],
            [154, 118, 178, 226],
            [154, 226, 170, 202],
            [154, 202, 134, 82],
            [155, 83, 134, 203],
            [155, 203, 171, 227],
            [155, 227, 179, 119],
            [155, 119, 47, 83],
            [156, 84, 135, 204],
            [156, 204, 172, 228],
            [156, 228, 180, 120],
            [156, 120, 48, 84],
            [157, 85, 49, 121],
            [157, 121, 181, 229],
            [157, 229, 173, 205],
            [157, 205, 135, 85],
            [158, 86, 136, 206],
            [158, 206, 174, 230],
            [158, 230, 182, 122],
            [158, 122, 50, 86],
            [159, 87, 51, 123],
            [159, 123, 183, 231],
            [159, 231, 175, 207],
            [159, 207, 136, 87],
            [160, 88, 52, 124],
            [160, 124, 184, 232],
            [160, 232, 176, 208],
            [160, 208, 137, 88],
            [161, 89, 137, 209],
            [161, 209, 177, 233],
            [161, 233, 185, 125],
            [161, 125, 53, 89]],

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
          // {
            // type: 'SpotLight',
            // color: 0xe4eef9,
            // intensity: 0.7,
            // position: [0, 0, 120],
            // normalize: 1,
            // castShadow: 1,
          // },

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
          intensity: 0.01,
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
            rotation: [0, 0, 0],
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
          properties: {
            // sort: 'camera',
            // type: 'PerspectiveCamera',
            // name: 'Perspective',

            // aspect: eonRenderPortview.width() / eonRenderPortview.height(),
            // distance2nodesFactor: 100,

            // far: 300,
            // fov: 100, // field of view
            // lookAt: [0, 0, 0],
            // near: 0.001,

            // position: [0, 0, 200 ],
            // rotation: [0, 0, 0],

            // velang: [0, 0, 0],
            // vellin: [0, 0, 0],
            sort: 'camera',
            type: 'PerspectiveCamera',
            name: 'Perspective',

            aspect: 1.5,
            distance2nodesFactor: 100,

            far: 1600,
            fov: 60,
            lookAt: [0, 0, 0],
            near: 0.001,

            position: [0, 0, 600],
            rotation: [0, 0, 0],

            velang: [0, 0, 0],
            vellin: [0, 0, 0],

          },
        }

        return json
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
      // cameraPersAni, // h.sol
      // cameraPersHelper, // h.sol
      // cameraOrthoAni, // h.sol
      // cameraOrthoHelper, // h.sol
      gridHelper, // h.sol
      lightHemisphereAni, // h.sol
      spotLight, // h.sol

    ]
    return animas
  }

  let enty = () => {}
  enty.z = z
  return enty
}
  exports.eonZ791eD3GeodesicRt4 = anitem
}))