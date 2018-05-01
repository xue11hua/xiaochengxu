var postdata = require('../../ntils/xx.js')//引入js只能用相对路径
Page({
  data: {
    conshow:true,
    key:'血战钢锯岭'
  },
  onLoad: function (options) {

   this. shuju('/v2/movie/in_theaters', 'post_key','正在热映');
   this.shuju('/v2/movie/coming_soon', 'post_key_jj','即将上映');
   this.shuju('/v2/movie/top250', 'post_key_top','TOP250');

  },
  shuju: function (url, post_key, categoryTitle){
    var that = this;
    wx.request({
      url: 'https://douban.uieee.com'+url,
      data: {},
      method: 'get',
      header: {
        'Content-Type': 'application/xml'
      },
      success: function (res) {
     //处理标题
       
        for (var i = 0; i < res.data.subjects.length;i++) {
          if (res.data.subjects[i].title.length >= 6) {
            res.data.subjects[i].title = res.data.subjects[i].title.substring(0, 6) + "...";
            res.data.subjects[i].rating.stars = postdata.convertToStarsArray(res.data.subjects[i].rating.stars);

        }
      }
        var arr = res.data.subjects;
        var readydata={};//动态赋值参数
        readydata[post_key] = {
          categoryTitle: categoryTitle,
          movies: arr
        };
        that.setData(readydata);//设置data数据
      }
    })
  },
  onmovetap:function(event){
    var title = event.currentTarget.dataset.title;//获取postid
    wx.navigateTo({
      url: 'more-move/more-move?title='+title,
    })
   
  },
  onBindFocus:function(){
    this.setData({
      conshow:false
    })
  },
  onBindBlur: function (event){
    this.setData({
      conshow: true,
      seach: {},
      key:''
    })
    
   
  },
  onBindChan:function(event){
    var inputz = event.detail.value;
    this.shuju("/v2/movie/search?q="+inputz, "seach", "");
    
    this.setData({
      conshow: false
    })
      
  },
  
  
})