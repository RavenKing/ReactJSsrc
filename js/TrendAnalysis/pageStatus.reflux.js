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
      currentStatus: {
        pageName:"INIT0",
        sid:"",
        client:""
      },
      pageStatusArr: [{"pageName":"INIT0","sid":"","client":""}]
    },
    onPageStatusChangeAction: function onPageStatusChangeAction(pageStatus) {
      this.pageStatusData.currentStatus = pageStatus;
      this.trigger(this.pageStatusData);

      updateContentClassList(pageStatus);
    },
    onPageStatusAddAction: function onPageStatusAddAction(pageStatus) {
      if(!this.isStatusExisted(pageStatus)){
        this.pageStatusData.pageStatusArr.push(pageStatus);        
      }
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
      //this.pageStatusData.customerInfo.SID = sid;
      //this.pageStatusData.customerInfo.CLIENT = client;

      this.pageStatusData.currentStatus.sid = sid;
      this.pageStatusData.currentStatus.client = client;
    },
    getCustomerID:function getCustomerID()
    {
      return this.pageStatusData.customerInfo;
    },
    isStatusEqual:function isStatusEqual(pageStatus1,pageStatus2){
      if(pageStatus1.pageName === pageStatus2.pageName && pageStatus1.sid === pageStatus2.sid 
        && pageStatus1.client === pageStatus2.client){
        return true;
      }
      else{
        return false;
      }
    },
    isStatusExisted: function isStatusExisted(pageStatus) {
      var flag = 0;
      var that = this;
      $.each(this.pageStatusData.pageStatusArr, function (idx, item) {
        if (that.isStatusEqual(item,pageStatus)) {
          flag = 1;
          return false;
        }
      });
      return !!flag;
    }
    

  });
})(window.Reflux, window);