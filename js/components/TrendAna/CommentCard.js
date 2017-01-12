import React from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";

import {Card,Button,Icon,Input } from "antd"
import { PostCapArticle } from "../../Actions/KnowledgeAction";
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
				
		componentDidMount() {
			
			this.interactDrag = global.setCardDragable(ReactDOM.findDOMNode(this), this.props.card.id);
			global.handleFocus(ReactDOM.findDOMNode(this));
		}
		componentWillUpdate() {

			global.resetPosition(ReactDOM.findDOMNode(this));
		}
		
		removeCard(){
			var currentStatus = pageStatusDataStore.getCurrentStatus();

        	displayAreaChangeActions.displayAreaRemoveCardAction(currentStatus, this.props.card.id);
		}
		saveComment(){
			var comment = this.refs.comment.refs.input.value;
			var data = {
				TYPE:"GEN",
				COMMENT:comment,
				CUSTOMER_ID:this.props.auth.user.CUSTOMER_ID,
				FACTOR_CAT:"G",	
				FACTOR_NAME:this.props.card.factor_name,			
				ARTICLE_NAM:this.props.card.article_nam,
				ARTICLE_DSC:this.props.card.article_dsc,
				USERNAME:this.props.auth.user.USERNAME
			};
			this.props.dispatch(PostCapArticle(data));
			this.removeCard();
			
		}
		render() {
			return(
				<Card className="comment-card" title={this.props.card.title} extra={<Icon type="cross" onClick={this.removeCard.bind(this)}/>}>		

					<Input ref="comment" type="textarea" rows={8}/>
					<Button type="primary" onClick={this.saveComment.bind(this)}>Save</Button>

				</Card>
			)	
			
				
		}
	}
