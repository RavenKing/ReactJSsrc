const AUTH_SET_TOKEN = 'AUTH_SET_TOKEN'
const AUTH_DELETE_TOKEN = 'AUTH_DELETE_TOKEN'
import axios from "axios"

export function setAuthToken (parameter) {


// http://10.97.144.117:8000/SmartOperations/services/authorization.xsodata/users?$filter=USERNAME eq 'admin'
return dispatch=>{

    axios.get("http://10.97.144.117:8000/SmartOperations/services/authorization.xsodata/users?$filter=USERNAME eq '"+parameter.username+"'",{
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
      console.log(data);
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