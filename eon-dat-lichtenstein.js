/**********************
 *      @datLichtenstein
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports)
    : typeof define === 'function' && define.amd ? define(['exports'], factory)
      : (factory((global.datLichtenstein = global.datLichtenstein || {})))
}(this, function (exports) {
  'use strict'

  var datLichtenstein = function (__mapper = {}) {
    let data = {

      width: '2.33333in', height: '1.75in',
      viewBox: '0 0 700 525',
      path: {
        id: 'licht',
        fill: 'none', stroke: 'black', strokeWidth: '1',
        d: `M 420.58,19.79
           C 420.58,19.79 398.04,71.79 398.04,71.79
             398.04,71.79 389.58,96.79 389.58,96.79
             389.58,96.79 406.58,94.95 406.58,94.95
             419.58,93.67 432.60,93.46 445.59,94.95
             454.88,96.00 464.11,97.28 473.16,99.70
             473.16,99.70 490.58,104.79 490.58,104.79
             490.58,104.79 496.58,107.79 496.58,107.79
             496.58,107.79 510.58,119.79 510.58,119.79
             522.09,115.92 536.71,104.93 546.56,97.50
             549.88,95.00 556.35,87.49 559.58,86.79
             560.33,84.34 569.51,75.47 571.88,72.62
             578.63,64.51 583.85,56.03 586.58,45.79
             586.58,45.79 580.47,48.09 578.58,50.79
             572.99,50.51 567.86,53.62 562.57,55.17
             562.57,55.17 541.58,59.51 541.58,59.51
             524.48,62.15 506.84,62.53 489.58,61.75
             489.58,61.75 478.58,60.79 478.58,60.79
             478.58,60.79 487.58,55.79 487.58,55.79
             487.58,55.79 476.58,54.75 476.58,54.75
             476.58,54.75 467.58,54.75 467.58,54.75
             467.58,54.75 452.58,53.79 452.58,53.79
             443.40,53.77 415.58,47.79 415.58,47.79
             415.58,47.79 448.59,40.40 448.59,40.40
             448.59,40.40 461.58,36.90 461.58,36.90
             465.76,35.97 478.19,32.94 480.58,29.79
             489.19,29.94 497.67,22.39 503.58,21.79
             503.58,21.79 515.54,14.09 515.54,14.09
             515.54,14.09 531.58,-0.21 531.58,-0.21
             531.58,-0.21 488.58,-0.21 488.58,-0.21
             475.83,-0.19 448.76,6.29 436.58,10.99
             436.58,10.99 420.58,19.79 420.58,19.79 Z
           M 577.22,138.45
           C 577.22,138.45 569.22,140.45 569.22,140.45
             573.86,133.57 579.08,130.16 580.22,121.45
             571.13,123.59 563.66,130.54 554.22,128.45
             562.88,120.61 572.47,111.21 577.22,100.45
             577.22,100.45 554.93,113.74 554.93,113.74
             554.93,113.74 525.22,129.45 525.22,129.45
             527.41,135.74 535.01,141.25 539.82,145.91
             549.81,155.58 548.82,157.21 562.47,166.99
             565.47,169.14 569.14,171.41 572.65,172.56
             576.37,173.79 579.57,172.97 580.22,177.45
             580.22,177.45 586.22,183.45 586.22,183.45
             580.67,186.63 572.45,187.80 566.31,185.60
             566.31,185.60 559.18,181.53 559.18,181.53
             559.18,181.53 553.48,179.48 553.48,179.48
             553.48,179.48 548.10,175.35 548.10,175.35
             548.10,175.35 538.06,171.51 538.06,171.51
             531.86,168.89 526.01,165.82 520.22,162.41
             515.24,159.48 510.91,154.51 506.22,153.45
             506.22,153.45 507.22,150.45 507.22,150.45
             507.22,150.45 495.18,141.05 495.18,141.05
             495.18,141.05 478.22,143.38 478.22,143.38
             478.22,143.38 458.22,144.36 458.22,144.36
             458.22,144.36 446.22,141.45 446.22,141.45
             455.53,141.37 479.39,136.59 486.22,130.45
             465.59,114.04 443.55,103.90 417.22,101.37
             407.03,100.27 409.06,101.39 400.22,101.37
             397.20,101.47 392.14,101.32 389.52,102.88
             385.86,105.07 384.51,114.46 383.76,118.45
             382.07,127.41 376.26,139.84 386.39,145.50
             388.44,146.65 392.69,150.61 395.22,152.45
             395.22,152.45 393.22,143.45 393.22,143.45
             403.89,141.71 401.99,154.59 410.22,160.45
             409.81,151.64 408.41,154.50 411.22,145.45
             411.22,145.45 419.22,150.45 419.22,150.45
             418.46,154.87 419.27,155.55 421.22,159.45
             426.04,158.11 425.74,159.22 430.22,160.45
             430.43,151.22 437.85,156.32 439.22,164.45
             439.22,164.45 463.20,173.32 463.20,173.32
             468.58,175.41 485.30,184.52 490.18,187.80
             496.12,191.78 504.24,196.44 503.22,204.45
             503.22,204.45 492.22,196.45 492.22,196.45
             492.22,196.45 477.22,190.45 477.22,190.45
             474.81,186.77 472.80,187.27 469.05,185.67
             469.05,185.67 456.13,179.98 456.13,179.98
             456.13,179.98 448.22,178.45 448.22,178.45
             448.22,178.45 452.22,183.45 452.22,183.45
             452.22,183.45 455.22,187.45 455.22,187.45
             455.22,187.45 456.22,183.45 456.22,183.45
             456.22,183.45 469.28,195.53 469.28,195.53
             469.28,195.53 477.22,205.45 477.22,205.45
             477.22,205.45 476.22,208.45 476.22,208.45
             478.68,211.34 478.28,215.91 478.10,219.49
             477.47,225.48 476.70,231.56 478.10,237.45
             478.10,237.45 471.22,233.45 471.22,233.45
             467.05,236.41 460.48,240.98 458.22,245.45
             458.22,245.45 459.22,249.45 459.22,249.45
             459.22,249.45 441.13,240.59 441.13,240.59
             441.13,240.59 434.39,237.49 434.39,237.49
             430.33,235.34 424.65,231.49 420.22,231.45
             420.22,231.45 406.32,223.45 402.22,220.88
             396.30,217.18 391.16,214.03 386.05,209.15
             379.97,203.33 371.22,192.45 371.22,192.45
             366.91,197.16 365.10,210.95 363.97,217.45
             360.71,236.18 358.52,250.18 352.48,268.45
             345.37,289.93 332.29,309.50 316.60,325.65
             316.60,325.65 301.13,339.87 301.13,339.87
             298.38,342.15 294.31,344.59 292.49,347.55
             289.05,353.16 291.30,357.18 290.68,361.45
             290.68,361.45 289.44,366.45 289.44,366.45
             289.44,366.45 284.86,387.28 284.86,387.28
             283.42,392.18 283.77,394.52 280.22,398.45
             280.19,402.81 278.56,403.65 276.83,407.45
             274.17,413.27 267.72,425.42 263.22,429.45
             262.22,433.48 257.45,437.88 254.22,440.45
             252.92,445.26 240.94,454.01 236.22,456.45
             240.57,467.84 254.52,486.43 262.06,496.49
             266.27,502.10 269.89,509.00 276.22,512.45
             276.86,517.19 285.22,524.45 285.22,524.45
             285.22,524.45 326.22,525.00 326.22,525.00
             326.22,525.00 405.22,525.00 405.22,525.00
             405.22,525.00 407.22,517.45 407.22,517.45
             407.22,517.45 414.22,525.00 414.22,525.00
             415.26,522.50 419.15,521.22 421.64,519.40
             426.82,515.62 439.55,508.20 442.22,503.45
             442.22,503.45 444.22,504.45 444.22,504.45
             444.22,504.45 469.14,486.08 469.14,486.08
             469.14,486.08 479.22,477.45 479.22,477.45
             483.52,476.94 495.82,468.18 498.22,464.45
             498.22,464.45 519.06,452.95 527.79,447.87
             527.79,447.87 551.22,431.45 551.22,431.45
             551.22,431.45 558.79,421.44 558.79,421.44
             558.79,421.44 573.22,400.45 573.22,400.45
             573.22,400.45 582.22,381.45 582.22,381.45
             582.22,381.45 589.50,359.45 589.50,359.45
             590.47,356.78 592.98,351.62 592.57,348.89
             591.95,344.80 584.92,341.62 581.64,339.49
             581.64,339.49 558.26,326.95 558.26,326.95
             558.26,326.95 544.22,317.45 544.22,317.45
             544.22,317.45 538.22,332.45 538.22,332.45
             538.22,332.45 533.30,352.45 533.30,352.45
             531.84,359.30 529.00,379.48 526.08,384.28
             523.26,388.92 514.45,394.27 513.00,395.91
             511.33,397.79 510.51,402.02 505.18,405.64
             500.62,408.73 491.76,411.53 486.22,411.08
             484.00,410.96 481.68,410.20 479.50,411.08
             474.92,412.78 466.83,424.97 464.22,429.45
             464.22,429.45 461.22,426.45 461.22,426.45
             461.22,426.45 464.55,418.46 464.55,418.46
             464.55,418.46 470.22,405.45 470.22,405.45
             470.22,405.45 471.22,400.45 471.22,400.45
             466.02,399.09 458.22,402.45 458.22,402.45
             458.22,402.45 451.23,413.37 451.23,413.37
             450.45,414.45 449.10,416.16 447.58,415.83
             444.89,415.27 447.11,409.92 447.58,408.45
             450.04,401.48 454.15,397.57 461.22,395.30
             464.84,394.13 470.87,394.47 474.93,394.27
             474.93,394.27 505.20,391.17 505.20,391.17
             510.75,389.73 514.57,389.84 518.85,385.19
             523.18,380.48 523.94,373.98 525.05,368.03
             525.05,368.03 526.91,360.45 526.91,360.45
             526.91,360.45 529.74,340.49 529.74,340.49
             530.33,335.30 530.04,328.74 533.22,324.45
             533.22,324.45 535.22,313.45 535.22,313.45
             535.22,313.45 548.68,297.14 553.09,293.61
             557.00,290.47 560.26,289.73 563.22,285.45
             563.22,285.45 578.23,280.13 578.23,280.13
             578.23,280.13 605.22,268.45 605.22,268.45
             603.95,269.90 600.45,273.32 600.54,275.26
             600.63,277.26 609.09,282.26 611.02,283.73
             618.92,289.72 624.49,294.15 625.22,304.45
             625.22,304.45 618.01,297.19 618.01,297.19
             614.35,294.24 600.78,286.38 596.22,284.23
             589.64,281.13 584.56,278.71 580.22,286.45
             587.80,288.36 593.21,294.20 599.22,298.75
             607.47,304.99 611.42,307.06 621.22,310.19
             623.38,310.89 625.96,312.04 628.22,312.03
             632.69,312.03 640.95,308.24 643.22,304.45
             643.22,304.45 645.22,306.45 645.22,306.45
             645.22,306.45 670.22,292.90 670.22,292.90
             672.66,291.57 678.77,288.94 679.50,286.13
             680.36,282.81 674.46,278.71 672.05,277.09
             672.05,277.09 649.18,267.14 649.18,267.14
             643.99,264.10 641.22,259.45 635.22,258.45
             634.83,255.11 635.04,254.41 632.20,252.45
             632.20,252.45 632.20,246.16 632.20,246.16
             632.40,243.01 636.26,234.26 637.98,231.47
             639.55,228.92 641.88,225.25 645.26,227.39
             650.75,230.86 651.18,242.65 659.22,247.15
             668.55,252.38 687.34,254.05 699.22,266.45
             700.94,262.10 700.22,253.40 700.22,248.45
             700.22,248.45 700.22,210.45 700.22,210.45
             700.22,204.75 700.22,184.45 700.22,184.45
             700.22,184.45 681.22,204.27 681.22,204.27
             681.22,204.27 676.22,204.27 676.22,204.27
             678.67,200.59 681.14,187.06 680.22,182.45
             676.55,183.50 676.32,183.78 675.22,187.45
             675.22,187.45 666.22,195.45 666.22,195.45
             664.84,198.39 653.88,207.09 653.15,206.17
             650.76,203.18 654.23,197.75 656.22,195.45
             656.22,195.45 656.22,189.45 656.22,189.45
             658.46,187.62 659.70,182.32 660.47,179.46
             662.70,171.24 664.49,161.96 664.09,153.45
             663.91,149.72 664.18,146.00 661.22,143.45
             661.22,143.45 660.22,136.45 660.22,136.45
             660.22,136.45 647.92,146.16 643.22,150.27
             643.22,150.27 626.39,165.02 626.39,165.02
             621.11,170.04 614.51,175.97 607.22,177.45
             608.61,170.74 613.98,165.34 618.07,160.05
             622.22,154.68 626.09,148.97 631.22,144.45
             631.22,144.45 643.61,125.03 643.61,125.03
             643.61,125.03 652.22,108.45 652.22,108.45
             652.22,108.45 657.04,83.45 657.04,83.45
             657.04,83.45 655.32,62.45 655.32,62.45
             655.32,62.45 651.22,46.45 651.22,46.45
             646.61,48.97 646.13,51.97 643.77,56.45
             643.77,56.45 634.00,73.45 634.00,73.45
             625.83,88.75 608.13,112.49 595.82,124.57
             590.41,129.87 585.04,137.04 577.22,138.45 Z
           M 326.24,93.91
           C 326.24,93.91 308.24,108.40 308.24,108.40
             308.24,108.40 285.23,120.73 285.23,120.73
             285.23,120.73 253.26,142.20 253.26,142.20
             253.26,142.20 232.00,160.95 232.00,160.95
             232.00,160.95 215.52,182.28 208.24,188.91
             208.24,188.91 204.24,202.91 204.24,202.91
             201.46,205.15 201.54,208.57 201.09,211.91
             200.15,218.81 199.09,223.73 199.26,230.91
             199.26,230.91 201.09,244.00 201.09,244.00
             204.65,268.74 206.45,266.57 215.24,287.91
             219.73,287.10 225.59,285.85 228.24,281.91
             233.93,281.56 244.05,275.70 245.24,269.91
             252.73,266.29 252.70,261.34 258.24,255.91
             258.24,255.91 260.24,250.91 260.24,250.91
             260.24,250.91 262.24,244.91 262.24,244.91
             262.24,244.91 263.53,230.91 263.53,230.91
             263.53,230.91 263.53,218.91 263.53,218.91
             263.53,218.91 262.24,205.91 262.24,205.91
             272.93,211.30 280.50,221.69 286.24,231.91
             286.24,231.91 297.67,212.91 297.67,212.91
             297.67,212.91 311.98,191.91 311.98,191.91
             311.98,191.91 327.87,171.00 327.87,171.00
             327.87,171.00 335.82,160.91 335.82,160.91
             335.82,160.91 350.24,141.91 350.24,141.91
             357.81,119.18 359.12,94.54 361.96,70.91
             361.96,70.91 364.24,53.91 364.24,53.91
             359.47,55.87 358.80,57.35 355.22,60.84
             343.88,71.86 336.28,87.40 326.24,93.91 Z
           M 522.09,215.55
           C 522.09,215.55 522.75,222.27 522.75,222.27
             522.68,229.59 517.38,242.81 511.09,246.55
             511.09,246.55 516.09,218.55 516.09,218.55
             516.09,218.55 522.09,215.55 522.09,215.55 Z
           M 522.73,245.27
           C 521.40,254.49 513.58,271.11 503.73,273.27
             503.73,273.27 512.96,250.76 516.07,247.99
             518.36,245.96 519.85,245.71 522.73,245.27 Z
           M 469.73,317.55
           C 464.28,324.97 454.42,329.21 445.73,331.55
             446.36,329.43 446.44,328.55 448.04,326.81
             449.96,324.71 462.95,316.83 465.73,316.64
             467.44,316.52 468.23,317.04 469.73,317.55 Z
           M 479.00,321.00
           C 476.73,328.54 468.69,331.40 462.00,334.00
             461.43,326.44 472.63,321.87 479.00,321.00 Z
           M 494.91,323.18
           C 494.91,323.18 492.91,328.18 492.91,328.18
             492.91,328.18 479.91,334.18 479.91,334.18
             479.91,334.18 477.91,330.18 477.91,330.18
             483.62,325.73 486.94,321.36 494.91,323.18 Z
           M 479.58,372.03
           C 479.58,372.03 472.58,370.23 472.58,370.23
             472.58,370.23 460.58,366.14 460.58,366.14
             460.58,366.14 455.58,366.14 455.58,366.14
             455.58,366.14 451.58,368.03 451.58,368.03
             448.31,373.91 443.28,371.49 437.58,371.03
             437.58,371.03 439.58,364.03 439.58,364.03
             445.60,362.91 449.05,360.33 455.58,360.07
             464.46,359.71 476.38,362.87 479.58,372.03 Z
           M 451.25,473.43
           C 451.25,473.43 443.25,474.43 443.25,474.43
             440.94,486.79 434.37,491.10 422.25,493.21
             417.76,493.99 405.86,493.98 404.25,498.43
             404.25,498.43 403.25,500.43 403.25,500.43
             396.28,503.38 396.21,501.99 389.25,502.43
             380.96,488.84 356.82,474.81 343.25,465.43
             343.25,465.43 347.25,459.43 347.25,459.43
             345.22,456.28 339.84,446.80 338.73,443.42
             335.77,434.42 336.25,420.94 336.25,411.43
             336.25,411.43 390.25,407.43 390.25,407.43
             390.25,407.43 402.25,408.35 402.25,408.35
             411.78,409.01 421.16,409.89 430.25,413.13
             435.98,415.18 440.41,417.57 444.45,422.23
             444.45,422.23 449.80,429.75 449.80,429.75
             452.25,431.86 457.77,432.21 464.06,436.50
             471.68,441.70 472.48,452.92 468.45,460.65
             465.38,466.53 456.16,468.89 451.25,473.43 Z
           M 2.17,468.00
           C 2.17,468.00 2.17,523.00 2.17,523.00
             2.17,523.00 112.17,523.00 112.17,523.00
             110.48,517.23 109.75,513.23 106.46,508.00
             93.58,487.58 71.15,487.08 50.17,481.26
             50.17,481.26 2.17,468.00 2.17,468.00 Z
           M 144.83,504.50
           C 144.83,504.50 163.83,518.50 163.83,518.50
             165.07,524.95 169.08,525.46 174.83,525.50
             178.47,525.52 188.92,525.81 191.83,524.96
             195.78,523.79 200.45,520.48 204.00,518.38
             207.93,516.07 211.27,515.57 213.83,511.50
             213.83,511.50 222.85,507.85 222.85,507.85
             222.85,507.85 231.83,502.37 231.83,502.37
             231.83,502.37 241.26,497.49 241.26,497.49
             241.26,497.49 251.83,492.50 251.83,492.50
             247.77,485.55 237.33,482.47 229.83,480.73
             225.12,479.64 207.08,477.08 202.83,477.71
             198.12,478.41 192.41,481.89 188.12,484.01
             188.12,484.01 165.83,494.48 165.83,494.48
             159.94,497.58 148.21,499.11 144.83,504.50 Z`,
      }, // path
    } // data
    /* -------------------------- */
    /*       enty               */
    /* -------------------------- */
    var enty = function enty () {}
    enty.data = () => data

    return enty
  }

  exports.datLichtenstein = datLichtenstein
}))