import React from "react";
import DataBlock  from "./DataBlock";
export default class DataPanel extends React.Component {
    
    render() {
        const { items } = this.props;
const { articles } = this.props

        return (
 <div class="data-panel">
            
        <DataBlock items = { items } articles = { articles }></DataBlock>
 </div>
            
      );
  }
}
