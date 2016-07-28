import React from "react";

//high charts
import  ReactHighCharts  from "react-highcharts";


export default class TableCharts extends React.Component {
    
    render() {

      const {Article} = this.props;
            
      const config={
        chart:{type:"column"},
        title:{text:"Related Table Size Chart"},
        xAxis: {
            categories: Article.TABLES.map((table)=>{return table.ATTR_NAM})
        },
        series: [{
            data: Article.TABLES.map((table)=>{return parseInt(table.TBL_SIZE) })
        }]

      }

      return (
          <div>
                        <h2>Basic Information</h2>  
          <hr/>        
          <br/>
          <h4>Customer Id: {Article.CUSTOMER_ID}</h4>
          <h4>Modified By:</h4>
          <h4>Modified On:</h4>
          <h4>Created By: {Article.CREATE_BY}</h4>
          <h4>Created On: {Article.CREATE_ON}</h4>

              <ReactHighCharts config={config}> </ReactHighCharts>  
          </div>
      );
  }
}
