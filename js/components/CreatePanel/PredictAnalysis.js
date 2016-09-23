import React from "react";
import PredictPanel from "../DisplayPanel/PredictPanel";
import { CloseCreatePanel,PostArticle } from "../../Actions/KnowledgeAction";
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
  PostArticle(){
      const { user } = this.props.auth;
      const { newArticle } = this.props.articles;
      var data = newArticle;
      data.USERNAME = user.USERNAME;
      this.props.dispatch(PostArticle(data));
  }
  CloseCreatePanel(){
    this.props.dispatch(CloseCreatePanel());
  }
	render(){
		
		return (
			<div>
				<PredictPanel/>
        <ButtonGroup>
          <BackButton/>
          <Button type="primary" onClick={this.PostArticle.bind(this)}>Save</Button>
          <Button type="primary" onClick={this.CloseCreatePanel.bind(this)}>
            Close
          </Button>
        </ButtonGroup>
			</div>


		)

	}
}