/***********
 *    @muonNets
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonNets = global.muonNets || {})))
}(this, function (exports) {
  'use strict'

  async function muonNets (__eo = {}) {
    let [
      THREE,
    ] = await Promise.all([
      __eo('xs').b('three'),
    ])

    // http://netlib.org/polyhedra/
    // https://github.com/paaatrick/polyhedra-folding/blob/master/poly/0
    // http://www.paulbourke.net/dataformats/phd/
    // number:     The polyhedron's number written and read with the C language %d printf/scanf format.
    // name  :     The polyhedron's name is less than 128 characters long and is not capitalized.
    // symbol:     The eqn input for two symbols separated by a tab; the Johnson symbol, and the Schla symbol.
    // dual:     The name of the dual polyhedron optionally followed by a horizontal tab and the number of the dual.
    // vertices:     The first line contains the number of vertices. The vertices are arranged one per line as an (x,y,z) coordinate of white-space separated values. The vertices are implicitly numbered starting at zero.
    // net:     The first line contains the number of faces and the maximum number of vertices in a face. The remaining lines are the faces in the planar net. Each face has a vertex count followed by the vertex numbers. The vertices are listed in counter-clockwise order as viewed from outside the polyhedron.
    // hinges:     The first line contains the number of hinges in the planar net. The remaining lines are hinge connections. The format is "face1 side1 face2 side2 value". Sides are numbered from zero. Depending on the dihedral value it may be a reflex or re-entrant hinge.
    // solid:     The first line contains the number of faces and the maximum number of vertices in a face. The remaining lines are the faces in the 3D polyhedron. Each face has a vertex count followed by the vertex numbers. The vertices are listed in counter-clockwise order as viewed from outside the polyhedron.
    // dihedral:     The first line contains the number of distinct dihedrals. Each dihedral starts on a new line and has a count and a value. If the count is non-zero, then that many "face edge" pairs (one per line) follow the dihedral value.

    // .................. parse
    // https://raw.githubusercontent.com/paaatrick/polyhedra-folding/master/js/PolyLoader.js
    let parse = function (props = {}) {
      let text = props.text
      var verts = [],
        faces = [],
        hinges = [],
        lines = text.split('\n'),
        i = 0,
        line,
        nFaces,
        face,
        nHinges,
        nVerts,
        nums,
        j,
        k

      let name = '',
        number = 0,
        symbol = '',
        dual = ''

      function getLine (i) {
        return lines[i].trim()
      }

      while (i < lines.length) {
        line = getLine(i++)
        if (line === ':net') {
          line = getLine(i++)
          nFaces = parseInt(line.split(' ')[0], 10)
          for (j = 0; j < nFaces; j++) {
            line = getLine(i++).split(' ')
            face = []
            for (k = 1; k < line.length; k++) {
              face.push(parseInt(line[k], 10))
            }
            faces.push(face)
          }
        } else if (line === ':hinges') {
          line = getLine(i++)
          nHinges = parseInt(line, 10)
          for (j = 0; j < nHinges; j++) {
            line = getLine(i++).split(' ')
            hinges.push([
              parseInt(line[0], 10),
              parseInt(line[1], 10),
              parseInt(line[2], 10),
              parseInt(line[3], 10),
              parseFloat(line[4]),
            ])
          }
        } else if (line === ':vertices') {
          line = getLine(i++)
          nums = line.split(' ')
          nVerts = parseInt(nums[nums.length - 1], 10)
          for (j = 0; j < nVerts; j++) {
            line = getLine(i++).replace(/\[.*?\]/g, '').split(' ')
            verts.push([
              parseFloat(line[0]),
              parseFloat(line[1]),
              parseFloat(line[2]),
            ])
          }
        } else if (line === ':name') {
          line = getLine(i++)
          name = line
        } else if (line === ':number') {
          line = getLine(i++)
          number = line
        } else if (line === ':symbol') {
          line = getLine(i++)
          symbol = line
        } else if (line === ':dual') {
          line = getLine(i++)
          dual = line
        }
      }
      let res = {verts, faces, hinges, name, number, symbol, dual}

      return res
    }

    // .................. cosAngle
    function cosAngle (v0, v1, v2) {
      var e1 = v0.clone().sub(v1),
        e2 = v2.clone().sub(v1)
      return e1.dot(e2) / (e1.length() * e2.length())
    }

    // .................. starPentagonShape
    function starPentagonShape (face, verts) {
      var amt,
        mid,
        shape = new THREE.Shape()
      amt = 2 / (3 + Math.sqrt(5))
      shape.moveTo(verts[face[0]].x, verts[face[0]].y)
      mid = verts[face[0]].clone().lerp(verts[face[1]], amt)
      shape.lineTo(mid.x, mid.y)

      shape.lineTo(verts[face[3]].x, verts[face[3]].y)
      mid = verts[face[3]].clone().lerp(verts[face[4]], amt)
      shape.lineTo(mid.x, mid.y)

      shape.lineTo(verts[face[1]].x, verts[face[1]].y)
      mid = verts[face[1]].clone().lerp(verts[face[2]], amt)
      shape.lineTo(mid.x, mid.y)

      shape.lineTo(verts[face[4]].x, verts[face[4]].y)
      mid = verts[face[4]].clone().lerp(verts[face[0]], amt)
      shape.lineTo(mid.x, mid.y)

      shape.lineTo(verts[face[2]].x, verts[face[2]].y)
      mid = verts[face[2]].clone().lerp(verts[face[3]], amt)
      shape.lineTo(mid.x, mid.y)

      return shape
    }

    // .................. regularShape
    function regularShape (face, verts) {
      var shape = new THREE.Shape(),
        m
      shape.moveTo(verts[face[0]].x, verts[face[0]].y)
      for (m = 1; m < face.length; m++) {
        shape.lineTo(verts[face[m]].x, verts[face[m]].y)
      }
      return shape
    }

    // .................. build_tree
    function build_tree (face, side, angle, parent, net) {
      let verts = net.geometry.coordinates
      let faces = net.properties.faces
      let hinges = net.properties.hinges
      let faceColors = net.properties.faceColors.map(d => new THREE.Color(...d)) // arr of rgb arrs
      let lineColors = net.properties.lineColors.map(d => new THREE.Color(...d))
      let renderData = net.properties.renderData

      side = (side === undefined) ? 0 : side
      angle = (angle === undefined) ? Math.PI : angle

      var parentName = (parent === undefined) ? -1 : parent.name,
        thisFace = faces[face],
        interiorAngle = cosAngle(verts[thisFace[0]],
          verts[thisFace[1]],
          verts[thisFace[2]]),
        node = new THREE.Object3D(),
        shape = regularShape(thisFace, verts),
        ax = new THREE.Vector3(),
        s1 = thisFace[side],
        s2 = thisFace[(side + 1) % thisFace.length],
        hinge,
        n

      // this face
      if (thisFace.length === 5 && interiorAngle > 0.5) {
        shape = starPentagonShape(thisFace, verts)
      }

      // ShapeBuffer geometry
      let faceColor = faceColors[face % faceColors.length] // color per face

      //  line
      let faceVerts = thisFace //

      let facepoints = shape.extractPoints().shape
      facepoints.push(facepoints[0]) // _e_ face closing linle

      // -------------- edges

      let lineGeometry = new THREE.Geometry()
      lineGeometry.setFromPoints(facepoints)

      let lineMaterial = new THREE.MeshPhongMaterial({
        wireframeLinewidth: 20,
        vertexColors: THREE.VertexColors,
        flatShading: THREE.FlatShading,
      })

      for (var i = 0; i < faceVerts.length; i++) { // shape verts unclosed
        let idx = faceVerts[i] % lineColors.length
        lineGeometry.colors[ i ] = lineColors[ idx ]
        lineGeometry.colors[ i + 1 ] = lineGeometry.colors[ i ]
      }
      lineMaterial.vertexColors = THREE.VertexColors
      lineMaterial.flatShading = THREE.FlatShading

      node.add(new THREE.Line(lineGeometry, lineMaterial))

      // -------------- faces

      if (0) { // colors
        let shapeGeo = new THREE.ShapeBufferGeometry(shape)
        shapeGeo.colorsNeedUpdate = true

        let shapeMaterial = new THREE.MeshPhongMaterial({
          color: faceColor,
        })

        node.add(new THREE.Mesh(shapeGeo, shapeMaterial))
      } else { // gradient
        let shapeGeo = new THREE.Geometry() // ShapeBufferGeometry
        shapeGeo.setFromPoints(facepoints)

        let shapeMaterial = new THREE.MeshPhongMaterial({
          wireframeLinewidth: 20,
          vertexColors: THREE.VertexColors,
          flatShading: THREE.FlatShading,
        })

        for (var i = 0; i < faceVerts.length; i++) { // shape verts unclosed
          let idx = faceVerts[i] % lineColors.length
          lineGeometry.colors[ i ] = lineColors[ idx ]
          lineGeometry.colors[ i + 1 ] = lineGeometry.colors[ i ]
        }

        node.add(new THREE.Mesh(lineGeometry, shapeMaterial))
      }
      // -------------- user data
      node.name = face
      node.userData = {
        renderData: renderData,
        offset: verts[s1],
        axis: ax.subVectors(verts[s2], verts[s1]).clone().normalize(),
        amount: angle,

      }

      node.matrices = function (d = {}) {
        let t, t1, r, t2, u
        t = d.t
        u = d.u
        let ms = []
        if (u.hasOwnProperty('offset')) {
          t1 = new THREE.Matrix4()
          r = new THREE.Matrix4()
          t2 = new THREE.Matrix4()
          t1.makeTranslation(-u.offset.x, -u.offset.y, -u.offset.z)
          r.makeRotationAxis(u.axis, -t * (Math.PI - u.amount)) // _e_ -y
          t2.makeTranslation(u.offset.x, u.offset.y, u.offset.z)

          ms.push(t1)
          ms.push(r)
          ms.push(t2)
        }
        return ms
      }

      if (parent !== undefined) {
        parent.add(node)
      }

      for (n = 0; n < hinges.length; n++) {
        hinge = hinges[n]
        if (hinge[0] === face && hinge[2] !== parentName) {
          build_tree(hinge[2], hinge[3], hinge[4], node, net)
        } else if (hinge[2] === face && hinge[0] !== parentName) {
          build_tree(hinge[0], hinge[1], hinge[4], node, net)
        }
      }
      return node
    }

    // .................. tree
    // called by r.webgl.threeObjectToScene when multipoint with faces
    let tree = function (net = {}) {
      let [face1, side1] = net.properties.hinges[0]

      return build_tree(face1, side1, Math.PI, undefined, net) // object3D
    }

    // .................. enty
    let enty = function () {}
    enty.parse = parse
    enty.tree = tree

    return enty
  }

  exports.muonNets = muonNets
}))
