import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Button,Card,Icon,Form,Input,Row,Col,InputNumber} from "antd";
import { setCardDragable,handleFocus } from "../../interactScript";
import { PostArticle } from "../../Actions/KnowledgeAction";
const FormItem=Form.Item;

var displayAreaChangeActions = window.displayAreaChangeActions
var pageStatusDataStore = window.pageStatusDataStore
var dataPanelDataStore = window.dataPanelDataStore

@connect((store)=>{    
    return {
        articles:store.articles,
        auth:store.auth.token

    };
    
})

export default class SaveArticle extends React.Component {

    componentDidMount() {

      setCardDragable(ReactDOM.findDOMNode(this));     
      handleFocus(ReactDOM.findDOMNode(this));   
    }
    handleSubmit(e) {
        const { values } = this.props.card;
        console.log(this.props);
        e.preventDefault();
        //get fields value
        const { getFieldsValue } = this.props.form;

        console.log('收到表单值：', getFieldsValue());
        var formValues = getFieldsValue();
        //to valid the input
        var valid = true;
      
        //check whether input the article name or not
        if(!formValues["ARTICLE_NAM"]){
          valid = false;
          console.log("input article name");
        }
        //article description
        if(formValues["ARTICLE_DSC"] == undefined){
          formValues["ARTICLE_DSC"] = "";
        }
        //saving potential
        if(formValues["SAVING_EST"] == undefined){
          formValues["SAVING_EST"] = "";
        }
        if(formValues["SAVING_EST_P"] == undefined){
          formValues["SAVING_EST_P"] = "";
        }
        if(formValues["SAVING_ACT"] == undefined){
          formValues["SAVING_ACT"] = "";
        }
        if(formValues["SAVING_ACT_P"] == undefined){
          formValues["SAVING_ACT_P"] = "";
        }
        //comment
        if(formValues["COMMENT"] == undefined){
          formValues["COMMENT"] = "";
        }
        console.log(getFieldsValue());
        //dispatch post article action
        if(valid){
            const {user} = this.props.auth;
            //add extra field to formValues
            formValues.CUSTOMER_ID = user.CUSTOMER_ID;
            formValues.USERNAME = user.USERNAME;
            formValues.TABLES = values.TABLES;
            formValues.SIZE = values.SIZE;
            formValues.TABLESDSC = values.TABLESDSC;
            formValues.ARCHIVING = values.ARCHIVING;
            formValues.AVOIDANCE = values.AVOIDANCE;
            formValues.DELETION = values.DELETION;
            formValues.SUMMARIZATION = values.SUMMARIZATION;
            formValues.ARCHOBJ = values.ARCHOBJ;
            formValues.RETENTION = values.RETENTION;

            
            //post article
            this.props.dispatch(PostArticle(formValues))
        }

    }
    CloseCard(){
      
        var currentStatus = pageStatusDataStore.getCurrentStatus();

        displayAreaChangeActions.displayAreaRemoveCardAction(currentStatus, this.props.card.id);
       
    }
    render() {	

        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 18 }
        };
        const { getFieldProps } = this.props.form;
        const {setFieldsInitialValue} = this.props.form;
    	
    	return (
          
        <Card style={this.props.card.style} className="saveCard aligncenter" title="Save as Article" extra={<Icon type="cross" onClick = {this.CloseCard.bind(this)}/>}>
          <p>Basic Information</p>
          <hr />
          <br />
          <Form horizontal className="ant-advanced-search-form" onSubmit={this.handleSubmit.bind(this)}>
            <FormItem
            {...formItemLayout}
            label="Article Name"
            >
            <Input placeholder="Article Name"
            {...getFieldProps('ARTICLE_NAM')}
            />
            </FormItem>

            <FormItem
            {...formItemLayout}
            label="Article Description"
            >
            <Input placeholder="Article Description"
            {...getFieldProps('ARTICLE_DSC')}
            />
            </FormItem>
         

          <p>Saving Potential</p>
          <hr />
          <br />
         
            <FormItem
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 12 }}
            label="Estimated Saving Potential(GB)"
            >
            <Input placeholder="Estimated Saving Potential" 
            {...getFieldProps('SAVING_EST')}
            />
            </FormItem>

            <FormItem
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 12 }}
            label="Estimated Saving Potential(%)"
            >
            <Input placeholder="Estimated Saving Potential" 
            {...getFieldProps('SAVING_EST_P')}
            />
            </FormItem>

            <FormItem
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 12 }}
            label="Actual Saving Potential(GB)"
            >
            <Input placeholder="Actual Saving Potential" 
            {...getFieldProps('SAVING_ACT')}
            />
            </FormItem>

            <FormItem
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 12 }}
            label="Actual Saving Potential(%)"
            >
            <Input placeholder="Actual Saving Potential" 
            {...getFieldProps('SAVING_ACT_P')}
            />
            </FormItem>
          
            <p>Comments</p>
            <hr />
            <br />
         
            <FormItem
            {...formItemLayout}
            label="Comment"
            >
            <Input type="textarea" placeholder="Comments" 
            {...getFieldProps('COMMENT')}
            />
            </FormItem>
            
            <FormItem
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 10 }} 
            label=" "          
            >
            <Button type="primary" htmlType="submit">Save</Button>
            </FormItem>

          </Form>
        </Card>
         
      

      );
  }
}
SaveArticle = Form.create()(SaveArticle);