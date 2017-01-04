//WLOverview.js
import React from "react"

import { Slider , Modal, message,Card,Icon	} from "antd"
import WLOverviewChart from  "./WLOverviewChart"
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


var WLOverview = React.createClass({
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

						case 'CPM-DIA':
							var oData = {
									title: 'Transaction Profile - Dialog Jobs (' + that.props.card.dateYear + '-' + that.props.card.dateMonth + ')',
									type: data.info,
									taskType:"DIALOG",
									customerId: that.props.card.customerId,
									dateYear: that.props.card.dateYear,
									dateMonth: that.props.card.dateMonth

								};
							displayAreaChangeActions.displayAreaAddCardAction(currentStatus, oData);
							break;
						case 'CPM-BTC':
						var oData = {
									title: 'Transaction Profile - Background Jobs (' + that.props.card.dateYear + '-' + that.props.card.dateMonth + ')',
									type: data.info,
									taskType:"BACKGROUND",
									customerId: that.props.card.customerId,
									dateYear: that.props.card.dateYear,
									dateMonth: that.props.card.dateMonth

								};
							displayAreaChangeActions.displayAreaAddCardAction(currentStatus, oData);
							break;
						case 'CPM-RFC':

							var oData = {
									title: 'Transaction Profile - Remote Function Calls (' + that.props.card.dateYear + '-' + that.props.card.dateMonth + ')',
									type: data.info,
									taskType:"RFC",
									customerId: that.props.card.customerId,
									dateYear: that.props.card.dateYear,
									dateMonth: that.props.card.dateMonth

								};
							displayAreaChangeActions.displayAreaAddCardAction(currentStatus, oData);
							break;
						case "SAVE-ARTI":
							console.log('case save capacity ' + currentStatus);					
								
							data.factor_name = draggableElement.getAttribute('data-factor_name');
							data.factor_info = draggableElement.getAttribute('data-factor_info');
							data.category = draggableElement.getAttribute('data-category');
							data.type = "SAVE-ARTI";
							displayAreaChangeActions.displayAreaAddCardAction(currentStatus, data);									
								
							break;

					}


				}
			});
		},
		componentWillUpdate: function componentWillUpdate() {

			global.resetPosition(this.getDOMNode());
		},
		
		

		render: function render() {
			var that = this;
			
			var subWLOChart = React.createElement(WLOverviewChart, { chartContent: this.props.card });

			return React.createElement(
				Card,
				{ className: "upload-card",
					title: this.props.card.title,
					style: this.props.card.style,
					
					extra: React.createElement(Icon, { type: "cross", onClick: this.removeCard().bind(this) }) },
				subWLOChart
			);
		}
	});


 export default WLOverview;
