'use strict';

(function (Reflux, $, dataPanelDataStore, global) {
  var pageStatusDataStore = global.pageStatusDataStore;


  global.displayAreaChangeActions = Reflux.createActions(['displayAreaAddCardAction', 'displayAreaRemoveCardAction', 'displayAreaAddPageAction', 'displayAreaRemovePageAction', 'displayAreaChangeCardAction', 'displayAreaUpdateCardPosAction']);

  global.displayAreaDataStore = Reflux.createStore({
    listenables: [global.displayAreaChangeActions],
    displayAreaData: [{
      pageStatus: {
        pageName:"INIT0",
        sid:"",
        client:""
      },
      content: []
    }],


          getSystemIDbyCustomer:function getSystemIDbyCustomer(customer_id)
      {

          var url = "http://10.97.144.117:8000/SmartOperations/services/authorization.xsodata/LOGONINFO?$filter=CUSTOMER_ID eq "+customer_id;
            $.ajax({
              url: url,
              method: 'GET',
              async: false,
              headers: {
                'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345'),
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'DataServiceVersion': '2.0',
                'X-CSRF-Token': 'Fetch'
              }
            }).done(function (resp) {
              console.log(resp)
          return resp.d.results;

              }).fail(function () {
              console.error('Create object error:');
              console.error(arguments);
          //    flag = false;
            });
  

      },


    trendSimulation: function(dataInfo, getSimResult) {
      console.log(dataInfo);


      /*var dataInfo = {
            "factorId": data.factorGuid,
            "factorStr": data.factorGuidStr
          };*/


          console.log(dataInfo)
        if(dataInfo.factorCate == 'S'){

          var url = "http://10.97.144.117:8000/SmartOperations/services/rcaSimulation.xsjs";
          

         $.ajax({////////from here

            url: url,
            method: 'POST',
            async: true,
            data: JSON.stringify(dataInfo),
            headers: {
              'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345'),
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
            resp.results.forEach(function(item) {
              //axis.push(item.ID);
        //console.log(item.DATETIME);
              axis.push(item.DATETIME);

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
            var data = {};
            
            data.lineChartAxis = new Array(axis);
            data.lineChartValue = new Array(actualValue, predictValue);
            data.lineNameArr = ["ACTUAL_VALUE", "PREDICT_VALUE"];


            getSimResult(data);

          }).fail(function () {
            console.error('Fetch what-if chart data error:');
            console.error(arguments); 

          });
        }

        else if(dataInfo.factorCate == 'B'){

          var url = "http://10.97.144.117:8000/SmartOperations/services/rcaWhatIf.xsjs";
          

         $.ajax({////////from here

            url: url,
            method: 'POST',
            async: true,
            data: JSON.stringify(dataInfo),
            headers: {
              'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345'),
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'DataServiceVersion': '2.0',
              'X-CSRF-Token': 'Fetch'
            }
          }).done(function (resp) {
            console.log('resp ------ ', resp);
            
            
            var data = {};
            
            data.lineChartAxis = resp.axis;
            data.lineChartValue = resp.series;
            data.lineNameArr = resp.nameArr;
           


            getSimResult(data);

          }).fail(function () {
            console.error('Fetch what-if chart data error:');
            console.error(arguments); 

          });
        }


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
              'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345'),
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
              'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345'),
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
          'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345'),
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
          'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345'),
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
          'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345'),
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
      //var customerId = data.customerId;
      var customerId =  global.pageStatusDataStore.getCustomerID().CUSTOMER_ID;
      var sid = pageStatus.sid;
      var client = pageStatus.client;

      let copydata = JSON.parse(JSON.stringify(data));
      var that = this;
      console.log('add card action');
      console.log(data);
      switch (data.type) {
        case 'INIT0':
        case "KPI":
          $.each(that.displayAreaData,function(idx,item){
            if(that.isStatusEqual(item.pageStatus,pageStatus)){
              item.content.push(data);
              that.trigger(item.content);
            }
          });

          break;
        case 'COM':

          $.each(that.displayAreaData,function(idx,item){
            if(that.isStatusEqual(item.pageStatus,pageStatus)){
              item.content.push(copydata);
              that.trigger(item.content);
            }
          });

          break;
        case 'UPLOAD':


            $.each(that.displayAreaData, function (idx, item) {
              if (that.isStatusEqual(item.pageStatus,pageStatus)) {
                item.content.push(copydata);
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
              'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345'),
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

            copydata.objList = resp.d.results;

            $.each(that.displayAreaData, function (idx, item) {
              if (that.isStatusEqual(item.pageStatus,pageStatus)) {
                item.content.push(copydata);
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
              'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345'),
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

            copydata.objList = resp.d.results;

            $.each(that.displayAreaData, function (idx, item) {
              if (that.isStatusEqual(item.pageStatus,pageStatus)) {
                item.content.push(copydata);
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
          switch (copydata.title) {
            case 'Business':
              //url = 'http://10.97.144.117:8000/SmartOperations/services/factorMaster.xsodata/FACTORMASTER?$format=json&$filter=FACTOR_CATEGORY%20eq%20%27B%27%20and%20FACTOR_TYPE%20eq%20%27TBL%27%20and%20STATUS%20eq%20%27A%27%20and%20PIN%20eq%20%27X%27&$orderby=TREND%20desc';
              //url = 'http://10.97.144.117:8000/SmartOperations/services/factorMaster.xsodata/FACTORMASTER?$format=json&$filter=FACTOR_CATEGORY%20eq%20%27B%27%20and%20STATUS%20eq%20%27A%27&$orderby=TREND%20desc';
              url = 'http://10.97.144.117:8000/SmartOperations/services/smopsMaster.xsodata/FACTORMASTER?$format=json&$filter=CUSTOMER_ID eq \''+customerId+'\' and SYSID eq \''+ sid +'\' and SYSCLT eq \''+ client +'\' and FACTOR_CATEGORY eq \'B\'&$orderby=TREND desc';
              break;

            case 'Service':
              //url = 'http://10.97.144.117:8000/SmartOperations/services/factorMaster.xsodata/FACTORMASTER?$format=json&$filter=FACTOR_CATEGORY%20eq%20%27S%27%20and%20STATUS%20eq%20%27A%27&$orderby=TREND%20desc';
              url = 'http://10.97.144.117:8000/SmartOperations/services/smopsMaster.xsodata/FACTORMASTER?$format=json&$filter=CUSTOMER_ID eq \''+customerId+'\' and SYSID eq \''+ sid +'\' and SYSCLT eq \''+ client +'\' and FACTOR_CATEGORY eq \'S\'&$orderby=TREND desc';
              
              break;

            case 'Resource':
              //url = 'http://10.97.144.117:8000/SmartOperations/services/factorMaster.xsodata/FACTORMASTER?$format=json&$filter=FACTOR_CATEGORY%20eq%20%27R%27%20and%20STATUS%20eq%20%27A%27&$orderby=TREND%20desc';
              url = 'http://10.97.144.117:8000/SmartOperations/services/smopsMaster.xsodata/FACTORMASTER?$format=json&$filter=CUSTOMER_ID eq \''+customerId+'\' and SYSID eq \''+ sid +'\' and SYSCLT eq \''+ client +'\' and FACTOR_CATEGORY eq \'R\'&$orderby=TREND desc';
              break;

            default:
              ;
          }

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
            //do sth
            var factorObj = [];

            resp.d.results.forEach(function (item) {
              factorObj.push(item);
            });

            copydata.objList = resp.d.results;

            $.each(that.displayAreaData, function (idx, item) {
              if (that.isStatusEqual(item.pageStatus,pageStatus)) {
                item.content.push(copydata);
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
              if (that.isStatusEqual(item.pageStatus,pageStatus)) {
                
                var counter=0;

                item.content.filter((one)=>{
                  if(one.type == "DVM")
                    {one.dvmanalysis.push(copydata)                
                    counter ++;
                    }
                });
                if(counter==0)
                {
                  item.content.push({
                    type:"DVM",
                    dvmanalysis:[copydata],
                    id:copydata.id,
                    style:copydata.style
                  })
                }
                that.trigger(item.content);
                return false;




                }
              });
          break;
        case 'DVM-BLOCK':
          $.each(that.displayAreaData, function (idx, item) {
              if (that.isStatusEqual(item.pageStatus,pageStatus)) {
                item.content.push(copydata);
                that.trigger(item.content);
                return false;
              }
          });
          break;
        case 'ITEM':
        case 'ITEM-ANA':

        if(copydata.category[0] == 'S')
        {
          var url = 'http://10.97.144.117:8000/SmartOperations/services/getFactorStat.xsjs?customerId=' + customerId + '&sysId=' + sid + '&sysClt=' + client + '&factorCate=' + copydata.category[0] + '&factorType=' + copydata.factor_type + '&factorName=' + copydata.FACTOR_NAME[0];
          console.log('ITEM url: ',url);
          console.log('RCA data ----', copydata);
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
            var axis = [];
            var avg_time = [];
            var total_time = [];
            var step = [];
            resp.results.forEach(function (item) {
              //axis.push(item.CALENDARWEEK);
              axis.push(item.YEAR_MONTH);
              avg_time.push(item.AVG_TIME);
              total_time.push(item.TOTAL_TIME);
              step.push(item.STEP);
              //value.push(item.CPU_DB_TIME);
            });
            copydata.lineChartAxis = new Array(axis);
            copydata.lineChartAvgTime = new Array(avg_time);
            copydata.lineChartValue = new Array(total_time);
            copydata.lineChartStep = new Array(step);
            $.each(that.displayAreaData, function (idx, item) {
              if (that.isStatusEqual(item.pageStatus,pageStatus)) {
                console.log('pageStatus chart = ');
                console.log(pageStatus);
                console.log('cardId = ');
                console.log(item);
                item.content.push(copydata);
                that.trigger(item.content);
                return false;
              }
            });
          }).fail(function () {
            console.error('Fetch line chart data error:');
            console.error(arguments);
          });
        }
        else if(copydata.category[0] == 'B')
        {
          console.log(copydata)
          var url = 'http://10.97.144.117:8000/SmartOperations/services/getFactorStat.xsjs?customerId=' + customerId + '&sysId=' + sid + '&sysClt=' + client + '&factorCate=' + copydata.category[0] + '&factorType=' + copydata.factor_type + '&factorName=' + copydata.FACTOR_NAME[0];
console.log('url: ',url);
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
            var axis = [];
            var total_entries = [];
            var month_entries = [];
            resp.results.forEach(function (item) {
              //axis.push(item.CALENDARWEEK);
              axis.push(item.YEAR_MONTH);
              total_entries.push(item.TABLE_ENTRIES);
              month_entries.push(item.MONTHLY_ENTRIES);
            });
            copydata.lineChartAxis = new Array(axis);
            copydata.lineChartValue = new Array(total_entries);
            copydata.lineChartMonthEntries = new Array(month_entries);
            $.each(that.displayAreaData, function (idx, item) {
              if (that.isStatusEqual(item.pageStatus,pageStatus)) {
                console.log('pageStatus chart = ');
                console.log(pageStatus);
                console.log('cardId = ');
                console.log(item);                
                item.content.push(copydata);
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
              'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345')
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
          $.each(copydata.objList, function (idx, item) {
            var index = categoryTypeArr.indexOf(item.FACTOR_CATEGORY);
            if (index < 0) {
              categoryTypeArr.push(item.FACTOR_CATEGORY);
              INFLUENCE_RATE_Arr[categoryTypeArr.length - 1] = parseFloat(item.INFLUENCE_RATE);
            } else {
              INFLUENCE_RATE_Arr[index] += parseFloat(item.INFLUENCE_RATE);
            }
          });

          copydata.seriesArr = [];
          var convert = {
            "S": "Service",
            "B": "Business",
            "R": "Resource"
          };
          for (var i in categoryTypeArr) {
            copydata.seriesArr.push([convert[categoryTypeArr[i]], INFLUENCE_RATE_Arr[i]]);
          }

          $.each(that.displayAreaData, function (idx, item) {
            if (that.isStatusEqual(item.pageStatus,pageStatus)) {
              item.content.push(copydata);
              that.trigger(item.content);
            }
          });
          break;
        case "RCA_SIM":
          $.each(that.displayAreaData, function (idx, item) {
              if (that.isStatusEqual(item.pageStatus,pageStatus)) {
                item.content.push(copydata);
                that.trigger(item.content);
                return false;
              }
            });          

          break;
        case "WHAT_IF":
          
            $.each(that.displayAreaData, function (idx, item) {
              if (that.isStatusEqual(item.pageStatus,pageStatus)) {
                item.content.push(copydata);
                that.trigger(item.content);
                return false;
              }
            });
          

          break;
        case "SAVE":
          $.each(that.displayAreaData, function (idx, item) {
              if (that.isStatusEqual(item.pageStatus,pageStatus)) {
                item.content.push(copydata);
                that.trigger(item.content);
                return false;
              }
          });
          break;
        case "ART_TEMP":
          $.each(that.displayAreaData, function (idx, item) {
              if (that.isStatusEqual(item.pageStatus,pageStatus)) {
                item.content.push(copydata);
                that.trigger(item.content);
                return false;
              }
          });
          break;
        case "SAVE-ARTI":
          $.each(that.displayAreaData, function (idx, item) {
              if (that.isStatusEqual(item.pageStatus,pageStatus)) {
                item.content.push(copydata);
                that.trigger(item.content);
                return false;
              }
          });
          break;
        case "CPM-DIA":
        case "CPM-BTC":
        case "CPM-RFC":
          console.log('go to dataStore CPM drilldown ------ ', copydata);

          var url = "http://10.97.144.117:8000/SmartOperations/services/getTransaction.xsjs?customerId=" + customerId + "&dateYear=" + copydata.dateYear + "&dateMonth=" + copydata.dateMonth + "&taskType=" + copydata.taskType+'&sysID=' + sid + '&client=' + client;

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
            copydata.chartCateAxis = new Array(cateArr);
            copydata.chartCPUValue = new Array(cpuValueArr);
            copydata.chartDBValue = new Array(dbValueArr);
            copydata.chartCumValue = new Array(cumValueArr);
            $.each(that.displayAreaData, function (idx, item) {
              if (that.isStatusEqual(item.pageStatus,pageStatus)) {
                
                item.content.push(copydata);
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

          var url = "http://10.97.144.117:8000/SmartOperations/services/getWLHistory.xsjs?customerId=" + customerId + "&latestYear=" + copydata.latestYear + "&latestMonth=" + copydata.latestMonth + "&monthCount=" + copydata.monthCount+'&sysID=' + sid + '&client=' + client;

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
            var cateArr = [];
            var cpuValueArr = [];
            var dbValueArr = [];
            var stepValueArr = [];

           /* resp.results.forEach(function (item) {
              
              cateArr.push(item.YEAR_MONTH);
              cpuValueArr.push(parseInt(item.CPU_SUM));
              dbValueArr.push(parseInt(item.DB_SUM));
              stepValueArr.push(parseInt(item.STEP_SUM));


            });*/

            for(var i = resp.results.length-1; i >= 0; i--){
                cateArr.push(resp.results[i].YEAR_MONTH);
                cpuValueArr.push(parseInt(resp.results[i].CPU_SUM));
                dbValueArr.push(parseInt(resp.results[i].DB_SUM));
                stepValueArr.push(parseInt(resp.results[i].STEP_SUM));
            }
            
            copydata.chartCateAxis = new Array(cateArr);
            copydata.chartCPUValue = new Array(cpuValueArr);
            copydata.chartDBValue = new Array(dbValueArr);
            copydata.chartStepValue = new Array(stepValueArr);
            $.each(that.displayAreaData, function (idx, item) {
              if (that.isStatusEqual(item.pageStatus,pageStatus)) {
                
                item.content.push(copydata);
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
          var url = "http://10.97.144.117:8000/SmartOperations/services/getWLOverview.xsjs?customerId=" + customerId + "&dateYear=" + copydata.dateYear + "&dateMonth=" + copydata.dateMonth+'&sysID=' + sid + '&client=' + client;

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
            copydata.chartCateAxis = new Array(cateArr);
            copydata.chartCPUValue = new Array(cpuValueArr);
            copydata.chartDBValue = new Array(dbValueArr);
            copydata.chartCumValue = new Array(cumValueArr);
            $.each(that.displayAreaData, function (idx, item) {
              if (that.isStatusEqual(item.pageStatus,pageStatus)) {
                
                item.content.push(copydata);
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
        if (that.isStatusEqual(item.pageStatus,pageStatus)) {
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
    onDisplayAreaAddPageAction: function onDisplayAreaAddPageAction(pageStatus) {
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
      
      if(!this.isStatusExisted(pageStatus)){
        this.displayAreaData.push({
        pageStatus: pageStatus,
        content: []
      });
      }
      
    },
    onDisplayAreaRemovePageAction: function onDisplayAreaRemovePageAction(pageStatus) {
      var that = this;
      $.each(this.displayAreaData, function (idx, item) {
        if (that.isStatusEqual(item.pageStatus,pageStatus)) {
          that.displayAreaData.splice(idx, 1);
          return false;
        }
      });
    },
    onDisplayAreaChangeCardAction: function onDisplayAreaChangeCardAction(pageStatus, data, cardId) {
      var that = this;
      if(data.category == 'B'){
        $.each(this.displayAreaData, function (idx, item) {
          if (that.isStatusEqual(item.pageStatus,pageStatus)) {
            $.each(item.content, function (idx1, item1) {

              if (item1.id === cardId) {
                console.log('pageStatus update = ');
                console.log(pageStatus);
                console.log('cardId = ');
                console.log(cardId);
                var url = 'http://10.97.144.117:8000/SmartOperations/services/getFactorStat.xsjs?customerId=' + data.customerId + '&sysId=' + data.systemId + '&sysClt=' + data.systemClt + '&factorCate=' + data.category + '&factorType=' + data.factor_type + '&factorName=' + data.FACTOR_NAME_S;
                console.log('RCA Add factor URL---------', url);
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
                  var axis = [];
                  var total_entries = [];
                  var month_entries = [];
                  resp.results.forEach(function (item) {
                    //axis.push(item.CALENDARWEEK);
                    axis.push(item.YEAR_MONTH)
                    total_entries.push(item.TABLE_ENTRIES);
                    month_entries.push(item.MONTHLY_ENTRIES);
                  });
                  //data.lineChartAxis = new Array(axis);
                  //data.lineChartValue = new Array(value);
                  console.log('item1 in forEach -------------- ',item1);

                  item1.FACTOR_NAME.push(data.FACTOR_NAME_S);
                  item1.guidArr.push(data.FACTOR_NAME_S);
                  item1.lineChartAxis.push(axis);
                  item1.lineChartValue.push(total_entries);
             //     item1.lineChartMonthEntries.push(month_entries);
                  item1.category.push(data.category);
                  that.trigger(item.content);
                  /*$.each(that.displayAreaData, function (idx, item) {
                    if (pageStatus === item.pageStatus) {
                      console.log('pageStatus chart = ');
                      console.log(pageStatus);
                      console.log('cardId = ');
                      console.log(item);
                      item.content.push(data);
                      that.trigger(item.content);
                      return false;
                    }
                  });*/
                }
            ).fail(function () {
                  console.error('Fetch line chart data error:');
                  console.error(arguments);
                });
              }
            });
            return false;
          }
        });
    }else if(data.category == 'S'){
      $.each(this.displayAreaData, function (idx, item) {
          if (that.isStatusEqual(item.pageStatus,pageStatus)) {
            $.each(item.content, function (idx1, item1) {

              if (item1.id === cardId) {
                console.log('pageStatus update = ');
                console.log(pageStatus);
                console.log('cardId = ');
                console.log(cardId);
                var url = 'http://10.97.144.117:8000/SmartOperations/services/getFactorStat.xsjs?customerId=' + data.customerId + '&sysId=' + data.systemId + '&sysClt=' + data.systemClt + '&factorCate=' + data.category + '&factorType=' + data.factor_type + '&factorName=' + data.FACTOR_NAME_S;
                console.log('RCA Add factor URL---------', url);
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
                  var axis = [];
                  var avg_time = [];
                  var total_time = [];
                  var step = [];
                  resp.results.forEach(function (item) {
                    //axis.push(item.CALENDARWEEK);
                    axis.push(item.YEAR_MONTH);
                    avg_time.push(item.AVG_TIME);
                    total_time.push(item.TOTAL_TIME);
                    step.push(item.STEP);
                  });
                  //data.lineChartAxis = new Array(axis);
                  //data.lineChartValue = new Array(value);
                  console.log('item1 in forEach -------------- ',item1);
                  console.log(avg_time);

                  item1.FACTOR_NAME.push(data.FACTOR_NAME_S);
                  item1.guidArr.push(data.FACTOR_NAME_S);
                  item1.lineChartAxis.push(axis);
              //    item1.lineChartAvgTime.push(avg_time);
                  item1.lineChartValue.push(total_time);
                //  item1.lineChartStep.push(step);
                  item1.category.push(data.category);

                  that.trigger(item.content);
                  console.log(this.displayAreaData);
                  /*$.each(that.displayAreaData, function (idx, item) {
                    if (pageStatus === item.pageStatus) {
                      console.log('pageStatus chart = ');
                      console.log(pageStatus);
                      console.log('cardId = ');
                      console.log(item);
                      item.content.push(data);
                      that.trigger(item.content);
                      return false;
                    }
                  });*/
                }
            ).fail(function () {
                  console.error('Fetch line chart data error:');
                  console.error(arguments);
                });
            return false;
              }
            });
            return false;
          }
        });
    }else if(pageStatus.pageName == "INIT0"){

         $.each(this.displayAreaData, function (idx, item) {
          if (that.isStatusEqual(item.pageStatus,pageStatus)) {
              $.ajax({
                url: "http://10.97.144.117:8000/SmartOperations/services/authorization.xsodata/LOGONINFO",
                method: 'POST',
                async: true,
                data: JSON.stringify(data),
                headers: {
                  'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345'),
                  'X-Requested-With': 'XMLHttpRequest',
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'DataServiceVersion': '2.0',
                  'X-CSRF-Token': 'Fetch'
                }
              }).done(function (resp) {                
                item.content[0].logInfo.push(data);
                that.trigger(item.content);
              }).fail(function(){
                console.log('Add systems failed')
                console.log(arguments);
              })
        
          }
        })
    }
    },
    onDisplayAreaUpdateCardPosAction: function onDisplayAreaUpdateCardPosAction(cardId, pos) {
      var that = this;
      $.each(this.displayAreaData, function (idx, item) {
        if (that.isStatusEqual(pageStatusDataStore.getCurrentStatus(),item.pageStatus)) {
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
        var that = this;
        var tmpData = [];
        $.each(this.displayAreaData, function (idx, item) {
          if (that.isStatusEqual(item.pageStatus,pageStatus)) {
            if (pageStatus.pageName == "INIT0" && item.content.length === 0) {
              that.getInitData(pageStatus);
            }
            else{
              tmpData = item.content;
              
            }
            return false; 
          }
        });

        return tmpData;
      }
        
      else {
        return this.displayAreaData;
      }
        
    },
    getInitData: function getInitData(pageStatus) {
       if(pageStatus.pageName == "INIT0"){
          var customerId =  global.pageStatusDataStore.getCustomerID().CUSTOMER_ID;
          var url = "http://10.97.144.117:8000/SmartOperations/services/authorization.xsodata/LOGONINFO?$filter=CUSTOMER_ID eq "+customerId;
          
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
          }).done(function (data) { 
            var results = data.d.results;
              if(results.length == 0){
                var data = {
                  logInfo:[],
                  type:"INIT0"
                }
              }
              else{
                var data = {
                  logInfo:results,
                  type:"INIT0"
                };
                
              }         
              var pageStatus = {
                  pageName:"INIT0",
                  sid:"",
                  client:""
              }
              displayAreaChangeActions.displayAreaAddCardAction(pageStatus,data);
                         
          }).fail(function () {
          console.error('Data panel fetch error:');
          console.error(arguments);
        });
      };
       
    },
    isCardExisted: function isCardExisted(pageStatus, cardType) {
      var flag = 0;
      var that = this;
      $.each(this.displayAreaData, function (idx, item) {
        if (that.isStatusEqual(item.pageStatus,pageStatus)) {
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
      var that = this;
      $.each(this.displayAreaData, function (idx, item) {
        if (that.isStatusEqual(item.pageStatus,pageStatus)) {
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
      $.each(this.displayAreaData, function (idx, item) {
        if (that.isStatusEqual(item.pageStatus,pageStatus)) {
          flag = 1;
          return false;
        }
      });
      return !!flag;
    },

  });
})(window.Reflux, window.jQuery, window.dataPanelDataStore, window);