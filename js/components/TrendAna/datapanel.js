import React from "react";
import ReactDOM from "react-dom"
import {Button,Badge,Tooltip,Popover} from "antd";

var interact=window.interact
var dataPanelItemChangeAction = window.dataPanelItemChangeAction
var dataPanelDataStore=window.dataPanelDataStore
var pageStatusDataStore = window.pageStatusDataStore
var global = window

import { setCardDragable,setAreaDropable,handleFocus} from "../../interactScript";
/*(function (React, rc, antd, interact, dataPanelItemChangeAction, dataPanelDataStore, pageStatusDataStore, global) {
*/
/*  if (!rc) {
    rc = window.rc = {};
  }
*/
/*  var Button = antd.Button;
  var Badge = antd.Badge;

*/
  var ReactPropTypes = React.PropTypes;

  var getState = function getState() {
    var that = this;
    return {
      dataPanelData: dataPanelDataStore.getData(that.props.currentStatus)
   };
  };

  var DataItem = React.createClass({
    displayName: "DataItem",

    propTypes: {
      item: ReactPropTypes.object.isRequired
    },

    componentDidMount: function componentDidMount() {
     setNodeDragable(ReactDOM.findDOMNode(this));
    },

    render: function render() {
      var currentStatus = pageStatusDataStore.getCurrentStatus();
      var item = this.props.item;

      if(currentStatus.pageName == "INIT"){

        return React.createElement(
          Tooltip,
          { className: "ant-tooltip-open", placement: "rightBottom", title: this.props.item.FACTOR_NAME},

          React.createElement(
            Button,
            { 
              className: "data-item", type: "dashed",
              "key" :(new Date() + Math.floor(Math.random() * 999999)).toString(31),
              "data-type": "ITEM",
              "data-info": currentStatus.pageName+ "-ITEM",
              "data-factor_guid": this.props.item.FACTOR_GUID,
              "data-factor_name": this.props.item.FACTOR_NAME,
              "data-trend": this.props.item.TREND,
              "data-category": this.props.item.FACTOR_CATEGORY,
              "data-factor_type": this.props.item.FACTOR_TYPE,
              "data-customer_id": this.props.item.CUSTOMER_ID,
              "data-sys_id": this.props.item.SYSID,
              "data-sys_clt": this.props.item.SYSCLT,
              "data-business_name":this.props.item.FACTOR_BUSINESS_NAME
            },
            React.createElement(
              Badge,
              { dot: parseFloat(item.TREND) > 5.0 },
              item.FACTOR_BUSINESS_NAME
            )
          )
        );
      }
      else if(currentStatus.pageName == "CAPACITY_MGMT"){///123456789

        if(this.props.item.category == "CPM-Overview"){
          return React.createElement(
              Button,
              { className: "data-item", type: "dashed",
                "data-type": this.props.item.category,
                "data-info": currentStatus.pageName + "-CPMITEM",
                "data-year": this.props.item.dateYear,
                "data-month": this.props.item.dateMonth,
                "data-factor_name": this.props.item.ITEM_NAME,
                "data-customer":this.props.item.customerId
                 },
              
                item.ITEM_NAME
              
            );
        }
        else if(this.props.item.category == "CPM-History"){

          return React.createElement(
              Button,
              { className: "data-item", type: "dashed",
                
                "data-info": currentStatus.pageName + "-CPMITEM",
                "data-factor_name": this.props.item.ITEM_NAME,
                "data-type": this.props.item.category,
                "data-m_count": this.props.item.monthCount,
                "data-l_year": this.props.item.latestYear,
                "data-l_month": this.props.item.latestMonth,
                "data-customer":this.props.item.customerId,
                
                 },
              
                item.ITEM_NAME
              
            );

        }
        /*else if(this.props.item.category == "CPM-Transaction"){

          return React.createElement(
              Button,
              { className: "data-item", type: "dashed",
                "data-type": this.props.item.category,
                "data-info": currentStatus + "-CPMITEM",
                "data-year": this.props.item.dateYear,
                "data-month": this.props.item.dateMonth,
                "data-factor_name": this.props.item.ITEM_NAME,
                "data-customer":this.props.item.customerId
                 },
              
                item.ITEM_NAME
              
            );

        }*/
        

      }

      else if(this.props.item.FACTOR_CATEGORY == "RET"){
        return React.createElement(
          Popover,
          { content:"residence time of best practice",
            placement:"bottom"},
          React.createElement(
            Button,
            { className: "data-item", type: "dashed",
                "data-type": "ITEM",
                "data-info": currentStatus.pageName+ "-ITEM",
                "data-factor_guid": this.props.item.FACTOR_GUID,
                "data-factor_name": this.props.item.FACTOR_NAME,
                "data-trend": this.props.item.TREND,
                "data-category": this.props.item.FACTOR_CATEGORY },
              React.createElement(
                  Badge,
                  { dot: parseFloat(item.TREND) > 5.0 },
                  item.FACTOR_NAME
              )
            )
          
       );

      }
      else{
         return React.createElement(
            Button,
            { className: "data-item-rca", type: "dashed",
              "data-type": "ITEM",
              "data-info": currentStatus.pageName + "-ITEM",
              "data-factor_guid": this.props.item.FACTOR_GUID,
              "data-factor_name": this.props.item.FACTOR_NAME,
               "key" :(new Date() + Math.floor(Math.random() * 999999)).toString(31),
              "data-factor_type": this.props.item.FACTOR_TYPE,
              "data-category": this.props.item.FACTOR_CATEGORY },
            React.createElement(
              Badge,
              { dot: parseFloat(item.TREND) > 5.0 },
              item.FACTOR_NAME
            )
          );
        
      }
    }
  });
