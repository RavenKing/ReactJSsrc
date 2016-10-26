//SimOptions.js


import React from "react"

import { Slider , Modal, message,Card,Icon,Button, InputNumber, Form, Input, Row, Col} from "antd"
import OptionsForFactor from "./OptionsForFactor"
import {browserHistory } from "react-router"

var global =window

var displayAreaDataStore= window.displayAreaDataStore
var pageStatusChangeActions =window.pageStatusChangeActions
var displayAreaChangeActions = window.displayAreaChangeActions
var dataPanelItemChangeActions = window.dataPanelItemChangeActions
var pageStatusDataStore = window.pageStatusDataStore 
var dataPanelDataStore = window.dataPanelDataStore


var SimOptions = React.createClass({

  getInitialState() {
	return {
		factorArr: this.props.factorArr.slice(1),
		factorAdjArr: new Array(this.props.factorArr.slice(1).length),
		inputValue: 0
	};
  },

  
  startSim() {

  	var options = this.state.factorAdjArr;
    
    for(var i = 0; i < this.state.factorArr.length; i ++){

    	if(options[i] == null){
    		options[i] = 0;
    	}

    }

  	this.props.startSim(options);

  },

  setAdj(tblKey, adjValue) {

  	var tmpAdjArr = this.state.factorAdjArr;

  	for (var i = 0; i < tmpAdjArr.length; i ++){

  		if (tblKey == this.state.factorArr[i]){
  			tmpAdjArr[i] = adjValue;
  			this.setState({
  				factorAdjArr: tmpAdjArr
  			});
  			break;
  		}

  	}

  },
  
  render() {

  	const that = this;
    const { getFieldProps, getFieldValue } = this.props.form;

    getFieldProps('keys', {
      initialValue: that.state.factorArr,
    });
  	
    

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 12 },
    };

    const formItems = getFieldValue('keys').map((k) => {
      return (
        <Form.Item {...formItemLayout} className="optionForm" label={k} key={k}>
          <OptionsForFactor setAdj={this.setAdj} tableKey={k}/>
        </Form.Item>
      );
    });
    return (
      <Form horizontal form={this.props.form}>

        {formItems}

		<Form.Item {...formItemLayout} className="optionForm" label={'Simulate Count'} key={'SimCnt'}>
		  <Row>
		  	<Col span={16}>
            	<InputNumber size="small" min={1} max={24} defaultValue={12} onChange={this.props.setPredictCnt} />
            </Col>
            <Col span={5}>
            	<Button size="small" type="primary" onClick={this.startSim} icon="caret-right" style={{marginLeft: 15}} >Simulate</Button>
            </Col>
          </Row>
        </Form.Item>

        
      </Form>
    );
  },
});

SimOptions = Form.create()(SimOptions);

export default SimOptions;

