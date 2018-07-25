/*******************************************
*      @xVersion
*/


  let xVersion = function () {
    let version = '0.0.1-rc1'

    // ............................. enty
    let enty = {}
    enty.version = () => version
    return enty
  }

  exports.xVersion = xVersion
