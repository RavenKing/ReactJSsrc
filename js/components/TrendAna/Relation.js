import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Card,Icon, Form, Input, Button, Modal } from 'antd';

import { AddRelation } from "../../Actions/KnowledgeAction";
import { setCardDragable,handleFocus } from "../../interactScript";
const FormItem = Form.Item;
var displayAreaChangeActions = window.displayAreaChangeActions
var pageStatusDataStore = window.pageStatusDataStore

@connect((store)=>{
    return {
      	articles:store.articles
    };
    
})
export default class Relation extends React.Component {
    componentDidMount() {

      setCardDragable(ReactDOM.findDOMNode(this));     
      handleFocus(ReactDOM.findDOMNode(this));   
    }  

    handleSubmit(e) {
       
        e.preventDefault();
        //get fields value
        const { getFieldsValue } = this.props.form;

        var formValues = getFieldsValue();
        var valid = true;
        if(isNaN(formValues["FACTOR"])){
          valid = false;
          const modal = Modal.warning({
              title: 'Warning! ',
              content: 'The factor should not be empty!'
          })

        }
        if(valid && (formValues["REPORT_NAME"] == undefined || formValues["RELATED_NAME"] == undefined)){
           valid = false;
           const modal = Modal.warning({
              title: 'Warning! ',
              content: 'The name of reports should not be empty!'
          })
        }
        if(valid){
          this.props.dispatch(AddRelation(formValues));
        }
    }
    CloseCard() {
        var currentStatus = pageStatusDataStore.getCurrentStatus();

        displayAreaChangeActions.displayAreaRemoveCardAction(currentStatus, this.props.card.id);

    }
   
    render() {
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 14 }
        };
        const { getFieldProps } = this.props.form;
        return (
          <div className="relatedCard">
            <Card title="Add Related Reports" extra={<Icon type="cross" onClick = {this.CloseCard.bind(this)}/>}>
            <Form horizontal onSubmit={this.handleSubmit.bind(this)} >

              <FormItem          
              {...formItemLayout}
              label="Report Name:"
              >
              <Input placeholder="report name"
              {...getFieldProps('REPORT_NAME')}
              />             
              </FormItem>

              <FormItem
              {...formItemLayout}
              label="Related Report Name:"
              >
              <Input placeholder="related report name"
              {...getFieldProps('RELATED_NAME')}
              />
              </FormItem>              
              
              <FormItem                
              {...formItemLayout}
              label="Factor:"
              >
              <Input placeholder="factor" 
              {...getFieldProps('FACTOR')}
              />                             
              </FormItem>
            
             
              <div className="aligncenter">
              <Button type="primary" htmlType="submit">Add</Button>
              </div>
              </Form>
            </Card>
          </div>
            
             	
      );
    }
}
Relation = Form.create()(Relation);