import React from "react"
import SysCltCard from "./SysCltCard";
import DataCard from "./DataCard";
import LineChartCard from "./LineChartCard";
import PieChartCard from "./PieChartCard";
import CreateObjCard from "./CreateObjCard";
import UploadCard from "./uploadCard";
import CommentCard from "./CommentCard";
import SaveArticle from "./SaveArticle";
import ArticleTemplate from "./ArticleTemplate";
import DVMAPanel from "./DVMPanel/DVMAPanel";
import RCASimCard from "./RCASimCard";
import WhatIfCard from "./WhatIfCard";
import WLOverview from "./WLOverview";
import WLHistory from "./WLHistory";
import SaveCapArticle from "./SaveCapArticle";
import { History,Router,browserHistory } from "react-router";
import { connect } from "react-redux";



var interact = window.interact;
var displayAreaDataStore = window.displayAreaDataStore
var displayAreaChangeActions = window.displayAreaChangeActions
var pageStatusDataStore = window.pageStatusDataStore
var global = window

var rc = window.rc;/*
(function (React, rc, antd, interact, displayAreaDataStore, displayAreaChangeActions, pageStatusDataStore, global) {*/

if (!rc) {
    rc = window.rc = {};
  }

  var getState = function getState() {
    var that = this;
    return {
      cards: displayAreaDataStore.getData(that.props.currentStatus)
    };
  };
  var DisplayPanel = React.createClass({
    displayName: 'DisplayPanel',

    getInitialState: function getInitialState() {
      console.log(this.props);
      return {
        cards: displayAreaDataStore.getData("INIT0")
      };
    },

    onChange: function onChange(data) {
      this.setState({
        cards: data
      });
    },

    onStatusChange: function onStatusChange(data) {
      this.setState({
        cards: displayAreaDataStore.getData(data.currentStatus)
      });
    },

    /*componentDidUpdate: function componentDidUpdate() {
      if (!this.state.cards.length) {
        console.log('length of card');
        console.log(this.state.cards.length);
        this.getDOMNode().classList.add('help-bg');
      } else {
        this.getDOMNode().classList.remove('help-bg');
      }
    },*/

    componentDidMount: function componentDidMount() {
      var that = this;
      this.interactable = global.setAreaDropable({
        element: this.getDOMNode(),
        accept: '.data-item, .data-block, .tile, .config-create-button, .function-button-nav, .config-upload-button',
        ondrop: function ondrop(event) {
          var draggableElement = event.relatedTarget,
              dropzoneElement = event.target;
          var currentPageStatus = pageStatusDataStore.getCurrentStatus();
          var data = {};        
          data.style = {};
          data.style.left = event.dragEvent.clientX + window.scrollX;
          data.style.top = event.dragEvent.clientY + window.scrollY;
          data.type = draggableElement.getAttribute('data-type');
          switch (data.type) {
            case 'TITLE':
              data.title = draggableElement.getAttribute('data-category');

              //data.customerId = draggableElement.getAttribute('data-customer_id');
              //data.customerId = draggableElement.getAttribute('')
              break;
            case 'ITEM':
              data.guidArr = new Array(draggableElement.getAttribute('data-factor_guid'));
              data.FACTOR_NAME = new Array(draggableElement.getAttribute('data-factor_name'));
              data.category = new Array(draggableElement.getAttribute('data-category'));
              data.factor_type = new Array(draggableElement.getAttribute('data-factor_type'));
              data.customerId = new Array(draggableElement.getAttribute('data-customer_id'));
              data.systemId = new Array(draggableElement.getAttribute('data-sys_id'));
              data.systemClt = new Array(draggableElement.getAttribute('data-sys_clt'));
              data.business_name = new Array(draggableElement.getAttribute('data-business_name'));
              break;
            case 'CREATE':

              data.title = 'Create New Object';
              data.editObj = 0;
              break;

            case 'NOTE':
              browserHistory.push("/km")
              break;
            case 'UPLOAD':
              data.title = 'Upload Statistics File';
      
              break;

            case 'CPM-Overview':
              data.title = 'Workload Overview - ' + draggableElement.getAttribute('data-factor_name');
              data.customerId = draggableElement.getAttribute('data-customer');
              data.dateYear = draggableElement.getAttribute('data-year');
              data.dateMonth = draggableElement.getAttribute('data-month');
              break;

            case 'CPM-History':
              data.title = 'Workload History - ' + draggableElement.getAttribute('data-factor_name');
              data.customerId = draggableElement.getAttribute('data-customer');
              data.latestYear = draggableElement.getAttribute('data-l_year');
              data.latestMonth = draggableElement.getAttribute('data-l_month');
              data.monthCount = draggableElement.getAttribute('data-m_count');
              break;


            case 'CPM-Transaction':

              break;

            case 'CPM':

              var nextStatus = "CAPACITY_MGMT";

                if (pageStatusDataStore.getAllStatus().indexOf(nextStatus) < 0) {
                  var sIntervalCallId;

                  (function () {
                    var addStatus = function addStatus() {
                      if (displayAreaDataStore.isStatusExisted(nextStatus) && dataPanelDataStore.isStatusExisted(nextStatus) && functionPanelDataStore.isStatusExisted(nextStatus)) {
                        clearInterval(sIntervalCallId);
                        pageStatusChangeActions.pageStatusAddAction(nextStatus);
                      }
                    };

                    /*var nextData = {};

                    nextData.style = that.props.card.style;
                    nextData.type = "ITEM-ANA";
                    nextData.guidArr = that.props.card.guidArr;
                    nextData.FACTOR_NAME = that.props.card.FACTOR_NAME;
                    nextData.category = that.props.card.category;*/
                    var logCustomerInfo =  global.pageStatusDataStore.getCustomerID();
                    var logCustomerId = logCustomerInfo.CUSTOMER_ID;

                    displayAreaChangeActions.displayAreaAddPageAction(nextStatus, "");
                    dataPanelItemChangeActions.dataPanelAddPageAction(nextStatus);
                    functionPanelItemChangeActions.functionPanelAddPageAction(nextStatus);
                    //displayAreaChangeActions.displayAreaAddCardAction(nextStatus,nextData);//zengheng
                    dataPanelItemChangeActions.dataPanelCPMAddItemAction(nextStatus, logCustomerId);

                    sIntervalCallId = setInterval(function () {
                      addStatus();
                    }, 100);
                    ;
                  })();
                } else {
                  pageStatusChangeActions.pageStatusChangeAction(nextStatus);
                }


              break;
            default:
              ;
          }
          console.log(data)
          displayAreaChangeActions.displayAreaAddCardAction(currentPageStatus, data);
        }
      });
      this.unsubscribe = displayAreaDataStore.listen(this.onChange);
      this.unsubscribeStatus = pageStatusDataStore.listen(this.onStatusChange);
    },

    // shouldComponentUpdate: function(nextProps, nextState) {
    //   if (this.state !== nextState) {
    //     return true;
    //   }
    // },

    componentWillUnmount: function componentWillUnmount() {
      this.interactable.unset();
      this.interactable = null;
      this.unsubscribe();
      this.unsubscribeStatus();
    },
 
    // componentWillUpdate: function() {
    //   this.setState(getState());
    // },

    render: function render() {
      return React.createElement(
        'div',
        { className: (!this.state.cards || !this.state.cards.length) ? 'display-panel help-bg' : 'display-panel' },
        this.state.cards.map(function (item) {
         // if(item.type == 'INIT0') {
           // return React.createElement(SYSCLTCard,{ key: item.id + "SysCltCard", card: item});
          //}
          if (item.type == 'TITLE') {
            return React.createElement(DataCard, { key: item.id + "DataCard", card: item });

          } 
          else if (item.type == 'ITEM' || item.type == 'ITEM-ANA') {
            console.log(item)
            return React.createElement(LineChartCard, { key: item.id + "LineChartCard", card: item });
          } 

          else if (item.type == "RCA_SIM") {
            return React.createElement(RCASimCard, { key: item.id + "RCASimCard", card: item });
          } 
          else if(item.type == "WHAT_IF") {
            return React.createElement(RCASimCard, { key: item.id + "WhatSimCard", card: item });
          }
          else if (item.type == 'PIE') {
            return React.createElement(PieChartCard, { key: item.id + "PIEChartCard", card: item });
          } 

          else if (item.type == 'CREATE') {

            return React.createElement(CreateObjCard, { key: item.id + "CreateObjCard", card: item });
          } 
          else if(item.type == 'COM') {
            return React.createElement(CommentCard, { key:item.id + "CommentCard", card: item});
          }
          else if (item.type == 'EDIT') {

            return React.createElement(CreateObjCard, { key: item.id + "EditObjCard", card: item });
          }

          else if(item.type == 'UPLOAD'){
            return React.createElement(UploadCard, { key: item.id + "UploadCard", card: item });
          }
          else if(item.type == 'CPM-Overview' || item.type == 'CPM-DIA' || item.type == 'CPM-BTC' || item.type == 'CPM-RFC'){
            return React.createElement(WLOverview, { key: item.id + "CPMOverview", card: item });
          }
          else if(item.type == 'SAVE-ARTI') {
            return <SaveCapArticle key={item.id + 'Save Capacity Article'} card={item} />
          }
          else if(item.type == 'CPM-History'){
            return React.createElement(WLHistory, { key: item.id + "CPMHistory", card: item });
          }

          else if(item.type=='DVM')
          {
            return <DVMAPanel key={item.id+'DVMPanel'} card={item}></DVMAPanel>

          }
          else if(item.type == 'SAVE'){
            return <SaveArticle key={item.id + 'SaveArticle'} card={item} />
          }
          else if(item.type == 'ART_TEMP'){
            return <ArticleTemplate key={item.id + 'ArticleTemplate'} card={item}/>
          }
        })
      );
    }
  });/*
})(window.React, window.rc, window.antd, window.interact, window.displayAreaDataStore, window.displayAreaChangeActions, window.pageStatusDataStore, window);*/



export default DisplayPanel