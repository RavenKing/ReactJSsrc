import React from "react";
import { Button,Card,Checkbox} from "antd";
const CheckboxGroup = Checkbox.Group;

var displayAreaDataStore= window.displayAreaDataStore
var pageStatusChangeActions =window.pageStatusChangeActions
var displayAreaChangeActions = window.displayAreaChangeActions
var dataPanelItemChangeActions = window.dataPanelItemChangeActions
var pageStatusDataStore = window.pageStatusDataStore
var dataPanelDataStore = window.dataPanelDataStore

export default class KPICard extends React.Component { 
    confirm(){
    	var currentStatus = pageStatusDataStore.getCurrentStatus();
    	var nextStatus = {
            pageName:"INIT",
            sid:currentStatus.sid,
            client:currentStatus.client
        };         
        dataPanelItemChangeActions.dataPanelAddPageAction(nextStatus);
        displayAreaChangeActions.displayAreaAddPageAction(nextStatus);
        functionPanelItemChangeActions.functionPanelAddPageAction(nextStatus);
        pageStatusChangeActions.pageStatusAddAction(nextStatus);
    }
	render(){
		var KPI = ["Material Movement (Retail)","Sales & Distribution (Retail)",
                    "Finance – New G/L (Retail)","Warehouse Management (Retail)",
                    "Archiving Efficiency (All) ","Business Increase (All)"
        ]
		
		return (
			<Card style={{width:500,height:250}} title={"Select KPI"} >
				<div>
					<CheckboxGroup options={[KPI[0],KPI[1]]} defaultValue={[KPI[0]]}/>
					<CheckboxGroup options={[KPI[2],KPI[3]]} defaultValue={[KPI[2]]}/>
					<CheckboxGroup options={[KPI[4],KPI[5]]} defaultValue={[KPI[4],KPI[5]]}/>
				</div>
				<div className="KPI-Btn">
					<Button icon="plus" type="primary ">Add KPI</Button>
					<Button type="primary" onClick={this.confirm.bind(this)}>Confirm</Button>
				</div>
			</Card>


		)
	}

}