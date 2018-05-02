Page({

  data: {
    
  },
  onLoad: function (options) {
    var id = options.id;
    this.data.navigateTitle = "111111";
    var that=this;
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/subject/' + id,
      data: {},
      method: 'get',
      header: {
        'Content-Type': 'application/xml'
      },
      success: function (res) {
       
        console.log(res.data);
        var arr = res.data;
        wx.setNavigationBarTitle({
          title: arr.title
        })
        that.setData({
          movie: arr
        
        });//设置data数据
     

      }
    })
    
  },
 


 
})