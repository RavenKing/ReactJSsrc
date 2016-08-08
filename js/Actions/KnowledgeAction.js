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

export function ShowCreatePanel()
{

   return dispatch=>{

    dispatch({type:"SHOW_CREATE_PANEL"});
   }


}

export function CloseCreatePanel()
{
  return dispatch=>{

    dispatch({type:"CLOSE_CREATE_PANEL"});
   }
}

export function NewArticleStepOne(data)
{
  return dispatch=>{

    dispatch({type:"NEW_ARTICLE_STEP_ONE",payload:data})

  }



}

export function ForwardStep(){

  return dispatch=>{
      dispatch({type:"ADD_ONE_STEP"})

  }
}

export function BackwardStep(){

 return dispatch=>dispatch({type:"BACT_ONE_STEP"})

}

export function GetBestPractice(data){

  var customerid = data.customerid;
  
  var archobj = data.archobj;
  
  var articleid = data.articleid;
  
        
        

 return dispatch=>{
  

  /* axios.get("http://10.97.144.117:8000/SmartOperations/services/KnowledgeManagement.xsodata/SMCUST?$filter=CUSTOMER_ID eq "+customerid,{
            headers:{
              'X-My-Custom-Header': 'Header-Value',
              'content-type':'application/json'
        },
        async:false,
            auth: {
                username: 'zengheng',
                password: 'Sap12345'
            }
        }).then(function (response,err) {
            var industry = response.data.d.results[0].INDUSTRY;
            console.log("the industry is:",industry);

            axios.get("http://10.97.144.117:8000/SmartOperations/services/KnowledgeManagement.xsjs?cmd=RECOMMENDATAION&archobj=" + archobj + "&industry=" + industry,{
                headers:{
                  'X-My-Custom-Header': 'Header-Value',
                  'Content-Type': 'application/json'
                },
                async:false,
                auth: {
                  username:'zengheng',
                  password: 'Sap12345'
                }
            }).then(function(response,err){
              
              var data = response.data.results[0];
              data.articleid = articleid;
              console.log("data is",data);
              dispatch({type:"GET_BEST_PRACTICE",payload:data});

            }).catch(function(err){
              console.log(err);
            })

            
         }).catch(function(err){
          console.log(err);
        })*/


          axios.get("http://10.97.144.117:8000/SmartOperations/services/KnowledgeManagement.xsjs?cmd=RECOMMENDATAION&archobj=" + archobj + "&industry=AUTO" ,{
                headers:{
                  'X-My-Custom-Header': 'Header-Value',
                  'Content-Type': 'application/json'
                },
               
                auth: {
                  username:'zengheng',
                  password: 'Sap12345'
                }
            }).then(function(response,err){
              
              var data = response.data.results[0];
              data.articleid = articleid;
              console.log("data is",data);
              dispatch({type:"GET_BEST_PRACTICE",payload:data});

            }).catch(function(err){
              console.log(err);
            })

  
    }
}

export function GetTop5Tables(attr_nam){

  return dispatch=>{

    axios.get("http://10.97.144.117:8000/SmartOperations/services/Createarticle_test.xsjs?attr_nam="+attr_nam,{
      headers:{
        'X-My-Custom-Header':'Header-Value',
        'content-type':'application/json'
      },
      auth:{
        username:'zengheng',
        password:'Sap12345'
      }
      
    }).then(function(response,err){
      var data = response.data.results;
      console.log(data);
      dispatch({type:"GET_TOP5_TABLES",payload:data});
     
    }).catch(function(err){
      console.log(err);
    })

  }

    


}



