// pages/wekcone/index/index.js
Page({
  ontap:function(){
    console.log(1111);
  // wx.navigateTo({//子页面
  //    url: '../../posts/posts'
  //  });
  wx.switchTab({
    url: "../../moves/moves"
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
  },

  onLoad: function () {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        // success  
        that.setData({
          nickName: res.userInfo.nickName,
          userInfoAvatar: res.userInfo.avatarUrl,
          province: res.userInfo.province,
          city: res.userInfo.city
        })

        switch (res.userInfo.gender) {
          case 0:
            that.setData({
              sex: '未知'
            })
            break;
          case 1:
            that.setData({
              sex: '男'
            })
            break;
          case 2:
            that.setData({
              sex: '女'
            })
            break;
        }
      },
      fail: function () {
        // fail  
        console.log("获取失败！")
      },
      complete: function () {
        // complete  
        
        console.log("获取用户信息完成！")
      }
    })
  }  

})