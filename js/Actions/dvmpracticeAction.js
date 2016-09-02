import axios from "axios";



export function GetAlltheDVM(user){
    return dispatch=>{
    axios.get("http://10.97.144.117:8000/SmartOperations/services/articleContent.xsjs?customerId=",{
       headers:{
        'X-My-Custom-Header': 'Header-Value',
        'content-type':'application/json'
        },
    auth: {
    username: 'zengheng',
    password: 'Sap12345'
     }
    })
    .then(function (response,err) {
        var data = response.data;
        dispatch({type:"FETCHDVM",payload:data})    
  })
  
    }
    
    
}