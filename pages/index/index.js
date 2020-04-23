//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    list:[],
    num:0,
    sum:0,
    content:""
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  add(e){
    if(e.detail.value==''){
       return false
    }else{    
      let obj = {title:e.detail.value,show:false,flag:false}
      this.data.list.unshift(obj) 
       e.detail.value==""
      this.setData({
        list:this.data.list,
        content:"",
      })   
    } 
    this.num()
  },
  del(e){
    let {ind} = e.currentTarget.dataset
    this.data.list.splice(ind,1)
    this.setData({
      list:this.data.list,
    }) 
    this.num()
  },
  change(e){
    let {ind} = e.currentTarget.dataset
    console.log(ind)
    this.data.list[ind].flag = ! this.data.list[ind].flag
    this.setData({
      list:this.data.list,
    })   
    this.num()
  },
  xian(e){
    let {ind} = e.currentTarget.dataset
    this.data.list.forEach((v)=>{
      v.show = false;
    })
     this.data.list[ind].show = ! this.data.list[ind].show
     this.setData({
      list:this.data.list,
    })   
    this.num()
  },
  blur(e){
    // ind 是固定的前面绑定
    let {ind} = e.currentTarget.dataset
   this.data.list[ind].title = e.detail.value
   this.data.list[ind].show = ! this.data.list[ind].show
    this.setData({
      list:this.data.list,
    }) 

  },
  num(){
      var len = this.data.list.filter((v)=>{
              return v.flag == false
      })
      this.data.num = len.length
      this.data.sum = this.data.list.length-len.length
      this.setData({
        num:this.data.num,
        sum:this.data.sum
      })

  }
 
})
