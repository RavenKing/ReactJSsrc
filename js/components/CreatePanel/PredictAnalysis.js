import React from "react";
import PredictPanel from "../DisplayPanel/PredictPanel";
import { CloseCreatePanel } from "../../Actions/KnowledgeAction";
import {Button} from "antd";
import BackButton from "./BackButton";
const ButtonGroup = Button.Group;

import { connect } from "react-redux";

@connect((store)=>{    
    return {
        articles:store.articles,
        auth:store.auth.token
    };
    
})
export default class PredictAnalysis extends React.Component{

  CloseCreatePanel(){
    this.props.dispatch(CloseCreatePanel());
  }
	render(){
		
		return (
			<div>
				<PredictPanel/>
        <ButtonGroup>
          <BackButton/>
          <Button type="primary" onClick={this.CloseCreatePanel.bind(this)}>
            Close
          </Button>
        </ButtonGroup>
			</div>


		)

	}
}