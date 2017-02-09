import React from "react"
import HighCharts from "highcharts"



	var WLOverviewChart = React.createClass({
		displayName: "WLOverviewChart",


		getInitialState: function getInitialState() {
			return {
				axisMin: this.props.axisMin,
				axisMax: this.props.axisMax//,
//				axisLimit: this.props.axisMax,
	//			showLabel: this.props.showLabel
			};
		},

		shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
			if (this.props !== nextProps) {
				return true;
			}
		},
		componentWillUpdate: function componentWillUpdate(nextProps, nextState) {			
			const {chartContent} = nextProps;
			if(chartContent.factorCate == "S"){
				this.chart.series[0].setData(chartContent.data);
			}				
				
		},

		componentDidMount: function componentDidMount() {
			console.log(this.props.chartContent);
			const {chartContent} = this.props;

			switch (chartContent.factorCate) {
				case "B":
					var yAxis = [{ // primary yAxis
		            	title: {
		               		text: 'Monthly Entries Number'
		            	}
		            
		        	},{ // secondary yAxis
		            	labels: {
		                	format: '{value}'
		            	},
		            	title: {
		                	text: 'Total Entries Number'
		            	},
		            	opposite: true
		        	}]

		        	var series = [{
		            	
		            	name: 'Monthly Entries',
		            	type: 'column',
		            	yAxis: 1,
		            	data: this.props.chartContent.month_data
		        	},{
		            	name: 'Total Entries',
		            	type: 'line',
		            	yAxis: 0,
		            	data: this.props.chartContent.total_data		            
		        	}]

					break;

				case "S":
					var yAxis = [{ // primary yAxis
		            	title: {
		                	text: 'Response Time'
		            	},
		            	labels: {
		                	format: '{value} s'
		            	}
		            
		        	},{ // secondary yAxis
		            	labels: {
		                	format: '{value}'
		            	},
		            	title: {
		                	text: 'Number of steps'
		            	},
		            	opposite: true
		       		}]

		       		var series = [{
		         
		            	name: 'Response Time [s]',
		            	type: 'column',
		            	yAxis: 0,
		            	data: this.props.chartContent.data,
		            	tooltip: {
		                	valueSuffix: ' s'
		            	}
		        	},{
		            	name: 'Steps',
		            	type: 'line',
		            	yAxis: 1,
		            	data: this.props.chartContent.steps
		        	}]
					break;

				case "R":
					//var axisTitle = "Utility [%]";
					break;
				default:
					;
			}
			

			this.chart = new HighCharts['Chart'](this.getDOMNode(), {

		        title: {
		            text: null
		        },
		        credits: {
				    enabled: false
				},
		        xAxis: [{
		            categories: this.props.chartContent.chartCateAxis[0],
		            crosshair: true
		        }],
		        yAxis: yAxis,
		        tooltip: {
		            shared: true
		        },
		        legend: {
		            layout: 'horizontal',
		            align: 'center',
		            verticalAlign: 'bottom',
		            floating: false,
		            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
		        },
		        plotOptions: {
		            column: {
		                stacking: 'normal'
		            }
		        },
		        series: series

				////
			});
		},

		componentWillUnmount: function componentWillUnmount() {
			this.chart.destroy();
		},

	

		

		render: function render() {

			if (this.props.showLabel) {

				return React.createElement(
					"div",
					//{ className: "line" },
					" "
				);
			} else {

				return React.createElement(
					"div",
					//{ className: "line-item" },
					" "
				);
			}
		}
	});

	export default  WLOverviewChart;