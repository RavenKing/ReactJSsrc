import React from "react";
import { Button,Form,Input,InputNumber } from "antd";



const FormItem=Form.Item;

export default class RetentionForm extends React.Component { 

    
    render() {	

      const formItemLayout = {
          labelCol: { span: 6 },
          wrapperCol: { span: 10 }
      };
    
    	
    	return (
        
        <div className="margin-top10 ">
          <h3 className="margin-top10 aligncenter">Retention Time</h3>
          <Form horizontal >
        
          <FormItem
            {...formItemLayout}
            label="Retention Time"
          >
          <div>
              <InputNumber min={12} max={999} defaultValue={12}/><p className="ant-form-text" >Month</p>
          </div>
         
          </FormItem>

          </Form>

          

        </div>

      );
  }
}
