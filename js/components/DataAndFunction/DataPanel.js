import React from "react";
import DataBlock  from "./DataBlock";




export default class DataPanel extends React.Component {
    
    render() {
		const { articles } = this.props

        return (
 			<div className="data-panel">
            
        		<DataBlock  articles = { articles } type="DVM"> </DataBlock>
        		<DataBlock  articles = { articles } type="Capactiy"> </DataBlock>
        		
 			</div>
            
      );
  }
}
