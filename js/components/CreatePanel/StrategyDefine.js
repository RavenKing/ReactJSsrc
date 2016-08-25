import React from "react";
import { Button,Card,Icon,Form,Input,Checkbox,Popover } from "antd";
const ButtonGroup = Button.Group;
import { connect } from "react-redux";

import { NewArticleStepOne,SetSaving,PostArticle,CloseCreatePanel } from "../../Actions/KnowledgeAction";

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
        const { newArticle } = this.props.articles;
        var saving_est = "";
        var saving_est_p = "";
        var saving_act = "";
        var saving_act_p = "";
        var comment = "";
        if( newArticle.SAVING_EST != undefined){
          saving_est = newArticle.SAVING_EST;
        }
        if(newArticle.SAVING_EST_P != undefined){
          saving_est_p = newArticle.SAVING_EST_P;
        }
        if(newArticle.SAVING_ACT != undefined){
          saving_act = newArticle.SAVING_ACT;
        }
        if(newArticle.SAVING_ACT_P != undefined){
          saving_act_p = newArticle.SAVING_ACT_P;
        }
        if(newArticle.COMMENT){
          comment = newArticle.COMMENT;
        }
 	      this.state={
            
            DVM:[],
            saving_est:saving_est,
            saving_est_p:saving_est_p,
            saving_act:saving_act,
            saving_act_p:saving_act_p,
            comment:comment
 	      
        }
    }

    onChange(checked){

        this.setState({
	         DVM:checked,
        })

    }

    handleChange(e){
      var value = e.target.value;
      var control_id = e.target.id;
      switch(control_id){
        case "control-sav_est":{
          this.setState({
              saving_est:value
          });
          break;
        }
        case "control-sav_est_p":{
          this.setState({
            saving_est_p:value
          });
          break;
        }
        case "control-sav_act":{
          this.setState({
              saving_act:value
          });
          break;
        }
        case "control-sav_act_p":{
          this.setState({
            saving_act_p:value
          });
          break;
        }
        case "control-comm":{
            this.setState({
              comment:value
            });
            break;          
        }
        

      }
      this.props.dispatch(SetSaving(this.state));
        
    }

    handleClick(){
        
        const { newArticle } = this.props.articles;
        this.props.dispatch(PostArticle(newArticle));
        this.props.dispatch(CloseCreatePanel());
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
              return <ArchivingForm />
            }
            case "Avoidance":
            {
              return <AvoidanceForm />
            }
            case "Summarization":
            {
              return <SummarizationForm />
            }
            case "Deletion":
            {
              return <DeletionForm />
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
                <Input id="control-sav_est" defaultValue={this.state.saving_est} onChange={this.handleChange.bind(this)}/>
              </FormItem>

              <FormItem
                  id="control-sav_est_p"
                  label="Estimated Saving Potential(%):"
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 10 }}
              >
                <Input id="control-sav_est_p" defaultValue={this.state.saving_est_p} onChange={this.handleChange.bind(this)}/>
              </FormItem>

                <FormItem
                  id="control-sav_act"
                  label="Actual Saving Potential(GB):"
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 10 }}
              >
                <Input id="control-sav_act"  defaultValue={this.state.saving_act} onChange={this.handleChange.bind(this)}/>
              </FormItem>

              <FormItem
                  id="control-sav_act_p"
                  label="Actual Saving Potential(%):"
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 10 }}
              >
                <Input id="control-sav_act_p"  defaultValue={this.state.saving_act_p} onChange={this.handleChange.bind(this)}/>
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
                  id="control-comm"
                  {...formItemLayout}
                  label="Overview Comments"
                >
                <Input id="control-comm" type="textarea"  defaultValue={this.state.comment} placeholder="Current Strategy Of your System"  onChange={this.handleChange.bind(this)}/>
                </FormItem>

                <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>

            <ButtonGroup>
            <BackButton/>
            <Button type="primary" onClick={this.handleClick.bind(this)}>Save <Icon type="right" />
            </Button>
            </ButtonGroup>

            </FormItem>
              </Form>
            </div>
        	</div>
         
        </div>

      );
  }
}
