import React from "react";
import { Button,Card,Icon,Form,Input,Checkbox,InputNumber } from "antd";

import { connect } from "react-redux";

import { NewArticleStepOne } from "../../Actions/KnowledgeAction";


const FormItem=Form.Item;
const CheckboxGroup = Checkbox.Group;

@connect((store)=>{    
    return {
        articles:store.articles
    };
    
})
export default class ArchivingForm extends React.Component { 

    render() {	

      const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    	
    	return (
        
        <div class="margin-top10 ">
        <h3 class="margin-top10 aligncenter"> Archiving Strategy</h3>
        <Form horizontal >
        <FormItem
          {...formItemLayout}
          label="Retention Time"
        >
         <InputNumber min={12} max={999} defaultValue={3}  /> <p className="ant-form-text" >Month</p>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Archiving"
        >
          <Input type="textarea"  placeholder="Current Strategy Of your System" />
        </FormItem>

        <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
        </FormItem>
      </Form>



        </div>

      );
  }
}
