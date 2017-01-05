import React from "react";
import DataBlock  from "./DataBlock";




export default class DataPanel extends React.Component {
    
    render() {
		const { articles } = this.props

        return (
 			<div className="data-panel">
            
        		<DataBlock  articles = { articles } title="DVM" type="DVM"> </DataBlock>
        		<DataBlock  articles = { articles } title="General" type="GEN"> </DataBlock>
        		
 			</div>
            
      );
  }
}
