import React from "react";
import { Button,Card,Icon,Form,Input } from "antd";



const FormItem=Form.Item;

var displayAreaChangeActions = window.displayAreaChangeActions
var pageStatusDataStore = window.pageStatusDataStore
export default class DeletionForm extends React.Component { 
   
   
     componentWillMount(){
      var item = this.props.card;
      this.setState({
        text:item.factor_info
      });
    }
    CloseCard(){
        var currentStatus = pageStatusDataStore.getCurrentStatus();

        displayAreaChangeActions.displayAreaRemoveCardAction(currentStatus, this.props.card.id);
    }
    render() {  

      const formItemLayout = {
          labelCol: { span: 3 },
          wrapperCol: { span: 18 }
      };
    
      
      return (
        
       <Card className="strategyCard aligncenter" title="DVM Strategy -- Deletion" extra={<Icon type="cross" onClick = {this.CloseCard.bind(this)}/>}>
          <Form horizontal >

            <FormItem
              {...formItemLayout}
              label=" "
            >
            <Input type="textarea" defaultValue={this.state.text} placeholder="Current Strategy Of your System" />
            </FormItem>

          </Form>
          <Button type="primary">Save</Button>
        </Card>

      );
  }
}
