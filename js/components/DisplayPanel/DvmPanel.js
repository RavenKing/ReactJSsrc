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
displaydata =  <TableCharts Tables={Article.TABLES}></TableCharts>
 }
 else if(Page ==2)
 {

displaydata =  <StrategyPanel Strategy = { Article }> </StrategyPanel>


 }else if(Page ==3)
 {
displaydata = <h1> Panel 3</h1>
 }

        return (
  <div>
  <h4>Content:Table Size { this.props.Page }    </h4>
  
{
  displaydata
}
  </div>
   
  
      );
  }
}
