// pages/search/search.js
let search='',list='',items=[],weight=0,food=''
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  search_(e){
    search=e.detail.value
  },
  search_e() {
    items=[]
    wx.cloud.callContainer({
      config: {
        env: '', // 微信云托管的环境ID
      },
      path: '/search', // 填入业务自定义路径和参数，根目录，就是 / 
      method: 'POST', // 按照自己的业务开发，选择对应的方法
      header: {
        'X-WX-SERVICE': '', // xxx中填入服务名称（微信云托管 - 服务管理 - 服务列表 - 服务名称）
        "content-type": "application/x-www-form-urlencoded; charset=utf-8"
      },
      // encodeURI(search)
      data:{
        search:search
      },
      // dataType:'text', // 默认不填是以 JSON 形式解析返回结果，若不想让 SDK 自己解析，可以填text
      success:(res)=>{
          var a=res.data.split(",");
          for(var i=0;i<a.length-1;i++){
            items.push({name: a[i], value: a[i]})
          }
          this.setData({
              items:items
          })
      }
    })
  },
  food(e){
    food=e.detail.value
  },
  weight(e){
    weight=e.detail.value
  },
  back(e){
    items=[]
    list=food+' '+weight
    //获取页面栈
    let pages = getCurrentPages();
    //获取所需页面
    let prevPage = pages[pages.length - 2]; //上一页
    prevPage.setData({
      list:list, //需要传过去的数据
    });
    wx.navigateBack({
      delta: 1,
    })
    list=''
  },
  /**
   * 生命周期函数--监听页面加载
   */
})