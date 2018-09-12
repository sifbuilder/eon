/*************************
*     @muonKruskal
*
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonKruskal = global.muonKruskal || {})))
}(this, function (exports) {
  'use strict'

  async function muonKruskal (__mapper = {}) {
    let [
      d3Array,
    ] = await Promise.all([
      __mapper('xs').b('d3-array'),
    ])

    let kruskal = function (graph, dist) {
      // 1   A := ø
      const A = []
      // 2   pour chaque sommet v de G :
      // 3      créerEnsemble(v)
      let n = -Infinity
      graph.forEach(l => {
        if (l.source.index > n) n = l.source.index
        if (l.target.index > n) n = l.target.index
      })
      const uf = new UnionFind(n)
      // 4   trier les arêtes de G par poids croissant
      graph = graph.map(l => {
        l.w = l.length || dist(l.source, l.target)
        return l
      })
      graph.sort((a, b) => d3Array.ascending(a.w, b.w))
      // 5   pour chaque arête (u, v) de G prise par poids croissant :
        .forEach(l => {
          // 6      si find(u) ≠ find(v) :
          if (uf.find(l.source.index) !== uf.find(l.target.index)) {
            // 7         ajouter l'arête (u, v) à l'ensemble A
            A.push(l)
            // 8         union(u, v)
            uf.link(l.source.index, l.target.index)
          }
        })
      // 9   retourner A
      return A
      //  yield uf;
    }

    // ....................... UnionFind

    let UnionFind = (function () {
      // kruskal.js#

      // https://github.com/mikolalysenko/union-find
      'use strict'; 'use restrict'

      function UnionFind (count) {
        this.roots = new Array(count)
        this.ranks = new Array(count)

        for (let i = 0; i < count; ++i) {
          this.roots[i] = i
          this.ranks[i] = 0
        }
      }

      let proto = UnionFind.prototype

      Object.defineProperty(proto, 'length', {
        'get': function () {
          return this.roots.length
        },
      })

      proto.makeSet = function () {
        let n = this.roots.length
        this.roots.push(n)
        this.ranks.push(0)
        return n
      }

      proto.find = function (x) {
        let x0 = x
        let roots = this.roots
        while (roots[x] !== x) {
          x = roots[x]
        }
        while (roots[x0] !== x) {
          let y = roots[x0]
          roots[x0] = x
          x0 = y
        }
        return x
      }

      proto.link = function (x, y) {
        let xr = this.find(x),
          yr = this.find(y)
        if (xr === yr) {
          return
        }
        let ranks = this.ranks,
          roots = this.roots,
          xd = ranks[xr],
          yd = ranks[yr]
        if (xd < yd) {
          roots[xr] = yr
        } else if (yd < xd) {
          roots[yr] = xr
        } else {
          roots[yr] = xr
          ++ranks[xr]
        }
      }

      return UnionFind
    })()

    // ....................... enty

    let enty = function (graph, dist) {
      return kruskal(graph, dist)
    }

    return enty
  }

  exports.muonKruskal = muonKruskal
}))
