import React from "react";
import { Button,Card,Radio} from "antd";
const RadioGroup = Radio.Group;

var displayAreaDataStore= window.displayAreaDataStore
var pageStatusChangeActions =window.pageStatusChangeActions
var displayAreaChangeActions = window.displayAreaChangeActions
var dataPanelItemChangeActions = window.dataPanelItemChangeActions
var pageStatusDataStore = window.pageStatusDataStore
var dataPanelDataStore = window.dataPanelDataStore

export default class KPICard extends React.Component {
	constructor(){
		super();
		this.state={
			value1:1,
			value2:3
		}
	} 
    confirm(){
    	var currentStatus = pageStatusDataStore.getCurrentStatus();
    	var nextStatus = {
            pageName:"INIT",
            sid:currentStatus.sid,
            client:currentStatus.client
        }; 
        var kpi = [];
        if(this.state.value1 == 1){
        	kpi.push("efficiency");
        }
        else{
        	kpi.push("growth");
        }
        if(this.state.value2 == 3){
        	kpi.push("scalability");
        }
        else{
        	kpi.push("growth");
        }
        dataPanelItemChangeActions.dataPanelAddPageAction(nextStatus,kpi);
        displayAreaChangeActions.displayAreaAddPageAction(nextStatus);
        functionPanelItemChangeActions.functionPanelAddPageAction(nextStatus);
        pageStatusChangeActions.pageStatusAddAction(nextStatus);
    }
    onChange(e){
    	if(e.target.value < 3){
    		this.setState({
    			value1:e.target.value
    		})
    	}
    	else{
    		this.setState({
    			value2:e.target.value
    		})
    	}
    	

    }
	render(){
		var KPI = ["Archiving Efficiency","Performance scalability"];
		
		return (
			<Card style={{width:500,height:250}} title={"Select KPI"} >
				<div>
					<h4>Business:</h4>
					<RadioGroup onChange={this.onChange.bind(this)} value={this.state.value1}>
        				<Radio value={1}>Archiving Efficiency</Radio>
        				<Radio value={2}>Growth</Radio>        
      				</RadioGroup>
				</div>
				<br />
				<div>
					<h4>Service:</h4>
					<RadioGroup onChange={this.onChange.bind(this)} value={this.state.value2}>
        				<Radio value={3}>Performance scalability</Radio>
        				<Radio value={4}>Growth</Radio>        
      				</RadioGroup>
				</div>
				<div className="KPI-Btn">
					<Button icon="plus" type="primary ">Add KPI</Button>
					<Button type="primary" onClick={this.confirm.bind(this)}>Confirm</Button>
				</div>
			</Card>


		)
	}

}