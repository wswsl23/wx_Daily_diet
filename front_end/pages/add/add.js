// pages/add/add.js
let recipe='菜谱',list=[]

Page({
  data: {
  },
  add(e){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  recipe(e){
    recipe=e.detail.value
  },
  
  submit() {
    var food=recipe+' {'
    console.log(list)
    for(var i=0;i<list.length;i++){
        var a=list[i].split(' ')
        if(i!=list.length-1){
            food=food+'\''+a[0]+'\':'+a[1]+','
        }
        else{
            food=food+'\''+a[0]+'\':'+a[1]+'}'
        }
    }
    console.log(food)
    wx.cloud.callContainer({
      config: {
        env: '', // 微信云托管的环境ID
      },
      path: '/add', // 填入业务自定义路径和参数
      method: 'POST', // 按照自己的业务开发，选择对应的方法
      header: {
        'X-WX-SERVICE': '', // xxx中填入服务名称（微信云托管 - 服务管理 - 服务列表 - 服务名称）
        "content-type": "application/x-www-form-urlencoded; charset=utf-8"
      },
      // encodeURI(search)
      data:{
        add:food
      },
      success:(res)=>{
        console.log(res);
      }
      // dataType:'text', // 默认不填是以 JSON 形式解析返回结果，若不想让 SDK 自己解析，可以填text
  })
  list=[]
  wx.redirectTo({
      url:'/pages/success/success'
  })
},
  onShow() {
    var that=this;
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 1];
    if(that.data.list!=null){
        list.push(that.data.list)
    }
    that.setData({
        list:list
    })
  },
})

