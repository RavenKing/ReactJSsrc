import React from "react";
import ReactDOM from "react-dom";
import {Card,Icon,Table,Tag} from "antd";
import PieChart from "./PieChart"
import InfDetailBlock from "./InfDetailBlock"

var displayAreaChangeActions = window.displayAreaChangeActions;
var pageStatusDataStore = window.pageStatusDataStore
var global = window;

export default class PieChartCard extends React.Component{
		

		removeCard() {
			var that = this;
			var currentStatus = pageStatusDataStore.getCurrentStatus();

			if (currentStatus.pageName === "INIT" || this.props.card.type !== "ITEM" || currentStatus.pageName.indexOf(this.props.card.FACTOR_NAME[0]) < 0) {

				displayAreaChangeActions.displayAreaRemoveCardAction(currentStatus, that.props.card.id);
			} else {

				message.warning('Can\'t remove object card which is being analyzed.');
			}
			
		}
		componentDidMount() {
			this.interactable = global.setCardDragable(ReactDOM.findDOMNode(this), this.props.card.id);
			global.handleFocus(ReactDOM.findDOMNode(this));
		}
		componentWillUpdate() {
			global.resetPosition(ReactDOM.findDOMNode(this));
		}
		onRowClick(record, index){

			const {knowledges} = this.props.card;
			var data = {};
			data.display = {
				y: this.props.card.style.top,
				x: 240
			};
			data.type = knowledges[index].type;
			data.articleId = knowledges[index].ArticleID;
			data.ARTICLE_NAM = knowledges[index].Article_Name;
				data.FACTOR_TYPE = knowledges[index].type;
          	displayAreaChangeActions.displayAreaAddCardAction(pageStatusDataStore.getCurrentStatus(), data);
        
		}
		render() {
			const columns = [{
        		title:"Article Name",
        		width:"150px",
        		dataIndex:'Article_Name'
      		},{
        		title:"Description",
        		width:"150px",
        		dataIndex:'Article_Dsc'
      		},{
        		title:"Create On",
        		width:"100px",
        		dataIndex:'Article_time'
      		},{
        		title:"Create By",
        		width:"100px",
        		dataIndex:'Creator'
      		}];

			const {objList} = this.props.card;
			const {knowledges} = this.props.card;
			const {scal} = this.props.card;

			var scali = 0；
			if(scal!=null)
			{
				scali = <div>Scalibilty: {scal.Scal.toFixed(2)} %</div>
			}
//origin
			var customer_id = objList[0].FACTOR_GUID;
			var referK = [];

			const originK = knowledges.filter((one)=>{if(customer_id==one.Customer_id)
													 {return one
													  }
										  referK.push(one)
										});

			const marked = objList.filter((one)=>{if(one.marked)return one})
			let show =<p>No Predifined Model </p>

			if(marked.length > 0 )
			{
				show = marked.map((one)=>{

					var difference = (Math.abs(one.INFLUENCE_RATE - one.modelRate)).toFixed(2);
					if(difference >= 0.2)
					{

					}

					return (
						<p> {one.FACTOR_NAME}:<Tag color="red" closable={false}>{one.INFLUENCE_RATE}</Tag> / Predifined Rate : <Tag color="green" closable={false}>{one.modelRate}</Tag> |difference:<Tag color="yellow" closable={false}>{difference}</Tag></p>
					)

				})

			}
			return(
				<Card className = "pie-card" title= "Potential Correlation with other objects?" 
					extra = {<Icon type="cross" onClick={this.removeCard.bind(this)} > </Icon>}>

					<div style={this.props.card.style} >
						<PieChart seriesArr = {this.props.card.seriesArr} />
						<InfDetailBlock objs={this.props.card.objList} />
					</div>
					<div>
						{show}
						{scali}
					</div>
					<div>
					<h3>Knowledges</h3>
						<Table dataSource={originK}  columns={columns} onRowClick={this.onRowClick.bind(this)} />
					</div>
					<div>
					<h3> Reference </h3>
							<Table dataSource={referK}  columns={columns} onRowClick={this.onRowClick.bind(this)} />
					</div>



				</Card>	
			)	
		
		}
}