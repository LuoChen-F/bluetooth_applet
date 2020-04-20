var app = getApp();
Page({
	data: {
	  StartbtnText:"停止",
	  CarmbtnText:"后摄像头",
	  bindtapVal:"bindStop",
	  CarmbindtapVal:"bindSwitchTSecCamera"
	 },
  onReady(res) {
    this.ctx = wx.createLivePusherContext('pusher');
	 this.pctx = wx.createLivePlayerContext('player')
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
  statechange(e) {
    console.log('live-pusher code:', e.detail.code);
	/*
    if (e.detail.code == -1307) {
      this.ctx.start({
        success: res => {
          console.log('start success')
        },
        fail: res => {
          console.log('start fail')
        }
      })
    }
	*/
    
  },
   statechangePlay(e) {
    console.log('live-play code:', e.detail.code);
    if (e.detail.code == -1307) {
      this.ctx.start({
        success: res => {
          console.log('start success')
        },
        fail: res => {
          console.log('start fail')
        }
      })
    }
    
  },
  CloseVideo(){
        console.log('CloseVideo');
        //servplat\SMKWEBVERPAGE\SmartDesk
        //app.turnToPage('/pages/index/index?rtmpclose=1&CUR_DEV_STRID='+this.options.CUR_DEV_STRID);
        /*
	        let that = this;
	   	 that.setData({
	      	'codeImgUrl': 'codeImgUrl',
	      	'codeNum': 'codeNum',
	      	'codeStatus': 'codeStatus'
	   	});
	    	that.connectSocket();
        */
    
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
 
  bindStart() {
	  this.setData({
        StartbtnText:"停止",
		  bindtapVal:"bindStop"
      }),
    this.ctx.start({
      success: res => {
        console.log('start success')
      },
      fail: res => {
        console.log('start fail')
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
		  bindtapVal:"bindStart"
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
  bindSwitchTSecCamera() {
	   this.setData({
        CarmbtnText:"后摄像头",
		  CarmbindtapVal:"bindSwitchFirstCamera"
      }),
    this.ctx.switchCamera({
      success: res => {
        console.log('switchCamera success')
      },
      fail: res => {
        console.log('switchCamera fail')
      }
    })
  },
   bindSwitchFirstCamera() {
	    this.setData({
        CarmbtnText:"前摄像头",
		  CarmbindtapVal:"bindSwitchTSecCamera"
      }),
    this.ctx.switchCamera({
      success: res => {
        console.log('switchCamera success')
      },
      fail: res => {
        console.log('switchCamera fail')
      }
    })
  }
})