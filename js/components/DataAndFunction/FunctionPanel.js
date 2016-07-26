import React from "react";
import { Button } from "antd";

import { ShowMainPanel } from "../../Actions/KnowledgeAction";

import { connect } from "react-redux";



@connect((store)=>{    
    return {
        articles:store.articles
    };
    
})
export default class FunctionPanel extends React.Component {
ShowMain(){

  this.props.dispatch(ShowMainPanel());

}

    render() {


        return (
       <div class = "function-panel ">
         <Button type="ghost">Create</Button>
         <Button type="ghost">Edit</Button>
         <Button type="ghost">Delete</Button>
         <Button type="ghost" onClick = {this.ShowMain.bind(this) }>Show Main</Button>
  </div>
      );
  }
}
