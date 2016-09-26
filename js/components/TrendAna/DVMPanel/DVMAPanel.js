import React from "react";
import ReactDOM from "react-dom";
import {Card,Icon,Row,Col,Input,InputNumber,Form,Button} from "antd";
import { setCardDragable,handleFocus } from "../../../interactScript";


const FormItem=Form.Item;
var displayAreaChangeActions = window.displayAreaChangeActions
var pageStatusDataStore = window.pageStatusDataStore
var dataPanelDataStore = window.dataPanelDataStore

export default class DVMAPanel extends React.Component{

	constructor() { 
		super();
        this.state={
        	OBJ:"",
        	TBL:[],
        	STA:[],
        	RET:""
        }
    }

	CloseCard(){

        var currentStatus = pageStatusDataStore.getCurrentStatus();

        displayAreaChangeActions.displayAreaRemoveCardAction(currentStatus, this.props.card.id);
	}
	getValues(){
		
        //get fields value
        const { getFieldsValue } = this.props.form;
        var formValues = getFieldsValue();

		
		var retention;
        var tables = [];
		var size = [];
		var dsc = [];
		var archiving = "";
		var avoidance = "";
		var deletion = "";
		var summarization = "";

		const {card} = this.props;
		//去重
		var data ={
			OBJ:"",
			TBL:[],
			STA:[],
			RET:""	
		}
		//分类

		for(var onerow of card.dvmanalysis)
		{
			var category = onerow.category;
			switch(category){
				//Archibing object
				case "OBJ":
				{
					data.OBJ = onerow.factor_name;
					break;
				}
				//Tables
				case "TBL":
				{
					var liveornot	= false
 					data.TBL.filter((one)=>{
 						if(one.factor_name == onerow.factor_name)
 							liveornot= true;
 					})
					if(!liveornot)
					{
						data.TBL.push(onerow.factor_name);
					}
					break;
				}
				//Strategy
				case "STA":
				{
					var liveornot= false
 					data.STA.filter((one)=>{
 						if(one.factor_name == onerow.factor_name)
 							liveornot= true;
 					});
					if(!liveornot)
					{
						data.STA.push(onerow.factor_name)
					}
					break;
				}
				//Retention
				case "RET":
				{
					data.RET=parseInt(onerow.factor_name);
					break;
				}
			}
		
		}
		//get the object list of datapanel
		var currentStatus = pageStatusDataStore.getCurrentStatus();
		var objList = dataPanelDataStore.getBlockObjList(currentStatus,"Arch Obj");
      	var tablesList = dataPanelDataStore.getBlockObjList(currentStatus,"Tables");
      	var strategyList = dataPanelDataStore.getBlockObjList(currentStatus,"Strategy");
      	var retentionList = dataPanelDataStore.getBlockObjList(currentStatus,"Retention");
      	//get table names
      	tablesList.map((table)=>{
      		tables.push(table.FACTOR_NAME);
      	});
      	//get size and description
      	for(var i = 0; i < tables.length;i++){
      		var j;
      		for(j = 0; j < data.TBL.length; j++){
      			if(tables[i] == data.TBL[j]){
      				if(formValues['TBL_SIZE'+j] == undefined){
      					size[i] = "";
      				}else{
      					size[i] = formValues['TBL_SIZE'+j];
      				}
      				if(formValues['TBL_DSC'+j] == undefined){
      					dsc[i] = "";
      				}else{
      					dsc[i] = formValues['TBL_DSC'+j];
      				}
      				break;
      			}
      		}
      		if(j >= data.TBL.length){
      			size[i] = "";
      			dsc[i] = "";
      		}

      	}
      	//set the default value of strategies
      	strategyList.map((strategy)=>{
      		switch(strategy.FACTOR_NAME){
      			case "Archiving":
      			{
      				archiving = strategy.FACTOR_INFO;
      				break;
      			}
      			case "Avoidance":
      			{
      				avoidance = strategy.FACTOR_INFO;
      				break;
      			}
      			case "Deletion":
      			{
      				deletion = strategy.FACTOR_INFO;
      				break;
      			}
      			case "Summarization":
      			{
      				summarization = strategy.FACTOR_INFO;
      				break;
      			}
      		}
      	});
		
     	//get the new values of strategies
		data.STA.map((one)=>{
			switch(one){
				case "Archiving":
				{
					archiving = formValues["ARCHIVING"];
					break;
				}
				case "Avoidance":
				{
					avoidance = formValues["AVOIDANCE"];
					break;
				}
				case "Deletion":
				{
					deletion = formValues["DELETION"];
					break;
				}
				case "Summarization":
				{
					summarization = formValues["SUMMARIZATION"];
					break;
				}
			}
		});
		//get RETENTION field
		if(formValues["RETENTION"]){
			retention = formValues["RETENTION"];
		}else{
			retention = retentionList[0].FACTOR_NAME;
		}
		//some fields of new article
		var values = {
			ARCHOBJ:objList[0].FACTOR_NAME,
			TABLES:tables,
			SIZE:size,
			TABLESDSC:dsc,
			ARCHIVING:archiving,
			AVOIDANCE:avoidance,
			DELETION:deletion,
			SUMMARIZATION:summarization,
			RETENTION:retention
		};
		return values;
        

	}
 	componentDidMount() {

      	setCardDragable(ReactDOM.findDOMNode(this));     
      	handleFocus(ReactDOM.findDOMNode(this));
      	var that  = this;
      	this.interactDrop = global.setAreaDropable({
			element: ReactDOM.findDOMNode(this),
			accept: '.function-button',
			ondrop: function ondrop(event) { // "Save Article" button on drop
				var draggableElement = event.relatedTarget,
					dropzoneElement = event.target;
				var currentStatus = pageStatusDataStore.getCurrentStatus();
				var info = draggableElement.getAttribute('data-info');
				if(info == "SAVE"){
					
					var values = that.getValues();
					
					var data = {};
					data.type = "SAVE";
					data.style = {};
          			data.style.left = event.dragEvent.clientX + window.scrollX;
          			data.style.top = event.dragEvent.clientY + window.scrollY;
          			data.values = values; 
					displayAreaChangeActions.displayAreaAddCardAction(currentStatus,data);
				}	
				
			}
		});


   
      
    }

