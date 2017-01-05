import React from "react"

import { connect } from "react-redux";

import {Card,Button,Icon,Input } from "antd"
var global = window

var displayAreaDataStore= window.displayAreaDataStore
var pageStatusChangeActions =window.pageStatusChangeActions
var displayAreaChangeActions = window.displayAreaChangeActions
var dataPanelItemChangeActions = window.dataPanelItemChangeActions
var pageStatusDataStore = window.pageStatusDataStore
var dataPanelDataStore = window.dataPanelDataStore

	var componentMixin = {
		removeCard: function removeCard() {
			var that = this;
			return function () {
			
				var currentStatus = pageStatusDataStore.getCurrentStatus();

				if (currentStatus === "INIT" || this.props.card.type !== "ITEM" || currentStatus.indexOf(this.props.card.FACTOR_NAME[0]) < 0) {

					displayAreaChangeActions.displayAreaRemoveCardAction(currentStatus, that.props.card.id);
				} else {

					message.warning('Can\'t remove object card which is being analyzed.');
				}
			};
		}
	};


	var CommentCard = React.createClass({
		displayName: "CommentCard",

		mixins: [componentMixin],

		componentDidMount: function componentDidMount() {
			
			this.interactDrag = global.setCardDragable(this.getDOMNode(), this.props.card.id);
			global.handleFocus(this.getDOMNode());
		},
		componentWillUpdate: function componentWillUpdate() {

			global.resetPosition(this.getDOMNode());
		},
		textChange: function textChange(e){
			console.log(e.target.value);
		},
		saveComment:function saveComment(){
			/*
			save code

			*/
		},
		render: function render() {
			var that = this;			

			return React.createElement(
				Card,
				{ className: "comment-card",
					title: this.props.card.title,
					//style: this.props.card.style,
					extra: React.createElement(Icon, { type: "cross", onClick: this.removeCard().bind(this) })
				},
				React.createElement(Input,{
					type:"textarea",
					rows:8,
					onChange:this.textChange.bind(this)
				}),
				React.createElement(Button,{
					children:"Save",
					type:"primary",
					onClick:this.saveComment.bind(this)
				})


			);
		}
	});


 export default CommentCard;