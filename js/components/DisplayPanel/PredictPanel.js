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
  			series: [{
  				name:"size1",
    			data: [29.9, 71.5, 106.4, 129.2, 144.0,176.0,135.6,148.5, 216.4, 194.1, 295.6, 454.4]
          
    			
  			},
        {
          name:"size2",
          data:[176,170,180.1,260.1,270.3,385.2,543.9],
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