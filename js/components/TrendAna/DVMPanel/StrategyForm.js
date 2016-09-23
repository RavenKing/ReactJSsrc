import React from "react";
import ReactDOM from "react-dom";
import { Button,Card,Icon,Form,Input,Col,Row} from "antd";
const FormItem=Form.Item;

var displayAreaChangeActions = window.displayAreaChangeActions
var pageStatusDataStore = window.pageStatusDataStore
var dataPanelDataStore = window.dataPanelDataStore
global = window;

export default class StrategyForm extends React.Component {

    componentWillMount(){
      var item = this.props.card;
      this.setState({
        objList:item.objList,
        id:item.id,
        style:item.style
      });

    }

    render() {	

    console.log(this.props.card);
    const {card } = this.props;
    	
    	return (
          
          <div>

          <Row>
              <Col span={12}> {card.factor_name}</Col>
              <Col span={12}> <Input type="textarea" defaultValue={card.factor_info} /></Col>
          </Row>
          </div>

      );
  }
}
