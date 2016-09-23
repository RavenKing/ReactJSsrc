import React from "react";
import ReactDOM from "react-dom";
import {Card,Icon,InputNumber} from "antd";
import { setCardDragable,handleFocus } from "../../../interactScript";
import TableForm from "./TableForm"
import StrategyForm from "./StrategyForm";

var displayAreaChangeActions = window.displayAreaChangeActions
var pageStatusDataStore = window.pageStatusDataStore

export default class DVMAPanel extends React.Component{



	CloseCard(){

        var currentStatus = pageStatusDataStore.getCurrentStatus();

        displayAreaChangeActions.displayAreaRemoveCardAction(currentStatus, this.props.card.id);

	}

 componentDidMount() {

      setCardDragable(ReactDOM.findDOMNode(this));     
      handleFocus(ReactDOM.findDOMNode(this));   
    }

	render() {	

		const {card} = this.props;
		var displaydata = card.dvmanalysis.map((dvmana)=>{
			if(dvmana.category=="RET")
				return  <div><h3>Retention Time:</h3><InputNumber min={12} max={999} defaultValue={parseInt(dvmana.factor_name)}></InputNumber></div>
         	else if(dvmana.category =="TBL")
         		return <TableForm card={dvmana}></TableForm>
         	else if(dvmana.category == "STA")
         		return <StrategyForm card={dvmana} />
		});
    	
    	return (
        
       <Card  className="strategyCard aligncenter"  title="DVM Strategy " extra={<Icon type="cross" onClick = {this.CloseCard.bind(this)} />}>
    		{	displaydata }
        </Card>

      );

	}

}
