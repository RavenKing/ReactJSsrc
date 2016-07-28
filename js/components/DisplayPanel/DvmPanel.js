import React from "react";

import TableCharts from "./TableCharts";
import StrategyPanel from "./StrategyPanel";

export default class DvmPanel extends React.Component {
    
    render() {
		const { Page } = this.props;
		const { Article} = this.props;
 		var displaydata ;
 		console.log( Article );
 		if(Page == 1)
 		{
			displaydata =  <TableCharts Article={Article}></TableCharts>
 		}
 		else if(Page ==2)
 		{

			displaydata =  <StrategyPanel Strategy = { Article }> </StrategyPanel>

		}
		else if(Page ==3)
 		{
			displaydata = <h1> Panel 3</h1>
 		}

        return (
  			<div>
  			  	
  			  	<h1>Article Name: {Article.ARTICLE_NAM}</h1>   			  	
  			  	<hr/>
  			  	<br/>

  				

				{displaydata}
  			</div>
      );
  }
}
