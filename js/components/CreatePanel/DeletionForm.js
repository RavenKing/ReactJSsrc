import React from "react";
import { Button,Card,Icon,Form,Input,Checkbox,InputNumber,Popover } from "antd";

import { connect } from "react-redux";

import { SetDeletion } from "../../Actions/KnowledgeAction";


const FormItem=Form.Item;
const CheckboxGroup = Checkbox.Group;

@connect((store)=>{    
    return {
        articles:store.articles
    };
    
})
export default class DeletionForm extends React.Component { 
   
    handleChange(e){
      
      this.props.dispatch(SetDeletion(e.target.value));
    }

    render() {	

      const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      };
      const { newArticle } = this.props.articles;
      const Deletion = newArticle.DELETION;

    	
    	return (
        
        <div className="margin-top10 ">
        <h3 className="margin-top10 aligncenter"> Deletion Strategy</h3>
        <Form horizontal >
        
        
        <FormItem
          {...formItemLayout}
          label="Deletion"
        >
          <Input type="textarea"  defaultValue={Deletion?Deletion:""} placeholder="Current Strategy Of your System" onChange={this.handleChange.bind(this)} />
        </FormItem>

        <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
        </FormItem>
      </Form>



        </div>

      );
  }
}
