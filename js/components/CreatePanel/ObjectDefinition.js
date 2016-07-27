import React from "react";
import {  Form, Input, Button, Checkbox, Radio, Tooltip, Icon,notification  } from "antd";

import { connect } from "react-redux";

import { ForwardStep } from "../../Actions/KnowledgeAction";


const FormItem = Form.Item;


@connect((store)=>{    
    return {
        articles:store.articles
    };
    
})
export default class ObjectDefinition extends React.Component {


GoToStepThree()
{



this.props.dispatch(ForwardStep());
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
          <Button type="primary" onClick={this.GoToStepThree.bind(this)}>Check</Button>
        </FormItem>
      </Form>
        </div>

      );
  }
}
