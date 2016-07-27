export default function reducer(state={
    articles:[],
    fetching:false,
    fetched:false,
    showMain:false,
    showCreate:false,
    newArticle:null,
    displayPanel:[],
    error:null
    },action){
    
    switch(action.type)
    {
        
        case "FETCH_ARTICLE_FULFILLED":{
                    
                    return {...state,fetching:false,fetched:true,articles:action.payload,}
                }
        case "SHOW_ARTICLE_MAIN":
        {
            return  {...state,showMain:true}

        }
        case  "CLOSE_ARTICLE_MAIN":
      { 
            return {...state,showMain:false}
      }  
        case "ADD_ARTICLE_VIEW":
        {
          const  { displayPanel } = state;
        displayPanel.push({article:action.payload , visible:true});

          return{...state,displayPanel:displayPanel}
        }
        case "REMOVE_ARTICLE_VIEW":
        {
            const { displayPanel } = state;        
            var newdata = displayPanel.filter((displayone)=>{ 
                       
                       return  displayone.article != action.payload
                      
                     })

            return {...state,displayPanel:newdata}

        }
        case "SHOW_CREATE_PANEL":
        {
        return {...state,showCreate:true}
        }
        case "CLOSE_CREATE_PANEL":{
            return {...state,showCreate:false}
        }
        case "NEW_ARTICLE_STEP_ONE":{

           return {...state,newArticle:action.payload}

        }
        case "ADD_ONE_STEP":{
                const { newArticle } = state;
                 newArticle.currentstep = newArticle.currentstep + 1 ; 
            return {...state,newArticle:newArticle}
        }



    }
    
        return state;
}
