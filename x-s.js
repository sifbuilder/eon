/*******************************************
 *    @xs
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.xs = global.xs || {})))
}(this, function (exports) { "use strict"

  let xs = function (__mapper = {}) {

    let f = __mapper({"props": muonProps.muonProps()}).props()

    let item = function (params, pres = ["control", "force", "muon", "render", "shade"], ret=null) {

      let cap = s => (s == null) ? "" : s.charAt(0).toUpperCase() + s.slice(1)  // capitalize string
      let nome = null
      if (typeof(params) === "object") nome = params.nome
      else if (typeof(params) === "string") nome = params

      let itemNames = pres.reduce((p,q) => [...p, q+nome, q+cap(nome) ],[]) // item syn names

      for (let i = 0; i < itemNames.length; i++) {
        let itemName = itemNames[i]

        if (__mapper(itemName) !== undefined) {   // item in mapper

          ret = __mapper(itemName)
          break

        } else if (enty[nome] !== undefined ) {

          ret = enty[nome]()
          break

        } else {
          let item
          try {
            item = eval(itemName)               //  eval
          } catch(e) {
            //
          }

          if (typeof item === "object") {
            ret = __mapper({                // register in mapper
              [itemName]: item[itemName](__mapper)
            })[itemName]                      // item

            break

          } else if (typeof item === "function") {
            ret = item

            break

          }   else {
            //

          }
        }
      }
      return ret

    }
    /*******************************************
 *    @enty
 */
    let enty = function enty() {}

    enty.item = enty.i = item

    enty.boson = enty.b = function (params, pres = ["boson"], ret=null) {
      return enty.item(params, pres = ["boson"], ret=null)
    }
    enty.control = enty.c = function (params, pres = ["control"], ret=null) {
      return enty.item(params, pres = ["control"], ret=null)
    }
    enty.data = enty.d = function (params, pres = ["data"], ret=null) {
      return enty.item(params, pres = ["data"], ret=null)
    }
    enty.force = enty.f = function (params, pres = ["force", "field"], ret=null) {
      return enty.item(params, pres = ["force", "force", "field"], ret=null)
    }
    enty.geo = enty.g = function (params, pres = ["geojson", "proj"], ret=null) {
      return enty.item(params, pres = ["geojson", "geo", "proj", "d3.geo"], ret=null)
    }
    enty.muon = enty.m = function (params, pres = ["muon", "mod", "plugin"], ret=null) {
      return enty.item(params, pres = ["muon", "mod", "plugin"], ret=null)
    }
    enty.render = enty.r = function (params, pres = ["render"], ret=null) {
      return enty.item(params, pres = ["render"], ret=null)
    }
    enty.halo = enty.h = function (params, pres = ["halo"], ret=null) {
      return enty.item(params, pres = ["halo"], ret=null)
    }

    return enty

  }

  exports.xs = xs

}));