	render() {	



		const {card} = this.props;
		//去重
		var data ={
			OBJ:"",
			TBL:[],
			STRATEGY:[],
			RET:""	
		}
		//分类

		for(var onerow of card.dvmanalysis)
		{
			var category = onerow.category;
			switch(category){
				//Archibing object
				case "OBJ":
				{
					data.OBJ = onerow.factor_name;
					break;
				}
				//Tables
				case "TBL":
				{
					var liveornot	= false
 					data.TBL.filter((one)=>{
 						if(one.factor_name == onerow.factor_name)
 							liveornot= true;
 					})
					if(!liveornot)
					{
						data.TBL.push(onerow);
					}
					break;
				}
				//Strategy
				case "STA":
				{
					var liveornot= false
 					data.STRATEGY.filter((one)=>{
 						if(one.factor_name == onerow.factor_name)
 							liveornot= true;
 					});
					if(!liveornot)
					{
						data.STRATEGY.push(onerow)
					}
					break;
				}
				//Retention
				case "RET":
				{
					data.RET=parseInt(onerow.factor_name);
					break;
				}
			}
		
		}
		
		const { getFieldProps } = this.props.form;
		const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 }
        };
        var objView;
        if(data.OBJ != ""){
        	objView = (
        		<Form horizontal className="ant-advanced-search-form">
					<p>Archiving Object</p>
          			<hr />
          			<br />
      
            		<FormItem
            		{...formItemLayout}
            		label="Archiving Object"
            		>
            		<Input placeholder="archiving object" 
            		{...getFieldProps('ARCHOBJ',{initialValue:data.OBJ})}
            		/>
            		</FormItem>
            	</Form>
        	)
        }else{
        	objView = (<div></div>)
        }
        var tblView;
        if(data.TBL.length > 0){
        	var title = (
        		<div>
    				<p>Tables</p>
          			<hr />
          			<br />
    			</div>
        	);
        	var form = data.TBL.map((one,idx)=>{

        		return (        				
        					
          			<Form horizontal className="ant-advanced-search-form">
						
						<Row gutter={16}>
              			<Col sm={10}>
              		
                    		<FormItem
                    		labelCol={{ span: 8 }}
                    		wrapperCol={{ span: 16 }}
                    		label={one.factor_name}
                    		>
                    		<Col span="15">
                      			<Input placeholder="table size"
                      			{...getFieldProps('TBL_SIZE'+idx)}
                      			/>
                    		</Col>
                   			<Col span="3">
                      			<p className="ant-form-split">GB</p>
                    		</Col>
                    		</FormItem>
                  
            			</Col>
            			<Col sm={14}>
           
                    		<FormItem
                      		labelCol={{ span: 6 }}
                      		wrapperCol= {{ span: 14 }}
                      		label="Description"
                    		>
                      		<Input placeholder="table description"
                      		{...getFieldProps('TBL_DSC'+idx)}
                      		/>
                    		</FormItem>
               
            			</Col>
            			</Row>
            		</Form>
            	)
        	});

        	tblView = (<div>{title}{form}</div>);
        	
        }else{
        	tblView = (<div></div>)
        }

        var staView;
        if(data.STRATEGY.length > 0){
        	var title = (
    			<div>
    				<p>Strategy</p>
          			<hr />
          			<br />
    				</div>
    		);
    				
    		var form = data.STRATEGY.map((one)=>{
    			return (
    				<Form horizontal className="ant-advanced-search-form">
    					<FormItem
                      	{...formItemLayout}
                      	label={one.factor_name}
                    	>
                      	<Input type="textarea" placeholder="current strategy"
                      	{...getFieldProps(one.factor_name.toUpperCase(),{initialValue:one.factor_info})}
                      	/>
                    	</FormItem>
    				</Form>
    			)
    		});
    		staView = (<div>{title}{form}</div>);
    	}else{
    		staView = (<div></div>);
    	}
    	var retView;
		if(data.RET != ""){
			retView = (
    			<Form horizontal className="ant-advanced-search-form">
					<p>Retention Time</p>
          			<hr />
          			<br />
      
            		<FormItem
            		{...formItemLayout}
            		label="Retention Time"
            		>
            		<InputNumber min={12} max={999} 
            		{...getFieldProps('RETENTION', {initialValue:data.RET})}
            		/>
            		</FormItem>
            	</Form>
    		)
    	}else{
    		retView = (<div></div>);
    	}
    						
      
      	
   
    	return (
        
       		<Card  className="strategyCard aligncenter"  title="DVM Strategy " extra={<Icon type="cross" onClick = {this.CloseCard.bind(this)} />}>
       			
       			{objView}
       			{tblView}
       			{staView}
       			{retView}
    			
        	</Card>

      	);

	}

}
DVMAPanel = Form.create()(DVMAPanel);
