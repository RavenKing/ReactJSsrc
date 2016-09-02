export default function reducer(state={
    DVM:null
    },action){
    
    switch(action.type)
    {
        

        case "FETCHDVM":
        {
                    
            return {...state,DVM:action.payload}
        }
        case "SHOW_ARTICLE_MAIN":
        {
            return  {...state,showMain:true}

        }
        case "SHOW_EDIT_PANEL":
        {
            var { updateArticle } = state;

            updateArticle = {};
            updateArticle.article_id = action.payload;
            return {...state,showEdit:true,updateArticle:updateArticle}
        }
        
    }
        
    
        return state;
        
}



