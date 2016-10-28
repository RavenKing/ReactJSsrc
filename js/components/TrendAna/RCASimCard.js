//WhatIfCard.js

import React from "react"

import { Slider , Modal, message,Card,Icon,Button, InputNumber, Form, Row, Col} from "antd"
import LineChart from  "./LineChart"
import PredictLineChart from "./PredictLineChart"
import SimOptions from "./SimOptions"
import {browserHistory } from "react-router"

var global =window

var displayAreaDataStore= window.displayAreaDataStore
var pageStatusChangeActions =window.pageStatusChangeActions
var displayAreaChangeActions = window.displayAreaChangeActions
var dataPanelItemChangeActions = window.dataPanelItemChangeActions
var pageStatusDataStore = window.pageStatusDataStore
var dataPanelDataStore = window.dataPanelDataStore

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

				if (currentStatus === "INIT" || this.props.card.type !== "ITEM-ANA" || currentStatus.indexOf(this.props.card.FACTOR_NAME[0]) < 0) {

					displayAreaChangeActions.displayAreaRemoveCardAction(currentStatus, that.props.card.id);
				} else {

					message.warning('Can\'t remove object card which is being analyzed.', 3.5);
				}
			};
		}
	};

	var WhatIfCard = React.createClass({
		displayName: "LineChartCard",

		mixins: [componentMixin],
		getInitialState: function getInitialState() {
			return {
				/*rangeMin: this.props.card.lineChartAxis[0].length - 30,
				rangeMax: this.props.card.lineChartAxis[0].length,
				rangeLimit: this.props.card.lineChartAxis[0].length,*/
				chartData: {},
				rangeMin: 0,
				rangeMax: 0,
				rangeLimit: 0,
				initSim: false,
				predictCnt: 12
			};
		},
		onChange: function onChange(value) {
			this.setState({
				rangeMin: value[0],
				rangeMax: value[1]
			});
		},
		
		componentDidMount: function componentDidMount() {
			var that = this;

			this.interactDrag = global.setCardDragable(this.getDOMNode(), this.props.card.id);
			
			global.handleFocus(this.getDOMNode());
		},
		componentWillUpdate: function componentWillUpdate() {
			global.resetPosition(this.getDOMNode());
		},	
		startSim: function startSim(simOptions){
			console.log(pageStatusDataStore.getCurrentStatus());
			const gooddata =  displayAreaDataStore.getData(pageStatusDataStore.getCurrentStatus());
			console.log(gooddata)
			console.log(simOptions);
			let origin ={};
			let factors = [];
			gooddata.filter((one)=>{
					if(one.lineChartValue)
					{
							origin=one.lineChartValue[0]
						for(var i=1;i<one.lineChartValue.length;i++)
						{
							let factordata = one.lineChartValue[i]
							for (var g=1;g<factordata.length;g++)
							{
								let mathdata = simOptions[i-1]/100 ;
								if(mathdata ==0)
									mathdata=1;
								factordata[g] = parseInt(factordata[g]*(Math.pow(mathdata,g)+1))

							}
							console.log(factordata);
							factors.push(factordata);
						}


					}


			})
			let header = "";
			let body = "";

			if(origin!=null)
			{	
					for(let i=0;i<origin.length;i++)
					{
						header = header + (i+1)+",";

					}
					header = header + "#" + origin.toString();
					console.log(header);
					for(let i=0;i<factors.length;i++)
					{
						body=body+"#"+factors[i].toString() ;

					}	
					console.log(body);



			}






			var that = this;
			var dataInfo = {
				factorId: this.props.card.factorGuid,
				factorStr: this.props.card.factorGuidStr,
				predictCnt: this.state.predictCnt,
				factorCate: this.props.card.category,
				factorCateStr: this.props.card.categoryStr,
				factorAdj: simOptions.slice(0).join(","),
				origin:origin,
				factors:factors,
				ofstring:header+body
			};

			var simResult = {};

			displayAreaDataStore.trendSimulation(dataInfo, function(resp){
				simResult = resp;

				console.log('simResult --- ', simResult);

				that.setState({
					initSim: true,
					rangeMin: 0,
					rangeMax: simResult.lineChartAxis[0].length,
					rangeLimit: simResult.lineChartAxis[0].length,
					chartData: simResult

				});
			});

		},

		setPredictCnt: function setPredictCnt(value){

			this.setState({
				predictCnt: value

			});

		},

		render: function render() {
			var title = "";
			console.log("I want to know the factors name ----- ", this.props.card);
			title = "Trend Simulation - " + this.props.card.FACTOR_NAME[0];			

			////////////////
			
			/*var subLineChart = React.createElement(PredictLineChart, { chartAxisArr: this.props.card.lineChartAxis,
				chartValueArr: this.props.card.lineChartValue,
				lineNameArr: lineNameArr,
				axisMin: this.state.rangeMin,
				axisMax: this.state.rangeMax,
				factorCate: this.props.card.category[0]
			});*/

	
			/*for (var i = 1; i < this.props.card.FACTOR_NAME.length; i ++){




			}*/

			var options = <div>
					<div className="seperateLine">
						<p>Options</p>
						<hr/>
					</div>

					

					<div className="simOptions">

						<SimOptions factorArr={this.props.card.FACTOR_NAME} startSim={this.startSim} setPredictCnt={this.setPredictCnt}/>

					</div>

				</div>;

			var subLineChart = this.state.initSim ? 
				<div>
				  <div className="seperateLine">
				    <p>Simulation Results</p>
					<hr/>
					
				  </div>
					<PredictLineChart chartAxisArr={this.state.chartData.lineChartAxis}
                       chartValueArr={this.state.chartData.lineChartValue}
                       lineNameArr={this.state.chartData.lineNameArr}
					   axisMin={this.state.rangeMin}
					   axisMax={this.state.rangeMax}
					   factorCate={this.props.card.category[0]}
					/> 
					<Slider min={1} max={this.state.rangeLimit} range defaultValue={[this.state.rangeMin, this.state.rangeMax]} onChange={this.onChange.bind(this)} />
				</div>	: <div/>;
			

			////////////////

			/*return React.createElement(
				Card,
				{ className: "line-card",
					title: title,
					style: this.props.card.style,
					extra: React.createElement(Icon, { type: "cross", onClick: this.removeCard().bind(this) }),
					bodyStyle: {
						padding: 0
					} },
				subLineChart,
				React.createElement(Slider, { min: 1, max: this.state.rangeLimit, range: true, defaultValue: [this.state.rangeMin, this.state.rangeMax], onChange: this.onChange.bind(this) })
			);*/

			return (
				<Card className="line-card"
                	title={title}
                	style={this.props.card.style}
                	extra={<Icon type="cross" onClick={this.removeCard().bind(this)} />}
        			bodyStyle = {
            			{
              				padding: 0
            			}
          			} 
          		>
          		{options}
		    	{subLineChart}
				

		  		</Card>
			);

		}
		
		
       
    
  });

export default WhatIfCard;
