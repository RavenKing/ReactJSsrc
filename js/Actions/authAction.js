const AUTH_SET_TOKEN = 'AUTH_SET_TOKEN'
const AUTH_DELETE_TOKEN = 'AUTH_DELETE_TOKEN'
import axios from "axios"

export function setAuthToken (parameter) {


// http://10.97.144.117:8000/SmartOperations/services/authorization.xsodata/users?$filter=USERNAME eq 'admin'
return dispatch=>{

    axios.get("http://10.97.144.117:8000/SmartOperations/services/authorization.xsodata/AUTH?$filter=USERNAME eq '"+parameter.username+"'",{
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

      		if(data[0].USERNAME == parameter.username && data[0].PASSWORD == parameter.password)
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

export function invalidateAuthToken () {
  window.localStorage.removeItem('authToken')
  return {
    type: AUTH_DELETE_TOKEN
    
  }
}