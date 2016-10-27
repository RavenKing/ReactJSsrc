'use strict';

(function (Reflux, $, dataPanelDataStore, global) {
  var pageStatusDataStore = global.pageStatusDataStore;


  global.displayAreaChangeActions = Reflux.createActions(['displayAreaAddCardAction', 'displayAreaRemoveCardAction', 'displayAreaAddPageAction', 'displayAreaRemovePageAction', 'displayAreaChangeCardAction', 'displayAreaUpdateCardPosAction']);

  global.displayAreaDataStore = Reflux.createStore({
    listenables: [global.displayAreaChangeActions],
    displayAreaData: [{
      pageStatus: "INIT",
      content: []
    }],

    trendSimulation: function(dataInfo, getSimResult) {

      /*var dataInfo = {
            "factorId": data.factorGuid,
            "factorStr": data.factorGuidStr
          };*/
          var url = "http://10.97.144.117:8000/SmartOperations/services/whatIfAnalysis.xsjs";
          //var url = "http://10.128.245.87:8004/Kevinyantest/HANAXS_TEST/services/whatIfAnalysis.xsjs?factorId=" + data.factorGuid + "&factorStr=" + data.factorGuidStr;
          $.ajax({
            url: url,
            method: 'POST',
            async: true,
            data: JSON.stringify(dataInfo),
            headers: {
              //'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345'),
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'DataServiceVersion': '2.0',
              'X-CSRF-Token': 'Fetch'
            }
          }).done(function (resp) {
            console.log('resp ------ ', resp);
            var axis = [];
            var actualValue = [];
            var predictValue = [];
            resp.results.forEach(function (item) {
              //axis.push(item.ID);
              //console.log(item.DATETIME);
              axis.push(item.DATETIME.substr(0, 19));
              if (item.ACTUAL_VALUE) {
                actualValue.push(parseInt(item.ACTUAL_VALUE));
              } else {
                actualValue.push(item.ACTUAL_VALUE);
              }
              if (item.PREDICT_VALUE) {
                predictValue.push(parseInt(item.PREDICT_VALUE));
              } else {
                predictValue.push(item.PREDICT_VALUE);
              }
            });

            dataInfo.lineChartAxis = new Array(axis);
            dataInfo.lineChartValue = new Array(actualValue, predictValue);
            dataInfo.lineNameArr = ["ACTUAL_VALUE", "PREDICT_VALUE"];
            /*$.each(that.displayAreaData, function (idx, item) {
              if (pageStatus === item.pageStatus) {
                item.content.push(data);
                that.trigger(item.content);
                return false;
              }
            });*/

            getSimResult(dataInfo);

          }).fail(function () {
            console.error('Fetch what-if chart data error:');
            console.error(arguments); 
          });



    },



    uploadConfirm: function(dataInfo, getRespond) {
    var flag = false;

    var url = "http://10.97.144.117:8000/SmartOperations/services/uploadConfirm.xsjs";
      /*$.ajax({
            url: url,
            method: 'POST',
            data: JSON.stringify(dataInfo),
            async: true,//changed from false
            headers: {
              //'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345'),
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'DataServiceVersion': '2.0',
              'X-CSRF-Token': 'Fetch'
            }
          }).done(function(resp) {
            console.log(resp);
            if(resp.RespondCode == true){
              flag = true;
              console.log('go to if');

              return true;
            }
            else{
              flag = false;
              console.log('go to else');
              return false;
            }
            

          }).fail(function() {
            console.error('upload error:');
            console.error(arguments);
            flag = false;
            console.log('go to fail');
            return false;
          });*/
      
    //rusing callback
    $.ajax({
            url: url,
            method: 'POST',
            data: JSON.stringify(dataInfo),
            async: true,//changed from false
            headers: {
              //'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345'),
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'DataServiceVersion': '2.0',
              'X-CSRF-Token': 'Fetch'
            }
          }).done(function(resp) {
            
            getRespond(resp.RespondCode);

          }).fail(function() {
            console.error('upload error:');
            console.error(arguments);
            
            return false;
          });
    
  },

    pinObject: function pinObject(factorId, setPin) {
      var flag = false;
      var url = "http://10.97.144.117:8000/SmartOperations/services/pinObject.xsjs?factorId=" + factorId + "&pin=" + setPin;
      $.ajax({
        url: url,
        method: 'GET',
        async: false,
        headers: {
          //'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345'),
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'DataServiceVersion': '2.0',
          'X-CSRF-Token': 'Fetch'
        }
      }).done(function (resp) {

        flag = true;
      }).fail(function () {
        console.error('Create object error:');
        console.error(arguments);
        flag = false;
      });

      return flag;
    },

    deleteObject: function deleteObject(factorId) {
      var flag = false;
      var url = "http://10.97.144.117:8000/SmartOperations/services/deleteObject.xsjs?factorId=" + factorId;
      $.ajax({
        url: url,
        method: 'GET',
        async: false,
        headers: {
          //'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345'),
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'DataServiceVersion': '2.0',
          'X-CSRF-Token': 'Fetch'
        }
      }).done(function (resp) {

        flag = true;
      }).fail(function () {
        console.error('Create object error:');
        console.error(arguments);
        flag = false;
      });

      return flag;
    },

    createObject: function createObject(dataInfo) {
      var flag = false;
      var url = "http://10.97.144.117:8000/SmartOperations/services/maintainObject.xsjs";
      $.ajax({
        url: url,
        method: 'POST',
        async: false,
        data: JSON.stringify(dataInfo),
        headers: {
          //'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345'),
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'DataServiceVersion': '2.0',
          'X-CSRF-Token': 'Fetch'
        }
      }).done(function (resp) {

        flag = true;
      }).fail(function () {
        console.error('Create object error:');
        console.error(arguments);
        flag = false;
      });

      return flag;
    },

    onDisplayAreaAddCardAction: function onDisplayAreaAddCardAction(pageStatus, data) {
      data.id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
      var that = this;
      console.log('add card action');
      console.log(data);
      switch (data.type) {
        case 'UPLOAD':


            $.each(that.displayAreaData, function (idx, item) {
              if (pageStatus === item.pageStatus) {
                item.content.push(data);
                that.trigger(item.content);
              }
            });
          

          break;

        case 'EDIT':

          $.ajax({
            url: 'http://10.97.144.117:8000/SmartOperations/services/factorMaster.xsodata/FACTORMASTER?$format=json&$filter=STATUS%20eq%20%27A%27&$orderby=TREND%20desc',
            method: 'get',
            dataType: 'json',
            headers: {
              //'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345'),
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'DataServiceVersion': '2.0',
              'X-CSRF-Token': 'Fetch'
            }
          }).done(function (resp) {
            //do sth
            var factorObj = [];

            resp.d.results.forEach(function (item) {
              factorObj.push(item);
            });

            data.objList = resp.d.results;

            $.each(that.displayAreaData, function (idx, item) {
              if (pageStatus === item.pageStatus) {
                item.content.push(data);
                that.trigger(item.content);
              }
            });
          }).fail(function () {
            console.error('Table data fetch error:');
            console.error(arguments);
          });

          break;
        case 'CREATE':

          $.ajax({
            url: 'http://10.97.144.117:8000/SmartOperations/services/factorMaster.xsodata/FACTORMASTER?$format=json&$filter=STATUS%20eq%20%27A%27&$orderby=TREND%20desc',
            method: 'get',
            dataType: 'json',
            headers: {
              //'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345'),
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'DataServiceVersion': '2.0',
              'X-CSRF-Token': 'Fetch'
            }
          }).done(function (resp) {
            //do sth
            var factorObj = [];

            resp.d.results.forEach(function (item) {
              factorObj.push(item);
            });

            data.objList = resp.d.results;

            $.each(that.displayAreaData, function (idx, item) {
              if (pageStatus === item.pageStatus) {
                item.content.push(data);
                that.trigger(item.content);
              }
            });
          }).fail(function () {
            console.error('Table data fetch error:');
            console.error(arguments);
          });

          break;

        case 'TITLE':

          var url = '';
          switch (data.title) {
            case 'Business':
              //url = 'http://10.97.144.117:8000/SmartOperations/services/factorMaster.xsodata/FACTORMASTER?$format=json&$filter=FACTOR_CATEGORY%20eq%20%27B%27%20and%20FACTOR_TYPE%20eq%20%27TBL%27%20and%20STATUS%20eq%20%27A%27%20and%20PIN%20eq%20%27X%27&$orderby=TREND%20desc';
              //url = 'http://10.97.144.117:8000/SmartOperations/services/factorMaster.xsodata/FACTORMASTER?$format=json&$filter=FACTOR_CATEGORY%20eq%20%27B%27%20and%20STATUS%20eq%20%27A%27&$orderby=TREND%20desc';
              url = 'http://10.97.144.117:8000/SmartOperations/services/smopsMaster.xsodata/FACTORMASTER?$format=json&$filter=CUSTOMER_ID%20eq%20%271001%27%20and%20SYSID%20eq%20%27KEV%27%20and%20SYSCLT%20eq%20%27001%27%20and%20FACTOR_CATEGORY%20eq%20%27B%27';
              break;

            case 'Service':
              //url = 'http://10.97.144.117:8000/SmartOperations/services/factorMaster.xsodata/FACTORMASTER?$format=json&$filter=FACTOR_CATEGORY%20eq%20%27S%27%20and%20STATUS%20eq%20%27A%27&$orderby=TREND%20desc';
              url = 'http://10.97.144.117:8000/SmartOperations/services/smopsMaster.xsodata/FACTORMASTER?$format=json&$filter=CUSTOMER_ID%20eq%20%271001%27%20and%20SYSID%20eq%20%27KEV%27%20and%20SYSCLT%20eq%20%27001%27%20and%20FACTOR_CATEGORY%20eq%20%27S%27';
              
              break;

            case 'Resource':
              //url = 'http://10.97.144.117:8000/SmartOperations/services/factorMaster.xsodata/FACTORMASTER?$format=json&$filter=FACTOR_CATEGORY%20eq%20%27R%27%20and%20STATUS%20eq%20%27A%27&$orderby=TREND%20desc';
              url = 'http://10.97.144.117:8000/SmartOperations/services/smopsMaster.xsodata/FACTORMASTER?$format=json&$filter=CUSTOMER_ID%20eq%20%271001%27%20and%20SYSID%20eq%20%27KEV%27%20and%20SYSCLT%20eq%20%27001%27%20and%20FACTOR_CATEGORY%20eq%20%27R%27';
              break;

            default:
              ;
          }

          $.ajax({
            url: url,
            method: 'get',
            dataType: 'json',
            headers: {
              //'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345'),
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'DataServiceVersion': '2.0',
              'X-CSRF-Token': 'Fetch'
            }
          }).done(function (resp) {
            //do sth
            var factorObj = [];

            resp.d.results.forEach(function (item) {
              factorObj.push(item);
            });

            data.objList = resp.d.results;

            $.each(that.displayAreaData, function (idx, item) {
              if (pageStatus === item.pageStatus) {
                item.content.push(data);
                that.trigger(item.content);
                return false;
              }
            });
          }).fail(function () {
            console.error('Table data fetch error:');
            console.error(arguments);
          });

          break;
        case 'DVM-ITEM':
          $.each(that.displayAreaData, function (idx, item) {
              if (pageStatus === item.pageStatus) {
                
                var counter=0;

                item.content.filter((one)=>{
                  if(one.type == "DVM")
                    {one.dvmanalysis.push(data)                
                    counter ++;
                    }
                });
                if(counter==0)
                {
                  item.content.push({
                    type:"DVM",
                    dvmanalysis:[data],
                    id:data.id,
                    style:data.style
                  })
                }
                that.trigger(item.content);
                return false;




                }
              });
          break;
        case 'DVM-BLOCK':
          $.each(that.displayAreaData, function (idx, item) {
              if (pageStatus === item.pageStatus) {
                item.content.push(data);
                that.trigger(item.content);
                return false;
              }
          });
          break;
        case 'ITEM':
        case 'ITEM-ANA':

        if(data.category == 'S')
        {
          var url = 'http://10.97.144.117:8000/SmartOperations/services/getFactorStat.xsjs?customerId=' + data.customerId + '&sysId=' + data.systemId + '&sysClt=' + data.systemClt + '&factorCate=' + data.category + '&factorType=' + data.factor_type + '&factorName=' + data.FACTOR_NAME;
console.log('ITEM url: ',url);
console.log('RCA data ----', data);
          $.ajax({
            url: url,
            method: 'get',
            dataType: 'json',
            headers: {
              //'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345'),
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'DataServiceVersion': '2.0',
              'X-CSRF-Token': 'Fetch'
            }
          }).done(function (resp) {
            var axis = [];
            var value = [];
            resp.results.forEach(function (item) {
              //axis.push(item.CALENDARWEEK);
              axis.push(item.YEAR_MONTH)
              value.push(item.CPU_DB_TIME);
            });
            data.lineChartAxis = new Array(axis);
            data.lineChartValue = new Array(value);
            $.each(that.displayAreaData, function (idx, item) {
              if (pageStatus === item.pageStatus) {
                console.log('pageStatus chart = ');
                console.log(pageStatus);
                console.log('cardId = ');
                console.log(item);
                item.content.push(data);
                that.trigger(item.content);
                return false;
              }
            });
          }).fail(function () {
            console.error('Fetch line chart data error:');
            console.error(arguments);
          });
        }
        else if(data.category == 'B')
        {
          var url = 'http://10.97.144.117:8000/SmartOperations/services/getFactorStat.xsjs?customerId=' + data.customerId + '&sysId=' + data.systemId + '&sysClt=' + data.systemClt + '&factorCate=' + data.category + '&factorName=' + data.FACTOR_NAME;
console.log('url: ',url);
          $.ajax({
            url: url,
            method: 'get',
            dataType: 'json',
            headers: {
              //'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345'),
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'DataServiceVersion': '2.0',
              'X-CSRF-Token': 'Fetch'
            }
          }).done(function (resp) {
            var axis = [];
            var value = [];
            resp.results.forEach(function (item) {
              //axis.push(item.CALENDARWEEK);
              axis.push(item.YEAR_MONTH)
              value.push(item.TABLE_ENTRIES);
            });
            data.lineChartAxis = new Array(axis);
            data.lineChartValue = new Array(value);
            $.each(that.displayAreaData, function (idx, item) {
              if (pageStatus === item.pageStatus) {
                console.log('pageStatus chart = ');
                console.log(pageStatus);
                console.log('cardId = ');
                console.log(item);
                item.content.push(data);
                that.trigger(item.content);
                return false;
              }
            });
          }).fail(function () {
            console.error('Fetch line chart data error:');
            console.error(arguments);
          });
        }
          /*var url = "http://10.97.144.117:8000/SmartOperations/services/statData.xsodata/STATISDATA?$format=json&$filter=FACTOR_GUID eq " + data.guidArr[0];
          $.ajax({
            url: url,
            method: 'get',
            dataType: 'json',
            headers: {
              //'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345'),
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'DataServiceVersion': '2.0',
              'X-CSRF-Token': 'Fetch'
            }
          }).done(function (resp) {
            var axis = [];
            var value = [];
            resp.d.results.forEach(function (item) {
              //axis.push(item.CALENDARWEEK);
              if (item.DATETIME != null) {
                axis.push(new Date(parseInt(item.DATETIME.replace("/Date(", "").replace(")/", ""))));
              } else {
                axis.push(item.CALENDARWEEK);
              }
              value.push(parseInt(item.STAT_VALUE));
            });
            data.lineChartAxis = new Array(axis);
            data.lineChartValue = new Array(value);
            $.each(that.displayAreaData, function (idx, item) {
              if (pageStatus === item.pageStatus) {
                console.log('pageStatus chart = ');
                console.log(pageStatus);
                console.log('cardId = ');
                console.log(item);
                item.content.push(data);
                that.trigger(item.content);
                return false;
              }
            });
          }).fail(function () {
            console.error('Fetch line chart data error:');
            console.error(arguments);
          });*/
          break;
        case "PIE":
          var categoryTypeArr = [];
          var INFLUENCE_RATE_Arr = [];
          $.each(data.objList, function (idx, item) {
            var index = categoryTypeArr.indexOf(item.FACTOR_CATEGORY);
            if (index < 0) {
              categoryTypeArr.push(item.FACTOR_CATEGORY);
              INFLUENCE_RATE_Arr[categoryTypeArr.length - 1] = parseFloat(item.INFLUENCE_RATE);
            } else {
              INFLUENCE_RATE_Arr[index] += parseFloat(item.INFLUENCE_RATE);
            }
          });

          data.seriesArr = [];
          var convert = {
            "S": "Service",
            "B": "Business",
            "R": "Resource"
          };
          for (var i in categoryTypeArr) {
            data.seriesArr.push([convert[categoryTypeArr[i]], INFLUENCE_RATE_Arr[i]]);
          }

          $.each(that.displayAreaData, function (idx, item) {
            if (pageStatus === item.pageStatus) {
              item.content.push(data);
              that.trigger(item.content);
            }
          });
          break;
        case "WHAT_IF":
          
            $.each(that.displayAreaData, function (idx, item) {
              if (pageStatus === item.pageStatus) {
                item.content.push(data);
                that.trigger(item.content);
                return false;
              }
            });
          

          break;
        case "SAVE":
          $.each(that.displayAreaData, function (idx, item) {
              if (pageStatus === item.pageStatus) {
                item.content.push(data);
                that.trigger(item.content);
                return false;
              }
          });
          break;
        case "ART_TEMP":
          $.each(that.displayAreaData, function (idx, item) {
              if (pageStatus === item.pageStatus) {
                item.content.push(data);
                that.trigger(item.content);
                return false;
              }
          });
          break;

        case "CPM-DIA":
        case "CPM-BTC":
        case "CPM-RFC":
          console.log('go to dataStore CPM drilldown ------ ', data);

          var url = "http://10.97.144.117:8000/SmartOperations/services/getTransaction.xsjs?customerId=" + data.customerId + "&dateYear=" + data.dateYear + "&dateMonth=" + data.dateMonth + "&taskType=" + data.taskType;

          $.ajax({
            url: url,
            method: 'get',
            dataType: 'json',
            headers: {
              //'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345'),
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'DataServiceVersion': '2.0',
              'X-CSRF-Token': 'Fetch'
            }
          }).done(function (resp) {
            var cateArr = [];
            var cpuValueArr = [];
            var dbValueArr = [];
            var cumValueArr = [];

            resp.results.forEach(function (item) {
              
              cateArr.push(item.REPORT_NAME);
              cpuValueArr.push(parseInt(item.CPU_TOTAL));
              dbValueArr.push(parseInt(item.DB_TOTAL));
              cumValueArr.push(parseInt(item.CUMULATED));


            });
            data.chartCateAxis = new Array(cateArr);
            data.chartCPUValue = new Array(cpuValueArr);
            data.chartDBValue = new Array(dbValueArr);
            data.chartCumValue = new Array(cumValueArr);
            $.each(that.displayAreaData, function (idx, item) {
              if (pageStatus === item.pageStatus) {
                
                item.content.push(data);
                that.trigger(item.content);
                return false;
              }
            });
          }).fail(function () {
            console.error('Fetch Transaction chart data error:');
            console.error(arguments);
          });

          break;

        case "CPM-History":

          var url = "http://10.97.144.117:8000/SmartOperations/services/getWLHistory.xsjs?customerId=" + data.customerId + "&latestYear=" + data.latestYear + "&latestMonth=" + data.latestMonth + "&monthCount=" + data.monthCount;

          $.ajax({
            url: url,
            method: 'get',
            dataType: 'json',
            headers: {
              //'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345'),
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'DataServiceVersion': '2.0',
              'X-CSRF-Token': 'Fetch'
            }
          }).done(function (resp) {
            var cateArr = [];
            var cpuValueArr = [];
            var dbValueArr = [];
            var stepValueArr = [];

            resp.results.forEach(function (item) {
              
              cateArr.push(item.YEAR_MONTH);
              cpuValueArr.push(parseInt(item.CPU_SUM));
              dbValueArr.push(parseInt(item.DB_SUM));
              stepValueArr.push(parseInt(item.STEP_SUM));


            });
            data.chartCateAxis = new Array(cateArr);
            data.chartCPUValue = new Array(cpuValueArr);
            data.chartDBValue = new Array(dbValueArr);
            data.chartStepValue = new Array(stepValueArr);
            $.each(that.displayAreaData, function (idx, item) {
              if (pageStatus === item.pageStatus) {
                
                item.content.push(data);
                that.trigger(item.content);
                return false;
              }
            });
          }).fail(function () {
            console.error('Fetch WLH chart data error:');
            console.error(arguments);
          });


          break;
        case "CPM-Overview":
          /*$.each(that.displayAreaData, function (idx, item) {
              if (pageStatus === item.pageStatus) {
                item.content.push(data);
                that.trigger(item.content);
                return false;
              }
            });*/

          //////////
          var url = "http://10.97.144.117:8000/SmartOperations/services/getWLOverview.xsjs?customerId=" + data.customerId + "&dateYear=" + data.dateYear + "&dateMonth=" + data.dateMonth;

          $.ajax({
            url: url,
            method: 'get',
            dataType: 'json',
            headers: {
              //'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345'),
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'DataServiceVersion': '2.0',
              'X-CSRF-Token': 'Fetch'
            }
          }).done(function (resp) {
            var cateArr = [];
            var cpuValueArr = [];
            var dbValueArr = [];
            var cumValueArr = [];

            resp.results.forEach(function (item) {
              
              cateArr.push(item.TASK_TYPE);
              cpuValueArr.push(parseInt(item.CPU_TOTAL));
              dbValueArr.push(parseInt(item.DB_TOTAL));
              cumValueArr.push(parseInt(item.CUMULATED));


            });
            data.chartCateAxis = new Array(cateArr);
            data.chartCPUValue = new Array(cpuValueArr);
            data.chartDBValue = new Array(dbValueArr);
            data.chartCumValue = new Array(cumValueArr);
            $.each(that.displayAreaData, function (idx, item) {
              if (pageStatus === item.pageStatus) {
                
                item.content.push(data);
                that.trigger(item.content);
                return false;
              }
            });
          }).fail(function () {
            console.error('Fetch WLO chart data error:');
            console.error(arguments);
          });




          break;
        default:
          ;
      }
    },
    onDisplayAreaRemoveCardAction: function onDisplayAreaRemoveCardAction(pageStatus, id) {
      var index = 0;
      var that = this;
      $.each(this.displayAreaData, function (idx, item) {
        if (item.pageStatus === pageStatus) {
          $.each(item.content, function (idx1, item1) {
            if (id === item1.id) {
              index = idx1;
              return false;
            }
          });
          item.content.splice(index, 1);
          that.trigger(item.content);
        }
      });
    },
    onDisplayAreaAddPageAction: function onDisplayAreaAddPageAction(pageStatus, cardId) {
      /*var tmpObj = {};
      $.each(this.displayAreaData, function (idx, item) {
        if (item.pageStatus === "INIT") {
          $.each(item.content, function (idx1, item1) {
            if (item1.id === cardId) {
              //tmpObj = item1;
              //console.log(item1);
              tmpObj = item1;
              
              console.log('tmpObj=');
              console.log(tmpObj);
              return false;
            }
          });
          return false;
        }
      });

      this.displayAreaData.push({
        pageStatus: pageStatus,
        content: [tmpObj]
      });*/

      this.displayAreaData.push({
        pageStatus: pageStatus,
        content: []
      });
    },
    onDisplayAreaRemovePageAction: function onDisplayAreaRemovePageAction(pageStatus) {
      var that = this;
      $.each(this.displayAreaData, function (idx, item) {
        if (item.pageStatus === pageStatus) {
          that.displayAreaData.splice(idx, 1);
          return false;
        }
      });
    },
    onDisplayAreaChangeCardAction: function onDisplayAreaChangeCardAction(pageStatus, data, cardId) {
      var that = this;
      $.each(this.displayAreaData, function (idx, item) {
        if (pageStatus === item.pageStatus) {
          $.each(item.content, function (idx1, item1) {

            if (item1.id === cardId) {
              console.log('pageStatus update = ');
              console.log(pageStatus);
              console.log('cardId = ');
              console.log(cardId);
              var url = "http://10.97.144.117:8000/SmartOperations/services/statData.xsodata/STATISDATA?$format=json&$filter=FACTOR_GUID eq " + data.guid;
              $.ajax({
                url: url,
                method: 'get',
                dataType: 'json',
                headers: {
                  //'Authorization': 'Basic ' + btoa('panypan:Initial1'),
                  'X-Requested-With': 'XMLHttpRequest',
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'DataServiceVersion': '2.0',
                  'X-CSRF-Token': 'Fetch'
                }
              }).done(function (resp) {
                var axis = [];
                var value = [];
                resp.d.results.forEach(function (item) {
                  //axis.push(item.CALENDARWEEK);
                  if (item.DATETIME != null) {
                    axis.push(new Date(parseInt(item.DATETIME.replace("/Date(", "").replace(")/", ""))));
                  } else {
                    axis.push(item.CALENDARWEEK);
                  }
                  value.push(parseInt(item.STAT_VALUE));
                });

                item1.FACTOR_NAME.push(data.FACTOR_NAME_S);
                item1.guidArr.push(data.guid);
                item1.lineChartAxis.push(axis);
                item1.lineChartValue.push(value);
                item1.category.push(data.category);
                that.trigger(item.content);
              }).fail(function () {
                console.error('Fetch line chart data error:');
                console.error(arguments);
              });
            }
          });
          return false;
        }
      });
    },
    onDisplayAreaUpdateCardPosAction: function onDisplayAreaUpdateCardPosAction(cardId, pos) {
      $.each(this.displayAreaData, function (idx, item) {
        if (pageStatusDataStore.getCurrentStatus() == item.pageStatus) {
          $.each(item.content, function (i, obj) {
            if (cardId == obj.id) {
              obj.style.top = obj.style.top + pos.topOffset;
              obj.style.left = obj.style.left + pos.leftOffset;
              return false;
            }
          });
          return false;
        }
      });
    },
    getData: function getData(pageStatus) {
      if (pageStatus) {
        var tmpData = [];
        $.each(this.displayAreaData, function (idx, item) {
          if (pageStatus === item.pageStatus) {
            tmpData = item.content;
            return false;
          }
        });

        return tmpData;
      } else {
        return this.displayAreaData;
      }
    },
    isStatusExisted: function isStatusExisted(pageStatus) {
      var flag = 0;
      $.each(this.displayAreaData, function (idx, item) {
        if (item.pageStatus === pageStatus) {
          flag = 1;
          return false;
        }
      });
      return !!flag;
    },
    isCardExisted: function isCardExisted(pageStatus, cardType) {
      var flag = 0;
      $.each(this.displayAreaData, function (idx, item) {
        if (item.pageStatus === pageStatus) {
          $.each(item.content, function (idx1, item1) {
            if (item1.type === cardType) {
              flag = 1;
              return false;
            }
          });
          return false;
        }
      });
      return !!flag;
    },
    getCardLineNumber: function getCardLineNumber(pageStatus, cardId) {
      var num = 0;
      $.each(this.displayAreaData, function (idx, item) {
        if (item.pageStatus === pageStatus) {
          $.each(item.content, function (idx1, item1) {
            if (item1.id === cardId) {
              num = item1.guidArr.length;
              return false;
            }
          });
          return false;
        }
      });
      return num;
    }

  });
})(window.Reflux, window.jQuery, window.dataPanelDataStore, window);