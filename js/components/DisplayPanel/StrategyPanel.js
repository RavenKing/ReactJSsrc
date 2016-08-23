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
          title: 'Retention Time(Month)',
          width:'150px',
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
        credits: {
          enabled: false
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total Size (GB)'
            }      
        },
        xAxis: {
            gridLineWidth: 0,
            categories:  [Strategy.ARCHOBJ] 
        },
        series: 
        [{
            name:'Estimated Saving Size(GB)',
            data: [parseInt(Strategy.SAVING_EST)] 
        },
        {
            name:'Estimated Remaining Size(GB)',
            data:[parseInt(Strategy.TOTAL_SIZE)-parseInt(Strategy.SAVING_EST)]

        }]
        


      }
    


        return (
        <div>

          <div>

            <h2>Archiving Obeject:&nbsp;{Strategy.ARCHOBJ}&nbsp;|&nbsp;Total Size:{Strategy.TOTAL_SIZE}GB</h2>
            <br/>
            <Table columns={columns} dataSource={data} pagination={false} />
            
          </div>

          <div>
            <div className="strategyPanelLeft">
              <div className="textcenter">
              <Progress type="circle" percent={parseInt(Strategy.SAVING_EST_P)} width="200"/>
                <br/>
                <br/>
                <p>Estimated Saving Percent&nbsp;&nbsp;&nbsp;</p>
                <br/>
               </div>
              </div>
              <div className="strategyPanelRight">
                <br/>
                <ReactHighCharts config={config}> </ReactHighCharts>
              </div>

          </div>

            <div>
              <h2>Comments:</h2>
              <h4>{Strategy.COMMENT}</h4>
              </div>
          </div>

  
      );
  }
}
