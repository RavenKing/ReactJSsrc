import React from "react";

//high charts
import  ReactHighCharts  from "react-highcharts";


export default class TableCharts extends React.Component {
    
    render() {
      const { Tables } = this.props;

  const config={
  chart:{type:"column"},
  xAxis: {
    categories: Tables.map((table)=>{return table.ATTR_NAM})
  },
  series: [{
    data: Tables.map((table)=>{return parseInt(table.TBL_SIZE) 

    })
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