//<Tooltip placement="topLeft" title="???? ????" arrowPointAtCenter>
  var DataBlock = React.createClass({
    displayName: "DataBlock",


    propTypes: {
      dataPanelData: ReactPropTypes.object.isRequired
    },

    componentDidMount: function componentDidMount() {
  setNodeDragable(ReactDOM.findDOMNode(this));
    },

    render: function render() {
      console.log(this.props.block);

      var block = this.props.block;
      var items = [];
      var currentStatus = pageStatusDataStore.getCurrentStatus();
      for (var ind in block.objList) {
        
        let keyitem = (Date.now() + Math.floor(Math.random() * 999999)).toString(31);

        if(block.objList)
        items.push(React.createElement(DataItem, { key:keyitem , item: block.objList[ind] ,keynumber:block.objList[ind].FACTOR_GUID}));

      }
      var customerId;
      if(block.objList)
      {if(block.objList[0]){
        customerId = block.objList[0].CUSTOMER_ID;
      }
      else{
        customerId = "";
      }}

      return React.createElement(
        "div",
        { className: "data-block", 
          "data-type": "TITLE", 
          "data-info": currentStatus.pageName + "-BLOCK",
          "data-category": block.title,
          "data-customer_id":customerId
        },
        React.createElement(
          "span",
          { className: "data-title" },
          block.title
        ),
        items
      );
    }

  });

  var DataPanel = React.createClass({
    displayName: "DataPanel",


    getInitialState: function getInitialState() {
      var pageStatus = {
        pageName:"INIT0",
        sid:"",
        client:""
      }
      return {
        dataPanelData: dataPanelDataStore.getData(pageStatus)
      };
    },

    onChange: function onChange(data) {
      this.setState({
        dataPanelData: data
      });
    },

    onStatusChange: function onStatusChange(data) {
      this.setState({
        dataPanelData: dataPanelDataStore.getData(data.currentStatus)
      });
    },

    componentDidMount: function componentDidMount() {
      this.unsubscribe = dataPanelDataStore.listen(this.onChange);
      this.unsubscribeStatus = pageStatusDataStore.listen(this.onStatusChange);
    },

    componentWillUnmount: function componentWillUnmount() {
      this.unsubscribe();
      this.unsubscribeStatus();
    },

    // componentWillUpdate: function() {
    //   this.setState({
    //     dataPanelData: dataPanelDataStore.getData(this.props.currentStatus)
    //   });
    // },

    render: function render() {
      var dataPanelData = this.state.dataPanelData;
      var blocks = [];
      for (var ind in dataPanelData) {
        blocks.push(React.createElement(DataBlock, { key: ind + "DataBlock", block: dataPanelData[ind] }));
      }

      return React.createElement(
        "div",
        { className: "data-panel" },
        blocks
      );
    }

  });/*
})(window.React, window.rc, window.antd, window.interact, window.dataPanelItemChangeAction, window.dataPanelDataStore, window.pageStatusDataStore, window);*/



export default DataPanel;  
