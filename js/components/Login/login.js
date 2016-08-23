import React from "react";
import { connect } from "react-redux";
import md5 from "md5-js"

import { setAuthToken} from "../../Actions/authAction"


@connect((store)=>{
    
    return {
      	auth:store.auth
    };
    
})
export default class Login extends React.Component {
   
    componentWillMount(){
        
       
        
    }// native funtion , update store 
setAuth()
{
	this.props.dispatch(setAuthToken(this.state));
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

 }


    
    render() {
        return (
  <div>

     <span> User Name</span> <input type="text" onChange={this.UserChange.bind(this)}/>
     <span> Password</span> <input type="password" onChange= { this.PasswordChange.bind(this)}/>
     <button onClick = {this.setAuth.bind(this)}>Get Auth </button>

</div>        	
      );
  }
}
