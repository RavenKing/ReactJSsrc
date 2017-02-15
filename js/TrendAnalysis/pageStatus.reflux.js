'use strict';

(function (Reflux, global) {

  global.pageStatusChangeActions = Reflux.createActions(['pageStatusChangeAction', 'pageStatusAddAction', 'pageStatusRemoveAction']);

  var content = document.getElementById('content');
  var updateContentClassList = function updateContentClassList(pageStatus) {
    content.classList.forEach(function (item) {
      content.classList.remove(item);
    });

    if (pageStatus !== 'INIT') {
      content.classList.add('content-' + Math.floor(Math.random() * 3));
    }
  };

  global.pageStatusDataStore = Reflux.createStore({
    listenables: [global.pageStatusChangeActions],
    pageStatusData: {
      currentStatus: "INIT0",
      pageStatusArr: ["INIT0"]
    },
    onPageStatusChangeAction: function onPageStatusChangeAction(pageStatus) {
      this.pageStatusData.currentStatus = pageStatus;
      this.trigger(this.pageStatusData);

      updateContentClassList(pageStatus);
    },
    onPageStatusAddAction: function onPageStatusAddAction(pageStatus) {
      this.pageStatusData.pageStatusArr.push(pageStatus);
      this.pageStatusData.currentStatus = pageStatus;
      this.trigger(this.pageStatusData);

      updateContentClassList();
    },
    onPageStatusRemoveAction: function onPageStatusRemoveAction(removedPageStatus, newPageStatus) {
      this.pageStatusData.pageStatusArr.splice(this.pageStatusData.pageStatusArr.indexOf(removedPageStatus), 1);
      this.pageStatusData.currentStatus = newPageStatus;
      this.trigger(this.pageStatusData);

      updateContentClassList(newPageStatus);
    },
    getAllStatus: function getAllStatus() {
      return this.pageStatusData.pageStatusArr;
    },
    getCurrentStatus: function getCurrentStatus() {
      return this.pageStatusData.currentStatus;
    },
    setUpCustomerID:function setUpCustomerID(customerdata){
      this.pageStatusData.customerInfo = customerdata;
    },
    setLogInfo:function setLogInfo(sid,client){
      this.pageStatusData.customerInfo.SID = sid;
      this.pageStatusData.customerInfo.CLIENT = client;
    },
    getCustomerID:function getCustomerID()
    {
      return this.pageStatusData.customerInfo;
    }
    

  });
})(window.Reflux, window);