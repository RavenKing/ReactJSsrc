import React from "react";
import { Button,Card,Icon,Form,Input,Checkbox,InputNumber,Popover } from "antd";

import { connect } from "react-redux";

import { SetRetention,SetSav_Est,SetSav_Est_P,SetSav_Act,SetSav_Act_P,SetArchiving } from "../../Actions/KnowledgeAction";


const FormItem=Form.Item;
const CheckboxGroup = Checkbox.Group;

@connect((store)=>{    
    return {
        articles:store.articles
    };
    
})
export default class ArchivingForm extends React.Component {

    onChange(value){
      this.props.dispatch(SetRetention(value));  
    }
    

    handleChange(e){
      var name = e.target.name;
      var value = e.target.value;
      switch(name){
        case "saving_est":
        {
            if(value != ""){

              if(isNaN(value)){

                  alert("Please enter a valid number");
              }
              else{
                  this.props.dispatch(SetSav_Est(value));             
              }
          }
            
          break;
            
        }
        case "saving_est_p":
        {
            if(value != ""){

              if(isNaN(value)){

                  alert("Please enter a valid number");
              }
              else{
                this.props.dispatch(SetSav_Est_P(value));
              }
            }
            break;
        }
        case "saving_act":
        {
            if(value != ""){

              if(isNaN(value)){

                  alert("Please enter a valid number");
              }
              else{
                this.props.dispatch(SetSav_Act(value));
              }
            }
            break;
        }
        case "saving_act_p":
        { 
            if(value != ""){

              if(isNaN(value)){

                  alert("Please enter a valid number");
              }
              else{
                this.props.dispatch(SetSav_Act_P(value));
              }
            }
            break;
        }
        case "archiving":
        {
            this.props.dispatch(SetArchiving(value));
            break;
        }
      }
      
      
    }

    render() {	

      const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };

    	
    	return (
        
        <div className="margin-top10 ">
        <h3 className="margin-top10 aligncenter"> Archiving Strategy</h3>
        <Form horizontal >
        <FormItem
          {...formItemLayout}
          label="Retention Time"
        >
        <Popover content="AVG:12Month" placement="right">
        <div>
         <InputNumber name="retention" min={12} max={999} defaultValue={12}  onChange={this.onChange.bind(this)}/> <p className="ant-form-text" >Month</p>
        </div>
        </Popover>
        </FormItem>
        
        
        
         <FormItem
          {...formItemLayout}
          label="Estimated Saving Time:"
          >
         
          <Input name="saving_est" type="text" onChange={this.handleChange.bind(this)} /> 
         
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Estimated Saving Time Percent:"
        >
      
         <Input name="saving_est_p" type="text" onChange={this.handleChange.bind(this)}/>
        
        </FormItem>
      
        <FormItem
          {...formItemLayout}
          label="Actual Saving Time："
        >
        
        <Input name="saving_act" type="text" onChange={this.handleChange.bind(this)}/>
        
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Actual Saving Time Percent："
        >
      
        <Input name="saving_act_p" type="text" onChange={this.handleChange.bind(this)}/>
       
        </FormItem>
       
        <FormItem
          {...formItemLayout}
          label="Archiving"
        >
          <Input name="archiving" type="textarea"  placeholder="Current Strategy Of your System" onChange={this.handleChange.bind(this)} />
        </FormItem>

        <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
        </FormItem>
      </Form>



        </div>

      );
  }
}
