import React from "react";
import ReactDOM from "react-dom";
import { Form,Button,Card,Checkbox,Icon,Input} from "antd";
import { connect } from "react-redux";
import { CloseEditPanel } from "../../Actions/KnowledgeAction";
import { setCardDragable } from "../../interactScript";

const FormItem=Form.Item;


@connect((store)=>{
    return {
        articles:store.articles
    };
    
})
export default class EditPanel extends React.Component{
	closeEdit(){
		this.props.dispatch(CloseEditPanel(this.props.article_id));
	}
	componentDidMount() {
    	setCardDragable(ReactDOM.findDOMNode(this));
	}

	render(){
		
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
      					<Input id="control-article_nam" value={this.props.article_nam} />
    					</FormItem>

    					<FormItem
      						id="control-article_dsc"
      						label="Article Description:"
      						labelCol={{ span: 7 }}
      						wrapperCol={{ span: 10}}
    					>
      					<Input type="text" id="control-article_dsc" value={this.props.article_dsc} />
    					</FormItem>

    					<FormItem
      						id="control-archobj"
      						label="Archiving Object:"
      						labelCol={{ span: 7 }}
      						wrapperCol={{ span: 10 }}
    					>
      					<Input type="text" id="control-archobj" value={this.props.archobj} />
    					</FormItem>    					
    				</Form>

    				<p>Dvm Methods</p>
      				<hr />
      				<br/>
    				<div className="aligncenter">
      					<Checkbox className="ant-checkbox-inline">Archiving</Checkbox>
      					<Checkbox className="ant-checkbox-inline">Deletion</Checkbox>
      					<Checkbox className="ant-checkbox-inline">Avoidance</Checkbox>
      					<Checkbox className="ant-checkbox-inline">Summarization</Checkbox>
      				</div>
    					

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
      					<Input type="textarea" id="control-comm" rows="3" value={this.props.comment}/>
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