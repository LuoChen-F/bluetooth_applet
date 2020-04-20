var app = getApp()
Page({
  onReady(res) {
    this.ctx = wx.createLivePusherContext('pusher')
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
  JumpVideo() {
        console.log('JumpVideo');
        app.turnToPage('/pages/live_video/live_video');
  },
  bindStart() {
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
  bindSwitchCamera() {
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