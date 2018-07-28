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
`   sphere
    [-180, 180] => a * cos(r) * c * cos(v)
    [-180, 180] => b * sin(r) * c * cos(v)
    [-180, 180] =>                       d * sin(u)

    hyperbole
    [-180, 180] => r * c * cos(v)
    [-180, 180] => s * s * s * c * cos(v)
    [-180, 180] =>                       d * sin(u)

    flat reticule
    [-180, 180] => r
    [-180, 180] => 0
    [-180, 180] => u

    rectantular parabole
    [-180, 180] => r
    [-180, 180] => r * r
    [-180, 180] => u

    envelop parabole
    [-180, 180] => r  * cos(v)
    [-180, 180] => r * r
    [-180, 180] => sin(v)

    parabole
    [-180, 180] => r     * cos(v)
    [-180, 180] => r * r
    [-180, 180] => r     * sin(v)

    spiral
    [-180, 180] => r     * cos(v)
    [-180, 180] => v
    [-180, 180] => r     * sin(v)

    papiro
    [-180, 180] => r     * cos(v)
    [-180, 180] => sin( 10 * v)
    [-180, 180] => r     * sin(v)

    cup
    [-180, 180] => cos(r)       * c * ( cos(u))
    [-180, 180] => sin(r)       * c * ( cos(u))
    [-180, 180] => u * u

    lace
    [-180, 180] => cos(r)       * c * (  cos(u))
    [-180, 180] => sin(r)       * c * ( cos(u))
    [-180, 180] => u

    plane
    [-180, 180] => s * s * sin(u)
    [-180, 180] => sin(r)       * c * ( cos(u))
    [-180, 180] => u

    cone
    [-180, 180] => q     * cos(v)
    [-180, 180] => q
    [-180, 180] => q     * sin(v)
`      
      
      
# license
MIT