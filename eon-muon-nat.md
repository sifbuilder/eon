# eon-muon-nat
**returns nat mesh**

ref: isSame: http://adripofjavascript.com/blog/drips/object-equality-in-javascript.html

### properties

### methods
natFeature
`coordinates = Array.of(__mapper("xs").m("nat").natFeature(p.form))`

rador
 seg5 unit circle rador
 
radorm
 called by p.natform
 
natNform
 compleate form for natform

natVertex
  called by g.natVertex.pointStream to build nat conform point stream
  calls m.nat.radorm
  
natprojection
  returns d3 geo nat projection
  calls p.nat
  breaks circularity m.profier(.natfion --> p.natform)
      -p.nat(.natprofion -> .pointStream -> m.nat.natVertex)
      -m.nat(.natFeature -> m.profier.formion)

conforms
`   
    net
    'fn0': (e,c) => c[0] * e[0] * c[3] * cos(e[3])
    'fn0': (e, c) => (1 / Math.exp(Math.abs(e[1] / 2))) * cos(9 * e[1]),
    'fn0': (e,c) => c[0] * e[0] * c[3] * sin(e[3])
    'fn0': (e,c) => 1
          
    sphere          
    'fn0': (e,c) => c[0] * cos(e[0]) * c[3] * cos(e[3])
    'fn0': (e,c) => c[0] * sin(e[0]) * c[3] * cos(e[3])
    'fn0': (e,c) => c[3] * sin(e[3])
    'fn0': (e,c) => c[3] * cos(e[3])          
          
    sphere
    [-180, 180] => c[0] * cos(e[0]) * c[2] * cos(e[3])
    [-180, 180] => c[1] * sin(e[0]) * c[2] * cos(e[3])
    [-180, 180] =>          c[3] * sin(e[2])
    [-180, 180] =>          c[3] * cos(e[2])

    hyperbole
    [-180, 180] => e[0] * c[2] * cos(e[3])
    [-180, 180] => e[1] * e[1] * e[1] * c[2] * cos(e[3])
    [-180, 180] =>        c[3] * sin(e[2])

    flat reticule
    [-180, 180] => e[0]
    [-180, 180] => 0
    [-180, 180] => e[2]

    rectantular parabole
    [-180, 180] => e[0]
    [-180, 180] => e[0] * e[0]
    [-180, 180] => e[2]

    envelop parabole
    [-180, 180] => e[0]  * cos(e[3])
    [-180, 180] => e[0] * e[0]
    [-180, 180] => sin(e[3])

    parabole
    [-180, 180] => e[0]     * cos(e[3])
    [-180, 180] => e[0] * e[0]
    [-180, 180] => e[0]     * sin(e[3])

    spiral
    [-180, 180] => e[0]     * cos(e[3])
    [-180, 180] => e[3]
    [-180, 180] => e[0]     * sin(e[3])

    papiro
    [-180, 180] => e[0]     * cos(e[3])
    [-180, 180] => sin( 10 * e[3])
    [-180, 180] => e[0]     * sin(e[3])

    cup
    [-180, 180] => cos(e[0])       * c[2] * ( cos(e[2]))
    [-180, 180] => sin(e[0])       * c[2] * ( cos(e[2]))
    [-180, 180] => e[2] * e[2]

    lace
    [-180, 180] => cos(e[0])       * c[2] * (  cos(e[2]))
    [-180, 180] => sin(e[0])       * c[2] * ( cos(e[2]))
    [-180, 180] => e[2]

    plane
    [-180, 180] => e[1] * e[1] * sin(e[2])
    [-180, 180] => sin(e[0])       * c[2] * ( cos(e[2]))
    [-180, 180] => e[2]

    cone 'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'c[0]': 1, 'c[1]': 1,  // circ
    [-180, 180] => e[0]     * cos(e[3])
    [-180, 180] => e[0]
    [-180, 180] => e[0]     * sin(e[3])

    form "m1":1,"m2":1,"n1":0.5,"n2":0.5,"n3":0.5,"c[0]":1,"c[1]":1,  // drop
    [-180, 180] => sqrt(c[0] * sin(e[0]))    * cos(e[3])
    [-180, 180] => c[0] * sin(e[0])
    [-180, 180] => sqrt(c[0])     * sin(e[3])

    bolt "m1":1,"m2":1,"n1":0.5,"n2":0.5,"n3":0.5,"c[0]":1,"c[1]":1,  // drop
    [-180, 180] => sqrt(c[0])     *  cos(e[3])
    [-180, 180] =>      c[0]  * sin(e[0])
    [-180, 180] => sqrt(c[0])     * sin(e[3])

    vel "m1":1,"m2":1,"n1":0.5,"n2":0.5,"n3":0.5,"c[0]":1,"c[1]":1,  // drop
    [-180, 180] => sqrt(c[0] * sin(e[0]))     *  cos(e[3])
    [-180, 180] =>      c[0]  * sin(e[0])
    [-180, 180] => sqrt(c[0] * sin(e[0]))     * sin(e[3])

    spil
    [-180, 180] => - e[3],
    [-180, 180] =>  e[3] * cos(e[0]),
    [-180, 180] => sin(e[0]) - 1,
    [-180, 180] =>  1 - sin(e[0])

    flat infinite
    [-180, 180] => - 1 - sin(e[0]),
    [-180, 180] =>  1 - sin(e[0]) * cos(e[0]),
    [-180, 180] => sin(e[0]) - 1,
    [-180, 180] =>  1 - sin(e[0])

    cone
    [-180, 180] => - (1 - sin(e[0]))
    [-180, 180] =>   (1 - sin(e[0])) * cos(e[3]),
    [-180, 180] => (1 - sin(e[0])) * sin(e[3]),
    [-180, 180] =>  1 - sin(e[0])

    flat drop
    [-180, 180] => (sin(e[0]) -1),
    [-180, 180] => - (sin(e[0]) -1) * cos(e[0]),
    [-180, 180] => (sin(e[0]) - 1),
    [-180, 180] => (sin(e[0]) - 1),

    // vol drop fn
    // [-180, 180] => (sin(q) - 1),
    // [-180, 180] => - (sin(q) - 1) * cos(q) * cos(v),
    // [-180, 180] => - (sin(q) - 1) * cos(q) * sin(v),
    // [-180, 180] => (sin(q) - 1),

    // vol drop nat
    // [-180, 180] => a * cos(q) * c * cos(v),    // drop
    // [-180, 180] ==> b * sin(q) * c * cos(v),  // drop
    // [-90, 90] => d * sin(u),  // circ
    // [-90, 90] => v,   // circ

    // vol drop nat
    // [-180, 180] => a * cos(q),    // drop
    // [-180, 180] == > b * sin(q) *  cos(v),  // drop
    // [-90, 90] => b * sin(q) *  sin(v),  // drop
    // [-90, 90] => v,   // drop

    
`      
      
      
# license
MIT