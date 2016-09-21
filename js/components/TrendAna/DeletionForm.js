import React from "react";
import { Button,Card,Icon,Form,Input } from "antd";



const FormItem=Form.Item;

export default class DeletionForm extends React.Component { 
   
   
    render() {	
      const formItemLayout = {
          labelCol: { span: 6 },
          wrapperCol: { span: 16 },
      };
    
    	
    	return (
        
        <div className="margin-top10 ">
          <h3 className="margin-top10 aligncenter"> Deletion Strategy</h3>
          <Form horizontal >
        
        
          <FormItem
            {...formItemLayout}
            label="Deletion"
          >
          <Input type="textarea" placeholder="Current Strategy Of your System" />
          </FormItem>

       
          </Form>
         
        </div>

      );
  }
}
