import React from "react";
import {Card} from "antd"
import axios from "axios";
//high charts
import  ReactHighCharts  from "react-highcharts";


export default class TableCharts extends React.Component {
    
    render() {
       
    


        const config={

          chart:{type:"column"},
          xAxis: {
            categories: ['ARCHIVING','ARCHOBJ','ARTICLE_DSC','ARTICLE_ID','ARTICLE_NAM','AVOIDANCE','COMMENT','CREATE_BY','CREATE_ON',
            'CUSTOMER_ID','DELETION','FACTOR_GUID','RETENTION','SAVING_EST','SAVING_EST_P','SUMMARIZATION']
          },
          series: [{
            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
          }]

        }

        return (
            <div>
                <h4>Content:Table Size</h4>
                <ReactHighCharts config={config}> </ReactHighCharts>  
            </div>
        );
  }
}
