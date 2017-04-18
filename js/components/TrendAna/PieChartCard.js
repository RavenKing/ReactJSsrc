import React from "react"
import {Card,Icon,Table } from "antd"
var global = window;

import PieChart from "./PieChart"
import InfDetailBlock from "./InfDetailBlock"
var componentMixin = {
		removeCard: function removeCard() {
			var that = this;
			return function () {
				// if (that.interactable) {
				//   that.interactable.unset();
				//   that.interactable = null;
				// }
				// if (that.interactDrag) {
				//   that.interactDrag.unset();
				//   that.interactDrag = null;
				// }
				// if (that.interactDrop) {
				//   that.interactDrop.unset();
				//   that.interactDrop = null;
				// }
				var currentStatus = pageStatusDataStore.getCurrentStatus();

				if (currentStatus.pageName === "INIT" || this.props.card.type !== "ITEM" || currentStatus.pageName.indexOf(this.props.card.FACTOR_NAME[0]) < 0) {

					displayAreaChangeActions.displayAreaRemoveCardAction(currentStatus, that.props.card.id);
				} else {

					message.warning('Can\'t remove object card which is being analyzed.');
				}
			};
		}
	};








var PieChartCard = React.createClass({
		displayName: "PieChartCard",

		mixins: [componentMixin],
		componentDidMount: function componentDidMount() {
			this.interactable = global.setCardDragable(this.getDOMNode(), this.props.card.id);
			global.handleFocus(this.getDOMNode());
		},
		componentWillUpdate: function componentWillUpdate() {
			global.resetPosition(this.getDOMNode());
		},
		render: function render() {

console.log(this.props.card)

const columns = [
	{
        title:"Article Name",
        width:"100px",
        dataIndex:'Article_Name'
      }, 
      {
        title:"Description",
        width:"200px",
        dataIndex:'Article_Dsc'
      },{
        title:"Create On",
        width:"100px",
        dataIndex:'Article_time'
      },
      {
        title:"Create By",
        width:"50px",
        dataIndex:'Creator'
      }
      ];

const {objList} = this.props.card;

console.log(this.props.card)
const marked = objList.filter((one)=>{if(one.marked)return one})
let show =<p>No Predifined Model </p>

if(marked.length > 0 )
{
	show = marked.map((one)=>{

		var difference = Math.abs(one.INFLUENCE_RATE - one.modelRate);
		if(difference >= 0.2)
		{

		}

	return (<p> {one.FACTOR_NAME}  :  {one.INFLUENCE_RATE} / Predifined Rate : {one.modelRate} |difference:{difference}
			</p>)

	})


}
			return(
			<Card className = "pie-card"
			 title= "Potential Correlation with other objects?" 
			extra = {<Icon type="cross" onClick={this.removeCard.bind(this)} > </Icon>}
			>

				<div  style={this.props.card.style} >
				<PieChart seriesArr = {this.props.card.seriesArr} />
				<InfDetailBlock objs={this.props.card.objList} />
				</div>
				<div>
				{show}
				</div>
				<div>
				<Table dataSource={objList.Knowledges}  columns={columns} />
				</div>


			</Card>	
			)	
		
		}
	});
export default PieChartCard