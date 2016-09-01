import React from "react";
import ReactDOM from "react-dom";
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon,Moda } from "antd";
const ButtonGroup = Button.Group;
import { connect } from "react-redux";

import { ForwardStep,GetTop5Tables,SetArticleNamAndDsc } from "../../Actions/KnowledgeAction";


const FormItem = Form.Item;


@connect((store)=>{    
    return {
        articles:store.articles,
        auth:store.auth.token
    };
    
})
export default class Maintain extends React.Component {

    constructor(props) {
        super(props)
        
    }

    SaveIt(){

    }

    handleChange(){

    }

    render() {
        const formItemLayout = {
          labelCol: { span: 6 },
          wrapperCol: { span: 14 },
        };

        return (
          <div>
              <Form horizontal >
                <FormItem
                  {...formItemLayout}
                  label="Customer ID"
                >
                  <p className="ant-form-text" id="userName" name="userName"></p>                  
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Type"
                >
                  <p className="ant-form-text" id="typeName" name="typeName">DVM</p>                  
                </FormItem>

                 <FormItem
                  {...formItemLayout}
                  label="Article Name:"
                >
                  <Input name="article_nam" type="text"  defaultValue="" placeholder="Type in an article name" onChange={this.handleChange.bind(this)}/>
                </FormItem>

                 <FormItem
                  {...formItemLayout}
                  label="Article Description:"
                >
                  <Input name="article_dsc" type="text"  defaultValue="" placeholder="Type in a description of the article" onChange={this.handleChange.bind(this)}/>
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="What object do you want to record"
                  validateStatus="error"
                  help="Help"
                >
                  <Input name="obj" type="text"  defaultValue="" placeholder="Type in a table name or archiving object" onChange={this.handleChange.bind(this)}/>
                </FormItem>

                <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
              

                  <ButtonGroup>
                  <Button onClick={this.SaveIt.bind(this)}>Save</Button>
                  </ButtonGroup>


        
                </FormItem>

              </Form>



          </div>

      );
    }
}
