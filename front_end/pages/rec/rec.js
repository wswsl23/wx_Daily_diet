// pages/rec/rec.js
var food='米饭',weight=100,staple=''

Page({  

data: {    
  items: [
        {name: '米饭', value: '米饭', checked: 'true'},
        {name: '馒头', value: '馒头'},
        {name: '面包', value: '面包'},
        {name: '油饼', value: '油饼'},
        {name: '煎饼', value: '煎饼'},
        {name: '面条', value: '面条'},
        {name: '挂面', value: '挂面'},
        {name: '小米粥', value: '小米粥'},
        {name: '饼干', value: '饼干'},
        {name: '方便面', value: '方便面'},
        
      ],
},
food(e) {    
  food = e.detail.value
},
weight(e) {
  weight = e.detail.value
},

detail() {
  wx.cloud.callContainer({
    config: {
      env: '', // 微信云托管的环境ID
    },
    path: '/recipe', // 填入业务自定义路径和参数，根目录，就是 / 
    method: 'POST', // 按照自己的业务开发，选择对应的方法
    header: {
      'X-WX-SERVICE': '', // xxx中填入服务名称（微信云托管 - 服务管理 - 服务列表 - 服务名称）
      "content-type": "application/x-www-form-urlencoded; charset=utf-8"
    },
    data:{
      staple:food+','+weight
    },
    success:(res)=>{
        console.log(res);
        var a = res.data.split(",");
        this.setData({
            a:a
        })
        wx.setStorageSync('info', a)
        wx.navigateTo({
          url: '/pages/detail/detail'
        })
    },
    
  })
  
  
},


})