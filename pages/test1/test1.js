Page({
  data: {},
  onLoad() { },
  onReady() {
    this.sendMessageLastPageAsync({ test: 1 });
  },

  /**
   * 通知 上个页面
   * @param {Object} sendData 传递的数据，没传 默认刷新上个页面initData数据
   */
  sendMessageLastPageAsync(sendData = {}) {
    return new Promise((resolve, reject) => {
      let pages = getCurrentPages(); //当前页面
      let index = pages.length - 2;
      if (index < 0) {
        console.error('[sendMessageLastPageAsync] 不存在上一个页面，或请确认 路径 是否正确');
        return reject();
      }

      let prePage = pages[index]; //上一页面
      if (this.isEmpty(sendData) || this.isEmpty(Object.keys(sendData))) {
        // prePage._refreshAsync().then(() => {
        //   return resolve();
        // }, () => {
        //   return reject();
        // });
        console.warn('未配置sendData');
      } else {
        console.log('[sendMessageLastPageAsync] sendData:', sendData);
        if (Reflect.has(prePage, 'receiveMessageAsync')) {
          prePage.receiveMessageAsync(sendData).then(() => {
            // 页面内声明 该方法
            return resolve();
          }, () => {
            return reject();
          });
        } else {
          console.warn('[sendMessageLastPageAsync] - receiveMessageAsync 未能执行，请检查方法 receiveMessageAsync 是否在 page.js 内声明');
          return reject();
        }
      }
    });
  },
  isEmpty(obj) {
    if (typeof obj == 'undefined' || !obj && typeof obj != 'undefined' && obj != 0 || obj == null) {
      return true;
    }
    if (typeof obj === 'number') {
      return false;
    }
    for (let i in obj) {
      return false;
    }
    return true;
  }

});
