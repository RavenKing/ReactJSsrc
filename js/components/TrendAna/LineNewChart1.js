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
			this.chart.series[0].setData(chartContent.data);


		},

		componentDidMount: function componentDidMount() {
			console.log(this.props.chartContent);
			

			this.chart = new HighCharts['Chart'](this.getDOMNode(), {
				////
				/*chart: {
		            zoomType: 'xy'
		        },*/
		        title: {
		            text: null
		        },
		        /*subtitle: {
		            text: 'Source: WorldClimate.com'
		        },*/
		        credits: {
				    enabled: false
				},
		        xAxis: [{
		            categories: this.props.chartContent.chartCateAxis[0],
		            crosshair: true
		        }],
		        yAxis: [{ // primary yAxis
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
		        }],
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
		        series: [
		         {
		            name: 'AVG Response Time [s]',
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