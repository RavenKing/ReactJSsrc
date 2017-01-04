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
			
			this.interactDrag = global.setCardDragable(this.getDOMNode(), this.props.card.id);
			global.handleFocus(this.getDOMNode());
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
