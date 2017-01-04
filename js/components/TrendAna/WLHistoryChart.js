//WLHistoryChart.js


import React from "react"
import HighCharts from "highcharts"



	var WLHistoryChart = React.createClass({
		displayName: "WLHistoryChart",


		getInitialState: function getInitialState() {
			return {
				axisMin: this.props.axisMin,
				axisMax: this.props.axisMax,
				axisLimit: this.props.axisMax,
				showLabel: this.props.showLabel
			};
		},
		componentDidMount: function componentDidMount() {

			

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
		                text: 'Total CPU+DB Time'
		            },
		            labels: {
		                format: '{value} h'
		            }
		            
		        },{ // secondary yAxis
		        	min: 0,
		            labels: {
		                format: '{value} #'
		            },
		            title: {
		                text: 'Total Steps'
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
		        series: [{
		            name: 'CPU Time [h]',
		            type: 'column',
		            yAxis: 0,
		            data: this.props.chartContent.chartCPUValue[0],
		            tooltip: {
		                valueSuffix: ' h'
		            }
		        }, {
		            name: 'DB Time [h]',
		            type: 'column',
		            yAxis: 0,
		            data: this.props.chartContent.chartDBValue[0],
		            tooltip: {
		                valueSuffix: ' h'
		            }
		        },{
		            name: 'Steps #',
		            type: 'spline',
		            yAxis: 1,
		            data: this.props.chartContent.chartStepValue[0],
		            tooltip: {
		                valueSuffix: ' #'
		            }
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


export default WLHistoryChart;