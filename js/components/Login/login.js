import React from "react";
import { connect } from "react-redux";
import { History,Router } from "react-router";

import { Form, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
import md5 from "md5-js"

import { setAuthToken} from "../../Actions/authAction"


@connect((store)=>{
    
    return {
      	auth:store.auth
    };
    
})
export default class Login extends React.Component {
  constructor(props)
  {
      super(props)
  }   


    componentWillMount(){
        

        
    }// native funtion , update store 
setAuth()
{

  this.props.dispatch(setAuthToken(this.state))
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
  console.log(md5(e.target.value))

 }


    
    render() {


      const {auth} =this.props;
      const {token } = auth;
        return  (
      
      
  <div>
      {token.error=="password"?"error":""}

        <Form inline >
        <FormItem
          label="账户"
          validateStatus={token.error=="username"?"error":""}
          help={token.error=="username"?token.hint:""}
        >
          <Input placeholder="请输入账户名"
          onChange={this.UserChange.bind(this)}
          />
        </FormItem>
        <FormItem
          label="密码"
          validateStatus={token.error=="password"?"error":""}
          help={token.error=="password"?token.hint:""}
        >
          <Input type="password" placeholder="请输入密码"
    onChange= { this.PasswordChange.bind(this)}
          />
        </FormItem>
        <FormItem>
          <Checkbox >记住我</Checkbox>
        </FormItem>
        <Button type="primary" onClick={this.setAuth.bind(this)}>登录</Button>
      </Form>
</div>        	
      );
  }
}
