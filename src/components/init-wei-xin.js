import request from 'reqwest';

function init(cb) {
  const url = encodeURIComponent(window.location.href);

  request({
    url: '/getSign/',
    data: { url },
    success(res) {
      window.wx.checkJsApi({
        jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success() {
          // 以键值对的形式返回，可用的api值true，不可用为false
          // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
        },
      });

      window.wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.appId, // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.noncestr, // 必填，生成签名的随机串
        signature: res.sign, // 必填，签名，见附录1
        jsApiList: [
          'scanQRCode',
          'getLocation',
          'chooseWXPay',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'chooseImage',
          'previewImage',
          'uploadImage',
          'downloadImage',
          'hideOptionMenu',
          'showOptionMenu',
          'hideMenuItems',
          'showMenuItems',
          'hideAllNonBaseMenuItem',
          'showAllNonBaseMenuItem',
          'closeWindow',
        ], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });

      if (cb) cb();
    },
  });
}

init();

export default init;
