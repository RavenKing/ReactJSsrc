const AUTH_SET_TOKEN = 'AUTH_SET_TOKEN'
const AUTH_DELETE_TOKEN = 'AUTH_DELETE_TOKEN'
import axios from "axios"
import { Modal } from 'antd';
export function setAuthToken (parameter) {


// http://10.97.144.117:8000/SmartOperations/services/authorization.xsodata/users?$filter=USERNAME eq 'admin'
return dispatch=>{
    if(!parameter.customer_id){
      var data = {
          authorized:false,
          error:"customer_id",
          hint:"input customer id",
          user:null
      };
      dispatch({type:"AUTH_SET_TOKEN",payload:data});
    }
    else{


    axios.get("http://10.97.144.117:8000/SmartOperations/services/authorization.xsodata/AUTH?$filter=USERNAME eq '"+parameter.username
      +"' and CUSTOMER_ID eq "+parameter.customer_id+"",{
      headers:{
        'X-My-Custom-Header':'Header-Value',
        'content-type':'application/json'
      },
      auth:{
        username:'zengheng',
        password:'Sap12345'
      }
      
    }).then(function(response,err){
      var data = response.data.d.results;
      console.log(parameter);
      console.log(data[0])
      if(data.length!=0)
      {

      		if(data[0].USERNAME == parameter.username &&data[0].CUSTOMER_ID == parameter.customer_id && data[0].PASSWORD == parameter.password)
      		{
      			data = {

      				authorized:true,
      				user:data[0],
      				hint:"logged"
      			}

      		}
      		else 
      		{
			       data = {

      				authorized:false,
      				error:"password",
      				hint:"incorrect password",
      				user:null
      			}
      		}
      }
      else{

        data = {
          authorized:false,
          user:null,
          error:"username",
          hint:"incorrect username",
        }

      }


      dispatch({type:"AUTH_SET_TOKEN",payload:data});
     
    }).catch(function(err){
      console.log(err);
    })

  }
  }
}

export function invalidateAuthToken () {
  window.localStorage.removeItem('authToken')
  return {
    type: AUTH_DELETE_TOKEN
    
  }
}
//check the registering data
export function regCheck(data){
  return dispatch=>{
    dispatch({type:"REG_CHECK",payload:data})
  }
}
export function UserRegister(data){
  return dispatch=>{
    var username = data.username;
    
    var customer_id = data.customer_id;
    var customer_name = data.customer_name;    
    var role = "BSC";
    var pwd = data.pwd1;
    var industry = data.industry;
    var country = data.country;
    var payload={};
    //request configuration
    var config = {
      headers:{
        'X-My-Custom-Header': 'Header-Value',
        'content-type':'application/json'
        },
      auth: {
        username: 'zengheng',
        password: 'Sap12345'
      }
    };

    //check user name whether exists
    axios.get("http://10.97.144.117:8000/SmartOperations/services/authorization.xsodata/users?$filter=USERNAME eq '"+username+"'",
      config
      ).then(function(response){
        if(response.data.d.results.length > 0){
          payload = {
            authorized:false,
            user:null,
            error:"reg_username",
            hint:"username already exists"
          }
          dispatch({type:"REG_CHECK",payload:payload});
         
        }
        else{
          axios.get("http://10.97.144.117:8000/SmartOperations/services/authorization.xsodata/users?$orderby=USER_ID desc&top=1",
          config).then(function(response){
              
              var user_id = response.data.d.results[0].USER_ID;
              user_id = Number(user_id + 1);
              user_id = user_id.toString();

              axios.post("http://10.97.144.117:8000/SmartOperations/services/authorization.xsodata/CUST",{

                      CUSTOMER_ID:customer_id,
                      CUSTOMER_NAME:customer_name,
                      INDUSTRY:industry,
                      COUNTRY:country
                    },
                    config).then(function(response){


                      axios.post("http://10.97.144.117:8000/SmartOperations/services/authorization.xsodata/users",{

                        USER_ID:user_id,
                        CUSTOMER_ID:customer_id,
                        PASSWORD:pwd,
                        USERNAME:username,
                        ROLE:role
                    },
                    config).then(function(response){             
                      payload = {
                  
                        error:"",
                        hint:""
                      }
                      dispatch({type:"REG_CHECK",payload:payload});
                      const modal = Modal.success({
                        title: 'Successfully register! ',
                        content: 'You have regitered done',
                      });

                    }).catch(function(response){
                        console.log(response);
                    })

                      
                    }).catch(function(response){
                      var message = response.data.error.message.value;
                      if(message == "Service exception: [301] unique constraint violated"){
                        payload = {
                          authorized:false,
                          user:null,
                          error:"reg_cus",
                          hint:"customer id already exists"
                        }
                        dispatch({type:"REG_CHECK",payload:payload});
                      }
                      
                    })
                
              
    
          }).catch(function(response){
            console.log(response);
          })




        }
       
      }).catch(function(response){
        console.log(response);
      })






    
}
}