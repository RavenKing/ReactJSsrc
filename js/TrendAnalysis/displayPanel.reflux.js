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


          var url = "/SmartOperations/services/authorization.xsodata/LOGONINFO?$filter=CUSTOMER_ID eq "+customer_id;
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
          if(dataInfo.factorId==null)
          {
            dataInfo.factorId= '532130';
          }
        if(dataInfo.factorCate == 'S'){

          var url = "/SmartOperations/services/rcaSimulation.xsjs";
          

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

          var url = "/SmartOperations/services/rcaWhatIf.xsjs";
          

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
    getArchobj:function(table_name){

      var url = "http://10.97.144.117:8000/SmartOperations/services/getArchobj.xsjs?tbl_nam="+table_name;
      var archobj = "";
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
          }).done(function(resp) {
            console.log(resp);
            if(resp.results.length > 0){
              archobj = resp.results[0].ARCHOBJ;
            }


          }).fail(function(err){
            console.log(err);
          })
          
        return archobj;


    },

    uploadConfirm: function(dataInfo, getRespond) {
    var flag = false;

    var url = "/SmartOperations/services/uploadConfirm.xsjs";
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
    addRelation:function addRelation(data){
      var flag = false;
      var url = "http://10.97.144.117:8000/SmartOperations/services/KnowledgeManagement.xsodata/SM_REL";

      $.ajax({
        url:url,
        method: 'POST',
        async:false,
        data: JSON.stringify(data),
        headers: {
          'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345'),
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'DataServiceVersion': '2.0',
          'X-CSRF-Token': 'Fetch'
        }
      }).done(function(resp){
          flag = true;
      }).fail(function(resp){
          console.log("fail "+resp);
      })
      return flag;
    },
    deleteRelation:function deleteRelation(data){
      var flag = false;
      var url = "http://10.97.144.117:8000/SmartOperations/services/deleteRelation.xsjs?REPORT_NAME="+data.REPORT_NAME+"&RELATED_NAME="+data.RELATED_NAME;
      $.ajax({
        url:url,
        method:"GET",
        async: false,
        headers:{
          'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345'),
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'DataServiceVersion': '2.0',
          'X-CSRF-Token': 'Fetch'
        }
      }).done(function(resp){
          flag = true;
      }).fail(function(err){
        console.log(err);
      })
      return flag;
    },
    updateRelation:function updateRelation(data){
      var flag = false;
      var url = "http://10.97.144.117:8000/SmartOperations/services/updateRelation.xsjs?REPORT_NAME="+data.REPORT_NAME+"&RELATED_NAME="+data.RELATED_NAME+"&FACTOR="+data.FACTOR;
      $.ajax({
        url:url,
        method:"GET",
        async: false,
        headers:{
          'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345'),
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'DataServiceVersion': '2.0',
          'X-CSRF-Token': 'Fetch'
        }
      }).done(function(resp){
          flag = true;
      }).fail(function(err){
        console.log(err);
      })
      return flag;
    },
    pinObject: function pinObject(factorId, setPin) {
      var flag = false;
      var url = "/SmartOperations/services/pinObject.xsjs?factorId=" + factorId + "&pin=" + setPin;
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
      var url = "/SmartOperations/services/deleteObject.xsjs?factorId=" + factorId;
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
      var url = "/SmartOperations/services/maintainObject.xsjs";
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
            if(that.isStatusEqual(item.pageStatus,pageStatus) && item.content.length == 0){
              item.content.push(data);
              that.trigger(item.content);
            }
          });

          break;
        case 'COM':
        case 'UPLOAD':

          $.each(that.displayAreaData,function(idx,item){
            if(that.isStatusEqual(item.pageStatus,pageStatus)){
              item.content.push(copydata);
              that.trigger(item.content);
            }
          });

          break;
        case 'EDIT':

          $.ajax({
            url: '/SmartOperations/services/factorMaster.xsodata/FACTORMASTER?$format=json&$filter=STATUS%20eq%20%27A%27&$orderby=TREND%20desc',
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
            url: '/SmartOperations/services/factorMaster.xsodata/FACTORMASTER?$format=json&$filter=STATUS%20eq%20%27A%27&$orderby=TREND%20desc',
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
              url = '/SmartOperations/services/smopsMaster.xsodata/FACTORMASTER?$format=json&$filter=CUSTOMER_ID eq \''+customerId+'\' and SYSID eq \''+ sid +'\' and SYSCLT eq \''+ client +'\' and FACTOR_CATEGORY eq \'B\'&$orderby=TREND desc';
              break;

            case 'Service':
              //url = 'http://10.97.144.117:8000/SmartOperations/services/factorMaster.xsodata/FACTORMASTER?$format=json&$filter=FACTOR_CATEGORY%20eq%20%27S%27%20and%20STATUS%20eq%20%27A%27&$orderby=TREND%20desc';
              url = '/SmartOperations/services/smopsMaster.xsodata/FACTORMASTER?$format=json&$filter=CUSTOMER_ID eq \''+customerId+'\' and SYSID eq \''+ sid +'\' and SYSCLT eq \''+ client +'\' and FACTOR_CATEGORY eq \'S\'&$orderby=TREND desc';
              
              break;

            case 'Resource':
              //url = 'http://10.97.144.117:8000/SmartOperations/services/factorMaster.xsodata/FACTORMASTER?$format=json&$filter=FACTOR_CATEGORY%20eq%20%27R%27%20and%20STATUS%20eq%20%27A%27&$orderby=TREND%20desc';
              url = '/SmartOperations/services/smopsMaster.xsodata/FACTORMASTER?$format=json&$filter=CUSTOMER_ID eq \''+customerId+'\' and SYSID eq \''+ sid +'\' and SYSCLT eq \''+ client +'\' and FACTOR_CATEGORY eq \'R\'&$orderby=TREND desc';
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

          var url = '/SmartOperations/services/getFactorStat.xsjs?customerId=' + customerId + '&sysId=' + sid + '&sysClt=' + client + '&factorCate=' + copydata.category[0] + '&factorType=' + copydata.factor_type + '&factorName=' + copydata.FACTOR_NAME[0];

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

          var url = '/SmartOperations/services/getFactorStat.xsjs?customerId=' + customerId + '&sysId=' + sid + '&sysClt=' + client + '&factorCate=' + copydata.category[0] + '&factorType=' + copydata.factor_type + '&factorName=' + copydata.FACTOR_NAME[0];
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
            var retention = resp.Retention;
            resp.results.forEach(function (item) {
              //axis.push(item.CALENDARWEEK);
              axis.push(item.YEAR_MONTH);
              total_entries.push(item.TABLE_ENTRIES);
              month_entries.push(item.MONTHLY_ENTRIES);
            });

            var length = total_entries.length;
            copydata.efficiency=0;
            if(retention!=0)
            {


            var efficiency = (total_entries[length-1] - total_entries[length-retention-1]) / total_entries[length-1] * 100;
            copydata.efficiency = efficiency.toFixed(2);
            }
            copydata.retention = retention;
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
          /*var url = "/SmartOperations/services/statData.xsodata/STATISDATA?$format=json&$filter=FACTOR_GUID eq " + data.guidArr[0];
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
        case "DVM":
          var industry;
          var region;
          var customer_id;
          var archobj;
          var bestpractice = {};
          const headers = {
              'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345'),
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'DataServiceVersion': '2.0',
              'X-CSRF-Token': 'Fetch'      
          };
          $.each(that.displayAreaData, function (idx, item) {
            if (that.isStatusEqual(item.pageStatus,pageStatus)) {
              var url = "http://10.97.144.117:8000/SmartOperations/services/articleContent.xsjs?articleId="+data.articleId;
              $.ajax({
                  url: url,
                  method: 'get',
                  dataType: 'json',
                  //async:false,
                  headers: headers
                }).done(function (resp) {
                  if(resp.results.length > 0){
                    copydata.article = resp.results[0];
                    customer_id = resp.results[0].CUSTOMER_ID;
                    archobj = resp.results[0].ARCHOBJ;

                    if(customerId != customer_id){//reference
                      var url1 = "http://10.97.144.117:8000/SmartOperations/services/KnowledgeManagement.xsodata/SMCUST?$filter=CUSTOMER_ID eq "+customer_id;
                      $.ajax({
                        url: url1,
                        method: 'get',
                        dataType: 'json',
                        async:false,
                        headers: headers
                      }).done(function (resp1) {
                        if(resp1.d.results.length > 0){
                          industry = resp1.d.results[0].INDUSTRY;
                          region = resp1.d.results[0].REGION;
                      }
                    
                    }).fail(function(){
                      console.log('Fetch industry of customer failed!');
                    })

                    if(industry && region){


                      var url2 = "http://10.97.144.117:8000/SmartOperations/services/KnowledgeManagement.xsjs?cmd=RECOMMENDATAION&archobj=" + archobj + "&industry="+industry;
                      $.ajax({
                          url: url2,
                          method: 'get',
                          dataType: 'json',
                          async:true,
                          headers: headers
                      }).done(function (resp2) {
                          if(resp2.results.length > 0){
                            bestpractice.AVGS = resp2.results[0].AVGS;
                            bestpractice.Retention = resp2.results[0].Retention;                      
                            
                          }
                                
                      }).fail(function(){
                        console.log('Fetch bestpractice failed!');
                      })

                      
                        var url3 = "http://10.97.144.117:8000/SmartOperations/services/KnowledgeManagement.xsodata/DVMBPRACTICE?$filter= ARCHOBJ eq \'"+archobj+"\'";
                        $.ajax({
                            url: url3,
                            method: 'get',
                            dataType: 'json',
                            async:true,
                            headers: headers
                        }).done(function (resp3) {
                            if(resp3.d.results.length > 0){
                              bestpractice.detail = resp3.d.results[0];
                            }
                        }).fail(function(){
                            console.log('Fetch detail failed!');
                        })

                        

                          var url4 = "http://10.97.144.117:8000/SmartOperations/services/KnowledgeManagement.xsjs?cmd=ALLRECOM&region='"+region+"'&archobj="+archobj;

                          $.ajax({
                              url: url4,
                              method: 'get',
                              dataType: 'json',
                              async:true,
                              headers: headers
                          }).done(function(resp4){
                              if(resp4.results.length > 0){
                                  bestpractice.region_data = {
                                    region:resp4.results
                                  };
                                  copydata.article.bestpractice = bestpractice;
                                  item.content.push(copydata);
                                  that.trigger(item.content);
                              }
                          }).fail(function(){
                              console.log('Fetch region data failed!');
                          })

                      }

                     
                    }else{//article
                      item.content.push(copydata);
                      that.trigger(item.content);
                    } 
                  }
                }).fail(function () {
                  console.error('Fetch article error:');
                  console.error(arguments);
                });
              }
            });
            break;
        case "GEN":
          $.each(that.displayAreaData, function (idx, item) {
            if (that.isStatusEqual(item.pageStatus,pageStatus)) {
              var url = "http://10.97.144.117:8000/SmartOperations/services/KnowledgeManagement.xsodata/KMCAP?$filter=ARTICLE_ID eq "+data.articleId;
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
                    if(resp.d.results.length>0){
                      copydata.article = resp.d.results[0];
                      copydata.article.FACTOR_TYPE = "GEN";
                      copydata.article.ARTICLE_NAM = data.ARTICLE_NAM;
                      item.content.push(copydata);
                      that.trigger(item.content);
                    }
                  
                }).fail(function () {
                  console.error('Fetch article error:');
                  console.error(arguments);
                });
              }
            });
          break;
        case "REL":
          $.each(that.displayAreaData, function (idx, item) {
              if (that.isStatusEqual(item.pageStatus,pageStatus)) {
                var url = "http://10.97.144.117:8000/SmartOperations/services/KnowledgeManagement.xsodata/SM_REL?$filter=REPORT_NAME eq '"+data.report_name+"'";
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
                    copydata.relations = resp.d.results;
                    item.content.push(copydata);
                    that.trigger(item.content);
                }).fail(function () {
                    console.error('Fetch Transaction chart data error:');
                    console.error(arguments);
                });
              }
          });
          break;
        case "SAVE":
        case "SAVE-ARTI":
        case "RCA_SIM":
        case "WHAT_IF":
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

          var url = "/SmartOperations/services/getTransaction.xsjs?customerId=" + customerId + "&dateYear=" + copydata.dateYear + "&dateMonth=" + copydata.dateMonth + "&taskType=" + copydata.taskType+'&sysID=' + sid + '&client=' + client;

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

          var url = "/SmartOperations/services/getWLHistory.xsjs?customerId=" + customerId + "&latestYear=" + copydata.latestYear + "&latestMonth=" + copydata.latestMonth + "&monthCount=" + copydata.monthCount+'&sysID=' + sid + '&client=' + client;


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

          var url = "/SmartOperations/services/getWLOverview.xsjs?customerId=" + customerId + "&dateYear=" + copydata.dateYear + "&dateMonth=" + copydata.dateMonth+'&sysID=' + sid + '&client=' + client;


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

                var url = '/SmartOperations/services/getFactorStat.xsjs?customerId=' + data.customerId + '&sysId=' + pageStatus.sid + '&sysClt=' + pageStatus.client + '&factorCate=' + data.category + '&factorType=' + data.factor_type + '&factorName=' + data.FACTOR_NAME_S;

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

                    console.log(Date.parse(item.YEAR_MONTH));
                    if(Date.parse(item.YEAR_MONTH)>=Date.parse('2016-08')) // delete once done
                    {axis.push(item.YEAR_MONTH)
                    total_entries.push(item.TABLE_ENTRIES);
                    month_entries.push(item.MONTHLY_ENTRIES);
                    }
                  });
                  //data.lineChartAxis = new Array(axis);
                  //data.lineChartValue = new Array(value);
                  console.log('item1 in forEach -------------- ',item1);

                  item1.FACTOR_NAME.push(data.FACTOR_NAME_S);
                  item1.guidArr.push(data.FACTOR_NAME_S);
                  item1.lineChartAxis.push(axis);
                  item1.lineChartValue.push(month_entries);
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
   

                var url = '/SmartOperations/services/getFactorStat.xsjs?customerId=' + data.customerId + '&sysId=' + pageStatus.sid + '&sysClt=' + pageStatus.client + '&factorCate=' + data.category + '&factorType=' + data.factor_type + '&factorName=' + data.FACTOR_NAME_S;
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
                url: "/SmartOperations/services/authorization.xsodata/LOGONINFO",
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
    }else if(data.info == "EFFI"){

       $.each(this.displayAreaData, function (idx, item) {
          if (that.isStatusEqual(item.pageStatus,pageStatus)) {

            $.each(item.content,function(idx1,item1){
              if(item1.id == cardId){

                var customerId =  global.pageStatusDataStore.getCustomerID().CUSTOMER_ID;
                
                $.ajax({
                  url: "http://10.97.144.117:8000/SmartOperations/services/ArchEfficiency.xsjs?customerId="+customerId+"&sysId="+pageStatus.sid+"&sysClt="+pageStatus.client+"&tableName="+data.factor_name,
                  method: 'GET',
                  async: true,
                  headers: {
                    'Authorization': 'Basic ' + btoa('ZENGHENG:Sap12345'),
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'DataServiceVersion': '2.0',
                    'X-CSRF-Token': 'Fetch'
                  }
                }).done(function (resp) {
                    item1.DVM_ARCH=resp.results[0];
                    that.trigger(item.content);
                    
                }).fail(function(){
                console.log('Fetch efficiency failed')
                console.log(arguments);
              })
              }
            })
              
          }
        })

    }else if(data.info == "REL"){
      $.each(this.displayAreaData, function (idx, item) {
          if (that.isStatusEqual(item.pageStatus,pageStatus)) {
            $.each(item.content,function(idx1,item1){
              if(item1.type == "REL"){
                item1.relations = data.relations; 
                that.trigger(item.content);
                return false;
              }
            })
            return false;
          }
      });
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
          var url = "/SmartOperations/services/authorization.xsodata/LOGONINFO?$filter=CUSTOMER_ID eq "+customerId;
          
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