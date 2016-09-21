import React from "react";
import { Button,Card,Icon,Form,Input} from "antd";

const FormItem=Form.Item;


export default class ArchivingForm extends React.Component {

    componentWillMount(){
      this.setState({
        text:"archiving"
      });
    }

    render() {	

        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 }
        };

    	
    	return (
        
        <div className="margin-top10 ">
        
          <h3 className="margin-top10 aligncenter">Archiving Strategy</h3>
          <Form horizontal >

            <FormItem
              {...formItemLayout}
              label="Archiving"
            >
            <Input type="textarea"  defaultValue={this.state.text} placeholder="Current Strategy Of your System" />
            </FormItem>

          </Form>
          
         
        </div>

      );
  }
}
