import React from "react";
import { connect } from "react-redux";
import { History,Router } from "react-router";

import { Form, Input, Button, Checkbox,Col,Tabs,Select } from 'antd';
import md5 from "md5-js"

import { setAuthToken,UserRegister,regCheck} from "../../Actions/authAction"

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

@connect((store)=>{
    
    return {
      	auth:store.auth
    };
    
})
export default class Login extends React.Component {
  
    constructor(props){
      
        super(props);
        this.state={
          tab_key:"1",
          registerData:{

            customer_id:"",
            customer_name:"",
            username:"",
            pwd1:"",
            pwd2:"",
            role:"",
            industry:"",
            country:""

        }
      }
    }   


    componentWillMount(){
        

        
    }// native funtion , update store 
    callback(key) {
      this.setState({
        tab_key:key
      });
    }
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
    CustomerIdChange(e){
      this.setState({
        customer_id:e.target.value
      })
    }
    handleChange(e){
      var value = e.target.value;
      var name = e.target.name;
      var { registerData } = this.state;
      switch(name){
        case "customer_id":{
          registerData.customer_id = value;          
          break;
        }
        case "customer_name":{
          registerData.customer_name = value;
          break;
        }
        case "username":{
          registerData.username = value;
          break;
        }
        case "pwd1":{
          registerData.pwd1 = md5(value);
          break;
        }
        case "pwd2":{
          registerData.pwd2 = md5(value);
          break;
        }
        case "country":{
          registerData.country = value;
          break;
        }
      }
      this.setState({
        registerData:registerData
      });
    }
    handleClick(){
      
      var token;
      //check customer id whether equal to ""
      if(this.state.registerData.customer_id == ""){
        token={
          authorized:false,
          error:"reg_cus",
          user:null,
          hint:"input the customer id"
        }
        this.props.dispatch(regCheck(token));
      }
      //check user name whether equal to ""
      else if(this.state.registerData.username == ""){
        token={
          authorized:false,
          error:"reg_username",
          user:null,
          hint:"input the user name"
        }
        this.props.dispatch(regCheck(token));
      }
      //check password whether equal to ""
      else if(this.state.registerData.pwd1 == ""){
        token={
          authorized:false,
          error:"reg_pwd1",
          user:null,
          hint:"input the password"
        }
        this.props.dispatch(regCheck(token));
      }
      //check confirmed password whether equal to ""
      else if(this.state.registerData.pwd2 == ""){
        token={
          authorized:false,
          error:"reg_pwd2",
          user:null,
          hint:"input the confirmed password"
        }
        this.props.dispatch(regCheck(token));
       
      }
      //check password whether equal to confirmed password
      else if(this.state.registerData.pwd1 != this.state.registerData.pwd2){
        token={
          authorized:false,
          error:"reg_pwd2",
          user:null,
          hint:"confirmed password is not equal to password"
        }
        this.props.dispatch(regCheck(token));
        
      }
      //all correct
      else{
        this.props.dispatch(UserRegister(this.state.registerData));
        this.setState({
          tab_key:"1"
        });
      }
    }
    PasswordChange(e){

        this.setState({
            password: md5(e.target.value)
        })
    }
    IndustryChange(value){
      console.log(value);
       var { registerData } = this.state;
       registerData.industry = value;
       this.setState({
        registerData:registerData
       });
    }
    
