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
export function ShowEditPanel(data){
    return dispatch=>{
      dispatch({type:"SHOW_EDIT_PANEL",payload:data})
    }
}
export function CloseEditPanel(data){
    return dispatch=>{
      dispatch({type:"CLOSE_EDIT_PANEL",payload:data})
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
export function SetBasicInfo(data){
  console.log(data);
  return dispatch=>{

    dispatch({type:"SET_BASIC_INFO",payload:data});

  }
}
export function SetArticleNamAndDsc(data){
  return dispatch=>{
    dispatch({type:"SET_ARTICLE_NAM_DSC",payload:data});
  }
}
export function SetSummarization(data){
  return dispatch=>{
    dispatch({type:"SET_SUM",payload:data})
  }
}

export function SetRetention(data){
  return dispatch=>{
    dispatch({type:"SET_RETENTION",payload:data})
  }
}
export function SetSav_Est(data){
  return dispatch=>{
    dispatch({type:"SET_SAV_EST",payload:data})
  }
}
export function SetSav_Est_P(data){
  return dispatch=>{
    dispatch({type:"SET_SAV_EST_P",payload:data})
  }
}
export function SetSav_Act(data){
  return dispatch=>{
    dispatch({type:"SET_SAV_ACT",payload:data})
  }
}
export function SetSav_Act_P(data){
  return dispatch=>{
    dispatch({type:"SET_SAV_ACT_P",payload:data})
  }
}
export function SetArchiving(data){
  return dispatch=>{
    dispatch({type:"SET_ARCH",payload:data})
  }
}
export function SetAvoidance(data){
  return dispatch=>{
    dispatch({type:"SET_AVOID",payload:data})
  }
}
export function SetDeletion(data){
  return dispatch=>{
    dispatch({type:"SET_DEL",payload:data})
  }
}
export function SetComment(data){
  return dispatch=>{
    dispatch({type:"SET_COMMENT",payload:data})
  }
}
export function PostArticle(data){
  //fields in table "KMBSC"
  var tables = data.TABLES;
  var size = data.SIZE;
  var tablesDsc = data.TABLESDSC;

  //fields in table "KMHDR"
  var customer_id = 32326;
  var archobj = data.ARCHOBJ;
  var article_nam = data.ARTICLE_NAM;
  var article_dsc = data.ARTICLE_DSC;
  var create_by = "CassieLiu";

  var myDate = new Date();
  
  var year = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
  var month = myDate.getMonth() + 1;       //获取当前月份(0-11,0代表1月)
  var date = myDate.getDate();        //获取当前日(1-31)

  var create_on = year+"-"+month+"-"+date;
  console.log(create_on);
  var product = "ERP";

  //fields in table "KMDVM"
  var archiving = data.ARCHIVING;
  var deletion = data.DELETION;
  var summarization = data.SUMMARIZATION;
  var avoidance = data.AVOIDANCE;
  var retention = data.RETENTION;
  var saving_est = data.SAVING_EST;
  var saving_est_p = data.SAVING_EST_P;
  var saving_act = data.SAVING_ACT;
  var saving_act_p = data.SAVING_ACT_P;
  var comment = data.COMMENT;

  //if user does not choose the related method,set default value;
  if(archiving == undefined){
    archiving = "";
  }
  if(deletion == undefined){
    deletion = "";
  }
  if(summarization == undefined){
    summarization = "";
  }
  if(avoidance == undefined){
    avoidance = "";
  }
  if(retention == undefined){
    retention = 12;
  }
  if(saving_est == undefined){
    saving_est = 0;
  }
  if(saving_est_p == undefined){
    saving_est_p = 0
  }
  if(saving_act == undefined){
    saving_act = 0;
  }
  if(saving_act_p == undefined){
    saving_act_p = 0;
  }
  if(comment == undefined){
    comment = "";
  }
 
  return dispatch=>{
    axios.post("http://10.97.144.117:8000/SmartOperations/services/Createarticle_test.xsjs?customer_id="+ customer_id +"&tables="+ tables +"&size="
      + size + "&dsc="+ tablesDsc + "&archobj="+ archobj +"&article_nam="+ article_nam +"&article_dsc="+ article_dsc +"&create_on="+ create_on 
      +"&create_by="+ create_by + "&product="+ product +"&archiving="+ archiving +"&deletion="+ deletion +"&summarization="+ summarization +"&avoidance="
      + avoidance +"&retention="+ retention +"&saving_est="+ saving_est +"&saving_est_p="+ saving_est_p + "&saving_act="+ saving_act +"&saving_act_p="
      + saving_act_p +"&comment="+ comment,{
      headers:{
        'X-My-Custom-Header':'Header-Value',
        'content-type':'application/json'
      },
      auth:{
        username:'zengheng',
        password:'Sap12345'
      }
    }).then(function(response){
      console.log("post successfully:"+response);
      dispatch({type:"POST_ARTICLE"});
      alert("Article created successfully");
    }).catch(function(err){
      console.log(err);
    })
  }
}
export function DeleteArticle(article_id){
  return dispatch=>{
    axios.post("http://10.97.144.117:8000/SmartOperations/services/DeleteArticle.xsjs?article_id="+article_id,{
    headers:{
      'X-My-Custom-Header':'Header-Value',
      'content-type':'application/json'
    },
    auth:{
        username:'zengheng',
        password:'Sap12345'
    }
  }).then(function(response){

      var data = response.results;
      dispatch({type:"DELETE_ARTICLE",payload:data});
      
  }).catch(function(err){
      console.log(err);
  })
  
  }
}



