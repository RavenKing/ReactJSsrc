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
//去重
	var data ={
		TBL:[],
		STRATEGY:[],
		RET:0 
	}
//分类

	for(var onerow of card.dvmanalysis)
	{
   		if(onerow.category == "TBL")
		{
		var liveornot	= false
 		data.TBL.filter((one)=>{if(one.factor_name == onerow.factor_name)liveornot= true;})
		if(!liveornot)
			data.TBL.push(onerow);
		}
		else if(onerow.category=="STA")
		{
		var liveornot= false
 		data.STRATEGY.filter((one)=>{if(one.factor_name == onerow.factor_name)liveornot= true;});
		if(!liveornot)
		data.STRATEGY.push(onerow)
		}
		else if(onerow.category=="RET")
		data.RET=parseInt(onerow.factor_name)
		
	}
	console.log(data);

		var displaydata;
		/*= card.dvmanalysis.map((dvmana)=>{
			if(dvmana.category=="RET")
				return  <div><h3>Retention Time:</h3><InputNumber min={12} max={999} defaultValue={parseInt(dvmana.factor_name)}></InputNumber></div>
        */ 	
          	/*         	else if(dvmana.category == "STA")
         		return <StrategyForm card={dvmana} />
		});*/
        var tableview = data.TBL.map((one)=><TableForm card={one} />);

       	var strategyview = data.STRATEGY.map((one)=><StrategyForm card={one} />);

       var retenview = <div><h3>Retention Time:</h3><InputNumber min={12} max={999} defaultValue={parseInt(data.RET)}></InputNumber></div>;
    	
    	return (
        
       <Card  className="strategyCard aligncenter"  title="DVM Strategy " extra={<Icon type="cross" onClick = {this.CloseCard.bind(this)} />}>
    		{	tableview }
    		{ strategyview}
    		{ retenview }
        </Card>

      );

	}

}
