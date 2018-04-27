// pages/wekcone/index/index.js
Page({
  ontap:function(){
  // wx.navigateTo({//子页面
  //    url: '../../posts/posts',
  //    success: function(res) {},
  //    fail: function(res) {},
  //    complete: function(res) {},
  //  });
   wx.redirectTo({//同级页面
     url: '../../posts/posts',
   })
  },
  onUnload:function(){
    //console.log('111')
  },
  onHide:function(){
    //console.log('222')
  }

})