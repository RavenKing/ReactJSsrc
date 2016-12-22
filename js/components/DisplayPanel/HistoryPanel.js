import React from "react";
import  ReactHighCharts  from "react-highcharts";
import {Table,Icon} from "antd";

export default class HistoryPanel extends React.Component{
  constructor(props)
  {
    super(props)

  }

	render(){
const columns = [{
  title: 'FileName',
  dataIndex: 'FileName',
  key: 'FileName',
}, {
  title: 'Date',
  dataIndex: 'date',
  key: 'date',
}, {
  title: 'Status',
  dataIndex: 'status',
  key: 'status',
  render:(text)=>{
    if(text == "GREEN")
    return <Icon type="check" />
    else if(text == "RED")
    return <Icon type="close-square" />
    else if(text == "YELLOW")
    return <Icon type="exclamation" />

  }
}, 
{
  title: 'Deleted Space(MB)',
  dataIndex: 'delspace',
  key: 'delspace',
},
{
  title: 'Archived Space(MB)',
  dataIndex: 'archspace',
  key: 'archspace',
}, 
];

const data = [{
  FileName: 'FI_DOCUMNT-001',
  date: '2015-02-05',
  status: 'GREEN',
  delspace: null,
  archspace:399
}, {
  FileName: 'FI_DOCUMNT-002',
  date: '2015-02-09',
  status: 'GREEN',
  delspace: 42321,
  archspace:99
}, {
  FileName: 'FI_DOCUMNT-003',
  date: '2015-02-10',
  status: 'YELLOW',
  delspace: 32999,
  archspace:101
}];

// job history





		return (
			<div>
				<h2>History for FI_DOCUMNT </h2>

        <Table columns={columns} dataSource={data} />
        <br />
        <h3>Job History for FI_DOCUMNT </h3>
          


			</div>

		)

	}
}