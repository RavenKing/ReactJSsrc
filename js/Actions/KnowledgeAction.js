import axios from "axios"

export function fetchArticles(){
  


    return dispatch=>{
    axios.get("http://localhost/Ped/HANAXS_TEST/services/knowledge_management.xsodata/KMDB?$format=json&$orderby=ARTICLE_ID desc&$top=5",{
	  auth: {
    username: 'kevinyan',
    password: 'Sap12345'
 		 }
    })
    .then(function (response,err) {
        dispatch({type:"FETCH_ARTICLE_FULFILLED",payload:response.data})    
  })
  
    }
    
    
}