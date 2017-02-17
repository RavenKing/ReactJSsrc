'use strict';

(function (Reflux, $, global) {

  global.dataPanelItemChangeActions = Reflux.createActions(['dataPanelItemAddAction', 'dataPanelRCAAddItemAction', 
    'dataPanelAddPageAction', 'dataPanelRemovePageAction','dataPanelDVMAddItemAction', 'dataPanelCPMAddItemAction']);

  global.dataPanelDataStore = Reflux.createStore({
    listenables: [global.dataPanelItemChangeActions],
    dataPanelData: [{
      pageStatus:{
        pageName:"INIT0",
        sid:"",
        client:
        ""
      },
      content: []
    }],
    onDataPanelItemAddAction: function onDataPanelItemAddAction(pageStatus, data) {
      var that = this;
      $.each(this.dataPanelData, function (idx, item) {
        if(that.isStatusEqual(pageStatus,item.pageStatus)){//equal
          item.content = data;
          that.trigger(item.content);
          return false;
        }
        
      });
    },
    onDataPanelAddPageAction: function onDataPanelAddPageAction(pageStatus) {
      if(!this.isStatusExisted(pageStatus)){

        if(pageStatus.pageName == "INIT"){
          this.dataPanelData.push({
            pageStatus:pageStatus,
            content:[]
          })
        }
      
        else if(pageStatus.pageName == "CAPACITY_MGMT"){
          this.dataPanelData.push({
              pageStatus: pageStatus,
              content: [{
                title: "WL Overview",
                objList: []
              }, {
                title: "WL History",
                objList: []
              }]
            });
        }
        else{
          var anaType = pageStatus.pageName.substr(9,3);
          switch(anaType){
            case "RCA":
              this.dataPanelData.push({
                pageStatus: pageStatus,
                content: [{
                  title: "Performance",
                  objList: []
                }, {
                  title: "Service",
                  objList: []
                }, {
                  title: "Business",
                  objList: []
                }, {
                  title: "Resource",
                  objList: []
                }]
              });
              break;
            case "DVM":
              this.dataPanelData.push({
                pageStatus: pageStatus,
                content: [{
                  title: "Arch Obj",
                  objList: []
                }, {
                  title: "Tables",
                  objList: []
                }, {
                  title: "Strategy",
                  objList: []
                }, {
                  title: "Residence Time",
                  objList: []
                }]
              });
              break;

            case "WIF":
              this.dataPanelData.push({
                pageStatus: pageStatus,
                content: [{
                  title: "Performance",
                  objList: []
                }, {
                  title: "Service",
                  objList: []
                }, {
                  title: "Business",
                  objList: []
                }, {
                  title: "Resource",
                  objList: []
                }]
              });
              break;

          }     

        }
      }
      
    },
    onDataPanelRemovePageAction: function onDataPanelRemovePageAction(pageStatus) {
      var that = this;
      $.each(this.dataPanelData, function (idx, item) {
        if (that.isStatusEqual(item.pageStatus,pageStatus)) {
          that.dataPanelData.splice(idx, 1);
          return false;
        }
      });
    },
    onDataPanelRCAAddItemAction: function onDataPanelRCAAddItemAction(pageStatus, card) {
      var that = this;
      $.each(this.dataPanelData, function (idx, item) {
        if (that.isStatusEqual(item.pageStatus,pageStatus)) {
          var len = 0;
          $.each(item.content, function (idx1, item1) {
            len += item1.objList.length;
          });
          if (!len) {
            //var url = "http://10.97.144.117:8000/SmartOperations/services/calcRate.xsjs?factorId=" + cardGuid;
console.log('prepare to run RCA -------', card);
            var url = 'http://10.97.144.117:8000/SmartOperations/services/calcSigRate.xsjs?factorName=' + card.FACTOR_NAME + '&factorCate='+card.category+'&customerId='+card.customerId+'&sysId='+card.systemId+'&sysClt='+card.systemClt
           console.log('url of calc rate --- ',url);
            $.ajax({
              url: url,
              method: 'get',
              dataType: 'json',
              headers: {
                'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345'),
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'DataServiceVersion': '2.0',
                'X-CSRF-Token': 'Fetch'
              }
            }).done(function (resp) {
              resp.results.forEach(function (d) {
                if (d.FACTOR_CATEGORY === "B") {
                  $.each(item.content, function (idx1, item1) {
                    if (item1.title === "Business") {
                      item1.objList.push(d);
                      return false;
                    }
                  });
                } else if (d.FACTOR_CATEGORY === "S") {
                  $.each(item.content, function (idx1, item1) {
                    if (item1.title === "Service") {
                      item1.objList.push(d);
                      return false;
                    }
                  });
                } else if (d.FACTOR_CATEGORY === "R") {
                  $.each(item.content, function (idx1, item1) {
                    if (item1.title === "Resource") {
                      item1.objList.push(d);
                      return false;
                    }
                  });
                }
              });
              that.trigger(item.content);
            }).fail(function () {
              console.error('Data panel fetch error:');
              console.error(arguments);
            });
          } else {
            return false;
          }
        }
      });
    },
    onDataPanelCPMAddItemAction: function onDataPanelCPMAddItemAction(pageStatus, customerId) {
      var that = this;
      $.each(this.dataPanelData, function (idx, item) {
        if (that.isStatusEqual(item.pageStatus,pageStatus)) {
          var len = 0;
          $.each(item.content, function (idx1, item1) {
            len += item1.objList.length;
          });
          if (!len) {

            console.log("CPM content - item -----", item);
            var url = "http://10.97.144.117:8000/SmartOperations/services/cpmDataItem.xsjs?customerId=" + customerId;
            $.ajax({
              url: url,
              method: 'get',
              dataType: 'json',
              headers: {
                'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345'),
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'DataServiceVersion': '2.0',
                'X-CSRF-Token': 'Fetch'
              }
            }).done(function (resp) {
              console.log("get WLO number --- ", resp);
              resp.results.forEach(function (d) {
                if (d.category === "CPM-Overview") {
                  $.each(item.content, function (idx1, item1) {
                    if (item1.title === "WL Overview") {
                      item1.objList.push(d);
                      return false;
                    }
                  });
                } else if (d.category === "CPM-History") {
                  $.each(item.content, function (idx1, item1) {
                    if (item1.title === "WL History") {
                      item1.objList.push(d);
                      return false;
                    }
                  });
                } else if (d.category === "CPM-Transaction") {
                  $.each(item.content, function (idx1, item1) {
                    if (item1.title === "Transaction") {
                      item1.objList.push(d);
                      return false;
                    }
                  });
                }
              });
              that.trigger(item.content);
            }).fail(function () {
              console.error('Data panel fetch error:');
              console.error(arguments);
            });
//////////////////////////////////////////////////////////////////
            /*$.each(item.content, function (idx1, item1) {
              if (item1.title === "WL Overview") {
                var d = {
                  ITEM_NAME: "2016-09"
                };

                item1.objList.push(d);
                
              }
              else if(item1.title === "WL History") {
                var d = {
                  ITEM_NAME: "Last 3 Months"
                };

                item1.objList.push(d);

                var d1 = {
                  ITEM_NAME: "Last 6 Months"
                };

                item1.objList.push(d1);

                var d2 = {
                  ITEM_NAME: "Last 12 Months"
                };

                item1.objList.push(d2);

              }
              else if(item1.title === "Transaction") {

                var d = {
                  ITEM_NAME: "Dialog"
                };

                item1.objList.push(d);

                var d1 = {
                  ITEM_NAME: "Background"
                };

                item1.objList.push(d1);

                var d2 = {
                  ITEM_NAME: "RFC"
                };

                item1.objList.push(d2);

              }
            });*/



          } else {
            return false;
          }
        }
      });
    },
    onDataPanelDVMAddItemAction:function onDataPanelDVMAddItemAction(pageStatus, factorName){
        var that = this;
        $.each(this.dataPanelData, function (idx, item) {
          if (that.isStatusEqual(item.pageStatus,pageStatus)) {
            var len = 0;
            $.each(item.content, function (idx1, item1) {
              len += item1.objList.length;
            });
            if(!len){
              var archobj;
              //fetch tables and archiving object
              var url1 = "http://10.97.144.117:8000/SmartOperations/services/Createarticle_test.xsjs?attr_nam="+factorName;
              $.ajax({
                url: url1,
                method: 'get',
                dataType: 'json',
                async:false,
                headers: {
                  'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345'),
                  'X-Requested-With': 'XMLHttpRequest',
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'DataServiceVersion': '2.0',
                  'X-CSRF-Token': 'Fetch'
                }
              }).done(function(response){
                var data = response.results;
                archobj = data[0].ARCHOBJ;
                data.forEach(function (d) {
                  var table = {
                    FACTOR_NAME:d.TABLENAME,
                    FACTOR_CATEGORY:"TBL"
                  };

                  var obj = {
                    FACTOR_NAME:d.ARCHOBJ,
                    FACTOR_CATEGORY:"OBJ"
                  };
                  $.each(item.content, function (idx1, item1) {
                    if (item1.title === "Arch Obj" && !item1.objList.length) {
                      item1.objList.push(obj);
                      return false;
                    }  
                  });
                
                  $.each(item.content, function (idx1, item1) {
                    if (item1.title === "Tables") {
                      item1.objList.push(table);
                      return false;
                    }
                  });




                });

              }).fail(function(){
                console.log('error in DVM analysis');
                console.log(arguments);
              })

              if(archobj){
                //fetch strategy and retention
                var url2 = "http://10.97.144.117:8000/SmartOperations/services/KnowledgeManagement.xsodata/DVMBPRACTICE?$filter= ARCHOBJ eq '"+archobj+"'";
                $.ajax({
                  url: url2,
                  method: 'get',
                  dataType: 'json',
                  headers: {
                    'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345'),
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'DataServiceVersion': '2.0',
                    'X-CSRF-Token': 'Fetch'
                  }
                }).done(function(response){
                  var data = response.d.results[0];
                  var strategy = [];
                  if(data.ARCHIVING){
                    strategy.push({
                      FACTOR_NAME:"Archiving",
                      FACTOR_CATEGORY:"STA",
                      FACTOR_INFO:data.ARCHIVING
                    });
                  }
                  if(data.AVOIDANCE){
                    strategy.push({
                      FACTOR_NAME:"Avoidance",
                      FACTOR_CATEGORY:"STA",
                      FACTOR_INFO:data.AVOIDANCE
                    });
                  }
                  if(data.DELETION){
                    strategy.push({
                      FACTOR_NAME:"Deletion",
                      FACTOR_CATEGORY:"STA",
                      FACTOR_INFO:data.DELETION
                    })
                  }
                  if(data.SUMMARIZATION){
                    strategy.push({
                      FACTOR_NAME:"Summarization",
                      FACTOR_CATEGORY:"STA",
                      FACTOR_INFO:data.SUMMARIZATION
                    });
                  }
                  var retention = {
                    FACTOR_NAME:data.BEST_PRACTICE,
                    FACTOR_CATEGORY:"RET"
                  };
                  
                  $.each(item.content, function (idx1, item1) {
                    if (item1.title === "Strategy") {
                      item1.objList = strategy;
                      return false;
                    }
                  });
                  $.each(item.content, function (idx1, item1) {
                    if(item1.title === "Residence Time"){
                      item1.objList.push(retention);
                      return false;
                    }
                  });

                  that.trigger(item.content);

                }).fail(function(){
                    console.log('error in DVM analysis');
                    console.log(arguments);
                })
              }
              
                

            }
            else{
              return false;
            }
          }
        });
        
          
    },
    getData: function getData(pageStatus) {
      if (pageStatus) {
        var that = this;
        var tmpData = [];
        $.each(this.dataPanelData, function (idx, item) {
          if (that.isStatusEqual(item.pageStatus,pageStatus)) {
            if (item.content.length === 0) {
              that.getDataPanelData(pageStatus);
            } else {
              tmpData = item.content;
            }
            return false;
          }
        });

        return tmpData;
      } else {
        return this.dataPanelData;
      }
    },
    getSpeData: function getSpeData(pageStatus, text) {
      var tmpData = [];
      $.each(this.dataPanelData, function (idx, item) {
        if (that.isStatusEqual(item.pageStatus,pageStatus)) {
          $.each(item.content, function (idx1, item1) {
            if (text === item1.title) {
              tmpData = item1;
            }
          });
          return false;
        }
      });
      return tmpData;
    },
    getDataPanelData: function getDataPanelData(pageStatus) {

      switch (pageStatus.pageName) {
        case "INIT0":
          var data = [
          {
            title:"Bisiness",
            objList:[]
          },
          {
            title:"Service",
            objList:[]
          },
          {
            title:"Resource",
            objList:[]
          }]

          dataPanelItemChangeActions.dataPanelItemAddAction(pageStatus, data);
          break;
        case "INIT":
          this.getInitPageData(pageStatus);
          break;
        case "ANALYSIS":
          this.getAnalysisPageData(pageStatus);
          break;
        default:
          ;
      }
    },
    getInitPageData: function getInitPageData(pageStatus) {

      var customerId=  global.pageStatusDataStore.getCustomerID().CUSTOMER_ID;
      var currentStatus = global.pageStatusDataStore.getCurrentStatus();
      var sid = currentStatus.sid;
      var client = currentStatus.client;

      var ajaxData = [];
      var that = this;
      var ajaxTotal = 0;
      var ajaxCount = 0;
      /*var urls = {
        bUrl: 'http://10.97.144.117:8000/SmartOperations/services/smopsMaster.xsodata/FACTORMASTER?$format=json&$filter=CUSTOMER_ID eq \'1001\' and SYSID eq \'KEV\' and SYSCLT eq \'001\' and FACTOR_CATEGORY eq \'B\' and FACTOR_TYPE eq \'TBL\' and PIN eq \'X\'&$orderby=TREND desc&$top=5',
        sUrl: 'http://10.97.144.117:8000/SmartOperations/services/smopsMaster.xsodata/FACTORMASTER?$format=json&$filter=CUSTOMER_ID eq \'1001\' and SYSID eq \'KEV\' and SYSCLT eq \'001\' and FACTOR_CATEGORY eq \'S\' and PIN eq \'X\'&$orderby=TREND desc&$top=5',
        rUrl: 'http://10.97.144.117:8000/SmartOperations/services/smopsMaster.xsodata/FACTORMASTER?$format=json&$filter=CUSTOMER_ID eq \'1001\' and SYSID eq \'KEV\' and SYSCLT eq \'001\' and FACTOR_CATEGORY eq \'R\' and PIN eq \'X\'&$orderby=TREND desc&$top=5'
      };*/

      var urls = {
        bUrl: 'http://10.97.144.117:8000/SmartOperations/services/getInitData.xsjs?customerId=' + customerId.toString() + '&factorCate=B&sysId='+sid+'&sysClt='+client,
        sUrl: 'http://10.97.144.117:8000/SmartOperations/services/getInitData.xsjs?customerId=' + customerId.toString() + '&factorCate=S&sysId='+sid+'&sysClt='+client,
        rUrl: 'http://10.97.144.117:8000/SmartOperations/services/factorMaster.xsodata/FACTORMASTER?$format=json&$filter=FACTOR_CATEGORY%20eq%20%27R%27%20and%20STATUS%20eq%20%27A%27%20and%20PIN%20eq%20%27X%27&$orderby=TREND%20desc&$top=5'
      };
      /*var urls = {
        bUrl: 'http://10.97.144.117:8000/SmartOperations/services/factorMaster.xsodata/FACTORMASTER?$format=json&$filter=FACTOR_CATEGORY%20eq%20%27B%27%20and%20FACTOR_TYPE%20eq%20%27TBL%27%20and%20STATUS%20eq%20%27A%27%20and%20PIN%20eq%20%27X%27&$orderby=TREND%20desc&$top=5',
        sUrl: 'http://10.97.144.117:8000/SmartOperations/services/factorMaster.xsodata/FACTORMASTER?$format=json&$filter=FACTOR_CATEGORY%20eq%20%27S%27%20and%20STATUS%20eq%20%27A%27%20and%20PIN%20eq%20%27X%27&$orderby=TREND%20desc&$top=5',
        rUrl: 'http://10.97.144.117:8000/SmartOperations/services/factorMaster.xsodata/FACTORMASTER?$format=json&$filter=FACTOR_CATEGORY%20eq%20%27R%27%20and%20STATUS%20eq%20%27A%27%20and%20PIN%20eq%20%27X%27&$orderby=TREND%20desc&$top=5'
      };*/


      var _loop = function _loop(url) {
        ajaxTotal++;
        $.ajax({
          url: urls[url],
          method: 'get',
          dataType: 'json',
          headers: {
            'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345'),
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'DataServiceVersion': '2.0',
            'X-CSRF-Token': 'Fetch'
          }
        }).done(function (data) {
          ajaxCount++;

          var title = '';
          var index = void 0;
          switch (url) {
            case 'bUrl':
              title = 'Business';
              index = 0;
              break;
            case 'sUrl':
              title = 'Service';
              index = 1;
              break;
            case 'rUrl':
              title = 'Resource';
              index = 2;
              break;
            default:
              ;
          }
          ajaxData.splice(index, 0, {
            title: title,
            objList: data.d.results
          });

          if (ajaxCount == ajaxTotal) {
            dataPanelItemChangeActions.dataPanelItemAddAction(currentStatus, ajaxData);
          }
        }).fail(function () {
          console.error('Data panel fetch error:');
          console.error(arguments);
        });
      };

      for (var url in urls) {
        _loop(url);
      }
    },
    getAnalysisPageData: function getAnalysisPageData(pageStatus) {},
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
      $.each(this.dataPanelData, function (idx, item) {
        if (that.isStatusEqual(item.pageStatus,pageStatus)) {
          flag = 1;
          return false;
        }
      });
      return !!flag;
    },
    isSubItemExisted: function isSubItemExisted(pageStatus) {
      var flag = 0;
      var that = this;
      $.each(this.dataPanelData, function (idx, item) {
        if (that.isStatusEqual(item.pageStatus,pageStatus)) {
          $.each(item.content, function (idx1, item1) {
            if (item1.objList.length) {
              flag = 1;
              return false;
            }
          });
          return false;
        }
      });
      return !!flag;
    },
    getBlockObjList:function getBlockObjList(pageStatus,title){
      var objList = [];
      var that = this;
      $.each(this.dataPanelData, function (idx, item) {
        if (that.isStatusEqual(item.pageStatus,pageStatus)) {
          $.each(item.content, function (idx1, item1) {
            if(item1.title == title){
              objList = objList.concat(item1.objList);
              return false;
            }
            
          });
          
        }
      });
      return objList;
    },
    getObjList: function getObjList(pageStatus) {
      var that = this;
      var objList = [];
      $.each(this.dataPanelData, function (idx, item) {
        if (that.isStatusEqual(item.pageStatus,pageStatus)) {
          $.each(item.content, function (idx1, item1) {
            objList = objList.concat(item1.objList);
          });
          return false;
        }
      });
      return objList;
    }

  });
})(window.Reflux, window.jQuery, window);