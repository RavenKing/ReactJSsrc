import React from "react";
import { Button,Card,Icon,Form,Input,Checkbox } from "antd";

import { connect } from "react-redux";

import { NewArticleStepOne } from "../../Actions/KnowledgeAction";


//Forms
import ArchivingForm from "./ArchivingForm";

const FormItem=Form.Item;
const CheckboxGroup = Checkbox.Group;

@connect((store)=>{    
    return {
        articles:store.articles
    };
    
})
export default class StrategyDefine extends React.Component {
 constructor(props)
 {
 	super(props)
 	this.state={
 		DVM:[]
 	}
 }

 onChange(checked){
this.setState({
	DVM:checked,
})

console.log(this.state);
 }


    render() {	

      const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    	const DVMmethod = [
    	{label:"Avoidance",value:"Avoidance",checked:true},
    	{label:"Summarization",value:"Summarization",checked:false},
    	{label:"Deletion",value:"Deletion",checked:false},
    	{label:"Archiving",value:"Archiving",checked:true}
    	]
    	const { DVM }  = this.state;
    		console.log(DVM);

    	var displaypart= DVM.map((item)=>{
    		if(item == "Archiving")
    		{
    			return <ArchivingForm></ArchivingForm>
    		}
    		return;
    	})	;



    	return (
        <div>
        	<h1> Strategy </h1>
        	<div class="margin-top10">
        	<div class="aligncenter margin-bottom10">
         <CheckboxGroup options={DVMmethod} onChange={this.onChange.bind(this)}/>
         </div>
          {
          	displaypart
          }
<hr />
<div class="margin-top10">
	  <Form horizontal >
        <FormItem
          {...formItemLayout}
          label="Overview Comments"
        >
          <Input type="textarea"  placeholder="Current Strategy Of your System" />
        </FormItem>

        <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>

      <Button type="primary" >Save</Button>
        </FormItem>
      </Form>
</div>
        	</div>
         
        </div>

      );
  }
}
