import React from "react";
import { Button } from "antd";

import { connect } from "react-redux";

import { BackwardStep } from "../../Actions/KnowledgeAction";


@connect((store)=>{    
    return {
        articles:store.articles
    };
    
})
export default class BackButton extends React.Component { 


Goback(){

  this.props.dispatch(BackwardStep())

}

    render() {	    	
    	return (
        <div class="BackButton">
          <Button type="primary" onClick={this.Goback.bind(this)}>Back</Button>
          <Button type="primary" >Reset</Button>
        </div>
      );
  }
}
