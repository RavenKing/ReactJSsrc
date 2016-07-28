import React from "react";
import { Table, Progress } from "antd";
import  ReactHighCharts  from "react-highcharts";



export default class StrategyPanel extends React.Component {
    
    render() {


      const {Strategy } =this.props;
      console.log("Startegy is:",Strategy);
      var columns = [{
        title: 'Strategy Method',
        dataIndex: 'name',
        render: function(text) {
          return <a href="javascript:;">{text}</a>;
        }}, 
        {
          title: 'Retention Time',
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

        


    


        return (

        <div>
            <br/>
            <h2>Archiving Obeject:{Strategy.ARCHOBJ}|Total Size:{Strategy.TOTAL_SIZE}</h2>

            
              <Table columns={columns} dataSource={data} />
              
            
            <br/>


            <h3>{Strategy.COMMENT}</h3>
            <br/>
            <hr/>
            <br/>
            <h3>AVG Saving Percent:&nbsp;&nbsp;&nbsp;
              <Progress type="circle" percent={Strategy.SAVING_EST_P} />
            </h3>


        </div>

  
      );
  }
}
