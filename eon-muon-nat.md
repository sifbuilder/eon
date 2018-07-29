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
      -m.nat(.natFeature -> m.profier.formion_)

conforms
`   

    sphere
    [-180, 180] => c0 * cos(e0) * c2 * cos(e3)
    [-180, 180] => c1 * sin(e0) * c2 * cos(e3)
    [-180, 180] =>          c3 * sin(e2)

    hyperbole
    [-180, 180] => e0 * c2 * cos(e3)
    [-180, 180] => e1 * e1 * e1 * c2 * cos(e3)
    [-180, 180] =>        c3 * sin(e2)

    flat reticule
    [-180, 180] => e0
    [-180, 180] => 0
    [-180, 180] => e2

    rectantular parabole
    [-180, 180] => e0
    [-180, 180] => e0 * e0
    [-180, 180] => e2

    envelop parabole
    [-180, 180] => e0  * cos(e3)
    [-180, 180] => e0 * e0
    [-180, 180] => sin(e3)

    parabole
    [-180, 180] => e0     * cos(e3)
    [-180, 180] => e0 * e0
    [-180, 180] => e0     * sin(e3)

    spiral
    [-180, 180] => e0     * cos(e3)
    [-180, 180] => e3
    [-180, 180] => e0     * sin(e3)

    papiro
    [-180, 180] => e0     * cos(e3)
    [-180, 180] => sin( 10 * e3)
    [-180, 180] => e0     * sin(e3)

    cup
    [-180, 180] => cos(e0)       * c2 * ( cos(e2))
    [-180, 180] => sin(e0)       * c2 * ( cos(e2))
    [-180, 180] => e2 * e2

    lace
    [-180, 180] => cos(e0)       * c2 * (  cos(e2))
    [-180, 180] => sin(e0)       * c2 * ( cos(e2))
    [-180, 180] => e2

    plane
    [-180, 180] => e1 * e1 * sin(e2)
    [-180, 180] => sin(e0)       * c2 * ( cos(e2))
    [-180, 180] => e2

    cone 'm1': 4, 'm2': 4, 'n1': 2, 'n2': 2, 'n3': 2, 'c0': 1, 'c1': 1,  // circ
    [-180, 180] => e0     * cos(e3)
    [-180, 180] => e0
    [-180, 180] => e0     * sin(e3)

    form "m1":1,"m2":1,"n1":0.5,"n2":0.5,"n3":0.5,"c0":1,"c1":1,  // drop
    [-180, 180] => sqrt(c0 * sin(e0))    * cos(e3)
    [-180, 180] => c0 * sin(e0)
    [-180, 180] => sqrt(c0)     * sin(e3)

    bolt "m1":1,"m2":1,"n1":0.5,"n2":0.5,"n3":0.5,"c0":1,"c1":1,  // drop
    [-180, 180] => sqrt(c0)     *  cos(e3)
    [-180, 180] =>      c0  * sin(e0)
    [-180, 180] => sqrt(c0)     * sin(e3)

    vel "m1":1,"m2":1,"n1":0.5,"n2":0.5,"n3":0.5,"c0":1,"c1":1,  // drop
    [-180, 180] => sqrt(c0 * sin(e0))     *  cos(e3)
    [-180, 180] =>      c0  * sin(e0)
    [-180, 180] => sqrt(c0 * sin(e0))     * sin(e3)

    spil
    [-180, 180] => - e3,
    [-180, 180] =>  e3 * cos(e0),
    [-180, 180] => sin(e0) - 1,
    [-180, 180] =>  1 - sin(e0)

    flat infinite
    [-180, 180] => - 1 - sin(e0),
    [-180, 180] =>  1 - sin(e0) * cos(e0),
    [-180, 180] => sin(e0) - 1,
    [-180, 180] =>  1 - sin(e0)

    cone
    [-180, 180] => - (1 - sin(e0))
    [-180, 180] =>   (1 - sin(e0)) * cos(e3),
    [-180, 180] => (1 - sin(e0)) * sin(e3),
    [-180, 180] =>  1 - sin(e0)

    flat drop
    [-180, 180] => (sin(e0) -1),
    [-180, 180] => - (sin(e0) -1) * cos(e0),
    [-180, 180] => (sin(e0) - 1),
    [-180, 180] => (sin(e0) - 1),

    vol drop
    [-180, 180] => (sin(e0) - 1),
    [-180, 180] => - (sin(e0) - 1) * cos(e0) * cos(e3),
    [-180, 180] => - (sin(e0) - 1) * cos(e0) * sin(e3),
    [-180, 180] => (sin(e0) - 1),

    
`      
      
      
# license
MIT