//WLHistory.js

import React from "react"

import { Slider , Modal, message,Card,Icon	} from "antd"
import WLHistoryChart from  "./WLHistoryChart"
import {browserHistory } from "react-router"

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
				// if (that.interactable) {
				//   that.interactable.unset();
				//   that.interactable = null;
				// }
				// if (that.interactDrag) {
				//   that.interactDrag.unset();
				//   that.interactDrag = null;
				// }
				// if (that.interactDrop) {
				//   that.interactDrop.unset();
				//   that.interactDrop = null;
				// }
				var currentStatus = pageStatusDataStore.getCurrentStatus();

				if (currentStatus === "INIT" || this.props.card.type !== "ITEM" || currentStatus.indexOf(this.props.card.FACTOR_NAME[0]) < 0) {

					displayAreaChangeActions.displayAreaRemoveCardAction(currentStatus, that.props.card.id);
				} else {

					message.warning('Can\'t remove object card which is being analyzed.');
				}
			};
		}
	};


var WLHistory = React.createClass({
		displayName: "UploadCard",

		mixins: [componentMixin],

		getInitialState: function getInitialState() {

			return {
				nothing: ""
			};
		},

		componentDidMount: function componentDidMount() {
			var that = this;
			this.interactDrag = global.setCardDragable(this.getDOMNode(), this.props.card.id);
			global.handleFocus(this.getDOMNode());
			this.interactDrop = global.setAreaDropable({
				element: this.getDOMNode(),
				accept: '.function-button',

				ondrop: function ondrop(event) { 

					var draggableElement = event.relatedTarget,
					    dropzoneElement = event.target;
					var currentStatus = pageStatusDataStore.getCurrentStatus();
					var cardId = that.props.card.id;
					var data = {};
					data.style = {};
          			data.style.left = event.dragEvent.clientX + window.scrollX;
          			data.style.top = event.dragEvent.clientY + window.scrollY;
					data.info = draggableElement.getAttribute('data-info');

					console.log('function type ------- ', data.info);
					console.log('info of origin WLO card:', that.props.card);


					switch(data.info){

						case "SAVE-ARTI":
							console.log('case save capacity ' + currentStatus);					
								
							data.factor_name = "WLH-"+that.props.card.monthCount+"-"+that.props.card.latestYear+"-"+that.props.card.latestMonth
							data.type = "SAVE-ARTI";
							displayAreaChangeActions.displayAreaAddCardAction(currentStatus, data);									
								
							break;
					}
				}
			})
		},
		componentWillUpdate: function componentWillUpdate() {

			global.resetPosition(this.getDOMNode());
		},
		
		

		render: function render() {
			var that = this;
			
			var subWLHChart = React.createElement(WLHistoryChart, { chartContent: this.props.card });

			return React.createElement(
				Card,
				{ className: "upload-card",
					title: this.props.card.title,
					style: this.props.card.style,
					
					extra: React.createElement(Icon, { type: "cross", onClick: this.removeCard().bind(this) }) },
				subWLHChart
			);
		}
	});


 export default WLHistory;
