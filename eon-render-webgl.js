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
      rrenderport, // cameraProjer
      d3,
      three,
      threeTrackballcontrols,
    ] = await Promise.all([
      __mapper('xs').r('renderport'),
      __mapper('xs').b('d3'),
      __mapper('xs').b('three'),
      __mapper('xs').b('three-trackballcontrols'),
    ])    
    
    const radians = Math.PI / 180

    let state = {}
    state.width = r.width(),
    state.height = r.height()
    state.renderport = new THREE.WebGLRenderer({antialias: true})
    state.domElem = state.renderport.domElement // canvas
    state.domElem.innerHTML = '' // Wipe DOM
    state.domElem.style.display = 'block'
    state.context = state.domElem.getContext('webgl')

    /* canvas */
    d3.select('.viewframe')
      .append(() => d3.select(state.domElem)
        .attr('id', 'canvas')
        .attr('class', 'overlay')
        .style('position', 'absolute; top:0px; left:0px; z-index:1')
        .node()
      )

    /* navInfo */
    state.navInfo = document.createElement('div') // Add nav info section
    state.navInfo.classList.add('graph-nav-info')
    state.navInfo.innerHTML = 'if key ALT/right to switch animation'
    document.body.appendChild(state.navInfo) // state.domElem.appendChild(navInfo);

    /* tooltip */
    state.toolTipElem = document.createElement('div') // Setup tooltip
    state.toolTipElem.classList.add('graph-tooltip')
    document.body.appendChild(state.toolTipElem) // state.domElem.appendChild(state.toolTipElem);

    /* raycaster */
    state.mouse = new THREE.Vector2()
    state.mouse.x = -2 // Initialize off canvas
    state.mouse.y = -2
    state.mouse = __mapper('xs').c('raycaster').mouse()
    state.toolTipElem.style.top = (state.mouse.y - 40) + 'px' // Move tooltip
    state.toolTipElem.style.left = (state.mouse.x - 20) + 'px'

    /* cameraPropsSet */
    let cameraPropsSet = (camera, cameraProps) => {
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

    /* camera container */
    // state.camera = new THREE.PerspectiveCamera(45, state.width / state.height, 0.1, 9000) // Setup camera
      // state.camera.position.x = 0
      // state.camera.position.y = 0
      // state.camera.position.z = 500   
    
    state.camera = new THREE.OrthographicCamera(
        -state.width/2, // window.innerWidth / - 16,
        state.width/2, // window.innerWidth / 16,
        state.height/2, // window.innerHeight / 16, 
        -state.height/2, // window.innerHeight / - 16, 
        0.1, 
        9000 );
        
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
        state.renderport.setSize(state.width, state.height)
        state.camera.aspect = state.width / state.height
        state.camera.updateProjectionMatrix()
      }
    }
    resizeCanvas()

    /* scene */
    state.scene = new THREE.Scene() // Setup scene
    state.scene.add(new THREE.AmbientLight(0x333333))
    let light = new THREE.DirectionalLight(0xe4eef9, 0.7)
    light.position.set(12, 12, 8)

    /* controls */
    __mapper('controlRaycaster').control(state.domElem) // state.domNode

    state.raycaster = new THREE.Raycaster() // Capture mouse coords on move

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
      if (!Array.isArray(point)) console.log('point ', point, ' is not cartesian')
      return new THREE.Vector3(...point)
    }

    /***************************
 *        @render
 */
    let render = function (elapsed, featurecollection, maxlimit) {
      let features = featurecollection.features
        .filter(
          d => d.properties !== undefined && // req properties
            d.properties.ric !== undefined // req ric
        )

      /* clean canvas */
      while (state.scene.children.length > 0) {
        state.scene.remove(state.scene.children[0]) // clear the scene
      }

      /* items to add to scene */
      let gitems = d3.nest() // let framesByGid = f.groupBy(frames, "gid")
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
                if (geometry.type === 'Point') {
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
                } else if (geometry.type === 'MultiPolygon') {
                  let threeMaterial = new THREE.LineBasicMaterial({
                    color: style.stroke,
                    opacity: style['stroke-opacity']
                  })

                  for (let i = 0; i < geometry.coordinates.length; i++) {
                    let coordinates = geometry.coordinates[i]

                    let threeGeometry = new THREE.Geometry()

                    coordinates.forEach(function (line) {
                      d3.pairs(line.map(denser), function (a, b) {
                        threeGeometry.vertices.push(a, b)
                      })
                      let object = new THREE.LineSegments(threeGeometry, threeMaterial)
                      if (object) state.scene.add(object)
                    })
                  }
                } else if (geometry.type === 'LineString') {
                  let threeMaterial = new THREE.LineBasicMaterial({
                    color: style.stroke,
                    opacity: style['stroke-opacity']
                  })

                  let coordinates = Array.of(geometry.coordinates)

                  let threeGeometry = new THREE.Geometry()

                  coordinates.forEach(function (line) {
                    d3.pairs(line.map(denser), function (a, b) {
                      threeGeometry.vertices.push(a, b)
                    })
                    let object = new THREE.LineSegments(threeGeometry, threeMaterial)
                    if (object) state.scene.add(object)
                  })
                } else {
                  let threeMaterial = new THREE.LineBasicMaterial({
                    color: style.stroke,
                    opacity: style['stroke-opacity']
                  })

                  let coordinates = geometry.coordinates

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
        /* if (intersects.length > 0) console.log(" ****************** webgl intersects" , intersects) */
        state.toolTipElem.innerHTML = intersects.length ? intersects[0].object.index || '_e_' : '_e_'
      }

      state.controls.update() // Frame cycle

      state.renderport.render(state.scene, state.camera)
    }

    // ............................. enty
    let enty = function enty () {}
    enty.render = render
    return enty
  }

  exports.renderWebgl = renderWebgl
}))
