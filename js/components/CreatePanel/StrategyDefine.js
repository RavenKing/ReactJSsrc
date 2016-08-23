import React from "react";
import { Button,Card,Icon,Form,Input,Checkbox,Popover } from "antd";

import { connect } from "react-redux";

import { NewArticleStepOne,SetComment,PostArticle } from "../../Actions/KnowledgeAction";

//Forms
import ArchivingForm from "./ArchivingForm";
import AvoidanceForm from "./AvoidanceForm";
import SummarizationForm from "./SummarizationForm";
import DeletionForm from "./DeletionForm";

const FormItem=Form.Item;
const CheckboxGroup = Checkbox.Group;

//back 
import BackButton from "./BackButton";

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
            
            DVM:[],
            comment:""
 	      
        }
    }

    onChange(checked){

        this.setState({
	         DVM:checked,
        })

    }

    handleChange(e){
        this.setState({
          comment:e.target.value
        });
    }

    handleClick(){
        this.props.dispatch(SetComment(this.state.comment));
        const { newArticle } = this.props.articles;
        this.props.dispatch(PostArticle(newArticle));

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
          switch(item){
            case "Archiving":
            {
              return <ArchivingForm value=""/>
            }
            case "Avoidance":
            {
              return <AvoidanceForm value=""/>
            }
            case "Summarization":
            {
              return <SummarizationForm value=""/>
            }
            case "Deletion":
            {
              return <DeletionForm value=""/>
            }
            default:{
              return ;
            }
          }

    	});



    	return (
        <div>
          <h1>Saving Potential</h1>
              <hr />
              <br />
              <Form horizontal>
                <FormItem
                  id="control-sav_est"
                  label="Estimated Saving Potential(GB):"
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 10 }}
              >
                <Input id="control-sav_est" value={this.props.saving_est} />
              </FormItem>

              <FormItem
                  id="control-sav_est_p"
                  label="Estimated Saving Potential(%):"
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 10 }}
              >
                <Input id="control-sav_est_p" value={this.props.saving_est_p}/>
              </FormItem>

                <FormItem
                  id="control-sav_act"
                  label="Actual Saving Potential(GB):"
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 10 }}
              >
                <Input id="control-sav_act" value={this.props.saving_act} />
              </FormItem>

              <FormItem
                  id="control-sav_act_p"
                  label="Actual Saving Potential(%):"
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 10 }}
              >
                <Input id="control-sav_act_p" value={this.props.saving_act_p} />
              </FormItem>               

              </Form>





        	<h1> Strategy </h1>
          <hr />
        	<div className="margin-top10">
            <div className="aligncenter margin-bottom10">
              <Popover content="75% of our customers choose Archiving">
              <div>
              <CheckboxGroup options={DVMmethod} onChange={this.onChange.bind(this)}/>
              </div>
              </Popover>
            </div>
            {
              displaypart
            }
            <hr />
            <div className="margin-top10">
              <Form horizontal >
                <FormItem
                  {...formItemLayout}
                  label="Overview Comments"
                >
                <Input type="textarea"  placeholder="Current Strategy Of your System"  onChange={this.handleChange.bind(this)}/>
                </FormItem>

                <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>

                <Button type="primary" onClick={this.handleClick.bind(this)}>Save</Button>
      
                <BackButton></BackButton>
                </FormItem>
              </Form>
            </div>
        	</div>
         
        </div>

      );
  }
}
