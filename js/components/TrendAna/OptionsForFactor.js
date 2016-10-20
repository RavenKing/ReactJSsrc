//OptionsForFactor.js

import React from "react"

import { Slider , Modal, message,Card,Icon,Button, InputNumber, Form, Input, Row, Col} from "antd"

import {browserHistory } from "react-router"

var global =window

var displayAreaDataStore= window.displayAreaDataStore
var pageStatusChangeActions =window.pageStatusChangeActions
var displayAreaChangeActions = window.displayAreaChangeActions
var dataPanelItemChangeActions = window.dataPanelItemChangeActions
var pageStatusDataStore = window.pageStatusDataStore
var dataPanelDataStore = window.dataPanelDataStore


const OptionsForFactor = React.createClass({
  getInitialState() {
    return {
      inputValue: 0,
    };
  },
  onChange(value) {
    this.setState({
      inputValue: value,
    });
    this.props.setAdj(this.props.tableKey, value);
  },
  tipFomatter(value) {
  	return value + '%';
  },
  render() {
    return (
      <Row>
        <Col span={16}>
          <Slider tipFormatter={this.tipFomatter} min={-30} max={30} defaultValue={0} onChange={this.onChange} step={5} value={this.state.inputValue} />
        </Col>
        <Col span={4}>
          <InputNumber size="small" min={-30} max={30} defaultValue={0} step={5} style={{ marginLeft: '16px' }}
            value={this.state.inputValue} onChange={this.onChange}
          />
        </Col>
      </Row>
    );
  },
});

export default OptionsForFactor;