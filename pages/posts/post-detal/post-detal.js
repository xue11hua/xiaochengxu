var postdata = require('../../../data/post-data.js')
var app=getApp();//获取全局变量
Page({

  data: {
    id:'',
    inplay:false
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
    var id=opt.id;
    // var g_inpaly = app.gloabdata.g_inplay;
    // console.log(g_inpaly);
    this.setData({
      postdata: postdata.postlist[id],
      id:id
    });//设置data数据

    //wx.setStorageSync('key', 'allallal');//设置缓存

    // wx.setStorageSync('key', {//同步的
    //   game:'1111',
    //   dt:'222'
    // })
    // wx.setStorageSync('key1', {//同步的
    //   game: '1111',
    //   dt: '222'
    // })
    var a = wx.getStorageSync('sc');//获取缓存
    if (a) {
     var collected = a[id];
      this.setData({
        collected: collected
      })
    }else{
      var a = {};
      a[id] = false;
      wx.setStorageSync('sc', a);
      
    }
    var that=this;
  wx.onBackgroundAudioPlay(function(){
    that.setData({
      inplay: true
    })
    app.gloabdata.g_inplay = true
  })
  wx.onBackgroundAudioPause(function () {
    that.setData({
      inplay: false
    })
    app.gloabdata.g_inplay = false
  })
  if (app.gloabdata.g_inplay && app.gloabdata.g_dj==id){
    this.setData({
      inplay: true
    })
  }
    
  },
  onsctap:function(){
   
    
    var a = wx.getStorageSync('sc');
    console.log(a);
    var collected = a[this.data.id];
    // 收藏变成未收藏，未收藏变成收藏
    collected = !collected;
    a[this.data.id] = collected;
    console.log(collected);
    wx.setStorageSync('sc', a);
    this.setData({
      collected: collected
    })
    wx.showToast({//提示
      title: collected?'收藏成功':'取消成功',
      duration:1000,
      icon:'loading',
      
    })

  },
onfxtap:function(){
  //缓存最大不能超过10mb
  //wx.removeStorageSync('key')//清除指定缓存
  //wx.clearStorageSync()//清楚所有缓存
  var item = [
    "分享到微信",
    "分享到朋友圈",
    "分享到QQ",
    "分享到微博",
  ]
  wx.showActionSheet({
    itemList: [
      "分享到微信",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博",
    ],
    itemColor:'#405180',
    success:function(res){
      // res.cancel用户是不是点击了取消
      // res.tapIndex数组元素的序号
      wx.showModal({
        title: '用户分享到' + item[res.tapIndex],
        content: '现在无法支持分享到' + item[res.tapIndex],
      })
    }
  })
},
onbftap:function(){
  var inplay=this.data.inplay;
  if(inplay){
    wx.pauseBackgroundAudio();//音乐停止
    this.setData({
      inplay:false
    })
    app.gloabdata.g_inplay = false;
    app.gloabdata.g_dj = null;
   
  }else{
    this.setData({
      inplay: true
    })
    app.gloabdata.g_inplay = true;
    app.gloabdata.g_dj = this.data.id;
    wx.playBackgroundAudio({//音乐播放
      dataUrl: postdata.postlist[this.data.id].moveurl,
      title: '首都机场',
      coverImgUrl: postdata.postlist[this.data.id].coverImg,
    })
  }
 

}

 
})