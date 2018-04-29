Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/top250',
      data: { },
      method: 'get',
      header: {
        'Content-Type': 'application/xml'
      },
      success: function (res) {
        console.log(res.data.subjects);
        var arr = res.data.subjects;
        that.setData({
          post_key: arr
        });//设置data数据
       
      }
    })
  },
 
  
  

  
})