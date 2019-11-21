Page({
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
    // this.testRequest();
  },

  onNavTest() {
    dd.navigateTo({ url: '../test1/test1' });
  },

  receiveMessageAsync(receiveData) {
    return new Promise((resolve, reject) => {
      console.log("receiveData:" + JSON.stringify(receiveData));
      let source = receiveData.test;
      switch (source) {
        case 1:
          this.testRequest();
          break;
      }
    })
  },

  testRequest() {
    return new Promise((resolve, reject) => {
    console.log('request begin');
      dd.httpRequest({
        url: 'http://httpbin.org/post',
        method: 'POST',
        data: {
          from: '钉钉',
          production: 'Dingtalk',
        },
        dataType: 'json',
        success: function(res) {
          console.log('request success!');
        },
        fail: function(res) {
          console.log('request fail!');
        },
        complete: function(res) {
          console.log('request complete!');
        }
      });
    });
  }


});
