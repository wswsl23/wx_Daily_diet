App({
  async onLaunch() {
    // 使用 callContainer 前一定要 init 一下，全局执行一次即可
    wx.cloud.init()
  }
  
})