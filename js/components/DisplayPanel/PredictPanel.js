import React from "react";
import  ReactHighCharts  from "react-highcharts";

export default class PredictPanel extends React.Component{

	render(){
		var config = {
  			xAxis: {
          categories: ['2016-06-01', '2016-07-01', '2016-08-01', '2016-09-01', '2016-10-01', '2016-11-01', '2016-12-01', '2017-01-01', '2017-02-01', '2017-03-01', '2017-04-01', '2017-05-01']
        },
  			yAxis: {
      			title: {
         			text: 'Table Size(GB)',
         			style:{
						    fontSize: '16px'
					     }

      			},
     			  plotLines: [{
         			value: 0,
         			width: 1,
         			color: '#808080'
      			}]
   			},
        title: {
          text:null
        },
        credits: {
          enabled: false
        },
  			series: [
        { 
          name:"History Value",
          data:[29.9, 71.5, 106.4, 129.2, 144.0,176]


        },
        {
  				name:"Simulated(SAP Best Practice)",
    			data: [176,211,253,304,365.438],
          pointStart:5,
          color:"red"
  			},
        {
          name:"Simulated(Current Strategy)",
          data:[176,228,297.1,386,502],
          color:'black',
          pointStart: 5
          

        }]
		};
		return (
			<div>
				<h2>Prediction for Archiving object</h2>
				<br/>
				<ReactHighCharts config={config}/>
			</div>


		)

	}
}