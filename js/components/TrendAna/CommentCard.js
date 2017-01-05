import React from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";

import {Card,Button,Icon,Input } from "antd"
import { AddComment } from "../../Actions/KnowledgeAction";
var global = window

var displayAreaDataStore= window.displayAreaDataStore
var pageStatusChangeActions =window.pageStatusChangeActions
var displayAreaChangeActions = window.displayAreaChangeActions
var dataPanelItemChangeActions = window.dataPanelItemChangeActions
var pageStatusDataStore = window.pageStatusDataStore
var dataPanelDataStore = window.dataPanelDataStore

@connect((store)=>{    
    return {
        articles:store.articles,
        auth:store.auth.token

    };
    
})

	

export default class CommentCard extends React.Component{
		constructor(props)
		{
  			super(props);
  			this.state={
    			state:""
  			}
		}		
		componentDidMount() {
			
			this.interactDrag = global.setCardDragable(ReactDOM.findDOMNode(this), this.props.card.id);
			global.handleFocus(ReactDOM.findDOMNode(this));
		}
		componentWillUpdate() {

			global.resetPosition(ReactDOM.findDOMNode(this));
		}
		textChange(e){
			this.setState({
				comment:e.target.value
			});
			//console.log(e.target.value);
		}
		removeCard(){
			var currentStatus = pageStatusDataStore.getCurrentStatus();

        	displayAreaChangeActions.displayAreaRemoveCardAction(currentStatus, this.props.card.id);
		}
		saveComment(){
			var data = {
				comment:this.state.comment,
				customer_id:this.props.auth.user.CUSTOMER_ID,
				factor_guid:243,
				factor_cat:this.props.card.factor_cat,	
				factor_name:this.props.card.factor_name,			
				article_nam:this.props.card.article_nam,
				article_dsc:this.props.card.article_dsc,
				username:this.props.auth.user.USERNAME
			};
			this.props.dispatch(AddComment(data));
			
		}
		render() {
			return(
				<Card className="comment-card" title={this.props.card.title} extra={<Icon type="cross" onClick={this.removeCard.bind(this)}/>}>		

					<Input type="textarea" rows={8} onChange={this.textChange.bind(this)}/>
					<Button type="primary" onClick={this.saveComment.bind(this)}>Save</Button>

				</Card>
			)	
			
				
		}
	}
