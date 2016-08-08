import React from "react";
import { Table, Progress } from "antd";
import  ReactHighCharts  from "react-highcharts";





export default class StrategyPanel extends React.Component {
    
    render() {


      const {Strategy } =this.props;
      console.log("Startegy is:",Strategy);
      var columns = [{
        title: 'Strategy Method',
        width:"140px",
        dataIndex: 'name',
        render: function(text) {
          return <a href="javascript:;">{text}</a>;
        }}, 
        {
          title: 'Retention Time',
          width:'140px',
          dataIndex: 'Retention'
        }, 
        {
          title: 'Suggestion',
          dataIndex: 'suggestion'
        }];
  
        var data = [{
          key: '1',
          name: 'Archiving',
          suggestion: Strategy.ARCHIVING,
          Retention: Strategy.RETENTION
        }];

       
 const config={
        chart:{type:"column",width:"200",height:"300"},
        plotOptions: {column: {
                stacking: 'normal'
            }},
        legend: {
            enabled: false
        },
       title: {
            text:null
           
        },
        yAxis: {
            gridLineWidth: 0,
            labels:{  
                       enabled:false  
                     }          
        },
        xAxis: {
                      gridLineWidth: 0,
            categories:  [Strategy.ARCHOBJ] 
        },
        series: 
        [{
            name:'Savings',
            data: [parseInt(Strategy.SAVING_EST)] 
        },
        {
            name:'Remaining Size',
            data:[parseInt(Strategy.TOTAL_SIZE)-parseInt(Strategy.SAVING_EST)]

        }]

      }
    


        return (

        <div>
        <div>

          <div class="margin-bottom10 strategychart">
              <ReactHighCharts config={config}> </ReactHighCharts>
       
          </div>
          <div class="strategychartcircle">
           Saving Percent:&nbsp;&nbsp;&nbsp;
              <Progress type="circle" percent={parseInt(Strategy.SAVING_EST_P)} />
          </div>
                    
          </div>
              <h2>Archiving Obeject:{Strategy.ARCHOBJ}|Total Size:{Strategy.TOTAL_SIZE}</h2>

            
              <Table columns={columns} dataSource={data} pagination={false} />

              
            
            <br/>

            <h2>Comments:</h2>
            <h3>{Strategy.COMMENT}</h3>
            


        </div>

  
      );
  }
}