    render() {


      const {auth} =this.props;
      const {token } = auth;
      
      return  (
      
      
          <div className="login">
            <p id="km-title">Knowledge Management</p>

            <Tabs defaultActiveKey="1"  activeKey={this.state.tab_key} className="login-tab" onChange={this.callback.bind(this)}>
              <TabPane  tab="login" key="1">           

            {token.error=="password"?"error":""}

            <Form horizontal id="login-form">
              <FormItem               
    
                wrapperCol={{ span: 16 }}
                validateStatus={token.error=="customer_id"?"error":""}
                help={token.error=="customer_id"?token.hint:""}
              
              >
                
                <Input placeholder="Customer ID" onChange={this.CustomerIdChange.bind(this)}/>             
                               
              </FormItem>

              <FormItem
                wrapperCol={{ span: 16 }}
                validateStatus={token.error=="username"?"error":""}
                help={token.error=="username"?token.hint:""}
              >
                <Input placeholder="UserName" onChange={this.UserChange.bind(this)}/>
              </FormItem>
              
              <FormItem                
    
                wrapperCol={{ span: 16 }}
                validateStatus={token.error=="password"?"error":""}
                help={token.error=="password"?token.hint:""}
              >
                
                <Input type="password" placeholder="Password" onChange= { this.PasswordChange.bind(this)}/>             
                               
              </FormItem>
        
              <FormItem
                
                wrapperCol={{ span:16 }}
              >

              <Button type="primary" id="login-btn" onClick={this.setAuth.bind(this)}>login</Button>
              
             
              </FormItem>
              
              <FormItem
                
                wrapperCol={{ span:24 }}
              >
              <Col span="9">
                <Checkbox className="login-label2">remember me</Checkbox>
              </Col>
              <Col span="9">
                <p className="login-label2">Can not login?</p>
              </Col>
              
              </FormItem>             

            </Form>
              </TabPane >

              <TabPane  tab="register" key="2">
                <Form id="reg-form" horizontal>

                  <FormItem
                    label="Customer ID:"
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 12 }}
                    validateStatus={token.error=="reg_cus"?"error":""}
                    help={token.error=="reg_cus"?token.hint:""}

                    
                  >
                  <Input  name="customer_id" onChange={this.handleChange.bind(this)}/>
                  </FormItem>

                   <FormItem
                    label="Customer Name:"
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 12 }}
                    
                  >
                  <Input name="customer_name" onChange={this.handleChange.bind(this)}/>
                  </FormItem>

                   <FormItem
                    label="User Name:"
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 12 }}
                    validateStatus={token.error=="reg_username"?"error":""}
                    help={token.error=="reg_username"?token.hint:""}
                    
                  >
                  <Input  name="username" onChange={this.handleChange.bind(this)}/>
                  </FormItem>

                   <FormItem
                    label="Password:"
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 12 }}
                    validateStatus={token.error=="reg_pwd1"?"error":""}
                    help={token.error=="reg_pwd1"?token.hint:""}
                    
                  >
                  <Input type="password" name="pwd1" onChange={this.handleChange.bind(this)}/>
                  </FormItem>

                  <FormItem
                    label="Confirm Password:"
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 12 }}
                    validateStatus={token.error=="reg_pwd2"?"error":""}
                    help={token.error=="reg_pwd2"?token.hint:""}
                    
                  >
                  <Input type="password" name="pwd2" onChange={this.handleChange.bind(this)}/>
                  </FormItem>

                   <FormItem
                    label="Industry:"
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 12 }}
                    
                  >
                  <Select showSearch
                    placeholder="please select industry"                   
                    onChange={this.IndustryChange.bind(this)}                    
                    
                  >
                    <Option value="AUTO">AUTO</Option>
                    <Option value="RETAIL">RETAIL</Option>
                    <Option value="POWER">POWER</Option>
                    <Option value="MANUFACTORY">MANUFACTORY</Option>
                    <Option value="HIGH-TECH">HIGH-TECH</Option>
                    <Option value="UTILITY">UTILITY</Option>
                    <Option value="BANK">BANK</Option>
                  </Select>
                  </FormItem>

                   <FormItem
                    label="Country:"
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 12 }}
                    
                  >
                  <Input  name="country" onChange={this.handleChange.bind(this)}/>
                  </FormItem>

                  
                   
                  <Button type="primary" id="reg-btn" onClick={this.handleClick.bind(this)}>Register</Button>
                 
                 
                  </Form>
                  </TabPane>
              </Tabs>

            
            
          </div>        	
      );
    }
}
