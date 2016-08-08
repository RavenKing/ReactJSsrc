import React from "react";
import ReactDOM from "react-dom";
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon,Modal  } from "antd";

import { connect } from "react-redux";

import { ForwardStep,GetTop5Tables } from "../../Actions/KnowledgeAction";

//back
import BackButton from "./BackButton";

const FormItem = Form.Item;


@connect((store)=>{    
    return {
        articles:store.articles
    };
    
})
export default class ObjectDefinition extends React.Component {

    constructor(props) {

        super(props);
        this.state={ 

          visible:false,
          obj:""

        }
    }


    GoToStepThree()
    {

        this.props.dispatch(ForwardStep());

    }

    showMessage(){

        this.props.dispatch(GetTop5Tables(this.state.obj));  

        this.GoToStepThree();
        
    }
    handleChange(e){
        console.log(e.target.value);
        this.setState({obj:e.target.value});

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
                  <p className="ant-form-text" id="userName" name="userName">32326</p>                  
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Type"
                >
                  <p className="ant-form-text" id="typeName" name="typeName">DVM</p>                  
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="What object do you want to record"
                >
                  <Input type="text"  placeholder="Type in a table name or archiving object" onChange={this.handleChange.bind(this)}/>
                </FormItem>

                <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
        
                  <Button type="primary" onClick={this.showMessage.bind(this)}>Check</Button>
        
                  <BackButton/>
                </FormItem>

              </Form>



          </div>

      );
    }
}
