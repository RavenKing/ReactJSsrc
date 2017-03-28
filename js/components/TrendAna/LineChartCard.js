import React from "react"

import { Slider,Modal, message,Card,Icon,Switch,Tag} from "antd"
import LineChart from  "./LineChart"
import LineNewChart from "./LineNewChart"
//import LineNewChart1 from "./LineNewChart1"
import PredictLineChart from "./PredictLineChart"
import {browserHistory } from "react-router"
import TemplateSelect from "./TemplateSelect"

var global =window

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

				if (currentStatus.pageName === "INIT" || this.props.card.type !== "ITEM-ANA" || currentStatus.pageName.indexOf(this.props.card.FACTOR_NAME[0]) < 0) {

					displayAreaChangeActions.displayAreaRemoveCardAction(currentStatus, that.props.card.id);
				} else {

					message.warning('Can\'t remove object card which is being analyzed.', 3.5);
				}
			};
		}
	};

	var LineChartCard = React.createClass({
		displayName: "LineChartCard",

		mixins: [componentMixin],
		getInitialState: function getInitialState() {
			return {
				tsvisible:false,
				rangeMin: this.props.card.lineChartAxis[0].length - 30,
				rangeMax: this.props.card.lineChartAxis[0].length,
				rangeLimit: this.props.card.lineChartAxis[0].length
			};
		},
		changeSlider: function changeSlider(value) {
			this.setState({
				rangeMin: value[0],
				rangeMax: value[1]
			});
		},
		changeTimeType:function changeTimeType(checked){
			if(checked == true){
				this.setState({
					timeType:"AVG"
				});
			}
			else{
				this.setState({
					timeType:"TOTAL"
				});
			}
			
		},
		onSetUnvisible:function onSetUnvisible()
		{
			this.setState({
				tsvisible:false
			})
		},
		//var confirm = Modal.confirm;
		showConfirmEdit: function showConfirmEdit(text) {
			var that = this;
			Modal.confirm({
				title: 'Edit Object',
				content: 'coming soon ...',
				onOk: function onOk() {

					that.removeCard().bind(that);
				},
				onCancel: function onCancel() {},
				okText: 'OK',
				cancelText: 'Cancel'
			});
		},
		showConfirmMark: function showConfirmMark(guid, text) {
			var that = this;
			Modal.confirm({
				title: 'Pin to Data Area',
				content: 'Please confirm to pin [' + text + '] to left Data Area',
				onOk: function onOk() {
					if (displayAreaDataStore.pinObject(guid, '1')) {
						message.success('Object Successfully Pinned to Data Area', 3.5);
						dataPanelDataStore.getInitPageData("INIT");
					} else {
						message.error('Failed to Pin Object', 3.5);
					}
				},
				onCancel: function onCancel() {
					if (displayAreaDataStore.pinObject(guid, '0')) {
						message.success('Object Successfully Un-Pinned From Data Area', 3.5);
						dataPanelDataStore.getInitPageData("INIT");
					} else {
						message.error('Failed to Un-Pin Object', 3.5);
					}
				},
				okText: 'Pin',
				cancelText: 'Un-Pin'
			});
		},
		showConfirmDelete: function showConfirmDelete(guid, text) {
			var that = this;
			Modal.confirm({
				title: 'Caution! Delete Object',
				content: 'Please confirm to delete object [' + text + ']',
				onOk: function onOk() {

					if (displayAreaDataStore.deleteObject(guid)) {
						message.success('Object Successfully Deleted', 3.5);
						dataPanelDataStore.getInitPageData("INIT");
						//that.removeCard();
						displayAreaChangeActions.displayAreaRemoveCardAction(pageStatusDataStore.getCurrentStatus(), that.props.card.id);
					} else {
						message.error('Failed to Delete Object', 3.5);
					}
				},
				onCancel: function onCancel() {},
				okText: 'Delete',
				cancelText: 'Cancel'
			});
		},
		componentDidMount: function componentDidMount() {
			var that = this;

			this.interactDrag = global.setCardDragable(this.getDOMNode(), this.props.card.id);
			this.interactDrop = global.setAreaDropable({
				element: this.getDOMNode(),
				accept: '.function-button, .data-item,.data-block,.config-button, .function-button-nav,.data-item-rca',

				ondrop: function ondrop(event) { // card on drop
					var draggableElement = event.relatedTarget,
					    dropzoneElement = event.target;
					var currentStatus = pageStatusDataStore.getCurrentStatus();
					var cardId = that.props.card.id;
					var data = {};
					data.style = {};
          			data.style.left = event.dragEvent.clientX + window.scrollX;
          			data.style.top = event.dragEvent.clientY + window.scrollY;
					data.info = draggableElement.getAttribute('data-info');

					switch (data.info) {
						case "ANALYSIS":
						  that.setState({
						tsvisible:true

														})

							break;
						case "DVM_ANA":
							var factorName = that.props.card.FACTOR_NAME[0];
							dataPanelItemChangeActions.dataPanelDVMAddItemAction(currentStatus, factorName);
							break;
						case "RCA":
							console.log('case RCA');
							if (!dataPanelDataStore.isSubItemExisted(currentStatus)) {
								var cardGuid;
								var sIntervalCallId;

								(function () {
									var addPieCard = function addPieCard() {
										if (dataPanelDataStore.isSubItemExisted(currentStatus)) {
											clearInterval(sIntervalCallId);
											var oData = {
												type: "PIE",
												style: style,
												objList: dataPanelDataStore.getObjList(currentStatus)
											};
											displayAreaChangeActions.displayAreaAddCardAction(currentStatus, oData);
										}
									};

									var style = {
										top: that.props.card.style.top + that.getDOMNode().clientHeight + 30,
										left: 240
									};
									cardGuid = that.props.card.guidArr[0];
					console.log('when RCA: ----- ', that.props.card);
									dataPanelItemChangeActions.dataPanelRCAAddItemAction(currentStatus, that.props.card);

									sIntervalCallId = setInterval(function () {
										addPieCard();
									}, 200);
								})();
							} else if (!displayAreaDataStore.isCardExisted(currentStatus, "PIE")) {
								var _style = {
									top: that.props.card.style.top + that.getDOMNode().clientHeight + 30,
									left: 240
								};
								var oData = {
									type: "PIE",
									style: _style,
									objList: dataPanelDataStore.getObjList(currentStatus)
								};
								displayAreaChangeActions.displayAreaAddCardAction(currentStatus, oData);
							}

							break;
						case "RCA_SIM":
							var test1 = displayAreaDataStore.isCardExisted(currentStatus, "RCA_SIM");
							var test2 = displayAreaDataStore.getCardLineNumber(currentStatus, cardId) > 1;
							if (!displayAreaDataStore.isCardExisted(currentStatus, "RCA_SIM") && displayAreaDataStore.getCardLineNumber(currentStatus, cardId) > 1) {
								var _style2 = {
									top: that.props.card.style.top + that.getDOMNode().clientHeight - 360,
									left: that.getDOMNode().clientWidth + 180
								};
								var guidArr = that.props.card.guidArr;
								
								var oData = {
									FACTOR_NAME: that.props.card.FACTOR_NAME,
									type: "RCA_SIM",
									style: _style2,
									factorGuid: guidArr[0],
									factorGuidStr: guidArr.slice(1).join(","),
									category: that.props.card.category[0],
									categoryStr: that.props.card.category.slice(1).join(","),
									guidArr: guidArr
								};
								displayAreaChangeActions.displayAreaAddCardAction(currentStatus, oData);
							}

							break;
						case "WHAT_IF":
							console.log('case WHAT_IF');
							var test1 = displayAreaDataStore.isCardExisted(currentStatus, "WHAT_IF");
							
							if (!displayAreaDataStore.isCardExisted(currentStatus, "WHAT_IF")&& displayAreaDataStore.getCardLineNumber(currentStatus, cardId) > 1) {
								var _style2 = {
									top: that.props.card.style.top + that.getDOMNode().clientHeight - 360,
									left: that.getDOMNode().clientWidth + 180
								};
								var guidArr = that.props.card.guidArr;
								
								var oData = {
									FACTOR_NAME: that.props.card.FACTOR_NAME,
									type: "WHAT_IF",
									style: _style2,
									factorGuid: guidArr[0],
									factorGuidStr: guidArr.slice(1).join(","),
									category: that.props.card.category[0],
									categoryStr: that.props.card.category.slice(1).join(","),
									guidArr: guidArr
								};
								
								displayAreaChangeActions.displayAreaAddCardAction(currentStatus, oData);
							}

							break;
						case "ART_TEMP":
							console.log('case Article Template');
							if(dataPanelDataStore.getObjList(currentStatus).length == 0){
								const modal = Modal.warning({
            						title: 'Warning! ',
            						content: 'Drag \"DVM Strategy\" button first'
          						});
							}
							else{
								data.type = "ART_TEMP";
								displayAreaChangeActions.displayAreaAddCardAction(currentStatus,data);
							}
							
							break;
						case currentStatus.pageName + "-ITEM":
							if (currentStatus.pageName != "INIT" && that.props.card.type === "ITEM-ANA") {
								if(currentStatus.pageName.indexOf("ANALYSIS_RCA") > -1||currentStatus.pageName.indexOf("ANALYSIS_WIF") > -1){
									data.guid = draggableElement.getAttribute('data-factor_guid');
									data.FACTOR_NAME_S = draggableElement.getAttribute('data-factor_name');
									data.category = draggableElement.getAttribute('data-category');
									data.factor_type = draggableElement.getAttribute('data-factor_type');
									data.customerId = that.props.card.customerId;
									data.systemId = that.props.card.systemId;
									data.systemClt = that.props.card.systemClt;
									console.log(data);
									displayAreaChangeActions.displayAreaChangeCardAction(currentStatus, data, cardId);
								}
								else if(currentStatus.pageName.indexOf("ANALYSIS_DVM") > -1){
									data.factor_name = draggableElement.getAttribute('data-factor_name');
									data.factor_info = draggableElement.getAttribute('data-factor_info');
									data.category = draggableElement.getAttribute('data-category');
									data.type = "DVM-ITEM";
									displayAreaChangeActions.displayAreaAddCardAction(currentStatus, data);
									
								}
								
							}
							break;
						case currentStatus.pageName + "-BLOCK":
							console.log('case ' + currentStatus.pageName + '-BLOCK');
							var currentStatus = pageStatusDataStore.getCurrentStatus();
    						
							data.title = draggableElement.getAttribute('data-category');
							var objList = dataPanelDataStore. getBlockObjList(currentStatus,data.title);
							data.objList = objList;
							data.type = "DVM-BLOCK";
							displayAreaChangeActions.displayAreaAddCardAction(currentStatus, data);
							break;
						// case "INIT-ITEM":
						//   data.guid = draggableElement.getAttribute('data-factor_guid');
						//   data.FACTOR_NAME_S = draggableElement.getAttribute('data-factor_name');
						//   displayAreaChangeActions.displayAreaChangeCardAction(currentStatus, data, cardId);
						//   break;

						case "NOTE":
							console.log('NOTE -factor name = ');
							console.log(that.props.card.FACTOR_NAME);
							//define article type
							var stype = that.props.card.category[0] == "B"?"DVM":"GEN";
							browserHistory.push("/km?object=" + that.props.card.FACTOR_NAME[0] + "&stype=" + stype);

							break;
						case "COM":
							console.log('COMMENT -factor name =');
							console.log(that.props.card.FACTOR_NAME[0]);
							console.log(draggableElement);
							var data = {
								type: "COM",
								title: "Comments for " + that.props.card.FACTOR_NAME[0],
								factor_name:that.props.card.FACTOR_NAME[0],
								factor_cat:that.props.card.category[0],
								article_nam:that.props.card.business_name[0],
								article_dsc:that.props.card.business_name[0]

							}
							displayAreaChangeActions.displayAreaAddCardAction(currentStatus,data);

							break;

						case "DELETE":
							console.log('DELETE');

							that.showConfirmDelete(that.props.card.guidArr, that.props.card.FACTOR_NAME);

							break;

						case "EDIT":
							console.log('EDIT');
							//that.showConfirmEdit(that.props.card.FACTOR_NAME);
							if (!displayAreaDataStore.isCardExisted(currentStatus, "EDIT")) {

								var _style3 = {
									top: that.props.card.style.top + that.getDOMNode().clientHeight + 30,
									left: 240
								};
								var oData = {
									type: "EDIT",
									style: _style3,
									title: "Edit Object - " + that.props.card.FACTOR_NAME[0],
									editObj: that.props.card.guidArr[0]
								};
								displayAreaChangeActions.displayAreaAddCardAction(currentStatus, oData);
							}
							break;

						case "MARK":
							console.log('MARK');
							that.showConfirmMark(that.props.card.guidArr, that.props.card.FACTOR_NAME);

							break;
						default:
							;
					}
				}
			});
			global.handleFocus(this.getDOMNode());
		},
		componentWillUpdate: function componentWillUpdate() {
			global.resetPosition(this.getDOMNode());
		},	
		render: function render() {
			var title = "",
			    lineNameArr = [];
			if (this.props.card.type === "ITEM" || this.props.card.type === "ITEM-ANA") {
				lineNameArr = this.props.card.FACTOR_NAME[0];
				title = "Trend Analysis " + lineNameArr;
			} else if (this.props.card.type === "WHAT_IF") {
				lineNameArr = this.props.card.lineNameArr;
				title = "Predict Analysis " + this.props.card.FACTOR_NAME[0];
			}

			////////////////
			if (this.props.card.type === "ITEM-ANA") {

				var arrLen = this.props.card.FACTOR_NAME.length;
				var subLineChart = [];

				for (var i = 0; i < arrLen; i++) {
					if(this.props.card.category[i] == "B"){
						var param = {
							chartContent:{
								factorCate:"B",
								total_data:this.props.card.lineChartValue[i],
							//	month_data:this.props.card.lineChartMonthEntries[0],
								chartCateAxis:this.props.card.lineChartAxis,
								axisMin: this.state.rangeMin,
								axisMax: this.state.rangeMax
							}
						}
					}
					else {//"S"
						chartValueArr = this.props.card.lineChartValue[i].slice();
						if(this.state.timeType == "AVG"){
							chartValueArr = this.props.card.lineChartAvgTime[i].slice();
						}
						else if(this.state.timeType == "TOTAL"){//"total"
							chartValueArr = this.props.card.lineChartValue[i].slice();
						}					
						var param = {
							chartContent:{	
								factorCate:"S",					
								data:chartValueArr,
							//	steps:this.props.card.lineChartStep[0],
								chartCateAxis:this.props.card.lineChartAxis,
								axisMin: this.state.rangeMin,
								axisMax: this.state.rangeMax
							}

						};
					}
					subLineChart[i] = React.createElement(LineNewChart,param);
				}
			} else if (this.props.card.type === "WHAT_IF") {
				var subLineChart = React.createElement(PredictLineChart, { chartAxisArr: this.props.card.lineChartAxis,
					chartValueArr: this.props.card.lineChartValue,
					lineNameArr: lineNameArr,
					axisMin: this.state.rangeMin,
					axisMax: this.state.rangeMax,
					factorCate: this.props.card.category[0]
				});
			} else if(this.props.card.type === "ITEM") {
				var chartValueArr;
				var subLineChart;
				var that = this;
				if(this.props.card.category[0] == "B"){					
					

					var param = {
						chartContent:{
							factorCate:"B",
							total_data:this.props.card.lineChartValue[0],
							month_data:this.props.card.lineChartMonthEntries[0],
							chartCateAxis:this.props.card.lineChartAxis,							
							axisMin: this.state.rangeMin,
							axisMax: this.state.rangeMax
						}
					}

					subLineChart = React.createElement(
						'div',null,
						React.createElement(LineNewChart,param),
						React.createElement('h3', {style:{"margin-left":15}}, 'Retention:',<Tag color="red" closable={false}>{that.props.card.retention}</Tag>,'Month'),
						React.createElement('h3', {style:{"margin-left":15}}, 'Archiving Efficiency:',<Tag color="red" closable={false}>{that.props.card.efficiency}</Tag>,'%')
						);

					
				}
				else{//"S"
					chartValueArr = this.props.card.lineChartValue[0].slice();
					if(this.state.timeType == "AVG"){
						chartValueArr = this.props.card.lineChartAvgTime[0].slice();
					}
					else if(this.state.timeType == "TOTAL"){//"total"
						chartValueArr = this.props.card.lineChartValue[0].slice();
					}					
					var param = {
						chartContent:{	
							factorCate:"S",					
							data:chartValueArr,
							steps:this.props.card.lineChartStep[0],
							chartCateAxis:this.props.card.lineChartAxis,
							axisMin: this.state.rangeMin,
							axisMax: this.state.rangeMax
						}

					};
				 	subLineChart = React.createElement(LineNewChart,param);

				
				}	


				

				
				
				
				var tpselect = <Modal title="select template"
					footer= {false}
		 			onCancel={()=>{this.onSetUnvisible()} }  visible={this.state.tsvisible}>
					<TemplateSelect card = {this.props.card} visible={this.state.tsvisible}/>
					</Modal>

				//var timeSwitch = <Switch checkedChildren="AVG" unCheckedChildren="TOTAL" defaultChecked={false} onChange={this.changeTimeType.bind(this)} />

			}

			////////////////
			var that = this;
			return React.createElement(
				Card,
				{ className: "line-card",
					title: title,
					style: this.props.card.style,
					extra: React.createElement(Icon, { type: "cross", onClick: this.removeCard().bind(this) }),
					bodyStyle: {
						padding: 0
					} },
					subLineChart,
					this.state.tsvisible==true?tpselect:<div></div>,
					this.props.card.category[0] == "S"?<Switch checkedChildren="AVG" unCheckedChildren="TOTAL" defaultChecked={false} onChange={this.changeTimeType.bind(this)} />:<div></div>,
					<Slider min={1} max={this.state.rangeLimit} range="true" defaultValue={[this.state.rangeMin,this.state.rangeMax]} onChange={this.changeSlider.bind(this)}/>
					/*React.createElement(Slider, { min: 1, max: this.state.rangeLimit, range: true, defaultValue: [this.state.rangeMin, this.state.rangeMax], onChange: this.onChange.bind(this) })*/
			);

		}
		
		
       
    
  });

export default LineChartCard;