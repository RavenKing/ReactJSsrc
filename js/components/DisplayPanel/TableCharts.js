import React from "react";

//high charts
import  ReactHighCharts  from "react-highcharts";


export default class TableCharts extends React.Component {
    
    render() {

      const {Article} = this.props;
            
      const config={
        chart:{type:"column"},
        title:{text:""},
        credits: {
          enabled: false
        },
        xAxis: {
            categories: Article.TABLES.map((table)=>{return table.ATTR_NAM})
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Table Size (GB)'
            }
        },
        series: [{
            name:"Table",
            data: Article.TABLES.map((table)=>{return parseInt(table.TBL_SIZE) })
        }],
        tooltip: {
            pointFormat: 'Table Size: <b>{point.y:.1f} GB</b>'
        }

      }

      return (
          <div>
            <div >
              <h2 >Basic Information</h2>
              <br/>  
              <hr/>        
              <br/>
              <h4 className="bscInfo">Customer Id: &nbsp;&nbsp;{Article.CUSTOMER_ID}</h4>
              <h4 className="bscInfo">Modified By: &nbsp;&nbsp;</h4>
              <h4 className="bscInfo">Modified On: &nbsp;&nbsp;</h4>
              <h4 className="bscInfo">Created By:  &nbsp;&nbsp;{Article.CREATE_BY}</h4>
              <h4 className="bscInfo">Created On:  &nbsp;&nbsp;{Article.CREATE_ON}</h4>
              <br/>
            </div>

            <div className="tableChart">
              <h3>Related Tables</h3>  
              <br/>
              <ReactHighCharts config={config}/>  
            </div>

            
          </div>
      );
  }
}
