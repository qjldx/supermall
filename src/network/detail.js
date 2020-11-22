import {request} from "./request"
export  function getDetail( iid ) {
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}
//因为取出的数据很杂乱，所以在这个地方采用了ES6中的最新语法，采用类的封装来导出数据
export class Goods{
  constructor(itemInfo,columns,services) {
    this.title=itemInfo.title
    this.desc=itemInfo.desc
    this.newPrice=itemInfo.price
    this.oldPrice=itemInfo.oldPrice
    this.discount=itemInfo.discount;
    this.columns=columns;
    this.services=services;
    this.realPrice=itemInfo.lowNowPrice
  }
}

export class Shop {
  constructor( shopInfo) {
    this.logo=shopInfo.shopLogo;
    this.name=shopInfo.name;
    this.fans=shopInfo.cFans;
    this.sells=shopInfo.cSells;
    this.score=shopInfo.score;
    this.goodsCount=shopInfo.cGoods
  }
}