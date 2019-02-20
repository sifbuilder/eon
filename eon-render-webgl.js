/***************************
 *     @renderWebgl
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.renderWebgl = global.renderWebgl || {})))
}(this, function (exports) {
  'use strict'

  async function renderWebgl (__eo = {}) {
    let [
      d3,
      THREE,
      ctlRaycaster,
      TrackballControls,
      muonEocrom,
      muonNets,
      renderPortview,
    ] = await Promise.all([
      __eo('xs').b('d3'),
      __eo('xs').b('three'),
      __eo('xs').c('raycaster'),
      __eo('xs').c('trackballcontrols'),
      __eo('xs').m('eocrom'),
      __eo('xs').m('nets'),
      __eo('xs').r('portview'),

    ])

    // .................. pics

    let materials = {
      'line': new THREE.LineBasicMaterial({
        color: 0xFFFFFF,
        linewidth: 2,
      }),
      'flat': new THREE.MeshBasicMaterial({
        color: 0x009999,
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 0.1,
      }),
      'shape': new THREE.MeshBasicMaterial({
        color: 0xffffff,
        vertexColors: THREE.FaceColors,
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 0.1,
      }),
      'lit': new THREE.MeshPhongMaterial({
        color: 0x666666,
        specular: 0xFFFFFF,
        side: THREE.DoubleSide,
        shininess: 70,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 0.1,
      }),
      'normals': new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 0.1,
      }),
    }

    let lights = {
      ambient: {
        sort: 'light',
        type: 'AmbientLight',
        name: 'AmbientLight',
        color: 0xeeeeee,
        intensity: 0.9,
        position: [400, 400, 400],
      },
      directional: {
        sort: 'light',
        type: 'DirectionalLight',
        name: 'DirectionalLight',
        color: 0xBEC6FF,
        intensity: 0.9,
        position: [400, 400, 400],
      },
      pointLight: {
        type: 'PointLight',
        color: 0xe4eef9,
        intensity: 0.7,
        position: [0, 0, 120],
        normalize: 1,
        castShadow: 1,
      },
      spotLight: {
        type: 'SpotLight',
        color: 0xe4eef9,
        intensity: 0.7,
        position: [0, 0, 120],
        normalize: 1,
        castShadow: 1,
      },

    }

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

    // .................. getCamerasDefault
    let getCamerasDefault = function (stat) {
      let cameras = {}
      let pars = {
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
      }

      cameras[pars['name']] = getCamera(pars, stat)

      return cameras
    }

    // .................. getCamera
    let getCamera = function (pars, stat) {
      let camera
      let cameraItem = pars
      let type = cameraItem.type || 'PerspectiveCamera'
      let name = cameraItem.name
      let camerauid = name

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
        let defs = {
          near: 0.1,
          far: 2000,
          zoom: 1,
          view: null,
        }
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

    // .................. getLightsDefault
    let getLightsDefault = function (stat) {
      let lights = {}
      let pars = {}
      pars = {
        sort: 'light',
        type: 'HemisphereLight',
        name: 'HemisphereLight',
        groundColor: 755.9649032258285,
        intensity: 0.4,
        position: [0, 0, 0],
        skyColor: 354,
      }

      lights['HemisphereLight'] = getLight(pars, stat)

      pars = {
        sort: 'light',
        type: 'SpotLight',
        name: 'spotLight',
        castShadow: 1,
        color: 238,
        intensity: 0.99,
        normalize: 1,
        position: [-400, 400, 400],
      }
      lights['SpotLight'] = getLight(pars, stat)

      return lights
    }

    // .................. getLight
    let getLight = function (pars, stat) {
      let light
      let item = pars
      let type = item.type || 'AmbientLight'
      let name = item.name

      if (type === 'AmbientLight') {
        // color is added to the color of objects material
        let {color = 0xffffff, intensity = 1} = item

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
      } else if (type === 'SpotLight') { // SpotLight
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
      } else if (type === 'RectAreaLight') { // RectAreaLight
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
      } else if (type === 'HemisphereLight') { // HemisphereLight
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

    // .................. threeGridHelpers
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
      if (items.length > 0) {
        if (state.lights['default' ] !== undefined) delete state.lights['default']

        for (let k in items) {
          let item = items[k].properties
          let lightid = item.name
          state.lights[lightid] = getLight(item, state)
        }
      }
    }
    // .................. threeCameras
    function threeCameras (items = []) {
      if (items.length > 0) { // add default camera
        if (state.cameras['default' ] !== undefined) delete state.cameras['default']

        for (let k in items) { // DOTS (seg5===0) each group gid
          let camera = items[k] // feature

          let pars = camera.properties
          let camid = pars['name']
          state.cameras[camid] = getCamera(pars, state)
        }
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

    // .................. multiPolygonToScene
    function multiPolygonsToScene (items = []) {
      if (items.length === 0) return

      for (let k in items) { // features of type MultiPolygon
        let feature = items[k] // feature of type MultiPolygon
        polygonsToScene(Array.of(feature))
      }
    }
    // .................. polygonsToScene
    function polygonsToScene (items = []) {
      if (items.length === 0) return
      for (let k in items) { // features of type MultiPolygon
        let feature = items[k] // feature of type MultiPolygon
        let style = feature.properties.style
        let geometry = feature.geometry
        let coordinates = geometry.coordinates

        let lineMaterial = new THREE.MeshBasicMaterial({
          color: style.stroke,
          opacity: style['stroke-opacity'],
          side: THREE.DoubleSide,
        })

        let meshMaterial = new THREE.MeshBasicMaterial({
          color: 'red',
          side: THREE.DoubleSide,
        })

        for (let i = 0; i < geometry.coordinates.length; i++) {
        // for (let i = 0; i < 1; i++) {

          let polygon = geometry.coordinates[i] // container ring with hole rings
          let outring = polygon[0]
          let holerings = polygon.slice(1)

          let threeGeometry = new THREE.Geometry()

          let object, v = '______________mesh'
          if (v === 'mesh') {
            for (let j = 0; j < outring.length; j++) {
              threeGeometry.vertices.push(new THREE.Vector3(...outring[j])) // vertices
              threeGeometry.faces.push(new THREE.Face3(0, j + 1, j)) // faces
            }
            object = new THREE.Mesh(threeGeometry, meshMaterial)
          } else { // not mesh
            d3.pairs(outring.map(denser), function (a, b) { // container ring
              threeGeometry.vertices.push(a, b) // vertices
            })
            object = new THREE.LineSegments(threeGeometry, lineMaterial)

            holerings.forEach(function (ring) { // each hole in polygon
              d3.pairs(ring.map(denser), function (a, b) {
                threeGeometry.vertices.push(a, b) // vertices
              })
              let object = new THREE.LineSegments(threeGeometry, lineMaterial)
              if (object) state.scene.add(object)
            })
          }
          if (object) state.scene.add(object)
        }
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

    // .................. eoMultiPolygonsToScene
    function eoMultiPolygonsToScene (items = []) {
      if (items.length === 0) return
      eoPolygonsToScene(items)
    }

    // .................. eoPolygonsToScene
    function eoPolygonsToScene (items = []) {
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

            })
          )

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
        pointToScene(Array.of(item))
      }
    }
    // .................. pointToScene
    function pointToScene (items = []) {
      if (items.length === 0) return
      for (let k in items) { // DOTS (seg5===0) each group gid
        let item = items[k] // feature

        let style = item.properties.style
        let dotSize = item.properties.pointRadius || 12

        let geometry = item.geometry // rings in MultiPolygon, MultiLineString

        let vertex = geometry.coordinates
        vertex[2] = vertex[2] !== undefined ? vertex[2] : 0 // _e_
        let pointThree = to3point(vertex)

        let particle_geom = new THREE.Geometry()
        particle_geom.vertices.push(pointThree)

        let particle_material = new THREE.PointsMaterial({
          color: style.fill, // 0x88ff88,
          size: dotSize,
          sizeAttenuation: false,
          transparent: true,
        })

        let particle = new THREE.Points(particle_geom, particle_material)

        state.scene.add(particle)
      }
    }
    // .................. multiLineStringToScene
    function multiLineStringToScene (items) {
      if (items.length === 0) return
      for (let k in items) {
        let item = items[k] // feature
        lineStringToScene(Arrray.of(item))
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

        coordinates.forEach(function (line = []) {
          d3.pairs(line.map(denser), function (a, b) {
            threeGeometry.vertices.push(a, b)
          })
          let object = new THREE.LineSegments(threeGeometry, threeMaterial)
          if (object) state.scene.add(object)
        })
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
    // .................. postmot
    function postmot (object) {
      let t, t1, r, t2, m, u, c, d
      object.traverse(function (obj) {
        u = obj.userData
        d = u.renderData

        if (u !== undefined && d !== undefined) {
          t = d.t
        

        
          let ms = obj.matrices({u,t})
          
        
          let t0 = new THREE.Matrix4()
          ms.reverse().map(m => t0.multiply(m))

              obj.matrix.multiply(t0)
              obj.matrixAutoUpdate = false
              obj.matrixWorldNeedsUpdate = true


          
          
        }
      })

      return object
    }

    // .................. threeObjectToScene
    function threeObjectToScene (items = []) {
      if (items.length === 0) return
      for (let k in items) {
        let item = items[k]
        
        let object 
        
        if (item.geometry.type === 'MultiPoint') { 

          console.assert(item.properties.hinges !== undefined, `net undefined`)
          if (item.properties.hinges !== undefined) {
            let coords = item.geometry.coordinates.map(d => Array.isArray(d) ? new THREE.Vector3(...d) : d)
            item.geometry.coordinates = coords
            object = muonNets.tree(item)  // net 
          }
          
        } else {
          object = item.properties.object
        }
          
          
          object = postmot(object)
        
          let u = object.userData
          let d = u.renderData
          if (u !== undefined && d !== undefined) {
            let docenter = d.docenter
            if (docenter) {
              let target = new THREE.Vector3()
              let c = new THREE.Box3().setFromObject(object).getCenter(target)
              let t3 = new THREE.Matrix4().makeTranslation(-c.x, -c.y, -c.z)

              object.matrix.multiply(t3)
              object.matrixAutoUpdate = false
              object.matrixWorldNeedsUpdate = true
            }
          }        
            

        state.scene.add(object)
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
        retriever: eoMultiPolygonsToScene,
      }, {
        name: 'MULTIPOLYGON',
        filter: d =>
          (d.properties.sort === 'feature' || d.properties.sort === 'form') &&
            d.geometry.type === 'MultiPolygon',
        retriever: multiPolygonsToScene,
      }, {
        name: 'MULTIPOINT',
        filter: d =>
          (d.properties.sort === 'feature' || d.properties.sort === 'form') &&
            d.geometry.type === 'MultiPoint' &&
            d.properties.eoMultiPolygon !== 1,
        retriever: multiPointToScene,
      }, {
        name: 'POINT',
        filter: d =>
          (d.properties.sort === 'feature' || d.properties.sort === 'form') &&
            d.geometry.type === 'Point' &&
            d.properties.eoMultiPolygon !== 1,
        retriever: pointToScene,
      }, {
        name: 'MULTILINESTRING',
        filter: d =>
          (d.properties.sort === 'feature' || d.properties.sort === 'form') &&
              d.geometry.type === 'MultiLineString',
        retriever: multiLineStringToScene,
      }, {
        name: 'LINESTRING',
        filter: d =>
          (d.properties.sort === 'feature' || d.properties.sort === 'form') &&
              d.geometry.type === 'LineString',
        retriever: lineStringToScene,
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
      }, {
        name: 'THREEOBJECT',
        filter: d =>
          d.properties.sort === 'threeobject',
        retriever: threeObjectToScene,
      },

    ]

    // ............................. render

    let render = function (featurecollection, maxlimit) {
      if (0 && 1) console.log('featurecollection', featurecollection)

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

      let patternedItems = patterns.map(d => [])

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
              let itemsInPattern = fitems.filter(pattern.filter)

              patternedItems[k] = itemsInPattern.length > 0 ? patternedItems[k].concat(itemsInPattern) : patternedItems[k]
            }
          }
        } // citems
      } // gitems

      // group items per pattern
      for (let k = 0; k < patterns.length; k++) {
        let pattern = patterns[k]

        if (pattern.retriever && pattern.filter) {
          pattern.retriever(patternedItems[k])
        }
      }

      if (state.lights === undefined || // set default lights
        Object.keys(state.lights).length === 0) {
        let lights = getLightsDefault(state)
        state.lights = lights
      }
      if (state.cameras === undefined || // set default cameras
        Object.keys(state.cameras).length === 0) {
        let cameras = getCamerasDefault(state)
        state.cameras = cameras
      } else {
      }

      if (state.cameras && Object.keys(state.cameras).length > 0) {
        let cameras = Object.values(state.cameras)
        let camera = cameras[cameras.length - 1]
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
