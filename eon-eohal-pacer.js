/**********************
 *    @eonEohalPacer
 */
;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
      ? define(['exports'], factory)
      : factory((global.eonEohalPacer = global.eonEohalPacer || {}))
})(this, function (exports) {
  'use strict'

  async function eonitem (__eo = {}) {
    let [
      eonCtlRayder,
      eonMuonAnitem,
      eonMuonEoric,
      eonMuonEotim,
      eonMuonGeom,
      eonMuonGeoj,
      eonMuonProps,
    ] = await Promise.all([
      __eo('xs').b('eon-ctl-rayder'),
      __eo('xs').b('eon-muon-anitem'),
      __eo('xs').b('eon-muon-eoric'),
      __eo('xs').b('eon-muon-eotim'),
      __eo('xs').b('eon-muon-geom'),
      __eo('xs').b('eon-muon-geoj'),
      __eo('xs').b('eon-muon-props'),
    ])

    let eonMuonStore = __eo('eonMuonStore')
    // eonCtlRayder.control()
    let state = {}
    let epsilon = 1e-3

    // ... pace models:
    // ...   1 anima paces animas
    // ...   2 anima has avatar that paces anigrams
    // ...   3 anima paces anigrams
    // ...   4 halo creates anima with pacer
    // ...   5 halo creates anigram with pacer
    // ...   6 animas has avatar that has avatar that is pacer

    // ............................. getitems
    let getitems = function (data, context) {
      let anitem = data.anitem
      let pacedAnisort = data.pacedAnisort
      console.assert(pacedAnisort === 'anima' || pacedAnisort === 'anigram')

      let uidParent = anitem.eoric.pid

      let hostAnitem, pacedAnitem
      if (pacedAnisort === 'anima') {
        // is anima
        let parentAnima = uidParent ? eonMuonStore.findAnima(uidParent) : undefined
        if (parentAnima === undefined) {
          // anima has no parent
          hostAnitem = anitem // hostAnima is anitem (self)
          pacedAnitem = anitem
        }
      }

      if (pacedAnisort === 'anigram') {
        // is anigram - avatar
        let parentAnitem = uidParent
          ? eonMuonStore.findAnima(uidParent)
          : undefined
        if (parentAnitem === undefined) {
          // anigram has no parent

          hostAnitem = anitem // hostAnima is anitem (self)
          pacedAnitem = anitem
        }
        if (parentAnitem !== undefined) {
          // anima has parent

          hostAnitem = anitem // parentAnitem // hostAnigram is parent anitem
          pacedAnitem = anitem
        }
      }

      return { hostAnitem, pacedAnitem }
    }
    // ............................. getCounter
    function getCounter (data = {}, context = {}) {
      let eotim = data.eotim
      let geospan = data.geospan
      let hostAnitem = data.hostAnitem
      let pacedUid = data.pacedAnitem.eoric.uid
      let newgrabbed = data.newgrabbed
      let pacedby = data.pacedby

      let count = {}

      let dist = !data.grabbed
        ? Infinity
        : eonMuonGeom.distance3d(data.grabbed, newgrabbed)

      if (newgrabbed !== false) {
        if (dist > geospan) {
          //
          data.grabbed = newgrabbed
          count.event = Math.floor(pacedby.eventN) // EVEMT
          count.grabbed = data.grabbed
        }
      }

      if (
        hostAnitem.eoinited === undefined ||
        hostAnitem.eoinited[pacedUid] === undefined
      ) {
        if (eotim.unPassed >= (pacedby.initT || 0)) {
          count.init = Math.floor(pacedby.initN) // INIT
        }
      }

      // eoouted is in the host
      let eoouted =
        hostAnitem.eoouted && hostAnitem.eoouted[pacedUid]
          ? hostAnitem.eoouted[pacedUid]
          : 0
      let cycletime = eotim.unPassed - eoouted

      let autoT = pacedby.autoT || 0
      let autoP = pacedby.autoP || 0
      let autoN = pacedby.autoN

      if (eotim.unPassed >= autoT) {
        if (cycletime > autoP) {
          count.auto = Math.floor(autoN) //    AUTO
        }
      }

      return { count }
    }

    // ............................. getNewItems
    let getNewItems = function (data = {}, context = {}) {
      let counter = data.i
      let count = data.count
      let key = data.key
      let pacedAnitem = data.pacedAnitem
      let pacedAnisort = data.pacedAnisort
      let pacedfields = data.pacedfields

      let counterProps = { count, key, counter }

      let newItem = eonMuonProps.clone(pacedAnitem)

      let unElapsed = newItem.eotim.unElapsed
      newItem.eotim.t0 = unElapsed
      newItem.eotim.unStart = unElapsed

      newItem.eotim = eonMuonEotim.timing(newItem.eotim, newItem.eotim.msElapsed)

      delete newItem.eoload.pacer
      delete newItem.avatars

      // properties in pacedItem
      let propertyNames = Object.getOwnPropertyNames(pacedfields)
      for (let propName of propertyNames) {
        let newpropval = eonMuonProps.v(
          pacedfields[propName],
          pacedAnitem,
          counterProps
        )
        newItem[propName] = newpropval
      }

      let eohal =
        typeof newItem.eohal === 'object'
          ? newItem.eohal
          : __eo([newItem.eohal, 'eohal'])

      let newItems
      if (pacedAnisort === 'anima') {
        newItems = eohal.anify(newItem)
      } else if (pacedAnisort === 'anigram') {
        newItems = eohal.gramify(newItem)
      }

      return { newItems: eonMuonProps.a(newItems) }
    }

    // ............................. eopace
    // ... @anitem : anitem

    function eopace (anitem) {
      console.log('h.pacer eopace:', anitem)

      let eotim = anitem.eotim,
        eoload = anitem.eoload

      let pacer = eoload.pacer || {}
      let pacedby = eoload.pacer.pacedby || {},
        geospan = pacedby.geospan || epsilon, // span between two paceitems
        // pacedAnisort = pacedby.pacedAnisort || 'anigram', // generated paceitem {anigram, anima}
        geotype = pacedby.geotype || 'LineString', //  type of geojson geometry
        addItemToPacer = pacedby.addItemToPacer || 0, // add paceitems to preanitem
        basePaceOnAniView = pacedby.basePaceOnAniView || 'eoform' // geoform projections

      // define the paced item in the pacer
      let pacedfields
      let pacedAnisort
      if (eoload.pacer.anima !== undefined) {
        pacedAnisort = 'anima'
        pacedfields = pacer.anima
      } else {
        pacedAnisort = 'anigram'
        pacedfields = pacer.anigram
      }

      console.assert(pacedAnisort === 'anima' || pacedAnisort === 'anigram')

      // -------------------  // HOST/PACED getitems

      let items = getitems({ anitem, pacedAnisort })
      let { hostAnitem, pacedAnitem } = items

      // -------------------  // pacedUid : key of paced props in hostAnitem

      let pacedUid = pacedAnitem.eoric.uid

      // -------------------  // COUNT getCounter

      let newgrabbed = null // eonCtlRayder.getGrabbed()
      let data = {
        newgrabbed,
        pacedby,
        eotim,
        geospan,
        hostAnitem,
        pacedAnitem,
      }
      let count = getCounter(data).count

      // -------------------  // UPD STORE HOST
      if (hostAnitem.eoinited === undefined) {
        hostAnitem.eoinited = { [pacedUid]: eotim.unPassed }
      } else {
        hostAnitem.eoinited = Object.assign(hostAnitem.eoinited, {
          [pacedUid]: eotim.unPassed,
        })
      }

      // hostAnitem must be anima to save eoouted _e_
      if (count.auto > 0) {
        if (hostAnitem.eoouted === undefined) {
          hostAnitem.eoouted = { [pacedUid]: eotim.unPassed }
        } else {
          hostAnitem.eoouted = Object.assign(hostAnitem.eoouted, {
            [pacedUid]: eotim.unPassed,
          })
        }
      }

      eonMuonStore.apply({
        // if (pacedAnisort === 'anima') { // z.419b ani.ava(pacer)
        type: 'UPDANIMA',
        caller: 'h.pacer',
        animas: Array.of(hostAnitem),
      })

      // -------------------------- NEW items getNewItems

      let newItems = []
      if (Object.keys(count).length > 0) {
        for (let counter = 0; counter < Object.keys(count).length; counter++) {
          let key = Object.keys(count)[counter]
          let qitems = count[key]

          for (let i = 0; i < qitems; i++) {
            let data = { count, key, i, pacedAnitem, pacedAnisort, pacedfields }
            let newItemsInCount = getNewItems(data).newItems

            // -------------------------- eostore paced
            if (pacedAnisort === 'anima') {
              eonMuonStore.apply({
                type: 'UPDANIMA',
                caller: 'h.pacer',
                animas: newItemsInCount,
              })
            }
            newItems = [...newItems, ...newItemsInCount]
          }
        }
      }
      return newItems
    }

    // ............................. anify
    function anify (anitem) {
      console.assert(
        anitem.eoload.pacer !== undefined,
        `anitem.eoload.pacer is undefined`
      )
      let newitems = []
      // if (anitem.eoload.pacer.pacedby.pacedAnisort === 'anima') {
      if (anitem.eoload.pacer.anima !== undefined) {
        newitems = eopace(anitem)
      } else {
        newitems = Array.of(anitem)
      }

      return newitems
    }

    // ............................. gramify
    function gramify (anitem) {
      console.assert(
        anitem.eoload.pacer !== undefined,
        `anitem.eoload.pacer is undefined`
      )
      let newitems = []
      // if (anitem.eoload.pacer.pacedby.pacedAnisort === 'anigram') {
      if (anitem.eoload.pacer.anigram !== undefined) {
        newitems = eopace(anitem)
      } else {
        newitems = Array.of(anitem)
      }
      return newitems
    }

    let eohal = {
      anify: anitem => anify(anitem),
      gramify: anitem => gramify(anitem),
    }

    // ....................... enty
    let enty = eohal
    enty.eopace = eopace
    enty.grabbed = _ => (_ !== undefined ? (state.grabbed = _) : state.grabbed)
    enty.getCounter = getCounter
    enty.getNewItems = getNewItems

    return enty
  }

  exports.eonEohalPacer = eonitem
})
