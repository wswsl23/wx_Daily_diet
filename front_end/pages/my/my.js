// index.js
Page({
  data:{ },
  onShow: function (options){    //一般在 onLoad() 生命钩子中发送网络请求
      wx.cloud.callContainer({
          config: {
            env: '', // 微信云托管的环境ID
          },
          path: '/show', // 填入业务自定义路径和参数，根目录，就是 / 
          method: 'GET', // 按照自己的业务开发，选择对应的方法
          header: {
            'X-WX-SERVICE': '', // xxx中填入服务名称（微信云托管 - 服务管理 - 服务列表 - 服务名称）
          },
          // dataType:'text', // 默认不填是以 JSON 形式解析返回结果，若不想让 SDK 自己解析，可以填text
          success:(res)=>{
              var a=res.data.split(",");
              for(var i=0;i<a.length;i++){
                  a[i]=a[i].split(' ')
              }
              this.setData({
                  data:a
              })
          }
        })
  }

})




