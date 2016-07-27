import axios from "axios"

export function fetchArticles(){
  


//http://10.128.245.87:8004/HANAXS_TEST/services/knowledge_management.xsodata/KMDB?$format=json&$orderby=ARTICLE_ID desc&$top=5&$filter=CUSTOMER_ID eq '32326'
    return dispatch=>{
    axios.get("http://10.97.144.117:8000/SmartOperations/services/articleContent.xsjs?customerId=32326",{
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
        dispatch({type:"FETCH_ARTICLE_FULFILLED",payload:data})    
  })
  
    }
    
    
}

export function ShowMainPanel()
{
return dispatch=>{

   dispatch({type:"SHOW_ARTICLE_MAIN"}) 
}

}
export function CloseMainPanel()
{

   return dispatch=>{
    dispatch({type:"CLOSE_ARTICLE_MAIN"})
   }
}

export function AddCard(data)
{

   return dispatch=>{

    dispatch({type:"ADD_ARTICLE_VIEW",payload:data})

   }

}


export function RemoveCard(data)
{

   return dispatch=>{

    dispatch({type:"REMOVE_ARTICLE_VIEW",payload:data})

   }

}










 

