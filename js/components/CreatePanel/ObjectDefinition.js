import React from "react";
import {  Form, Input, Button, Checkbox, Radio, Tooltip, Icon,Modal  } from "antd";

import { connect } from "react-redux";

import { ForwardStep } from "../../Actions/KnowledgeAction";


const FormItem = Form.Item;


@connect((store)=>{    
    return {
        articles:store.articles
    };
    
})
export default class ObjectDefinition extends React.Component {

constructor(props) {
    super(props);
this.state={ visible:false ,}
  }


GoToStepThree()
{

this.props.dispatch(ForwardStep());
}

showMessage(){
   this.setState({
      visible: true,
    });
}
handleOk(){

this.GoToStepThree();

}
handleCancel(){
  this.setState({visible:false})
}

    render() {

      const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

        return (
        	<div>
      <Form horizontal >
        <FormItem
          {...formItemLayout}
          label="Customer ID"
        >
          <p className="ant-form-text" id="userName" name="userName">32326</p>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="What object do you want to record"
        >
          <Input type="text"  placeholder="Type in a table name or archiving object" />
        </FormItem>

        <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
        
          <Button type="primary" onClick={this.showMessage.bind(this)}>Check</Button>
        </FormItem>
      </Form>





    <Modal title="Notification" visible={this.state.visible}
          onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
        >
         The corresponding  archiving object is MM_MATBEL. Please also fill in the top 5 largest Tables.
        </Modal>

        </div>

      );
  }
}
