var postdata = require('../../../ntils/xx.js')//引入js只能用相对路径
Page({
  data: {
    total : 0,
    mdata:{}
  },
  onLoad: function (options) {
    var title = options.title;
    this.data.navigateTitle = title;
    var url='';
    switch (title){
      case "正在热映":
         url = "/v2/movie/in_theaters";
      break;
      case "即将上映":
          url = "/v2/movie/coming_soon";
        break;
      case "TOP250":
           url = "/v2/movie/top250";
        break;
    }
    this.data.requestUrl  = url;
    this.shuju(url); 
  },
  onReady: function (event) {
    wx.setNavigationBarTitle({ //设置标题
      title: this.data.navigateTitle
    })
  },
  shuju:function(url){
    var that = this;
  
    wx.request({
      url: 'https://douban.uieee.com'+url,
      data: {},
      method: 'get',
      header: {
        'Content-Type': 'application/xml'
      },
      success: function (res){
        for (var i = 0; i < res.data.subjects.length; i++) {
          if (res.data.subjects[i].title.length >= 6) {
            res.data.subjects[i].title = res.data.subjects[i].title.substring(0, 6) + "...";
            res.data.subjects[i].rating.stars = postdata.convertToStarsArray(res.data.subjects[i].rating.stars);
          }
        }
        console.log(res.data.subjects);
        var arr = res.data.subjects;
        //合并数组
        if (that.data.post_key){
          arr = that.data.post_key.concat(arr)
        }else{
          arr = arr;
        }

        that.setData({
          post_key: arr
        });//设置data数据

        that.data.total += 20;
        wx.hideNavigationBarLoading();//隐藏loading
      }
    })
  
  },
  //上拉加载更多
  onReachBottom:function(event){
    var url = this.data.requestUrl +
      "?start=" + this.data.total + "&count=20";
  
    this.shuju(url);
    wx.showNavigationBarLoading();//显示loading
  },
  //下拉加载
  onPullDownRefresh:function(event){
    wx.showNavigationBarLoading();
    this.data.post_key='';
    this.data.total=0;
    this.shuju(this.data.requestUrl); 
  }

})