/******************************************
  *       @muonLindes
  *
  **/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.muonLindes = global.muonLindes || {})))
}(this, function (exports) {
  'use strict'

  async function muonLindes (__eo) {
    let items = {

      dragon: {
        linden: {
          axiom: 'FX',
          loops: 8,
          rules: {
            Y: '+FX--FY+',
            X: '-FX++FY-',
          },
        },
        mayer: {
          side: 2,
          angle: 45,
          angstart: 45,
          start: [-100, -100],
        },
      },

      fass1: {
        linden: {
          axiom: '-L',
          loops: 8,
          rules: {
            Y: '+FX--FY+',
            X: '-FX++FY-',
          },
        },
        mayer: {
          side: 2,
          angle: 90,
          angstart: 90,
          start: [-100, -100],
        },
      },

      gosper: {
        linden: {
          axiom: '-FR',
          loops: 3,
          rules: {
            L: 'FLFL-FR-FR+FL+FL-FR-FRFL+FR+FLFLFR-FL+FR+FLFL+FR-FLFR-FR-FL+FL+FRFR-',
            R: '+FLFL-FR-FR+FL+FLFR+FL-FRFR-FL-FR+FLFRFR-FL-FRFL+FL+FR-FR-FL+FL+FRFR',
          },
        },
        mayer: {
          side: 2,
          angle: 90,
          start: [-100, -100],
        },
      },

      gosper2: {
        linden: {
          axiom: 'F++F++F++F',
          loops: 7,
          rules: {
            F: 'F+F-F',
          },
        },
        mayer: {
          side: 2,
          angle: 45,
          start: [-100, -100],
        },
      },

      koch3: {
        linden: {
          axiom: '-F--F--F',
          loops: 5,
          rules: {
            F: 'F+F--F+F',
          },
        },
        mayer: {
          side: 2,
          angle: 60,
          angstart: 0,
          start: [0, 0],
        },
      },

      koch4: {
        linden: {
          axiom: 'F ',
          loops: 5,
          rules: {
            F: 'F[+F][-F]',
          },
        },
        mayer: {
          side: 2,
          angle: 20,
          angstart: 0,
          start: [0, 0],
          randomizeStep: 20, // %
          randomizeAngle: 20, // %
        },
      },

      lawrence: {
        linden: {
          axiom: 'W',
          loops: 7,
          rules: {
            W: '+++X--F--ZFX+',
            X: '---W++F++YFW-',
            Y: '+ZFX--F--Z+++',
            Z: '-YFW++F++Y---',
          },
        },
        mayer: {
          side: 2,
          angle: 30,
          angstart: 30,
          start: [0, 0],
        },
      },

      penrose1: {
        linden: {
          axiom: '+WF--XF---YF--ZF',
          loops: 0,
          rules: {
            W: 'YF++ZF----XF[-YF----WF]++',
            X: '+YF--ZF[---WF--XF]+',
            Y: '-WF++XF[+++YF++ZF]-',
            Z: '--YF++++WF[+ZF++++XF]--XF',
          },
        },
        mayer: {
          side: 6,
          angle: 36,
          angstart: 0,
          start: [-100, -100],
        },
      },
      penrose2: {
        linden: {
          axiom: '[N]++[N]++[N]++[N]++[N]',
          loops: 4,
          rules: {
            M: 'OF++PF----NF[-OF----MF]++',
            N: '+OF--PF[---MF--NF]+',
            O: '-MF++NF[+++OF++PF]-',
            P: '--OF++++MF[+PF++++NF]--NF',
            F: '',
          },
        },
        mayer: {
          side: 24,
          angle: 36,
          angstart: 0,
          start: [0, 0],
        },
      },
      plant1: {
        linden: {
          axiom: 'X',
          loops: 3,
          rules: {
            X: 'F[-X]F[-X]+F[X]',
            F: 'FF',
          },
        },
        mayer: {
          side: 6,
          angle: 36,
          startAngle: 0,
          start: [-100, -100],
        },
      },
      sierpinski: {
        linden: {
          axiom: 'F',
          loops: 8,
          rules: {
            F: 'f+F+f',
            f: 'F-f-F',
          },
        },
        mayer: {
          side: 2,
          angle: 60,
          start: [-100, -100],
        },
      },

      sierpinski2: {
        linden: {
          axiom: 'FXF--FF--FF',
          loops: 6,
          rules: {
            F: 'FF',
            X: '--FXF++FXF++FXF--',
          },
        },
        mayer: {
          side: 6,
          angle: 60,
          startAngle: 0,
          start: [-100, -100],
        },
      },

      snake: {
        linden: {
          axiom: 'FL',
          loops: 3,
          rules: {
            L: 'FL-FR--FR+FL++FLFL+FR-',
            R: '+FL-FRFR--FR-FL++FL+FR',
          },
        },
        mayer: {
          side: 4,
          angle: 60,
          startAngle: 0,
          start: [-100, -100],
        },
      },

      treegrid: {
        linden: {
          axiom: 'X',
          loops: 3,
          rules: {
            X: 'FY[+FY][--FY]FY',
            F: 'FX[++FX][-FX]FX',
          },
        },
        mayer: {
          side: 6,
          angle: 60,
          startAngle: 0,
          start: [-100, -100],
        },
      },

    }
    // ............................. enty
    let enty = {}
    enty.items = items
    enty.anima = _ => items[_] !== undefined ? items[_] : null
    return enty
  }

  exports.muonLindes = muonLindes
}))
