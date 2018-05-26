/***************************
 *        @renderWebgl
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.renderWebgl = global.renderWebgl || {})))
}(this, function (exports) {
  'use strict'

  let renderWebgl = function (__mapper = {}) {
     
     
     
// md: # md:{filename}
// md: ** **
// md: renderer.domElement 
// md: ```
// md:  <canvas width="600" height="400" style="display: block; width: 600px; height: 400px;"></canvas>
// md: ```
// md: canvas
// md: ```
// md:  Selection {_groups: [canvas#canvas.overlay], _parents: [html] }
// md: ```
// md:  Camera extent is viewport in pixels
// md: ```
// md: [[-300, 300, 200, -200]
// md: ```
// md: # license
// md: MIT
    

    const radians = Math.PI / 180
    
    let _denser = point => {
      if (!Array.isArray(point)) console.log('point ', point, ' is not cartesian')
      return new THREE.Vector3(...point)
    }

    let r = __mapper('xs').r('renderport'),
      width = r.width(),
      height = r.height()
  
      
    let craycaster = __mapper('xs').c('raycaster')

    let renderer = new THREE.WebGLRenderer({antialias: true})
    
    let domElem = renderer.domElement // canvas
    domElem.innerHTML = '' // empty DOM
    domElem.style.display = 'block'


    
    let canvas = d3.select('.viewframe') // canvas
        .append(() => d3.select(domElem)
          .attr('id', 'canvas')
          .attr('class', 'overlay')
          .style('position', 'absolute; top:0px; left:0px; z-index:1')
          .node()
        )
    let context = domElem.getContext('webgl')

    let navInfo = document.createElement('div') // Add nav info section
    navInfo.classList.add('graph-nav-info')
    navInfo.innerHTML = 'if key ALT/right to switch animation'
    document.body.appendChild(navInfo) // state.domElem.appendChild(navInfo);

    let mouse = craycaster.mouse() // control.RAYCASTER
    craycaster.control(domElem) // control on elem 
    let raycaster = new THREE.Raycaster() // intersect 

    
    let toolTipElem = document.createElement('div') // TOOLTIP
    toolTipElem.classList.add('graph-tooltip')
    toolTipElem.style.top = (mouse.y - 40) + 'px' // Move tooltip - on mouse
    toolTipElem.style.left = (mouse.x - 20) + 'px'
    document.body.appendChild(toolTipElem) // state.domElem.appendChild(state.toolTipElem);



    let scene = new THREE.Scene() // SCENE
      .add(new THREE.AmbientLight(0x333333))

    let light = new THREE.DirectionalLight(0xe4eef9, 0.7) // LIGHT
      .position.set(12, 12, 8)

      
    
    let extent = [ -width / 2, width / 2, height / 2, -height / 2 ] // EXTENT
    let camera = new THREE.OrthographicCamera( ...extent, 0.1, 9000)  // CAMERA
    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = 900
    camera.rotation.x = 0
    camera.rotation.y = 0
    camera.rotation.z = 0
    camera.distance2nodesFactor = 300
    camera.lookAt(new THREE.Vector3(0, 0, 0))

    

    let controls = new TrackballControls(camera, domElem) // TRACK CONTROLS
    controls.rotateSpeed = 1.0
    controls.zoomSpeed = 1.2
    controls.panSpeed = 0.8
    controls.noZoom = false
    controls.noPan = false
    controls.staticMoving = true
    controls.dynamicDampingFactor = 0.3
    controls.keys = [ 65, 83, 68 ]

    

    // ............................. resizeRenderer
    let resizeRenderer = function (renderer, props) {
      let width = props.width
      let height = props.height
      if (width && height) {
        renderer.setSize(width, height)
      }
      return renderer
    }

    // ............................. resizeCamera
    let resizeCamera = function (camera, props) {
      let width = props.width
      let height = props.height
      if (width && height) {
        camera.aspect = width / height
        camera.updateProjectionMatrix()
      }
      return camera
    }


    // ............................. cameraPropsSet
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

    
    let state = {}
    state.width = width
    state.height = height
    state.renderer = renderer
    state.domElem = domElem
    state.navInfo = navInfo
    state.toolTipElem = toolTipElem
    state.mouse = mouse
    state.camera = camera
    state.scene = scene
    state.light = light
    state.raycaster = raycaster
    state.controls = controls

    state.renderer = resizeRenderer(renderer, state) // force update at start
    state.camera = resizeCamera(camera, state) // force update at start

    // ............................. render
    let render = function (elapsed, featurecollection, maxlimit) {
      
      let features = featurecollection.features
        .filter(
          d => d.properties !== undefined && // req properties
            d.properties.ric !== undefined // req ric
        )

      while (state.scene.children.length > 0) { // clean canvas
        state.scene.remove(state.scene.children[0]) // clear the scene
      }

      
      let gitems = d3.nest() // items in scene
        .key(function (d) { return d.properties.ric.gid })
        .key(function (d) { return d.properties.ric.cid })
        .entries(features)

      for (let i in gitems) { // DOTS (seg5===0) each group gid
        let gid = gitems[i].key,
          citems = gitems[i].values

        for (let j in citems) { // each class cid
          let cid = citems[j].key // cid
          let fitems = citems[j].values // fitems
          let now = fitems.slice(-1)[0]

          /*  ................. GEOJSON FEATURE ................. */
          let features = fitems
            .filter(d => d.properties.sort === 'feature' || d.properties.sort === undefined) // default

          if (features.length > 0) {
            for (let k in features) { // DOTS (seg5===0) each group gid
              let item = features[k] // feature

              let feature = item // .feature
              let style = item.properties.style

              let geometry = feature.geometry // rings in MultiPolygon, MultiLineString

              if (geometry !== undefined && geometry !== null) {			// geometry may be null
              
                if (geometry.type === 'Point') {  // Point
                  let node = item

                  state.material_color = style.fill
                  state.geometry = new THREE.SphereGeometry(5, 32, 32)
                  state.wireframe = new THREE.WireframeGeometry(state.geometry)
                  state.material = new THREE.MeshBasicMaterial({
                    color: state.material_color,
                    transparent: true,
                    opacity: 0.75
                  })

                  let sphere = new THREE.Mesh(
                    state.wireframe,
                    state.material
                  )

                  sphere.position.x = node.x || node.geometry.coordinates[0]
                  sphere.position.y = node.y || node.geometry.coordinates[1] || 0
                  sphere.position.z = node.z || node.geometry.coordinates[2] || 0

                  state.scene.add(sphere)
                  
                } else if (geometry.type === 'MultiPolygon') {  // MultiPolygon
                  let threeMaterial = new THREE.LineBasicMaterial({
                    color: style.stroke,
                    opacity: style['stroke-opacity']
                  })

                  for (let i = 0; i < geometry.coordinates.length; i++) {
                    let coordinates = geometry.coordinates[i]

                    let threeGeometry = new THREE.Geometry()

                    coordinates.forEach(function (line) {
                      d3.pairs(line.map(_denser), function (a, b) {
                        threeGeometry.vertices.push(a, b)
                      })
                      let object = new THREE.LineSegments(threeGeometry, threeMaterial)
                      if (object) state.scene.add(object)
                    })
                  }
                  
                } else if (geometry.type === 'LineString') {  // LineString
                  
                  let threeMaterial = new THREE.LineBasicMaterial({
                    color: style.stroke,
                    opacity: style['stroke-opacity']
                  })

                  let coordinates = Array.of(geometry.coordinates)

                  let threeGeometry = new THREE.Geometry()

                  coordinates.forEach(function (line) {
                    d3.pairs(line.map(_denser), function (a, b) {
                      threeGeometry.vertices.push(a, b)
                    })
                    let object = new THREE.LineSegments(threeGeometry, threeMaterial)
                    if (object) state.scene.add(object)
                  })
                
                } else {      // other gj
                  
                  let threeMaterial = new THREE.LineBasicMaterial({
                    color: style.stroke,
                    opacity: style['stroke-opacity']
                  })

                  let coordinates = geometry.coordinates

                  let threeGeometry = new THREE.Geometry()

                  coordinates.forEach(function (line) {
                    d3.pairs(line.map(_denser), function (a, b) {
                      threeGeometry.vertices.push(a, b)
                    })
                    let object = new THREE.LineSegments(threeGeometry, threeMaterial)
                    if (object) state.scene.add(object)
                  })
                }
              }
            }
          }

          /*  ................. IMG ................. */
          let imgs = fitems.filter(d => d.properties.sort === 'img')

          if (imgs.length > 0) {
            for (let k in imgs) {
              let img = imgs[k]

              let href = img.properties['xlink:href']

              let map = new THREE.TextureLoader().load(href)
              let material = new THREE.SpriteMaterial({
                map: map,
                color: 0xffffff,
                fog: true
              })
              let threeMaterial = new THREE.Sprite(material)
              threeMaterial.scale.set(200, 200, 1)

              state.scene.add(threeMaterial)
            }
          }

          /*  ................. 3LINK ................. */
          let threelinks = fitems.filter(d => d.properties.sort === 'threelink')

          if (threelinks.length > 0) {
            for (let k in threelinks) {
              let link = threelinks[k]
              state.scene.add(link._line = link.line)
            }
          }
        } // citems
      } // gitems


      
      if (state.mouse !== undefined) {
        state.raycaster.setFromCamera(state.mouse, state.camera) // Update tooltip
        const intersects = state.raycaster.intersectObjects(state.scene.children)
        if (1 && 1 && intersects.length > 0) console.log('r.webgl.raycaster intersects', intersects)
        state.toolTipElem.innerHTML = intersects.length ? intersects[0].object.index || '_e_' : '_e_'
      }

      
      state.controls.update() // TrackballControls of camera and domeElem


      
      state.renderer.render(state.scene, state.camera)  // RENDER scene on camera
    }

    // ............................. enty
    let enty = function enty () {}
    enty.render = render
    return enty
  }

  exports.renderWebgl = renderWebgl
}))
