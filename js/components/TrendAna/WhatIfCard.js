import React from "react";
import {Card,Icon} from "antd";
//high charts
import  ReactHighCharts  from "react-highcharts";

var displayAreaChangeActions = window.displayAreaChangeActions
var pageStatusDataStore = window.pageStatusDataStore

export default class WhatIfCard extends React.Component {
     CloseCard(){
      
        var currentStatus = pageStatusDataStore.getCurrentStatus();

        displayAreaChangeActions.displayAreaRemoveCardAction(currentStatus, this.props.card.id);
       
    }
    
    render() {

      
      const config={
        chart:{type:"line"},
        title:{text:""},
        credits: {
          enabled: false
        },        
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        series: [{
          data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
        }]
      };

      

      return (
          <div>
            <Card className="line-card" title="What If Card" extra={<Icon type="cross" onClick={this.CloseCard.bind(this)}/>}>
              
              <ReactHighCharts config={config}/>  
            </Card>

            
          </div>
      );
  }
}
