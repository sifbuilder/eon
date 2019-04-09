/* ******************************************
   *    @z401aSimD3vorts
   *
   */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.z401aSimD3vorts = global.z401aSimD3vorts || {})))
}(this, function (exports) {
  'use strict'

  // ... ** **
  // .................. anitem
  async function anitem (__eo) {
    let [
      d3Force3d,
      ctlWen,
      eohalCore,
      eohalLinkform,
      eohalMars,
      muonEoric,
      muonEoforces,
      muonProps,
      muonSim,
      renderSvg,
    ] = await Promise.all([
      __eo('xs').b('d3-force-3d'),
      __eo('xs').c('wen'),
      __eo('xs').e('core'),
      __eo('xs').e('linkform'),
      __eo('xs').e('mars'),
      __eo('xs').m('eoric'),
      __eo('xs').m('eoforces'),
      __eo('xs').m('props'),
      __eo('xs').m('sim'),
      __eo('xs').r('svg'),
    ])
    try { renderSvg.scenecolor('black') } catch (e) {}
    let muonStore = __eo('muonStore')
    let d3_force = d3Force3d

    var data = {
      'nodes': [
        {
          'x': 469 - 400,
          'y': 410 - 200,
        },
        {
          'x': 493 - 400,
          'y': 364 - 200,
        },
        {
          'x': 442 - 400,
          'y': 365 - 200,
        },
        {
          'x': 467 - 400,
          'y': 314 - 200,
        },
        {
          'x': 477 - 400,
          'y': 248 - 200,
        },
        {
          'x': 425 - 400,
          'y': 207 - 200,
        },
        {
          'x': 402 - 400,
          'y': 155 - 200,
        },
        {
          'x': 369 - 400,
          'y': 196 - 200,
        },
        {
          'x': 350 - 400,
          'y': 148 - 200,
        },
        {
          'x': 539 - 400,
          'y': 222 - 200,
        },
        {
          'x': 594 - 400,
          'y': 235 - 200,
        },
        {
          'x': 582 - 400,
          'y': 185 - 200,
        },
        {
          'x': 633 - 400,
          'y': 200 - 200,
        },
      ],
      'links': [
        {
          'source': 0,
          'target': 1,
        },
        {
          'source': 1,
          'target': 2,
        },
        {
          'source': 2,
          'target': 0,
        },
        {
          'source': 1,
          'target': 3,
        },
        {
          'source': 3,
          'target': 2,
        },
        {
          'source': 3,
          'target': 4,
        },
        {
          'source': 4,
          'target': 5,
        },
        {
          'source': 5,
          'target': 6,
        },
        {
          'source': 5,
          'target': 7,
        },
        {
          'source': 6,
          'target': 7,
        },
        {
          'source': 6,
          'target': 8,
        },
        {
          'source': 7,
          'target': 8,
        },
        {
          'source': 9,
          'target': 4,
        },
        {
          'source': 9,
          'target': 11,
        },
        {
          'source': 9,
          'target': 10,
        },
        {
          'source': 10,
          'target': 11,
        },
        {
          'source': 11,
          'target': 12,
        },
        {
          'source': 12,
          'target': 10,
        },
      ],
    }

    // ............................. nuid
    let nuid = i => {
      let eoric = { gid: 'node', cid: 'node', fid: 'node' + i }
      eoric.uid = muonEoric.getuid(eoric)
      return eoric
    }

    // ............................. luid
    let luid = i => {
      let eoric = { gid: 'link', cid: 'link', fid: 'link' + i }
      eoric.uid = muonEoric.getuid(eoric)
      return eoric
    }

    // ............................. eohale
    let eohale = anima => {
      if (!anima.eogelded) {
        let animas = []
        let nodes = []

        for (let i = 0; i < data.nodes.length; i++) {
          let node = {
            x: data.nodes[i].x,
            y: data.nodes[i].y,
            z: 0,
          }
          nodes.push(node)

          let ani = muonProps.cloneObj(anima)
          ani.eohal = eohalMars
          ani.eoric = nuid(i)
          ani.eonode.geometry.coordinates = Object.values(node)
          ani.eocrom = { 'csx': 0, 'cf': 888, 'co': 0.5, 'cs': 666, 'cw': 0.9, 'cp': 0.8 }

          animas.push(ani)
        }
        for (let i = 0; i < data.links.length; i++) {
          let nidfrom = data.links[i].source
          let nidto = data.links[i].target

          let line = {}
          line.userData = {
            source: data.links[i].source,
            target: data.links[i].target,
          }

          let ani = muonProps.cloneObj(anima)
          ani.eohal = eohalLinkform
          ani.eoric = luid(i)
          ani.eocrom = { 'csx': 0, 'cf': 888, 'co': 0.5, 'cs': 666, 'cw': 0.9, 'cp': 0.8 }
          ani.eoload = {}
          ani.eoload.link = {
            source: nuid(nidfrom).uid,
            target: nuid(nidto).uid,
          }

          animas.push(ani)
        }

        // ... org anima is becomes gelded after halo anify
        // ... org anima is becomes delled after halo anify

        let updanima = muonProps.cloneObj(anima)
        updanima.eogelded = 1
        updanima.eodelled = 1
        animas.push(updanima)

        muonStore.apply({
          type: 'UPDANIMA',
          caller: 'h.ineohal',
          animas: animas,
        })

        return animas
      }
    }

    let eohal_anify = anitem => eohale(anitem)
    let eohal_gramify = anitem => anitem

    let ineohal = {
      anify: anitem => eohal_anify(anitem),
      gramify: anitem => eohal_gramify(anitem),
    }

    // .................. animas
    let z = function () {
    // .................. pics
      let ctl
      try {
        ctl = ctlWen().control(renderSvg.svg())
      } catch (e) {
        ctl = () => [0, 0, 0]
      }

      let eotim = {'td': 10000, 't0': 0, 't1': 1, 't2': 1, 't3': 1}

      // .................... natVort
      let natVort = {

        eohal: ineohal,
        eotim: eotim,
        eoric: {gid: 'g', cid: 'g', fid: 'g'},

        eofold: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [0, 0, 0],
          },
          properties: {},
        },

        eonode: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [0, 0, 0],
          },
          properties: {
            orgen: [0, 0, 0], velin: [0, 0, 0], prevous: [0, 0, 0], geodelta: [0, 0, 0],
          },
        },

        eomot: {

          ereform: {
            projection: 'uniwen',
            translate: [0, 0, 0],
            scale: 1,
            rotate: [ 0, 0, 0 ],
            lens: [0, 1, Infinity],
            addNodeToTranslate: 1,
            applyProtonToNode: 0,
          },
          proform: {
            projection: 'uniwen',
            prerotate: [[[ ctl.rotation ]]],
            translate: [0, 0, 0],
            scale: 1,
            rotate: [ 0, 0, 0 ],
            lens: [0, 1, Infinity],
            addNodeToTranslate: 0,
            applyProtonToNode: 0,
          },
        },

        eocrom: { 'csx': 0, 'cf': 888, 'co': 0.5, 'cs': 666, 'cw': 0.9, 'cp': 0.8 },
        eoload: {},
      }

      // .................... field_link
      let force_link = {

        properties: {
          payload: {
            args: [],
            opts: {
              distance: 30,
              strength: () => 0.1,
              id: d => d.eoric.uid, // nodeById fn
              iterations: 1,
            },
          },
          type: 'link',
          src: d3_force,
          filter: d => true, // nodes, by id
          key: 'link',
        },

        field: params => {
          let links = params.nodes.filter(d => (d.eoric.gid === 'link'))

          params.properties.payload.args = Array.of(links)

          return muonEoforces.force(params)
        },

      }
      // .................... fieldAni
      let fieldAni = {

        eohal: eohalCore,
        eotim: eotim,
        eoric: {gid: 'field', cid: 'field', fid: 'field'},

        eofold: null,
        eoload: {},

      }

      fieldAni.eoforces = {
        force_link,
      }

      // .................. scene
      let scene = {

        natVort, // h.mars
        fieldAni, // h.core

      }

      return scene
    }

    let enty = () => {}
    enty.z = z
    return enty
  }
  exports.z401aSimD3vorts = anitem
}))
