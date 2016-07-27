import React from "react";
import { Button,Card,Icon,Form,Input} from "antd";

import { connect } from "react-redux";

import { NewArticleStepOne } from "../../Actions/KnowledgeAction";
const FormItem = Form.Item;

@connect((store)=>{    
    return {
        articles:store.articles
    };
    
})
export default class BasicInfo extends React.Component {

GoToStepFour()
{



}

    render() {

        return (
        	<div>

<Form inline onSubmit={this.handleSubmit}>
        <FormItem
          label="MKPF"
        >
          <Input placeholder="Input Table Size" />
        </FormItem>
        <FormItem
          label="Desicription"
        >
          <p className="ant-form-text" id="userName" name="userName">Header Table of material documents</p>
        </FormItem>

        <Button type="primary" htmlType="submit">Next</Button>
      </Form>


                <Button onClick={this.GoToStepFour.bind(this)}>Template</Button>
        </div>

      );
  }
}
