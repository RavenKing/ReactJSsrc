import axios from "axios"

export function fetchArticles(){
  


    return dispatch=>{
    axios.get("http://localhost/Ped/HANAXS_TEST/services/knowledge_management.xsodata/KMDB?$format=json&$orderby=ARTICLE_ID desc&$top=5&$filter=CUSTOMER_ID eq '32326'",{
	  auth: {
    username: 'kevinyan',
    password: 'Sap12345'
 		 }
    })
    .then(function (response,err) {
        var data = response.data.d;
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











