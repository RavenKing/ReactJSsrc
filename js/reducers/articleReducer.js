export default function reducer(state={
    articles:[],
    fetching:false,
    fetched:false,
    showMain:false,
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


    }
    
        return state;
}
