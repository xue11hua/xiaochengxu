// pages/wekcone/index/index.js
Page({
  ontap:function(){
    console.log(1111);
  // wx.navigateTo({//子页面
  //    url: '../../posts/posts'
  //  });
  wx.switchTab({
    url: "../../posts/posts"
  });
  //  wx.redirectTo({//同级页面
  //    url: '../../posts/posts',
  //  })
  },
  onUnload:function(){
    //console.log('111')
  },
  onHide:function(){
    //console.log('222')
  }

})