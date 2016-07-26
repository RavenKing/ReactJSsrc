import React from "react";
import { Table } from "antd";


export default class StrategyPanel extends React.Component {
    
    render() {


    const {Strategy } =this.props;
      var columns = [{
  title: 'Strategy Method',
  dataIndex: 'name',
  render: function(text) {
    return <a href="javascript:;">{text}</a>;
  }
}, 
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
  suggestion: Strategy[0].ARCHIVING,
  Retention: Strategy[0].RETENTION
}];
    


        return (

<div>

   <Table columns={columns} dataSource={data} />


</div>

  
      );
  }
}
