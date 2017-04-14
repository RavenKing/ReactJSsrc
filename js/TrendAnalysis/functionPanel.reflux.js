'use strict';

(function (Reflux, $, global) {

  global.functionPanelItemChangeActions = Reflux.createActions(['functionPanelAddPageAction', 'functionPanelRemovePageAction']);

  global.functionPanelDataStore = Reflux.createStore({
    listenables: [global.functionPanelItemChangeActions],
    functionPanelData: [{
      pageStatus:{
        pageName:"INIT0",
        sid:"",
        client:""
      },
      content: [{
        name: 'Analysis',
        info: 'ANALYSIS',
        type: 'ANALYSIS'
      }/*, {
        name: 'Capacity',
        info: 'CPM',
        type: 'CPM'
      },*/,{
        name: 'Knowledge',
        info: 'NOTE',
        type: 'NOTE'
      }/*,{
        name: 'Comment',
        info: 'COM',
        type: 'COM'
      }*/]
    }],
    onFunctionPanelAddPageAction: function onFunctionPanelAddPageAction(pageStatus) {
      if(!this.isStatusExisted(pageStatus)){

        if(pageStatus.pageName == "INIT" || pageStatus.pageName == "INIT-KPI"){
          this.functionPanelData.push({
            pageStatus:pageStatus,
            content:[{
              name: 'Analysis',
              info: 'ANALYSIS',
              type: 'ANALYSIS'
            }/*, {
              name: 'Capacity',
              info: 'CPM',
              type: 'CPM'
            }*/,{
              name: 'Knowledge',
              info: 'NOTE',
              type: 'NOTE'
            }/*,{
              name: 'Comment',
              info: 'COM',
              type: 'COM'
            }*/]
          })
        }
        else if(pageStatus.pageName == "CAPACITY_MGMT"){

        this.functionPanelData.push({
          pageStatus: pageStatus,
          content: [{
            name: "Dialog Job",
            info: "CPM-DIA",
            type: "CPM-DIA"
          },{
            name: "Batch Job",
            info: "CPM-BTC",
            type: "CPM-BTC"
          },{
            name: "RFC Call",
            info: "CPM-RFC",
            type: "CPM-RFC"
          },{
              name:"Save Article",
              info:"SAVE-ARTI",
              type:"SAVE-ARTI"
          }]
        });

      }
        else{
          var anaType = pageStatus.pageName.substr(9,3);
          switch(anaType){
            case "RCA":
              this.functionPanelData.push({
                pageStatus: pageStatus,
                content: [{
                  name: "Root Cause",
                  info: "RCA",
                  type: "RCA"
                }, {
                  name: "Simulate",
                  info: "RCA_SIM",
                  type: "RCA_SIM"
                }
                ]
              });
              break;
            case "DVM":
              this.functionPanelData.push({
                pageStatus: pageStatus,
                content: [{
                  name: "Efficiency",
                  info: "EFFI",
                  type: "EFFI"
                },{
                  name: "Knowledge",
                  info: "KNOW",
                  type: "KNOW"
                },/*{
                  name: "Data Strategy",
                  info: "DVM_ANA",
                  type: "DVM_ANA"
                }, {
                  name:"Template",
                  info:"ART_TEMP",
                  type:"ART_TEMP"
                },*/
                {
                  name: "Simulate",
                  info: "DVM_SIM",
                  type: "DVM_SIM"
                }/*,{
                  name:"Save Article",
                  info:"SAVE",
                  type:"SAVE"
                }*/]
              });
              break;
            case "WIF":
              this.functionPanelData.push({
                pageStatus:pageStatus,
                content:[{
                  name: "Correlation",
                  info: "RCA",
                  type: "RCA"
                },{
                  name: "What If",
                  info: "WHAT_IF",
                  type: "WHAT_IF"
                }]
              });
              break;
            
          }
        }


      }
      

      
    },
    onFunctionPanelRemovePageAction: function onFunctionPanelRemovePageAction(pageStatus) {
      var that = this;
      $.each(this.functionPanelData, function (idx, item) {
        if (that.isStatusEqual(item.pageStatus,pageStatus)) {
          that.functionPanelData.splice(idx, 1);
          return false;
        }
      });
    },
    getData: function getData(pageStatus) {
      var that = this;
      if (pageStatus) {
        var tmpData = [];
        $.each(this.functionPanelData, function (idx, item) {
          if (that.isStatusEqual(item.pageStatus,pageStatus)) {
            tmpData = item.content;
            return false;
          }
        });

        return tmpData;
      } else {
        return this.functionPanelData;
      }
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
      $.each(this.functionPanelData, function (idx, item) {
        if (that.isStatusEqual(item.pageStatus,pageStatus)) {
          flag = 1;
          return false;
        }
      });
      return !!flag;
    }
  });
})(window.Reflux, window.jQuery, window);