export default function reducer(state={
    articles:[],
    fetching:false,
    fetched:false,
    showMain:false,
    showCreate:false,
    editPanel:[],
    newArticle:null,
    displayPanel:[],
    error:null
    },action){
    
    switch(action.type)
    {
        
        case "FETCH_ARTICLE_FULFILLED":
        {
                    
            return {...state,fetching:false,fetched:true,articles:action.payload,}
        }
        case "SHOW_ARTICLE_MAIN":
        {
            return  {...state,showMain:true}

        }
        case "SHOW_EDIT_PANEL":
        {
            const { editPanel } = state;
            editPanel.push({article_id:action.payload,visible:true});
            return {...state,editPanel:editPanel}
        }
        case "CLOSE_EDIT_PANEL":
        {
            const { editPanel } = state;
            editPanel.map((one)=>{
                if(action.payload == one.article_id){
                    one.visible = false;
                }
            });
            return {...state,editPanel:editPanel}
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
            const { newArticle } = state;
            newArticle.currentstep = 0;
            return {...state,showCreate:false,newArticle:newArticle}
        }
        case "NEW_ARTICLE_STEP_ONE":{

           return {...state,newArticle:action.payload}

        }
        case "ADD_ONE_STEP":{
            const { newArticle } = state;
            newArticle.currentstep = newArticle.currentstep + 1 ; 
            return {...state,newArticle:newArticle}
        }

        case "BACT_ONE_STEP":
         {
                const { newArticle } = state;
                newArticle.currentstep = newArticle.currentstep - 1 ; 
         return {...state,newArticle:newArticle}



         }
         case "GET_BEST_PRACTICE":
         {
            const { articles  } = state;
            
            const { results } = articles;
            console.log("results:",results); 
            var newdata = results.filter((article)=>{ 
                if(article.ARTICLE_ID == action.payload.articleid){

                    article.bestpractice = {  
                        'AVGS': action.payload.AVGS,
                   'Retention':  action.payload.Retention
                    };
                }
                       
                return  article;
                      
            });
            
            console.log("test:");
            console.log(newdata);

            var newArticles = {};
            newArticles.results = newdata;

            return {...state,articles:newArticles};
        }
        case "GET_TOP5_TABLES":
        {
            const { newArticle } = state;
            const datas = action.payload;
            var archobj = datas[0].ARCHOBJ;
            var tables = datas.map((data)=>{

                return data.TABLENAME;
            });
            console.log(tables);
            newArticle.ARCHOBJ = archobj;
            newArticle.TABLES=tables;
            
            return {...state,newArticle:newArticle}
        } 
        case "SET_BASIC_INFO":
        {
            const { newArticle } = state;
        
            newArticle.SIZE = action.payload.size;
            newArticle.TABLESDSC = action.payload.dsc;

            return {...state,newArticle:newArticle}
        } 
        case "SET_ARTICLE_NAM_DSC":
        {
            const { newArticle } = state;
        
            newArticle.ARTICLE_NAM = action.payload.article_nam;
            newArticle.ARTICLE_DSC = action.payload.article_dsc;
           
            return {...state,newArticle:newArticle}
        }
        case "SET_SUM":
        {
            const { newArticle } = state;

            newArticle.SUMMARIZATION = action.payload;
            return {...state,newArticle:newArticle}
        }
        case "SET_ARCH":
        {
            const { newArticle } = state;

            newArticle.ARCHIVING = action.payload;
            return {...state,newArticle:newArticle}
        }
        case "SET_RETENTION":{
            const { newArticle } = state;

            newArticle.RETENTION = action.payload;
            return {...state,newArticle:newArticle}
        }
        case "SET_SAV_EST":
        {
            const { newArticle } = state;

            newArticle.SAVING_EST = action.payload;
            return {...state,newArticle:newArticle}
        }
        case "SET_SAV_EST_P":
        {
            const { newArticle } = state;

            newArticle.SAVING_EST_P = action.payload;
            return {...state,newArticle:newArticle}
        }
        case "SET_SAV_ACT":
        {
            const { newArticle } = state;

            newArticle.SAVING_ACT = action.payload;
            return {...state,newArticle:newArticle}
        }
        case "SET_SAV_ACT_P":
        {
            const { newArticle } = state;

            newArticle.SAVING_ACT_P = action.payload;
            return {...state,newArticle:newArticle}
        }
        case "SET_AVOID":
        {
            const { newArticle } = state;

            newArticle.AVOIDANCE = action.payload;
            return {...state,newArticle:newArticle}
        }
        case "SET_DEL":
        {
            const { newArticle } = state;

            newArticle.DELETION = action.payload;
            return {...state,newArticle:newArticle}
        }
        case "SET_COMMENT":
        {
            const { newArticle } = state;

            newArticle.COMMENT= action.payload;
            return {...state,newArticle:newArticle}
        }

        case "POST_ARTICLE":
        {
            const newArticle = [];
            newArticle.currentstep = 0 ; 
            return {...state,newArticle:newArticle}

        }   
           



    }
    
        return state;
}

