export default function reducer(state={
    articles:[],
    fetching:false,
    fetched:false,
    error:null
    },action){
    
    switch(action.type)
    {
        case "FETCH_TWEETS":
                { 
                 return {...state,fetching:true};
                 
                }
                case "FETCH_ARTICLE_FULFILLED":{
    
                    return {...state,fetching:false,fetched:true,articles:action.payload.d,}
                }
            
        }
    
        return state;
}