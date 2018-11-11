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
      TrackballControls, // https://unpkg.com/three@0.97.0/examples/js/controls/TrackballControls.js
    ] = await Promise.all([
      __mapper('xs').b('d3'),
      __mapper('xs').b('three'),
      __mapper('xs').c('raycaster'),
      __mapper('xs').r('portview'),
      __mapper('xs').c('trackballcontrols'),

    ])

    // .................. pics

    const radians = Math.PI / 180
    const to3point = v => (Array.isArray(v)) ? {x: v[0], y: v[1], z: v[2]} : v
    let denser = point => {
      console.assert(Array.isArray(point), `point ${point} is not cartesian`)
      return new THREE.Vector3(...point)
    }
    let state = {}

    state.cameras = {}
    
    // .................. getCamera
    let getCamera = function (pars, stat) {
      let camera
      let cameraItem = pars
      let type = cameraItem.type
      let camerauid = cameraItem.eoric.uid
      let iscontrol = cameraItem.iscontrol

      if (type === 'PerspectiveCamera') {
        let defs = { fov: 50, zoom: 1, near: 0.1, far: 2000, focus: 10, aspect: 1, view: null, filmGauge: 35, filmOffset: 0}

        let {fov, zoom, near, far, focus, aspect, view, filmGauge, filmOffset } = Object.assign(defs, cameraItem)
        
        // if (stat.cameras[camerauid] === undefined) {
        if (stat.camera === undefined) {
          camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
          if (cameraItem.position !== undefined) {
            camera.position.x = cameraItem.position[0]
            camera.position.y = cameraItem.position[1]
            camera.position.z = cameraItem.position[2]
          }
          if (cameraItem.rotation !== undefined) {
            camera.rotation.x = cameraItem.rotation[0]
            camera.rotation.y = cameraItem.rotation[1]
            camera.rotation.z = cameraItem.rotation[2]
          }
        } else {
          // camera = stat.cameras[camerauid]
          camera = stat.camera
        }

        
      } else if (type === 'OrthographicCamera') {
        let defs = { near: 0.1, far: 2000, zoom: 1, view: null }

        let {left, right, top, bottom, near, far} = Object.assign(defs, cameraItem)

        // if (stat.cameras[camerauid] === undefined) {
        if (stat.camera === undefined) {
          camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far)
          if (cameraItem.position !== undefined) {
            camera.position.x = cameraItem.position[0]
            camera.position.y = cameraItem.position[1]
            camera.position.z = cameraItem.position[2]
          }
          if (cameraItem.rotation !== undefined) {
            camera.rotation.x = cameraItem.rotation[0]
            camera.rotation.y = cameraItem.rotation[1]
            camera.rotation.z = cameraItem.rotation[2]
          }
          if (cameraItem.distance2nodesFactor !== undefined) {
            camera.distance2nodesFactor = cameraItem.distance2nodesFactor
          }
          if (cameraItem.lookAt !== undefined) {
            camera.lookAt(new THREE.Vector3(...cameraItem.lookAt))
          }
        } else {
          // camera = stat.cameras[camerauid]
          camera = stat.camera
        }
        
        
      }

      return camera
    }

    // .................. getLight
    let getLight = function (pars) {
      let light
      let lightItem = pars
      let type = lightItem.type

      if (type === 'AmbientLight') {
        // color is added to the color of objects material
        let {color, intensity} = lightItem
        light = new THREE[type](color, intensity)

        if (lightItem.position !== undefined) {
          light.position.set(...lightItem.position)
        }

      } else if (type === 'DirectionalLight') {
        // remote light source. rays run parallel eg. sun
        let {color, intensity} = lightItem
        light = new THREE[type](color, intensity)

        if (lightItem.position !== undefined) {
          light.position.set(...lightItem.position)
        }
        if (typeof light.target === 'function') light.target(object)
        if (lightItem.castShadow === 1) light.castShadow = 1


      } else if (type === 'SpotLight') {
        // cone light effect
        light = new THREE[type]()
        if (lightItem.position !== undefined) {
          light.position.set(...lightItem.position)
        }
      } else if (type === 'RectAreaLight') {
        light = new THREE[type]()
        if (lightItem.position !== undefined) {
          light.position.set(...lightItem.position)
        }
      } else if (type === 'PointLight') {
        // From a point emanates light in all directions        
        light = new THREE[type]()
        let helper = new THREE.PointLightHelper(light, 0.1)

      } else if (type === 'HemisphereLight') {
        let {skyColor, groundColor, intensity} = lightItem
        light = new THREE[type](skyColor, groundColor, intensity)
        if (lightItem.position !== undefined) {
          light.position.set(...lightItem.position)
        }
      } else {
        console.assert(1 === 0, `light type ${type} not supported`)
      }

      return light
    }

    /* THREE RENDERER */

    state.threeRenderer = new THREE.WebGLRenderer({antialias: true}) /* renderer */

    /* CANVAS */

    let appendDomElem = function (elem) {
      return d3.select('body') /* canvas */
        .append(() => d3.select(elem)
          .attr('id', 'canvas')
          .attr('class', 'overlay')
          .style('position', 'absolute; top:0px; left:0px; z-index:1')
          .node()
        )
    }

    function resizeCanvas ({threeRenderer, camera}) {
      let width = renderPortview.width()
      let height = renderPortview.height()

      if (width && height) {
        threeRenderer.setSize(width, height)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
      }
    }

    /* SCENE */
    let scene = new THREE.Scene() // Setup scene
    state.scene = scene

    /* RAYCASTER */

    let raycaster = new THREE.Raycaster() // Capture mouse coords on move
    state.raycaster = raycaster

    /* CAMERA CONTROLS */

    function getViewControls ({camera, domElem}) {
      let controls
      controls = new TrackballControls(camera, domElem) // Add camera interaction
      controls.rotateSpeed = 1.0
      controls.zoomSpeed = 1.2
      controls.panSpeed = 0.8
      controls.noZoom = false
      controls.noPan = false
      controls.staticMoving = true
      controls.dynamicDampingFactor = 0.3
      controls.keys = [ 65, 83, 68 ]

      return controls
    }

    // .................. threeCameras
    function threeCameras (items = []) {
      if (items.length === 0) return
      let camera
      for (let k in items) { // DOTS (seg5===0) each group gid
        let item = items[k] // feature
        
        let camaraProps = item.properties
        let camerauid = camaraProps.eoric.uid
        let iscontrol = camaraProps.iscontrol
        
        
        // camera = getCamera(camaraProps, state)
        
        // state.cameras[camerauid] = camera
  
        // if (state.camera === undefined) {
          // camera = getCamera(camaraProps, state)
          // state.camera = camera
          state.camera = getCamera(camaraProps, state)
        // }
      }
    }

    // .................. eoMultipolygonsToScene
    function eoMultipolygonsToScene (items = []) {
      if (items.length === 0) return

      for (let k in items) { // DOTS (seg5===0) each group gid
        let item = items[k]
        let feature = item
        let style = item.properties.style

        if (feature.geometry !== undefined && feature.geometry !== null) {	// geometry may be null
          let vertices = feature.geometry.coordinates
          let faces = feature.properties.faces.map(face => new THREE.Face3(...face))

          let lights = feature.properties.lights || []

          let	threeGeometry = new THREE.Geometry()
          threeGeometry.vertices = vertices.map(to3point)
          threeGeometry.faces = faces
          threeGeometry.computeFaceNormals()

          let object = new THREE.Mesh(
            threeGeometry, // geometry,
            // new THREE.LineBasicMaterial({
            new THREE.MeshPhongMaterial({
              // color: 0x0033ff,
              color: style.fill,
              // specular: 0x555555,
              shininess: 30,

              // opacity: style['fill-opacity'],

            })
          )

          for (let i = 0; i < vertices.length; i++) {
            var particle_geom = new THREE.Geometry()
            let vertex = threeGeometry.vertices[i]
            particle_geom.vertices.push(new THREE.Vector3(vertex.x, vertex.y, vertex.z))
            var particle_material = new THREE.PointsMaterial({size: 1})
            var particle = new THREE.Points(particle_geom, particle_material)

            object.add(particle)
          }
          state.scene.add(object)

          for (let j = 0; j < lights.length; j++) {
            let lightItem = lights[j]

            let threeLight = getLight(lightItem)
            state.scene.add(threeLight)
let pointLightHelper = new THREE.PointLightHelper(threeLight)
state.scene.add(pointLightHelper)
            
          }
        }
      }
    }

    // .................. multiPointToScene
    function multiPointToScene (items = []) {
      if (items.length === 0) return

      for (let k in items) { // DOTS (seg5===0) each group gid
        let item = items[k] // feature

        let feature = item // .feature
        let style = item.properties.style

        let geometry = feature.geometry // rings in MultiPolygon, MultiLineString

        let vertices = geometry.coordinates
        for (let i = 0; i < vertices.length; i++) {
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

    // .................. multiLineStringToScene
    function multiLineStringToScene (items = []) {
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
    function lineStringToScene (items = []) {
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
    function pointToScene (items = []) {
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
    function polygonToScene (items = []) {
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
    function multiPolygonToScene (items = []) {
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
    function imgToScene (items = []) {
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
    function threeLinkToScene (items = []) {
      if (items.length === 0) return
      for (let k in items) { // DOTS (seg5===0) each group gid
        let item = items[k] // feature
        let link = item
        state.scene.add(link._line = link.line)
      }
    }

    /* object PATTERNS */

    let THREECAMERA = d =>
      (d.properties.sort === 'camera')

    let EOMULTIPOLYGON = d =>
      (d.properties.sort === 'feature' || d.properties.sort === 'form') &&
        d.geometry.type === 'MultiPoint' && // properties.faces
        d.properties.eoMultiPolygon == 1

    let MULTIPOINT = d =>
      (d.properties.sort === 'feature' || d.properties.sort === 'form') &&
        d.geometry.type === 'MultiPoint' &&
        d.properties.eoMultiPolygon !== 1

    let MULTILINESTRING = d =>
      (d.properties.sort === 'feature' || d.properties.sort === 'form') &&
        d.geometry.type === 'MultiLineString'

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

          threeCameras(fitems.filter(THREECAMERA))
          eoMultipolygonsToScene(fitems.filter(EOMULTIPOLYGON))
          multiPointToScene(fitems.filter(MULTIPOINT))
          multiLineStringToScene(fitems.filter(MULTILINESTRING))
        } // citems
      } // gitems

      // let cams = Object.entries(state.cameras)
        // .filter(entry => entry[1]
      // if (1 && 1) console.log('cames', cams)
      
      
      // if (state.cameras && Object.keys(state.cameras).length > 0) {
      if (state.camera !== undefined) {
        // let cameras = Object.values(state.cameras)
        // let camera = cameras[cameras.length -1]
        let camera = state.camera
        let threeRenderer = state.threeRenderer
        let domElem = state.domElem
        
        if (state.domElem === undefined) {
          let domElem = state.threeRenderer.domElement // canvas
          domElem.innerHTML = '' // Wipe DOM
          domElem.style.display = 'block'

          state.domElem = domElem
          appendDomElem(domElem)
        }

        if (state.viewControls === undefined) {
          state.viewControls = getViewControls({camera, domElem})
        }
        
        // if (state.cameraHelper === undefined) {
          // state.cameraHelper = new THREE.CameraHelper(state.camera)
          // state.cameraHelper = new THREE.CameraHelper(state.camera)
// var camera = new THREE.PerspectiveCamera( 75, 600 / 400, -100, 100 );          
  // state.cameraHelper = new THREE.CameraHelper(camera)
// }
        // if (state.gridHelper === undefined) {
          // state.gridHelper = new THREE.GridHelper(10, 1)
          // state.gridHelper.position.set(0, 0, 0)
        // }

        resizeCanvas({threeRenderer, camera})
        state.viewControls.update() // UPDATE SCENE by CONTROL
    
        
        if (state.scene) {
          let scene = state.scene
          // state.scene.add(state.cameraHelper)
          // state.scene.add(state.gridHelper)
          state.threeRenderer.render(scene, camera)
        }
      }
    }

    // ............................. enty
    let enty = function enty () {}
    enty.render = render
    return enty
  }

  exports.renderWebgl = renderWebgl
}))
