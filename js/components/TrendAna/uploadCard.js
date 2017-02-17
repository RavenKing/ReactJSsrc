import React from "react"

import { connect } from "react-redux";

import {Card,message,Button,Cascader,Icon,Table,Upload,Row,Col,Form,DatePicker,Select,Input } from "antd"
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


var UploadCard = React.createClass({
		displayName: "UploadCard",

		mixins: [componentMixin],

		getInitialState: function getInitialState() {
			var curDate = new Date();
			var curYearMonth = curDate.getFullYear().toString() + '-' + (curDate.getMonth()+1).toString();
			var currentStatus = pageStatusDataStore.getCurrentStatus();


			return {
				echoData: false,
				tableHeader: [],
				tableData: [],
				isDisabled: false,
				kmType: [],
				tableLen: 550,
				checkType: true,
				curYearMonth: curYearMonth,
				taskType: "BACKGROUND",
				sysID:currentStatus.sid,
				sysClt:currentStatus.client
				};
		},
		componentWillMount:function componentWillMount(){

		},
		componentDidMount: function componentDidMount() {
			
			this.interactDrag = global.setCardDragable(this.getDOMNode(), this.props.card.id);
			global.handleFocus(this.getDOMNode());
		},
		componentWillUpdate: function componentWillUpdate() {

			global.resetPosition(this.getDOMNode());
		},
		onConfirm: function onConfirm() {
			var logCustomerInfo =  global.pageStatusDataStore.getCustomerID();
            var logCustomerId = logCustomerInfo.CUSTOMER_ID;
			var that = this;

			var uploadData = {
				userInfo: {
					customerId: logCustomerId.toString(),
					sysId: this.state.sysId,
					sysClt: this.state.sysClt,
					dateYear: this.state.curYearMonth.slice(0,4),
					dateMonth: this.state.curYearMonth.slice(5,7)
				},
				curYearMonth: this.state.curYearMonth,
				taskType: this.state.taskType,//API for TIME PROFILE of different type
				tableName: this.state.kmType[1],
				tableData: this.state.tableData
			};

			console.log('uploadData = ', uploadData);


			displayAreaDataStore.uploadConfirm(uploadData,function(respCode){

				console.log('respCode = ', respCode);
				if(respCode){
					message.success('Local file uploaded to HANA successfully.', 3.5);
					that.onReset();
				}
				else {
					message.error('Upload failed.', 3.5);
				}

			});


		},
		onReset: function onReset() {
			var curDate = new Date();
			var curYearMonth = curDate.getFullYear().toString() + '-' + (curDate.getMonth()+1).toString();

			this.setState({
				echoData: false,
				tableHeader: [],
				tableData: [],
				isEnabled: false,
				kmType: [],
				tableLen: 550,
				checkType: true
			});
		},
		onChangeType: function onChangeType(value) {
			console.log('KM type = ',value);
			this.setState({
				kmType: value,
				checkType: ((!!value) && (!!this.state.curYearMonth)) ? false : true
			});
		},

		ChangeSys:function ChangeSys(e)
		{
			this.setState({sysId:e.target.value})
		},
		ChangeClient:function ChangeClient(e)
		{
			this.setState({sysClt:e.target.value})
		},

		onChangeTime: function onChangeTime(value,dateString) {
			console.log('Year/Month = ',dateString.slice(0,4), dateString.slice(5,7));
			this.setState({
				curYearMonth: dateString,
				checkType: ((!!dateString) && (!!this.state.kmType)) ? false : true
			});
		},
		handleTypeChange: function handleTypeChange(value) {
		  console.log('selected type:' , value);
		  this.setState({
		  	taskType: value
		  })
		},

		render: function render() {


			// console.log(this.state)
			var SelectionSysID
			console.log(this.state)
			if(this.state.selection)
			{

				console.log(this.state.selection);
			}
			var that = this;

			var columns = [];
			var data = [];

			var jsonKey = [];

			var areaData = [{
				value: 'DVM',
				label: 'Data Volume Management',
				children: [{
					value: 'KMHDR',
					label: 'Article Header'
				}, {
					value: 'KMBSC',
					label: 'Basic Info'
				}, {
					value: 'KMDVM',
					label: 'Data Strategy'
				},{
					value: 'CMTBL',
					label: 'Time-based Distribution'
				}]
			}, {
				value: 'CPM',
				label: 'Capacity Management',
				disabled: false,
				children: [{
					value: 'CMWLH',
					label: 'Workload Overview'
				}, {
					value: 'CMWLP',
					label: 'Transaction Profile'
				}]
			}, {
				value: 'BPI',
				label: 'Business Process Improvement',
				disabled: true,
				children: [{
					value: 'KMHDR',
					label: 'Article Header'
				}, {
					value: 'KMBSC',
					label: 'Basic Info'
				}, {
					value: 'KMDVM',
					label: 'Data Strategy'
				}]
			}];

			var props = {
				name: 'file',
				accept: '.csv',

				action: 'http://10.97.144.117:8000/SmartOperations/services/testUpload.xsjs',
				headers: {
					authorization: 'Basic ' + btoa('ZENGHENG:Sap12345')
				},
				beforeUpload: function beforeUpload(file) {
					var isCSV = file.type === 'application/vnd.ms-excel';
					if (!isCSV) {
						message.error('Only CSV File Supported', 3.5);
					}
					return isCSV;
				},
				onChange: function onChange(info) {
					if (info.file.status !== 'uploading') {
						console.log(info.file, info.fileList);
					}
					if (info.file.status === 'done') {
						message.success(info.file.name + ' read succeeded.', 3.5);
						for (var i = 0; i < info.fileList[0].response.fileHeader.length; i++) {
							var headerItem = {
								title: info.fileList[0].response.fileHeader[i],
								dataIndex: 'column_' + i.toString(),
								width: 150
							};
							jsonKey[i] = 'column_' + i.toString();
							columns.push(headerItem);
						}

						for (var i = 0; i < info.fileList[0].response.fileData.length; i++) {
							/*var dataItem = {
        key: i.toString(),
        column_0: info.fileList[0].response.fileData[i][0],
        column_1: info.fileList[0].response.fileData[i][1],
        column_2: info.fileList[0].response.fileData[i][2]
       }*/
							var dataItem = {
								key: i.toString()
							};
							for (var j = 0; j < jsonKey.length; j++) {
								dataItem[jsonKey[j]] = info.fileList[0].response.fileData[i][j];
							}

							data.push(dataItem);
						}

						that.setState({
							echoData: true,
							tableHeader: columns,
							tableData: data,
							isEnabled: true,
							tableLen: ( columns.length  > 4 ) ? columns.length * 150 : 550
						});
					} else if (info.file.status === 'error') {
						message.error(info.file.name + ' read failed.', 3.5);
					}
				}
			};

			var pagination = {
				total: 5
			};

			var displayTable;
			switch (this.state.echoData) {
				case true:
					{
						displayTable = React.createElement(
							"div",
							{ style: { marginTop: 16, height: 300 } },
							React.createElement(Table, { columns: this.state.tableHeader, scroll: { x: this.state.tableLen , y: 260 }, dataSource: this.state.tableData.slice(0,30), size: "small", pagination: false })
						);
						break;
					}
				case false:
					{
						displayTable = 
						<div style={{ marginTop: 16, height: 300 }}>
						  <Upload.Dragger {...props} disabled={this.state.checkType}>
							<p className="ant-upload-drag-icon">
							  <Icon type="upload" />
							</p>
							<p className="ant-upload-text">CLICK or DRAG Local File to This Area to Upload</p>
							<p className="ant-upload-hint">1. Select a KM Type and Time</p>
							<p className="ant-upload-hint">2. Upload and Review the Data</p>
							<p className="ant-upload-hint">3. Click CONFIRM Button to Submit to DB</p>
							<p className="ant-upload-hint">4. Single .CSV File Supported Only</p>
						  </Upload.Dragger>
						</div>;
					}

				default:
					;

			}

			var submitBtn;

			switch (this.state.echoData) {
				case true:
					{
						submitBtn = React.createElement(
							"div",
							null,
							React.createElement(
								Row,
								null,
								React.createElement(
									Col,
									{ span: 21 },
									React.createElement(Cascader, { className: "cascade-upload", options: areaData, disabled: true })
								),
								React.createElement(
									Col,
									{ span: 2 },
									React.createElement(Button, { type: "ghost", shape: "circle", icon: "reload", onClick: this.onReset })
								),
								React.createElement(
									Col,
									{ span: 1 },
									React.createElement(Button, { type: "primary", shape: "circle", icon: "caret-right", onClick: this.onConfirm })
								)
							),
							React.createElement(
								Row,
								{ style: { marginTop: 5} },
								null,
								React.createElement(
									Col,
									{ span: 10 },
									React.createElement(DatePicker.MonthPicker, { defaultValue: this.state.curYearMonth , disabled: true})
								),
								React.createElement(
									Col,
									{ span: 12 },
									<Select defaultValue={this.state.taskType} style={{ width: 120 }} onChange={this.handleTypeChange} disabled>
								      <Select.Option value="DIALOG">DIALOG</Select.Option>
								      <Select.Option value="BACKGROUND">BACKGROUND</Select.Option>
								      <Select.Option value="RFC">RFC</Select.Option>
								    </Select>
								)

							),	
						React.createElement(
								Row,
								{ style: { marginTop: 5} },
								null,
								React.createElement(
									Col,
									{ span: 10 },
									React.createElement(Input, { defaultValue:this.state.sysId,disabled:true})
								),
								React.createElement(
									Col,
									{ span: 12 },
 									<Input placeholder="Input Client" defaultValue={this.state.sysClt} disabled={true}/>
								)
													

							)
						);
						break;
					}
				case false:
					{

						

						submitBtn = React.createElement(
							"div",
							null,
							React.createElement(
								Row,
								null,
								React.createElement(
									Col,
									{ span: 21 },
									React.createElement(Cascader, { className: "cascade-upload", options: areaData, value: this.state.kmType, allowClear: false, placeholder: "Please Select a KM Type", onChange: this.onChangeType })
								),
								React.createElement(
									Col,
									{ span: 2 },
									React.createElement(Button, { type: "ghost", shape: "circle", icon: "reload", disabled: true })
								),
								React.createElement(
									Col,
									{ span: 1 },
									React.createElement(Button, { type: "primary", shape: "circle", icon: "caret-right", disabled: true })
								)
							),
							React.createElement(
								Row,
								{ style: { marginTop: 5} },
								null,
								React.createElement(
									Col,
									{ span: 10 },
									React.createElement(DatePicker.MonthPicker, { defaultValue: this.state.curYearMonth , onChange: this.onChangeTime })
								),
								React.createElement(
									Col,
									{ span: 12 },
									<Select defaultValue={this.state.taskType} style={{ width: 120 }} onChange={this.handleTypeChange}>
								      <Select.Option value="DIALOG">DIALOG</Select.Option>
								      <Select.Option value="BACKGROUND">BACKGROUND</Select.Option>
								      <Select.Option value="RFC">RFC</Select.Option>
								    </Select>
								)
							),
							React.createElement(
								Row,
								{ style: { marginTop: 5} },
								null,
											React.createElement(
									Col,
									{ span: 10 },
									React.createElement(Input, { value:this.state.sysID ,disabled:true})
								),
								React.createElement(
									Col,
									{ span: 12 },
 									<Input placeholder="Input Client" value={this.state.sysClt} disabled={true}/>
								)
							)
						);
						break;
						
					}

				default:
					;
			}

			return React.createElement(
				Card,
				{ className: "upload-card",
					title: this.props.card.title,
					style: this.props.card.style,
					extra: React.createElement(Icon, { type: "cross", onClick: this.removeCard().bind(this) }) },
				submitBtn,
				displayTable
			);
		}
	});


 export default UploadCard;