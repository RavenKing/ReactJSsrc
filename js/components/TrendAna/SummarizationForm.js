import React from "react";
import { Button,Form,Input } from "antd";


const FormItem=Form.Item;

export default class SummarizationForm extends React.Component { 

    
    render() {	

      const formItemLayout = {
          labelCol: { span: 6 },
          wrapperCol: { span: 16 }
      };
    
    	
    	return (
        
        <div className="margin-top10 ">
          <h3 className="margin-top10 aligncenter">Summarization Strategy</h3>
          <Form horizontal>
          <FormItem
            {...formItemLayout}
            label="Summarization"
          >
          <Input type="textarea" placeholder="Current Strategy Of your System"/>
          </FormItem>
          </Form>

         
        </div>

      );
  }
}
