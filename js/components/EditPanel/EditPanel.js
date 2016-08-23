import React from "react";
import ReactDOM from "react-dom";
import { Form,Button,Card,Checkbox,Icon,Input} from "antd";
import { connect } from "react-redux";
import { CloseEditPanel } from "../../Actions/KnowledgeAction";
import { setCardDragable } from "../../interactScript";

import ArchivingForm from "../CreatePanel/ArchivingForm";
import AvoidanceForm from "../CreatePanel/AvoidanceForm";
import SummarizationForm from "../CreatePanel/SummarizationForm";
import DeletionForm from "../CreatePanel/DeletionForm";

const FormItem=Form.Item;
const CheckboxGroup = Checkbox.Group;

@connect((store)=>{
    return {
        articles:store.articles
    };
    
})
export default class EditPanel extends React.Component{
  constructor(props)
    {
        super(props);

        this.state={
            
            DVM:[],
            strategyTextAreas:[],
            defaultValues:[]            
        
        }
  }

	closeEdit(){
		  this.props.dispatch(CloseEditPanel(this.props.article.ARTICLE_ID));
	}
  componentWillMount(){
      
      //set default value for dvm methods and default text areas
      var defaultStrategyTextAreas = [];
      var defaultValues = [];

      //if 'Avoidance' field has been set
      if(this.props.article.AVOIDANCE){
        defaultValues.push("Avoidance");
        defaultStrategyTextAreas.push(< AvoidanceForm />);

      }
      //if 'Summarization' field has been set
      if(this.props.article.SUMMARIZATION){
        defaultValues.push("Summarization");
        defaultStrategyTextAreas.push(< SummarizationForm />);
      }
      //if 'Deletion' field has been set
      if(this.props.article.DELETION){
        defaultValues.push("Deletion");
        defaultStrategyTextAreas.push(< DeletionForm />);
      }
      //if 'ARCHIVING' field has been set
      if(this.props.article.ARCHIVING){
        defaultValues.push("Archiving");
        defaultStrategyTextAreas.push(< ArchivingForm />);
      }

      this.setState({
        //strategyTextAreas:defaultStrategyTextAreas,
        //defaultValues:defaultValues
        DVM:defaultValues
      });

  }
	componentDidMount() {

    	setCardDragable(ReactDOM.findDOMNode(this));        
	}
  onChange(checkedValues){
    this.setState({
      DVM:checkedValues
    });
  }

	render(){

    const DVM_Methods = [
         
          {label:"Avoidance",value:"Avoidance"},
          {label:"Summarization",value:"Summarization"},
          {label:"Deletion",value:"Deletion"},
          {label:"Archiving",value:"Archiving"}
      ]

      const { DVM } = this.state;    
    
      //set checked text areas
      var checkedStrategyTextAreas = DVM.map((one)=>{
      switch(one){
        case "Avoidance":{
          return < AvoidanceForm value={this.props.article.AVOIDANCE} />
        }
        case "Summarization":{
          return < SummarizationForm value={this.props.article.SUMMARIZATION}/>
        }
        case "Deletion":{
          return < DeletionForm value={this.props.article.DELETION}/>
        }
        case "Archiving":{
          return < ArchivingForm value={this.props.article.ARCHIVING}/>
        }

      }
    }); 
    




		return (
			<div>
				<Card title={"Edit Article"} extra={<Icon type="cross"  onClick={this.closeEdit.bind(this)}/>}>
      			<p>Basic Information</p>
      			<hr />
      			<br />
      			<Form horizontal>
    					<FormItem
      						id="control-article_nam"
      						label="Article Name:"
      						labelCol={{ span: 7 }}
      						wrapperCol={{ span: 10 }}
    					>
      					<Input id="control-article_nam" value={this.props.article.ARTICLE_NAM} />
    					</FormItem>

    					<FormItem
      						id="control-article_dsc"
      						label="Article Description:"
      						labelCol={{ span: 7 }}
      						wrapperCol={{ span: 10}}
    					>
      					<Input id="control-article_dsc" value={this.props.article.ARTICLE_DSC} />
    					</FormItem>

    					<FormItem
      						id="control-archobj"
      						label="Archiving Object:"
      						labelCol={{ span: 7 }}
      						wrapperCol={{ span: 10 }}
    					>
      					<Input id="control-archobj" value={this.props.article.ARCHOBJ} />
    					</FormItem>    					
    				</Form>

    				<p>Dvm Methods</p>
      			<hr />
      			<br/>
    				<div className="aligncenter margin-bottom10">
      					<CheckboxGroup options={DVM_Methods} defaultValue={this.state.DVM} onChange={this.onChange.bind(this)}/>
      			</div>

            
            { checkedStrategyTextAreas }
            
    					

    				<p>Saving Potential</p>
      				<hr />
      				<br />
      				<Form horizontal>
      					<FormItem
      						id="control-sav_est"
      						label="Estimated Saving Potential(GB):"
      						labelCol={{ span: 7 }}
      						wrapperCol={{ span: 10 }}
    					>
      					<Input id="control-sav_est" value={this.props.article.SAVING_EST} />
    					</FormItem>

    					<FormItem
      						id="control-sav_est_p"
      						label="Estimated Saving Potential(%):"
      						labelCol={{ span: 7 }}
      						wrapperCol={{ span: 10 }}
    					>
      					<Input id="control-sav_est_p" value={this.props.article.SAVING_EST_P}/>
    					</FormItem>

      					<FormItem
      						id="control-sav_act"
      						label="Actual Saving Potential(GB):"
      						labelCol={{ span: 7 }}
      						wrapperCol={{ span: 10 }}
    					>
      					<Input id="control-sav_act" value={this.props.article.SAVING_ACT} />
    					</FormItem>

    					<FormItem
      						id="control-sav_act_p"
      						label="Actual Saving Potential(%):"
      						labelCol={{ span: 7 }}
      						wrapperCol={{ span: 10 }}
    					>
      					<Input id="control-sav_act_p" value={this.props.article.SAVING_ACT_P} />
    					</FormItem>
      					

      				</Form>
      				<p>Comments</p>
      				<hr />
      				<br />
      				<Form horizontal>
      					<FormItem
      						id="control-comm"
      						label="Comment:"
      						labelCol={{ span: 7 }}
      						wrapperCol={{ span: 10 }}
    					>
      					<Input type="textarea" id="control-comm" rows="3" value={this.props.article.COMMENT}/>
    					</FormItem>
      				</Form>
      				<div  className="aligncenter" >
      					<Button type="primary">Done</Button>
      				</div>

   				</Card>
			</div>


			)
	}
}