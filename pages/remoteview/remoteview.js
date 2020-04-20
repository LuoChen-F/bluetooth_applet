var app = getApp();
Page({
	data: {
	  StartbtnText:"停止",
	  mutxbtnText:"静音",
	  bindtapVal:"bindStop",
	  mutxbindtapVal:"bindMute"
	 },
  onReady(res) {
    this.ctx = wx.createLivePlayerContext('player')
  },
  onLoad:function(options)
 { 
//  let rtmpclose = options.rtmpclose;
//  let DEV_ID = options.DEV_ID;
//  console.log(DEV_ID+rtmpclose) ;  //显示数据
  let that = this;
  this.setData({options:options });
  /*
  this.setData({
      DEV_ID: DEV_ID,
      rtmpclose: rtmpclose
    });
    */
 },
 
 onUnload: function () {
    console.log("Unload") ;  //显示数据
    var that = this 
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];    //当前页面
    var prevPage = pages[pages.length - 2];    //上一个页面
    /*
    prevPage.setData({
      userName: that.data.contentStr
    });
    */
    //发送socket停止RTMP
    that.connectSocket();
  },
   connectSocket: function (){
    var that = this;
    console.log(this.options.CUR_DEV_STRID);
    wx.connectSocket({
      url: 'wss://www.kucarlife.com/phpSendSocket.php?RTMPSTART=0&DEV_STRID='+this.options.CUR_DEV_STRID
    });
    
    wx.onSocketOpen(function (res) {
       console.log("onSocketOpen");
      let data = {
        'RTMPSTART': '0',
        'DEV_STRID': this.options.CUR_DEV_STRID
      };
      wx.sendSocketMessage({
        data: JSON.stringify(data)
      });
    
    });
    wx.onSocketMessage(function (res) {
       console.log("onSocketMessage");
      let data = JSON.parse(res.data);
      if (data.action == 'push_to_client') {
        let msg = JSON.parse(data.msg);
        if ((msg.type == 'app_order_verify') && (msg.status == 0)) {
          that.setData({
            'codeStatus': 1
          });
          console.log("closeSocket");
          wx.closeSocket();
        }
      }
    });
  },
  statechange(e) {
    console.log('live-player code:', e.detail.code)
  },
  error(e) {
    console.error('live-player error:', e.detail.errMsg)
  },
  bindPlay() {
	 this.setData({
        StartbtnText:"停止",
		  bindtapVal:"bindStop"
      }),
    this.ctx.play({
      success: res => {
        console.log('play success')
      },
      fail: res => {
        console.log('play fail')
      }
    })
  },
  bindPause() {
    this.ctx.pause({
      success: res => {
        console.log('pause success')
      },
      fail: res => {
        console.log('pause fail')
      }
    })
  },
  bindStop() {
	 this.setData({
        StartbtnText:"播放",
		  bindtapVal:"bindPlay"
      }),  
    this.ctx.stop({
      success: res => {
        console.log('stop success')
      },
      fail: res => {
        console.log('stop fail')
      }
    })
  },
  bindResume() {
    this.ctx.resume({
      success: res => {
        console.log('resume success')
      },
      fail: res => {
        console.log('resume fail')
      }
    })
  },
 bindMute() {
	   this.setData({
        mutxbtnText:"取消静音",
		mutxbindtapVal:"bindMuteCacle",
      }),  
    this.ctx.mute({
      success: res => {
        console.log('mute success')
      },
      fail: res => {
        console.log('mute fail')
      }
    })
  },
  bindMuteCacle() {
	   this.setData({
        mutxbtnText:"静音",
		mutxbindtapVal:"bindMute",
      }),  
    this.ctx.mute({
      success: res => {
        console.log('mute success')
      },
      fail: res => {
        console.log('mute fail')
      }
    })
  }
})