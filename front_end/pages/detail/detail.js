// pages/detail/detail.js
let name=''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:''
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({// 把从index页面获取到的属性值赋给详情页的my，供详情页使用
      name:wx.getStorageSync('info').slice(0,50)
    })
  },
})