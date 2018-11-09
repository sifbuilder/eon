/***************************
 *     @renderWebgl
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.renderWebgl = global.renderWebgl || {})))
}(this, function (exports) {
  'use strict'

  async function renderWebgl (__mapper = {}) {
    let [
      d3,
      THREE,
      ctlRaycaster,
      renderPortview,
    ] = await Promise.all([
      __mapper('xs').b('d3'),
      __mapper('xs').b('three'),
      __mapper('xs').c('raycaster'),
      __mapper('xs').r('portview'),
    ])


    // https://unpkg.com/three@0.97.0/examples/js/controls/TrackballControls.js
    let [
      TrackballControls,
    ] = await Promise.all([
      __mapper('xs').c('trackballcontrols'),
    ])

    const to3point = v => (Array.isArray(v)) ? {x:v[0],y:v[1],z:v[2]} : v
    const radians = Math.PI / 180

    let state = {}

    state.renderer = new THREE.WebGLRenderer({antialias: true}) /* renderer */
    state.domElem = state.renderer.domElement // canvas
    state.domElem.innerHTML = '' // Wipe DOM
    state.domElem.style.display = 'block'
    state.context = state.domElem.getContext('webgl')
    state.width = renderPortview.width(),
    state.height = renderPortview.height()

    d3.select('body') /* canvas */
      .append(() => d3.select(state.domElem)
        .attr('id', 'canvas')
        .attr('class', 'overlay')
        .style('position', 'absolute; top:0px; left:0px; z-index:1')
        .node()
      )

    state.navInfo = document.createElement('div') /* navInfo */ // Add nav info section
    state.navInfo.classList.add('graph-nav-info')
    state.navInfo.innerHTML = 'if key ALT/right to switch animation'
    document.body.appendChild(state.navInfo) // state.domElem.appendChild(navInfo);

    state.toolTipElem = document.createElement('div') /* tooltip */ // Setup tooltip
    state.toolTipElem.classList.add('graph-tooltip')
    document.body.appendChild(state.toolTipElem) // state.domElem.appendChild(state.toolTipElem);

    state.mouse = new THREE.Vector2() /* raycaster */
    state.mouse.x = -2 // Initialize off canvas
    state.mouse.y = -2
    // state.mouse = ctlRaycaster.mouse()
    // state.toolTipElem.style.top = (state.mouse.y - 40) + 'px' // Move tooltip
    // state.toolTipElem.style.left = (state.mouse.x - 20) + 'px'

    let cameraPropsSet = (camera, cameraProps) => { /* cameraPropsSet */
      if (cameraProps !== undefined) {
        if (cameraProps.rotate !== undefined) {
          if (cameraProps.rotate[0] !== undefined) camera.rotation.x = cameraProps.rotate[0] * radians
          if (cameraProps.rotate[1] !== undefined) camera.rotation.y = cameraProps.rotate[1] * radians
          if (cameraProps.rotate[2] !== undefined) camera.rotation.z = cameraProps.rotate[2] * radians
        }
        if (cameraProps.position !== undefined) {
          if (cameraProps.position[0] !== undefined) camera.position.x = cameraProps.position[0]
          if (cameraProps.position[1] !== undefined) camera.position.y = cameraProps.position[1]
          if (cameraProps.position[2] !== undefined) camera.position.z = cameraProps.position[2]
        }
      }
      return camera
    }

    /* CAMERA */
    // state.camera = new THREE.PerspectiveCamera(45, state.width / state.height, 0.1, 9000)
    // state.camera.position.x = 0
    // state.camera.position.y = 0
    // state.camera.position.z = 500

    state.camera = new THREE.OrthographicCamera(
      -state.width / 2, // window.innerWidth / - 16,
      state.width / 2, // window.innerWidth / 16,
      state.height / 2, // window.innerHeight / 16,
      -state.height / 2, // window.innerHeight / - 16,
      0.1,
      9000)

    state.camera.position.x = 0
    state.camera.position.y = 0
    state.camera.position.z = 900

    state.camera.rotation.x = 0
    state.camera.rotation.y = 0
    state.camera.rotation.z = 0
    state.camera.distance2nodesFactor = 300
    state.camera.lookAt(new THREE.Vector3(0, 0, 0))

    function resizeCanvas () {
      if (state.width && state.height) {
        state.renderer.setSize(state.width, state.height)
        state.camera.aspect = state.width / state.height
        state.camera.updateProjectionMatrix()
      }
    }
    resizeCanvas()

    /* SCENE */
    state.scene = new THREE.Scene() // Setup scene

    /* LIGHTS */
    // let light = new THREE.AmbientLight(0x333333)
    // let light = new THREE.DirectionalLight(0xe4eef9, 0.7)
    // light.position.set(12, 12, 8)
    // state.scene.add(light)


    state.raycaster = new THREE.Raycaster() // Capture mouse coords on move

    /* controls */
    // __mapper('controlRaycaster').control(state.domElem) // state.domNode

    state.controls = new TrackballControls(state.camera, state.domElem) // Add camera interaction
    state.controls.rotateSpeed = 1.0
    state.controls.zoomSpeed = 1.2
    state.controls.panSpeed = 0.8
    state.controls.noZoom = false
    state.controls.noPan = false
    state.controls.staticMoving = true
    state.controls.dynamicDampingFactor = 0.3
    state.controls.keys = [ 65, 83, 68 ]

    let denser = point => {
      console.assert(Array.isArray(point), `point ${point} is not cartesian`)
      return new THREE.Vector3(...point)
    }

    // .................. multiPointToScene
    function multiPointToScene (items=[]) {
      if (items.length === 0) return

      for (let k in items) { // DOTS (seg5===0) each group gid
        let item = items[k] // feature

        let feature = item // .feature
        let style = item.properties.style

        let geometry = feature.geometry // rings in MultiPolygon, MultiLineString

        let vertices = geometry.coordinates
        for (let i=0; i<vertices.length; i++) {

          let vertex = vertices[i]

          state.material_color = style.fill
          state.geometry = new THREE.SphereGeometry(5, 32, 32)
          state.wireframe = new THREE.WireframeGeometry(state.geometry)
          state.material = new THREE.MeshBasicMaterial({
            color: state.material_color,
            transparent: true,
            opacity: 0.75,
          })

          let sphere = new THREE.Mesh(
            state.wireframe,
            state.material
          )

          sphere.position.x = vertex[0]
          sphere.position.y = vertex[1] || 0
          sphere.position.z = vertex[2] || 0

          state.scene.add(sphere)
        }

      }
    }
    
    // .................. eoMultipolygonsToScene
          function eoMultipolygonsToScene (items=[]) {
            if (items.length === 0) return

            for (let k in items) { // DOTS (seg5===0) each group gid
              let item = items[k] // feature
              let feature = item // .feature
              let style = item.properties.style


              if (feature.geometry !== undefined && feature.geometry !== null) {			// geometry may be null

                let vertices = feature.geometry.coordinates
                let faces = feature.properties.faces.map(face=> new THREE.Face3(...face))

                let	threeGeometry = new THREE.Geometry()
                threeGeometry.vertices = vertices.map(to3point)
                threeGeometry.faces = faces
                threeGeometry.computeFaceNormals()

                let object =  new THREE.Mesh(
                    threeGeometry, // geometry,
                    // new THREE.LineBasicMaterial({
                    new THREE.MeshPhongMaterial({
                      // color: 0x0033ff, 
                      color: style.fill,                      
                      // specular: 0x555555, 
                      shininess: 30

                      // opacity: style['fill-opacity'],

                    })
                )
                // object.children.forEach(function(e) {
                  // e.geometry.vertices=vertices
                  // e.geometry.verticesNeedUpdate=true
                  // e.geometry.computeFaceNormals()
                // })

                for (let i=0; i<vertices.length; i++) {
                    var particle_geom = new THREE.Geometry()
                    let vertex = threeGeometry.vertices[i]
                    particle_geom.vertices.push(new THREE.Vector3(vertex.x, vertex.y, vertex.z))
                    var particle_material = new THREE.PointsMaterial({size: 1})
                    var particle = new THREE.Points(particle_geom, particle_material)

                    object.add(particle)
                }
                
                
                let light1 = new THREE.AmbientLight(0x333333, 0.9)
                light1.position.set(200, 200, 200)
                state.scene.add(light1)
                    
                var light = new THREE.DirectionalLight( 0xe4eef9, 0.7 )
                light.position.set( 200, 200, 200 ).normalize()
                state.scene.add(light)
                
                state.scene.add(object)
              }
            }
          }

    // .................. multiLineStringToScene
          function multiLineStringToScene (items=[]) {
            if (items.length === 0) return
            for (let k in items) { // DOTS (seg5===0) each group gid
              let item = items[k] // feature
              let feature = item // .feature
              let style = feature.properties.style
              let geometry = feature.geometry
              let coordinates = geometry.coordinates

              let threeMaterial = new THREE.LineBasicMaterial({
                color: style.stroke,
                opacity: style['stroke-opacity'],
              })

              let threeGeometry = new THREE.Geometry()

              coordinates.forEach(function (line) {
                d3.pairs(line.map(denser), function (a, b) {
                  threeGeometry.vertices.push(a, b)
                })
                let object = new THREE.LineSegments(threeGeometry, threeMaterial)
                if (object) state.scene.add(object)
              })
            }
          }

    // .................. lineStringToScene          
          function lineStringToScene (items=[]) {
            if (items.length === 0) return
            for (let k in items) { // DOTS (seg5===0) each group gid
              let item = items[k] // feature
              let feature = item // .feature
              let style = feature.properties.style
              let geometry = feature.geometry
              let coordinates = Array.of(geometry.coordinates)

              let threeMaterial = new THREE.LineBasicMaterial({
                color: style.stroke,
                opacity: style['stroke-opacity'],
              })

              let threeGeometry = new THREE.Geometry()

              coordinates.forEach(function (line) {
                d3.pairs(line.map(denser), function (a, b) {
                  threeGeometry.vertices.push(a, b)
                })
                let object = new THREE.LineSegments(threeGeometry, threeMaterial)
                if (object) state.scene.add(object)
              })
            }
          }

    // .................. pointToScene           
          function pointToScene (items=[]) {
            if (items.length === 0) return
            for (let k in items) { // DOTS (seg5===0) each group gid
              let item = items[k] // feature
              let feature = item // .feature
              let style = feature.properties.style
              let geometry = feature.geometry
              let coordinates = geometry.coordinates

              let threeMaterial = new THREE.LineBasicMaterial({
                color: style.stroke,
                opacity: style['stroke-opacity'],
              })

              let threeGeometry = new THREE.Geometry()

              coordinates.forEach(function (line) {
                d3.pairs(line.map(denser), function (a, b) {
                  threeGeometry.vertices.push(a, b)
                })
                let object = new THREE.LineSegments(threeGeometry, threeMaterial)
                if (object) state.scene.add(object)
              })
            }
          }

    // .................. polygonToScene                 
          function polygonToScene (items=[]) {
            if (items.length === 0) return
            for (let k in items) { // DOTS (seg5===0) each group gid
              let item = items[k] // feature
              let feature = item // .feature
              let style = feature.properties.style
              let geometry = feature.geometry
              let coordinates = geometry.coordinates

              let threeMaterial = new THREE.LineBasicMaterial({
                color: style.stroke,
                opacity: style['stroke-opacity'],
              })

              let threeGeometry = new THREE.Geometry()

              coordinates.forEach(function (line) {
                d3.pairs(line.map(denser), function (a, b) {
                  threeGeometry.vertices.push(a, b)
                })
                let object = new THREE.LineSegments(threeGeometry, threeMaterial)
                if (object) state.scene.add(object)
              })
            }
          }

    // .................. multiPolygonToScene              
          function multiPolygonToScene (items=[]) {
            if (items.length === 0) return
            for (let k in items) { // DOTS (seg5===0) each group gid
              let item = items[k] // feature
              let feature = item // .feature
              let style = feature.properties.style
              let geometry = feature.geometry
              let coordinates = geometry.coordinates

              let threeMaterial = new THREE.LineBasicMaterial({
                color: style.stroke,
                opacity: style['stroke-opacity'],
              })

              let threeGeometry = new THREE.Geometry()

              for (let i = 0; i < geometry.coordinates.length; i++) {
                let polygon = geometry.coordinates[i]
                polygon.forEach(function (line) { // each coordinate in polygon
                  d3.pairs(line.map(denser), function (a, b) {
                    threeGeometry.vertices.push(a, b)
                  })
                  let object = new THREE.LineSegments(threeGeometry, threeMaterial)
                  if (object) state.scene.add(object)
                })
              }
            }
          }

    // .................. imgToScene   
          function imgToScene (items=[]) {
            if (items.length === 0) return
            for (let k in items) { // DOTS (seg5===0) each group gid
              let item = items[k] // feature
              let img = item

              let href = img.properties['xlink:href']

              let map = new THREE.TextureLoader().load(href)
              let material = new THREE.SpriteMaterial({
                map: map,
                color: 0xffffff,
                fog: true,
              })
              let threeMaterial = new THREE.Sprite(material)
              threeMaterial.scale.set(200, 200, 1)

              state.scene.add(threeMaterial)
            }
          }
          
    // .................. threeLinkToScene   
          function threeLinkToScene (items=[]) {
            if (items.length === 0) return
            for (let k in items) { // DOTS (seg5===0) each group gid
              let item = items[k] // feature
              let link = item
              state.scene.add(link._line = link.line)
            }
          }

          

      /* object PATTERNS */
      
      let EOMULTIPOLYGON = d =>
        (d.properties.sort === 'feature' || d.properties.sort === 'form')
        && d.geometry.type === 'MultiPoint' // properties.faces
        && d.properties.eoMultiPolygon == 1

      let MULTIPOINT = d =>
        (d.properties.sort === 'feature' || d.properties.sort === 'form')
        && d.geometry.type === 'MultiPoint'
        && d.properties.eoMultiPolygon !== 1

      let MULTILINESTRING = d =>
        (d.properties.sort === 'feature' || d.properties.sort === 'form')
        && d.geometry.type === 'MultiLineString'

      let IMG = d =>
        d.properties.sort === 'img'

      let THREELINKK = d =>
        d.properties.sort === 'threelink'



    // ............................. RENDER

    let render = function (featurecollection, maxlimit) {

      let features = featurecollection.features
        .filter(
          d => d.properties !== undefined && // req properties
            d.properties.eoric !== undefined // req eoric
        )

      console.assert(state.scene !== undefined) /* clean canvas */
      while (state.scene.children.length > 0) {
        state.scene.remove(state.scene.children[0]) // remove object from scene
      }
      
      /* objects TO SCENE */

      let gitems = d3.nest() // let framesByGid = f.groupBy(frames, "gid")
        .key(function (d) { return d.properties.eoric.gid })
        .key(function (d) { return d.properties.eoric.cid })
        .entries(features)

 
      for (let i in gitems) { // DOTS (seg5===0) each group gid
        let gid = gitems[i].key,
          citems = gitems[i].values

        for (let j in citems) { // forEach CLASS by cid
          let cid = citems[j].key // cid
          let fitems = citems[j].values // fitems
          let now = fitems.slice(-1)[0]

          eoMultipolygonsToScene(fitems.filter(EOMULTIPOLYGON))
          multiPointToScene(fitems.filter(MULTIPOINT))
          multiLineStringToScene(fitems.filter(MULTILINESTRING))

        } // citems
      } // gitems

      if (state.mouse !== undefined) {
        state.raycaster.setFromCamera(state.mouse, state.camera) // Update tooltip
        const intersects = state.raycaster.intersectObjects(state.scene.children)
        /* if (intersects.length > 0) console.log(" ****************** webgl intersects" , intersects) */
        state.toolTipElem.innerHTML = intersects.length ? intersects[0].object.index || '_e_' : '_e_'
      }

      state.controls.update() // UPDATE SCENE by CONTROL

      // RENDERER  SCENE  CAMERA
      state.renderer.render(state.scene, state.camera)
    }

    // ............................. enty
    let enty = function enty () {}
    enty.render = render
    return enty
  }

  exports.renderWebgl = renderWebgl
}))
