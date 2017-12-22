/***********
 *    @renderSVG
 */
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) :
    typeof define === "function" && define.amd ? define(["exports"], factory) :
      (factory((global.renderSVG = global.renderSVG || {})))
}(this, function (exports) { "use strict"

  let renderSVG = function renderSVG(__mapper = {}) {

    let f = __mapper("props")()
    let state = {}

    let updture = function (d) {        // update boform to now
      let dr = Object.assign({},d)
      d.boform = d.boform || {}
      dr.csx = (d.boform.now) ? now.boform.csx : d.boform.csx
      dr.cf = (d.boform.now) ? now.boform.cf : d.boform.cf
      dr.cs = (d.boform.now) ? now.boform.cs : d.boform.cs
      dr.cw = (d.boform.now) ? now.boform.cw : d.boform.cw
      dr.co = (d.boform.now) ? now.boform.co : d.boform.co
      dr.cp = (d.boform.now) ? now.boform.cp : d.boform.cp
      return dr
    }

    state.width = __mapper("xs").r("renderer").width()
    state.height = __mapper("xs").r("renderer").height()

    // https://bl.ocks.org/mbostock/3019563   // Margin Convention
    let margin = {top: 20, right: 10, bottom: 20, left: 10}
    let width = state.width - margin.left - margin.right,
      height = state.height - margin.top - margin.bottom


    let svglayer =
    d3.select(".viewframe")
      .append("svg")
      .attr("id", "svglayer")
      .attr("class", "svglayer")
      .style("position", "absolute")
      .attr("width", state.width)
      .attr("height", state.height)
      .style("top", 0)
      .style("left", 0)

    let svgElem = svglayer.append("rect")
      .attr("id", "svg")
      .attr("class", "svg")
      .attr("width", state.width)
      .attr("height", state.height)
      .style("fill", "transparent")
      .attr("pointer-events", "none")
      .attr("overflow", "visible")


 /* **************************
 * @svg
 *
 */
    let svg = function svg () {

      if (document.getElementById("viewframe") !== null) {
        return d3.select("#viewframe")
      } else {
        return d3.select("#svg")
      }
    }
 /* **************************
 * @elems
 *
 */
    let elems = function elems(payload, data = ["data"], idfn = null) {

      if ( d3.select(".muon-style-block").empty() ) {
        d3.select("head").append("style").attr("class", "muon-style-block")
          .html("")
      }

      if (payload == null ) {             // if null return the layer
        let svgLayer = d3.select("body").selectAll("svg").data(["svg"])
          .enter().append("svg")
          .attr("class", "svg")
          .attr("id", "svg")
          .attr("width", function() {return (typeof width !== "undefined") ? width : 600})
          .attr("height", function() {return (typeof height !== "undefined") ? height : 400})
          .style("border", "1px solid lightgray")
        return svgLayer

      }
      else if (payload == "image") {          // if image insert image
        if ( d3.select(".image").empty() ) {
          let img = svg.selectAll("image").data([0])
            .enter()
            .insert("svg:image")
            .attr("xlink:href", "./image.jpg")
            .attr("x", "0")
            .attr("y", "0")
            .attr("width", function() {return (typeof width !== "undefined") ? width : 600})
            .attr("height", function() {return (typeof height !== "undefined") ? height : 400})
          return img
        }
      }
      // manage the dom elements
      else if (typeof(payload) == "string") {   // 'svg:g.links/path.link', data, idfn}
        let parts = payload.split("/")
        let layerpart = (parts[0]) ? parts[0] : "svg"
        let elemspart = (parts[1]) ? parts[1] : null

        let layerparts = layerpart.split(":")
        let parentcls = (layerparts[0]) ? layerparts[0] : "svg"
        let group = (layerparts[1]) ? layerparts[1] : "group"

        let groupparts = group.split(".")
        let groupref = (groupparts[0]) ? groupparts[0] : "g"
        let layercls = (groupparts[1]) ? groupparts[1] : "layer"

        let elemsparts = (elemspart) ? elemspart.split(".") : null
        let elemtype = (elemsparts && elemsparts[0]) ? elemsparts[0] : "circle"
        let elemcls = (elemsparts && elemsparts[1]) ? elemsparts[1] : "elems"

        let layerMark = d3.select(parentcls).selectAll("." + layercls).data([layercls])
        let layer =  layerMark.enter().append("g")
          .merge(layerMark)
          .attr("class", layercls)

        if (elemspart === null) {
          return layer
        } else {
          if (!Array.isArray(data)) console.log("data is not an array")
          let elemsupd = layer.selectAll("." + elemcls)
            .data(data)
          let elems = elemsupd
            .enter().append(elemtype)
            .merge(elemsupd)
            .attr("class", elemcls)
          let elemsExit = elemsupd.exit().remove()

          return elems
        }
      }
    }
 /* **************************
 * @render
 *
 */
    let render = function render (elapsed, anigrams, maxlimit) {

      let features = __mapper("xs").m("geoj").geojize(anigrams)   //


      let svg = __mapper("renderSVG").svg()

      let traceline = []
      let gitems = d3.nest()        // let framesByGid = f.groupBy(frames, "gid")
        .key(function(d) { return d.properties.ric.gid })
        .key(function(d) { return d.properties.ric.cid })
        .entries(features)                      // features


      for (let i in gitems) {           // DOTS (seg5===0) each group gid
        let gid = gitems[i].key, citems = gitems[i].values

        for (let j in citems) {           // each class cid
          let cid = citems[j].key         // cid
          let fitems = citems[j].values   // fitems
          let now = fitems.slice(-1)[0]

          let hmod = ((now||{}).hmod !== undefined) ? now.hmod : 1
          let hquan = ((now||{}).hquan !== undefined) ? now.hquan : Infinity


          /*  ................. TEXTS ................. */
          let texts = fitems
            .filter(d => d.properties.sort === "text")

          if (texts.length > 0) {

            __mapper("renderSVG").elems("svg:g."+gid+"/text."+cid, texts, d=>d.id)
              .text(d => d.properties.text)

              .attr("x", d => d.geometry.coordinates[0])  // geo coord x
              .attr("y", d => d.geometry.coordinates[1])  // geo coord y

              .style("font-size", d => d.properties.style["font-size"])
              .style("font-family", d => d.properties.style["font-family"])

              .style("fill", d => d.properties.style.fill)
              .style("stroke", d => d.properties.style.stroke)

              .style("fill-opacity", d => d.properties.style["fill-opacity"])
              .style("stroke-opacity", d => d.properties.style["stroke-opacity"])
              .style("stroke-width", d => d.properties.style["stroke-width"])
              .style("text-anchor", d => d.properties.style["text-anchor"])

          }

          /*  ................. IMG ................. */
          let imgs = fitems
            .filter(d => d.properties.sort === "img")

          if (imgs.length > 0)  {

            __mapper("renderSVG").elems("svg:g."+gid+"g."+cid, imgs, d=>d.id)

              .data(() => imgs)
              .append("svg:image")
              .attr("d", d => d.properties.attr.img)

              .attr("x", d => d.geometry.coordinates[0])  // geo coord x
              .attr("y", d => d.geometry.coordinates[1])  // geo coord y

              .attr("xlink:href", d => d.properties.attr["xlink:href"])
              .attr("width", d => d.properties.attr.width)
              .attr("height", d => d.properties.attr.height)
          }

          /*  ................. GEOJSON FEATURE ................. */
          let features = fitems
            .filter(d => d.properties.sort === "feature")               // __ geojson __
            .filter((d,i) => (d.properties.delled !== 1))             // not delled
          if (features.length > 0)  {

            __mapper("renderSVG").elems("svg:g."+gid+"/path."+cid, features, d=>d.id)

              .attr("d", d =>  {

                let object = d // .feature        // geojson feature
                let properties = object.properties || {}  // geojson feature
                let pointRadius = properties.pointRadius

                let path = (pointRadius !== undefined)  // geoPath
                  ? d3.geoPath().pointRadius(pointRadius)
                  : d3.geoPath()
                return path(object)                                   // path

              })

              .style("fill", d => d.properties.style.fill)
              .style("stroke", d => d.properties.style.stroke)
              .style("fill-opacity", d => d.properties.style["fill-opacity"])
              .style("stroke-opacity", d => d.properties.style["stroke-opacity"])
              .style("stroke-width", d => d.properties.style["stroke-width"])


          }
          /*  ................. END SVG FORMS ................. */
        }
      }
    }

 /* **************************
 *      @enty
 *
 */
    let enty = function enty() {}

    enty.svg = svg
    enty.elems = elems
    enty.render = render

    return enty

  }

  exports.renderSVG = renderSVG

}))
