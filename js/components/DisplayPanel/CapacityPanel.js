import React from "react";
import ReactDOM from "react-dom"
import {Card,Input} from "antd"
import{connect } from "react-redux"
import {GetCapaData} from "../../Actions/KnowledgeAction"
import CapaChart from "../TrendAna/WLOverviewChart"

@connect((store)=>{
    return {
        articles:store.articles
    };
    
})
export default class CapacityPanel extends React.Component {
	constructor(props)
	{
			super(props)
			const {Article} = this.props;
			const param = {
				articleid:Article.ARTICLE_ID
			}
			this.props.dispatch(GetCapaData(param));

	}
    
    render() {
    	let data ={}
    	const {Article} = this.props;

    	console.log(Article)
        let loading = true; 
        if(Article.capadata)
        	{
        		loading = false;
        	
        	var cateArr = [];
            var cpuValueArr = [];
            var dbValueArr = [];
            var cumValueArr = [];

            Article.capadata.detail.forEach(function (item) {
              
              cateArr.push(item.TASK_TYPE);
              cpuValueArr.push(parseInt(item.CPU_TOTAL));
              dbValueArr.push(parseInt(item.DB_TOTAL));
              cumValueArr.push(parseInt(item.CUMULATED));


            });
            data.chartCateAxis = new Array(cateArr);
            data.chartCPUValue = new Array(cpuValueArr);
            data.chartDBValue = new Array(dbValueArr);
            data.chartCumValue = new Array(cumValueArr);
            console.log(data)
			}

        return (
	<div>
	{loading?<h1>loading</h1>:<CapaChart chartContent = {data} />}
	<h1>Comments:</h1>
	<Input type="textarea"  value={this.props.Article.COMMENT}/>
	 </div>
      );
  }
}

