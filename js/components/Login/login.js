import React from "react";
import { connect } from "react-redux";
import { History,Router } from "react-router";

import { Form, Input, Button, Checkbox,Col } from 'antd';
import md5 from "md5-js"

import { setAuthToken} from "../../Actions/authAction"

const FormItem = Form.Item;

@connect((store)=>{
    
    return {
      	auth:store.auth
    };
    
})
export default class Login extends React.Component {
  
    constructor(props){
      
        super(props);
    }   


    componentWillMount(){
        

        
    }// native funtion , update store 
    
    setAuth(){

        this.props.dispatch(setAuthToken(this.state));
        setTimeout(function(){
          const {auth} = this.props;
          const { token } = auth;

          console.log(token.authorized)
          if(token.authorized == true)
          {
              this.props.history.push("/")
          }

        }.bind(this),500);

    }
 
    UserChange(e){

        this.setState({
          username: e.target.value
        })
    }

    PasswordChange(e){

        this.setState({
            password: md5(e.target.value)
        })
        console.log(md5(e.target.value));
    }


    
    render() {


      const {auth} =this.props;
      const {token } = auth;
      
      return  (
      
      
          <div className="login">

            
            <p id="km-title">Knowledge Management</p>
             
           

            {token.error=="password"?"error":""}

            <Form horizontal>

              <FormItem
                label="  "
                labelCol={{ span: 9 }}
                wrapperCol={{ span: 8 }}
              >
                <Col span='4' offset="2">
                  <p className="login-label1">login</p>
                </Col>
                <Col span="4">
                  <p className="login-label1">register</p>
                </Col>
              </FormItem>

              <FormItem
                label="  "
                labelCol={{ span: 9 }}
                wrapperCol={{ span: 4 }}
                validateStatus={token.error=="username"?"error":""}
                help={token.error=="username"?token.hint:""}
              >
                <Input placeholder="UserName" onChange={this.UserChange.bind(this)}/>
              </FormItem>
              
              <FormItem
                label="  "
                labelCol={{ span: 9 }}
                wrapperCol={{ span: 4 }}
                validateStatus={token.error=="password"?"error":""}
                help={token.error=="password"?token.hint:""}
              >
                
                <Input type="password" placeholder="Password" onChange= { this.PasswordChange.bind(this)}/>             
                               
              </FormItem>
        
              <FormItem
                label="  "
                labelCol={{ span:9 }}
                wrapperCol={{ span:10 }}
              >

              <Button type="primary" id="login-btn" onClick={this.setAuth.bind(this)}>login</Button>
              
             
              </FormItem>
              
              <FormItem
                label="  "
                labelCol={{ span:9 }}
                wrapperCol={{ span:10 }}
              >
              <Col span="6">
                <Checkbox className="login-label2">remember me</Checkbox>
              </Col>
              <Col span="4">
                <p className="login-label2">Can not login?</p>
              </Col>
              
              </FormItem>
              



            </Form>
          </div>        	
      );
    }
}
