var postdata=require('../../data/post-data.js')//引入js只能用相对路径
console.log(postdata);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post_key:[]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //请求数据
    this.setData({
      post_key: postdata.postlist
    });//设置data数据
  },

 onpost:function(event){
   var postid=event.currentTarget.dataset.postid;//获取postid
   console.log(postid);
   wx.navigateTo({
     url: 'post-detal/post-detal',
   })
 }
})