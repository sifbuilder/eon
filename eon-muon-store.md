
# md:{filename}
**manage anitems store**
## refs
* `https://bl.ocks.org/mbostock/6081914 transitions`
* `https://github.com/d3/d3-ease#easeElasticOut`


## methods
* [apply](#apply) - adds, replace, delete anitems
  @action: {UPDANIMA, UPDANIGRAM}
* [ween](#ween) - process anitem through halo.ween
  @anitem
* [gramm](#gramm) - process anitem through halo.gramm
  manage anitem's time
  process anitem with anitem's halo.gramm
  process anitem.avatars
* animasInGroupHowMany
  @anima
  return live animas in group `anima.payload.rid.gid`
* animasInClassHowMany
  @anima
  return live animas in class `anima.payload.rid.cid`
* findIndexFromRic
  @ric
  @list
  get anitem in @list by @ric {gid, cid, fid}
* findIndex
  @anitem
  @list
  get anitem in @list by @anitem.ric {gid, cid, fid}
* findByUid
  @anitem
  @list
  get anitem in @list by mric.getuid(@anitem)
* findFromUid
  @uid
  @list
  get anitem in @list by @uid
* findIndexAnigramFromUid
* findAnigramFromUid
* findAnimaFromUid
* born
* unborn
* getAnimaByUID
* animas
* anigrams
* animasAll
* animasLive
* token
* getNid
* getAnigramIdx
* getAnigram
* getAnimaIdx
* getAnima


# license
MIT