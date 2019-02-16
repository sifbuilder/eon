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

    // .................. parse
    // https://raw.githubusercontent.com/paaatrick/polyhedra-folding/master/js/PolyLoader.js
    let parse = function (props = {}) {
      let text = props.text
      var scope = this,
        verts = [],
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
            verts.push(new THREE.Vector3(
              parseFloat(line[0]),
              parseFloat(line[1]),
              parseFloat(line[2])
            ))
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

    // .................. duce
    let duce = function (props = {}) {
      let colors = props.colors || []
      if (colors.length === 0) colors = Array.of(new THREE.Color().setHSL(0.00, 0.89, 0.33))


      let {verts, faces , hinges } = props.net

      function cosAngle (v0, v1, v2) {
        var e1 = v0.clone().sub(v1),
          e2 = v2.clone().sub(v1)
        return e1.dot(e2) / (e1.length() * e2.length())
      }

      function starPentagonShape (face) {
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

      function regularShape (face) {
        var shape = new THREE.Shape(),
          m
        shape.moveTo(verts[face[0]].x, verts[face[0]].y)
        for (m = 1; m < face.length; m++) {
          shape.lineTo(verts[face[m]].x, verts[face[m]].y)
        }
        return shape
      }

      function build_tree (face, side, angle, parent) {
        side = (side === undefined) ? 0 : side
        angle = (angle === undefined) ? Math.PI : angle

        var parentName = (parent === undefined) ? -1 : parent.name,
          thisFace = faces[face],
          interiorAngle = cosAngle(verts[thisFace[0]],
            verts[thisFace[1]],
            verts[thisFace[2]]),
          node = new THREE.Object3D(),
          shape = regularShape(thisFace),
          mat = new THREE.MeshPhongMaterial({vertexColors: THREE.FaceColors}),
          ax = new THREE.Vector3(),
          s1 = thisFace[side],
          s2 = thisFace[(side + 1) % thisFace.length],
          hinge,
          n

        let lineGeometry = new THREE.Geometry()
        lineGeometry.setFromPoints(shape.extractPoints().shape)
        node.add(new THREE.Line(lineGeometry))
        if (thisFace.length === 5 && interiorAngle > 0.5) {
          shape = starPentagonShape(thisFace) // star-pentagon special case
        }

        var geo = new THREE.ShapeGeometry(shape)
        for (var i = 0; i < geo.faces.length; i++) {
          let idx = (thisFace.length - 3) % colors.length // _e_
          geo.faces[i].color = colors[idx] // scope : this
        }

        node.add(new THREE.Mesh(geo, mat))
        node.name = face
        node.userData = {
          offset: verts[s1],
          axis: ax.subVectors(verts[s2], verts[s1]).clone().normalize(),
          amount: angle,
        }
        if (parent !== undefined) {
          parent.add(node)
        }

        for (n = 0; n < hinges.length; n++) {
          hinge = hinges[n]
          if (hinge[0] === face && hinge[2] !== parentName) {
            build_tree(hinge[2], hinge[3], hinge[4], node)
          } else if (hinge[2] === face && hinge[0] !== parentName) {
            build_tree(hinge[0], hinge[1], hinge[4], node)
          }
        }
        return node
      }
      return  build_tree(hinges[0][0]) // bject3D
    }

    // .................. update_matrices anima
    var update_matrices = function (root, t = 0) {
      let that = {}
      that.amount = t

      var t1, r, t2, m, u, c
      if (root === undefined) {
        return
      }
      root.traverse(function (obj) {
        u = obj.userData
        if (u.hasOwnProperty('offset')) {
          t1 = new THREE.Matrix4()
          r = new THREE.Matrix4()
          t2 = new THREE.Matrix4()
          m = new THREE.Matrix4()
          t1.makeTranslation(-u.offset.x, -u.offset.y, -u.offset.z)
          r.makeRotationAxis(u.axis, -that.amount * (Math.PI - u.amount)) // _e_ -y
          t2.makeTranslation(u.offset.x, u.offset.y, u.offset.z)
          m.multiplyMatrices(t2, r).multiply(t1)
          obj.matrix = m
          obj.matrixAutoUpdate = false
          obj.matrixWorldNeedsUpdate = true
        }
      })

      let target = new THREE.Vector3()
      c = new THREE.Box3().setFromObject(root).getCenter(target)
      root.matrix.multiply(new THREE.Matrix4().makeTranslation(-c.x, -c.y, -c.z))
      root.matrixAutoUpdate = false
      root.matrixWorldNeedsUpdate = true

      return root
    }

    // .................. enty
    let enty = function () {}
    enty.parse = parse
    enty.duce = duce
    enty.update_matrices = update_matrices

    return enty
  }

  exports.muonNets = muonNets
}))
