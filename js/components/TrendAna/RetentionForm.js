import React from "react";
import ReactDOM from "react-dom";
import { Button,Form,Input,InputNumber,Card,Icon } from "antd";
import { setCardDragable,handleFocus } from "../../interactScript";

const FormItem=Form.Item;

var displayAreaChangeActions = window.displayAreaChangeActions
var pageStatusDataStore = window.pageStatusDataStore

export default class RetentionForm extends React.Component { 

    componentWillMount(){
      var item = this.props.card;
      this.setState({
        text:item.factor_name
      });
    }
    componentDidMount() {

      setCardDragable(ReactDOM.findDOMNode(this));     
      handleFocus(ReactDOM.findDOMNode(this));   
    }
    CloseCard(){
        var currentStatus = pageStatusDataStore.getCurrentStatus();

        displayAreaChangeActions.displayAreaRemoveCardAction(currentStatus, this.props.card.id);
    }
    render() {	

      const formItemLayout = {
          labelCol: { span: 5 },
          wrapperCol: { span: 16 }
      };
    
    	
    	return (
        
        <Card style={this.props.card.style} className="strategyCard aligncenter" title="Retention Time" extra={<Icon type="cross" onClick = {this.CloseCard.bind(this)}/>}>
          <Form horizontal >
        
          <FormItem
            {...formItemLayout}
            label=" "
          >
          <div>
              <InputNumber min={12} max={999} defaultValue={this.state.text}/><p className="ant-form-text" >Month</p>
         
          </div>
          </FormItem>
          </Form>
          <Button type="primary">Save</Button>
        </Card>

      );
  }
}
