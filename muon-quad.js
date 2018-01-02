/***********
 *    @muonQuad
 */
// http://bl.ocks.org/mbostock/cd52a201d7694eb9d890 Voronoi Topology
// http://bl.ocks.org/mbostock/8027835 Closest Point on Path II
// http://bl.ocks.org/mbostock/d1d81455dc21e10f742f Voronoi Circles
// http://bl.ocks.org/mbostock/6a53ca8427a0bc2d4cf1 Circle in Sector
// http://bl.ocks.org/mbostock/6224050 Mitchell�s Best-Candidate
// http://bl.ocks.org/mbostock/4218871 Circle-Polygon Intersection

(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.muonQuad = global.muonQuad || {})))
}(this, function (exports) { "use strict"


  let muonQuad = function (__mapper) {

    let props = __mapper("props")()
    let r = __mapper("xs").r("renderer"),
      width = r.width(),
      height = r.height()


    let x0 = 0, y0 = 0, x1 = width, y1 = height
    let extent = [[x0-1,y0-1],[x1+1,y1+1]]
    let d0 = d => d[0]
    let d1 = d => d[1]
    let quad = d3.quadtree()
      .x(d0)
      .y(d1)
      .extent(extent)

    /****
       *    @findmanyothers = function(x, y, r=Infinity, thesemany = 1, polygon = null) {
       *      http://stackoverflow.com/questions/217578/how-can-i-determine-whether-a-2d-point-is-within-a-polygon
       */
    let findmanyothers = function (x, y, r=Infinity, thesemany = 1, polygon = null) {
      let ret = []
      let quadCopy = quad.copy()
      let limit = Math.min(thesemany, quadCopy.data().length)
      let found = 0
      while (found < limit) {
        let p = quadCopy.find(x, y, r)
        if (p == null) {
          break
        } else {
          let px = p.x
          let py = p.y
          let dist = (px - x) * (px - x) + (py - y) * (py- y)
          if (dist > 1.e-6) {
            let isin = true
            if (polygon) isin = d3.polygonContains(polygon, [px, py])
            if (isin) {
              ret.push(p)
              ++found
            }
          }
          quadCopy.remove(p)
        }
      }
      return ret
    }

    /****
       *    @findmany = function(x, y, r=Infinity, thesemany = 1)
       */
    let findmany = function (x, y, r=Infinity, thesemany = 1) {
      let ret = []
      let quadCopy = quad.copy()
      let limit = Math.min(thesemany, quadCopy.data().length)
      for (let i = 0; i < limit; i++) {
        let p = quadCopy.find(x, y, r)
        quadCopy.remove(p)
        ret.push(p)
      }
      return ret
    }

    /****
       *    best free non-overlaping spot in polygon with population
       *    @candysearch = function(ra2=10, polygon = null, candidates = 10, sample = 10)
       *    ra2: non overlap area
       */
    let candysearch = function (ra2=10, ring = null, candidates = 10, sample = 10) {

      console.log("candisearch")

      let mols = []
      let extent = quad.extent()
      let frame = (ring) ? __mapper("xs").m("geom").polygonExtent(ring) : extent 

      let x0 = frame[0][0], y0 = frame[0][1], x1 = frame[1][0], y1 = frame[1][1]
      let tx = x1 - x0
      let ty = y1 - y0
      
      let rdn = () => Math.random()


      
      for (let i=0; i < sample; i++) {
        let c = [x0 + rdn() * tx, y0 + rdn() * ty]

        let z2 = 0          // current best Distance
        let k = null        // current better kandidate

        let dx, dy = 0
        let p = null

          let isin = (ring !== null) ? d3.polygonContains(ring, c) : true
          if (isin) {
            for (let j = 0; j < candidates; ++j) {
              p = c
              k = quad.find(p[0], p[1], ra2)    // find within ra2
              if (k) {        // there is someting within ra2
                dx = p[0] - k[0]
                dy = p[1] - k[1]
                let d2 = dx * dx + dy * dy          // distance from candidate to closest
                if (d2 > z2) {
                  p = [k[0], k[1]], z2 = d2 // k offers z2
                }
              } else {
                quad.add(p)       // add selected point
                mols.push(p)      // return selected point
                break
              }
            }
          }
      }
      return mols
    }


    /****
       *    @seeds
       */
    let seeds = function (polygon, sample = 10, tries = 10, dst=Infinity) {

      let extent = __mapper("xs").m("geom").polygonExtent(polygon)
      let centroid = __mapper("xs").m("geom").extentCentroid(extent)
      let edges = __mapper("xs").m("geom").extentEdges(extent)

      let nodes = []
      for (let i=0; i<tries; i++) {

        if (nodes.length >= sample) {
          break
        } else {

          let other = d3.range(sample).map(d =>
            [extent[0][0] + Math.random() * edges[0], extent[0][1] + Math.random() * edges[1]])
            .filter(p =>  __mapper("xs").m("geom").pointInPolygon(p[0],p[1], polygon))


          nodes = nodes.concat(other).slice(0, sample)

        }

      }

      return nodes

    }

  /***************************
   *        @enty
   */
    let enty = function () {}

    enty.findmanyothers = findmanyothers
    enty.findmany = findmany
    enty.candysearch = candysearch
    enty.seeds = seeds

    enty.extent = _ =>  (arguments.length) ? (extent = _ ,enty) : extent


    return enty
  }

  exports.muonQuad = muonQuad

}))
