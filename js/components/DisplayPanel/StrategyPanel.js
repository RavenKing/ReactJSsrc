import React from "react";
import { Table, Progress,Alert } from "antd";
import  ReactHighCharts  from "react-highcharts";





export default class StrategyPanel extends React.Component {
    
    render() {


      const {Strategy } =this.props;

      var ServiceColumns=[{
        title:"Service",
        width:"100px",
        dataIndex:'service'
      }, 
      {
        title:"Description",
        width:"200px",
        dataIndex:'description'
      },{
        title:"Reason",
        width:"100px",
        dataIndex:'reason'
      },
      {
        title:"Priority",
        width:"50px",
        dataIndex:'priority'
      },
      {
        title:'Action',
        width:'50px',
        render:(key)=>(<span><a rel='#'>request|</a><a rel='#'>details</a></span>)

      }

      ];

      var ServiceData=[
      {
        service:"DVM Review",
        description:"Review Current Strategy with SAP standard DVM methodology",
        priority:"Medium",
        reason:"archive efficiency in 2014 only 40% lower than industry benchmark 95% "
      },   
      {
        service:"BPPO",
        description:"The SAP Business Process Performance Optimization (BPPO) service optimizes core SAP business processes. The main objective of this service is to identify performance issues related to core business processes (e.g. sales order and warehouse management) for different SAP software products. ",
        priority:"High",
        reason:"due delivery list in the system"
      }
      ];
      var columns = [{
        title: 'Strategy Method',
        width:"130px",
        dataIndex: 'name',
        render: function(text) {
          return <a href="javascript:;">{text}</a>;
        }}, 
        {
          title: 'Retention Time(Month)',
          width:'140px',
          dataIndex: 'retention'
        }, 
        {
          title: 'Suggestion',
          width:'300px',
          dataIndex: 'suggestion'
        }        
       ];
        var data = [];
        if(Strategy.ARCHIVING){
          data.push({
            key: '1',
            name: 'Archiving',
            retention: Strategy.RETENTION,
            suggestion: Strategy.ARCHIVING   
          });
        }
        if(Strategy.AVOIDANCE){
          data.push({
            key: '2',
            name: 'Avoidance',
            retention: '',
            suggestion: Strategy.AVOIDANCE   
          });
        }
        if(Strategy.DELETION){
          data.push({
            key: '3',
            name: 'Deletion',
            retention: '',
            suggestion: Strategy.DELETION  
          });
        }
        if(Strategy.SUMMARIZATION){
          data.push({
            key: '4',
            name: 'Summarization',
            retention: '',
            suggestion: Strategy.SUMMARIZATION  
          });
        }

       
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
                data:[parseInt(Strategy.TOTAL_SIZE)-parseInt(Strategy.SAVING_EST==null?0:Strategy.SAVING_EST)]

            }]
        


        }
        var sav_est_p;
        if(Strategy.SAVING_EST_P != null){
          sav_est_p = (
                        <div>
                          <Progress type="circle" percent={parseInt(Strategy.SAVING_EST_P)} width="200"/>
                          <br/>
                          <br/>
                          <p>Estimated Saving Percent&nbsp;&nbsp;&nbsp;</p>
                          <br/>
                        </div>
                      )
        }
        else{
          sav_est_p = (
                      <div>
                        <Alert
                          message="Warning"
                          description="No setting for Estimated Saving Percent."
                          type="warning"
                          showIcon
                        />
                      </div>
          )
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
              { sav_est_p }
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
          
      <div>
        <h2>Service Recommandation</h2>
        <br/>
       <Table columns={ServiceColumns} dataSource={ServiceData} pagination={false} />
            
      </div>

          </div>



  
      );
  }
}
