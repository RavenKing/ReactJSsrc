import React from "react";
import axios from "axios";
import { Spin, Alert } from 'antd';
import { connect } from "react-redux";
import { Progress,Rate,Input,Tabs,Slider,Popover,Tag } from "antd";
import { GetBestPractice } from "../../Actions/KnowledgeAction";
import  ReactHighCharts  from "react-highcharts";
const TabPane = Tabs.TabPane;

@connect((store)=>{
    return {
        articles:store.articles
    };
    
})

export default class BestPanel extends React.Component {
 

    render() {  

      const {articles } =this.props;

      const  { bestpractice } = this.props;
      console.log(bestpractice);

      const marks = {
      0: '1990',
      50: '2010',
      80: {
          style: {
            color: 'red',
          },
          label: <strong>2013</strong>,
      },
      100: '2016'
    };
        return (

    <div class="margin-top10">
     <h2>Overal Rating for {this.props.archobj} in Smart Operation</h2>
    <div>Rank:<Rate disabled defaultValue={4} /></div>
    <hr />
        <h2 class="margin-top10 margin-bottom10">Industry-Based Statistics </h2>
        <h3>Avg Saving Percent for the first DVM Run:
        
          <Progress type="circle" percent={bestpractice.AVGS}/>
        </h3>   
      <div class="margin-top10 margin-bottom10">
    <Tabs defaultActiveKey="1" >
    <TabPane tab="Best Practice For Archiving" key="1" class="margin-left10">
    <div class="margin10">
    <Popover placement="right" content="Varify the data in Your Database whether it meet the recommandation">
   <div>
   <div >
    Residence Time:  <Tag closable color="red" closable={false}>24</Tag>Month And the
    Candidate Data for archiving :
  <Slider marks={marks} defaultValue={bestpractice.Retention} disabled={true} />

    </div>
 </div>
 </Popover>
  <br />
  </div>
  
    </TabPane>

    <TabPane tab="Best Practice for Deletion" key="2">Best Practice for Deletion</TabPane>
    <TabPane tab="Issue Solving" key="3">Issue Solving</TabPane>
  </Tabs>   
     </div>
        </div>

  
      );
  }
}



