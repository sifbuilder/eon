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
      TrackballControls, // https://unpkg.com/three@0.97.0/examples/js/controls/TrackballControls.js
      muonEocrom,
      renderPortview,
    ] = await Promise.all([
      __mapper('xs').b('d3'),
      __mapper('xs').b('three'),
      __mapper('xs').c('raycaster'),
      __mapper('xs').c('trackballcontrols'),
      __mapper('xs').m('eocrom'),
      __mapper('xs').r('portview'),

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
    state.lights = {}
    state.cameraHelpers = {}
    state.gridHelpers = {}
    state.lightHelpers = {}

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

        if (stat.cameras[camerauid] === undefined) {
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
          camera = stat.cameras[camerauid]
        }
      } else if (type === 'OrthographicCamera') {
        let defs = { near: 0.1, far: 2000, zoom: 1, view: null }

        let {left, right, top, bottom, near, far} = Object.assign(defs, cameraItem)

        if (stat.cameras[camerauid] === undefined) {
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
          camera = stat.cameras[camerauid]
        }

      }
        
        if (cameraItem.vellin !== undefined) {
          camera.position.x += cameraItem.vellin[0]
          camera.position.y += cameraItem.vellin[1]
          camera.position.z += cameraItem.vellin[2]
        }
        if (cameraItem.velang !== undefined) {
          camera.rotation.x += cameraItem.velang[0]
          camera.rotation.y += cameraItem.velang[1]
          camera.rotation.z += cameraItem.velang[2]
        }
            
        camera.updateProjectionMatrix()        

      return camera
    }

    // .................. getLight
    let getLight = function (pars, stat) {
      let light
      let item = pars
      let type = item.type
      let name = item.name

      if (type === 'AmbientLight') {
        // color is added to the color of objects material
        let {color, intensity} = item

        if (stat.lights[name] === undefined) {
          light = new THREE[type](color, intensity)
        } else {
          light = stat.lights[name]
        }

        if (item.position !== undefined) {
          light.position.set(...item.position)
        }
      } else if (type === 'DirectionalLight') {
        // remote light source. rays run parallel eg. sun
        let {color, intensity} = item

        if (stat.lights[name] === undefined) {
          light = new THREE[type](color, intensity)
        } else {
          light = stat.lights[name]
        }

        if (item.position !== undefined) {
          light.position.set(...item.position)
        }
        if (typeof light.target === 'function') light.target(object)
        if (item.castShadow === 1) light.castShadow = true
        // target object



      } else if (type === 'SpotLight') {  // SpotLight
        // cone light effect
        let {color } = item
        if (0) {
        } else {
          color = muonEocrom.getColor(color)
          color = 0xe4eef9

        }

        if (stat.lights[name] === undefined) {
          light = new THREE[type](color)
        } else {
          light = stat.lights[name]
        }
        if (item.position !== undefined) {
          light.position.set(...item.position)
        }
        if (item.castShadow !== undefined) {
          light.castShadow = true
        }
        // lookAt object

      } else if (type === 'RectAreaLight') {  // RectAreaLight
        if (stat.lights[name] === undefined) {
          light = new THREE[type]()
        } else {
          light = stat.lights[name]
        }
        if (item.position !== undefined) {
          light.position.set(...item.position)
        }
      } else if (type === 'PointLight') { // HemisphereLight
        // From a point emanates light in all directions
        if (stat.lights[name] === undefined) {
          light = new THREE.PointLightHelper(light, 0.1)
        } else {
          light = stat.lights[name]
        }

      } else if (type === 'HemisphereLight') {    // HemisphereLight
        let {skyColor, groundColor, intensity} = item
        if (0) {
        } else {
          skyColor = muonEocrom.getColor(skyColor)
          groundColor = muonEocrom.getColor(groundColor)
          intensity = (intensity !== undefined) ? intensity : 1.0
        }

        if (stat.lights[name] === undefined) {
          light = new THREE[type](skyColor, groundColor, intensity)
        } else {

          light = stat.lights[name]
          light.color = new THREE.Color(skyColor) // 0xff0000 "rgb(255, 0, 0)"
          light.groundColor = new THREE.Color(groundColor) // 0xff0000 "rgb(255, 0, 0)"

        }

        if (item.position !== undefined) {
          light.position.set(...item.position)
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
    function threeGridHelpers (items = []) {
      if (items.length === 0) return
      for (let k in items) { // DOTS (seg5===0) each group gid
        let item = items[k] // feature

        let {size, divisions, position } = item.properties
        let uid = item.properties.eoric.uid

        if (state.gridHelpers[uid] === undefined) {
          state.gridHelpers[uid] = new THREE.GridHelper(size, divisions)
          if (position) state.gridHelpers[uid].position.set(...position)
        }
      }
    }

    // .................. threeLights
    function threeLights (items = []) {
      if (items.length === 0) return
      for (let k in items) {
        let item = items[k].properties

        let {color, intensity} = item
        let name = item.name

        state.lights[name] = getLight(item, state)
      }
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

        state.cameras[camerauid] = getCamera(camaraProps, state)
        state.camera = getCamera(camaraProps, state)
      }
    }
    // .................. threeCameraHelpers
    function threeCameraHelpers (items = []) {
      if (items.length === 0) return

      for (let k in items) { // DOTS (seg5===0) each group gid
        let item = items[k] // feature

        let camaraProps = item.properties
        let camerauid = camaraProps.eoric.uid
        let iscontrol = camaraProps.iscontrol

        let camera = getCamera(camaraProps, state)
        state.cameras[camerauid] = camera
        state.camera = camera
        let cameraHelper
        if (state.cameraHelpers[camerauid] === undefined) {
          cameraHelper = new THREE.CameraHelper(camera)
        } else {
          cameraHelper = state.cameraHelpers[camerauid]
        }

        state.cameraHelpers[camerauid] = cameraHelper
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

            new THREE.MeshPhongMaterial({ // new THREE.LineBasicMaterial({

              color: style.fill, // color: 0x0033ff,
              shininess: 50,

              // specular: 0x555555,
              // opacity: style['fill-opacity'],

            })
          )

          let dotsize = 0.01
          for (let i = 0; i < vertices.length; i++) {

            let vertex = threeGeometry.vertices[i]

            var particle_geom = new THREE.Geometry()
            particle_geom.vertices.push(new THREE.Vector3(vertex.x, vertex.y, vertex.z))
            var particle_material = new THREE.PointsMaterial({size: dotsize})
            var particle = new THREE.Points(particle_geom, particle_material)

          }
          state.scene.add(object)

          for (let j = 0; j < lights.length; j++) {
            let item = lights[j]
            let name = item.name

            let threeLight = getLight(item, state)
            state.lights[name] = threeLight
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
        let dotsize = 12
        for (let i = 0; i < vertices.length; i++) {

          if (i === 0 || i === 4 || i === 8 || i === 11) {
            let particle_geom = new THREE.Geometry()
            particle_geom.vertices.push(new THREE.Vector3(...vertices[i].map(to3point)))
            let particle_material = new THREE.PointsMaterial({
                color: 0x88ff88,
                size: dotsize,
            })
            
            let particle = new THREE.Points(particle_geom, particle_material)
            state.scene.add(particle)
          }
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
    let patterns = [
      {
        name: 'THREEGRIDHELPER',
        filter: d =>
          (d.properties.sort === 'gridHelper'),
        retriever: threeGridHelpers,
      }, {
        name: 'THREELIGHT',
        filter: d =>
          (d.properties.sort === 'light'),
        retriever: threeLights,
      }, {
        name: 'THREECAMERAHELPER',
        filter: d =>
          (d.properties.sort === 'cameraHelper'),
        retriever: threeCameraHelpers,
      }, {
        name: 'THREECAMERA',
        filter: d =>
          (d.properties.sort === 'camera'),
        retriever: threeCameras,
      }, {
        name: 'EOMULTIPOLYGON',
        filter: d =>
          (d.properties.sort === 'feature' || d.properties.sort === 'form') &&
            d.geometry.type === 'MultiPoint' && // properties.faces
            d.properties.eoMultiPolygon == 1,
        retriever: eoMultipolygonsToScene,
      }, {
        name: 'MULTIPOINT',
        filter: d =>
          (d.properties.sort === 'feature' || d.properties.sort === 'form') &&
            d.geometry.type === 'MultiPoint' &&
            d.properties.eoMultiPolygon !== 1,
        retriever: multiPointToScene,
      }, {
        name: 'MULTILINESTRING',
        filter: d =>
          (d.properties.sort === 'feature' || d.properties.sort === 'form') &&
              d.geometry.type === 'MultiLineString',
        retriever: multiLineStringToScene,
      }, {
        name: 'IMG',
        filter: d =>
          d.properties.sort === 'img',
        retriever: undefined,
      }, {
        name: 'THREELINK',
        filter: d =>
          d.properties.sort === 'threelink',
        retriever: undefined,
      },

    ]

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

          for (let k = 0; k < patterns.length; k++) {
            let pattern = patterns[k]
            if (pattern.retriever && pattern.filter) {
              pattern.retriever(fitems.filter(pattern.filter))
            }
          }
        } // citems
      } // gitems

      if (state.cameras && Object.keys(state.cameras).length > 0) {
      // if (state.camera !== undefined) {
        let cameras = Object.values(state.cameras)
        let camera = cameras[cameras.length - 1]
        // let camera = state.camera
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

        resizeCanvas({threeRenderer, camera})
        state.viewControls.update() // UPDATE SCENE by CONTROL

        if (state.scene) {
          let scene = state.scene

          for (let k in state.lights) {
            state.scene.add(state.lights[k])
          }
          for (let helper in state.cameraHelpers) {
            state.scene.add(state.cameraHelpers[helper])
          }
          for (let helper in state.gridHelpers) {
            state.scene.add(state.gridHelpers[helper])
          }

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
