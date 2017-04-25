import React from "react";
import ReactDOM from "react-dom";
import { Modal,Button,Card,Icon,Input} from "antd";
import { connect } from "react-redux";
import TableCharts from "./TableCharts";
import DvmPanel from "./DvmPanel";
import CapacityPanel from "./CapacityPanel"
import { AddCard,RemoveCard,GetBestPractice,DeleteArticle,GetRegionData,fetchArticles} from "../../Actions/KnowledgeAction";
import { setCardDragable,setAreaDropable,handleFocus} from "../../interactScript";

var pageStatusDataStore = window.pageStatusDataStore

const confirm = Modal.confirm;
const success= Modal.success;
@connect((store)=>{
    return {
        articles:store.articles,
        auth:store.auth.token
    };
    
})
export default class DetailPanel extends React.Component { 
  constructor(props)
  {
    super(props);
       // get number 
    const { display} = this.props;
    const { article } = this.props;
    const { user } = this.props.auth;
    
    var parms1 = { 
     customerid:user.CUSTOMER_ID,
     articleid : article.ARTICLE_ID,
     archobj:article.ARCHOBJ,
     industry:user.INDUSTRY,
     country:user.COUNTRY,
    }
    var parms2 = {
      articleid : article.ARTICLE_ID,
      archobj:article.ARCHOBJ,
      region:user.REGION
    }
    console.log(parms2);
    if(article.FACTOR_TYPE=="DVM")
    {this.props.dispatch(GetBestPractice(parms1));
    this.props.dispatch(GetRegionData(parms2));
    }
    let filtedAr = [];
    filtedAr.push(article);
   this.props.articles.articles.results.filter((one)=>{if(one.ARTICLE_ID==article.ARTICLE_ID) filtedAr.push(one)})

    if(filtedAr)
    this.state={
      article:filtedAr[0],
      page:1

    }
    
  }

  NavLeft(){

   
    if(this.state.page > 1){
      
      var pagenumber = this.state.page -1 ;

      this.setState({
       
        page:pagenumber
      })

    }
    
  }

  NavRight(){
 
   
    if(this.state.page < 4){

      var pagenumber = this.state.page + 1;
      
      this.setState({
       
        page:pagenumber
    })
    }
    

  }
  componentDidMount() {
    var that = this;
    setCardDragable(ReactDOM.findDOMNode(this));
    handleFocus(ReactDOM.findDOMNode(this));
    const props = this.props;
    this.interactable = setAreaDropable({

        element: ReactDOM.findDOMNode(this),
        accept: '.func-item1',
        ondrop: function(event) {
            let draggableElement = event.relatedTarget,             
                dropzoneElement = event.target;

            if(draggableElement.getAttribute('data-type') == "FUNC"){
              
                var drag_id = draggableElement.getAttribute('data-id');
                var drop_id = dropzoneElement.getAttribute('data-id');
                var x = event.dragEvent.clientX + window.scrollX;
                var y = event.dragEvent.clientY + window.scrollY;
                //edit
                if(drag_id == "2"){
                    
                    //props.dispatch(ShowEditPanel(drop_id));
                    var data = {
                      data_id:drop_id,
                      x:x,
                      y:y,
                      type:"edit"
                    };
                    props.dispatch(AddCard(data))
                    that.removeCard(true);
                }
                //delete
                else if(drag_id == "3"){    

                  confirm({
                    title: 'Do you want to delete this article?',
                    content: 'This article will not appear after your deletion',
                    onOk() {
                      var articles = props.articles.articles.results;
                      for(var i = 0;i < articles.length;i++){
                        if(articles[i].ARTICLE_ID == drop_id){

                            props.dispatch(DeleteArticle(articles[i]));
                            that.removeCard(true);
                            break;
                        }
                      }
                      
                      return new Promise((resolve) => {
                        setTimeout(resolve, 100);
                      });
                    },
        
                    onCancel() {}
                    });
                    
  
                }
                
            }
        }
  
    });
  }


    removeCard(refresh){


       if(this.props.cardItem)
    {
     var that = this;

      var currentStatus = pageStatusDataStore.getCurrentStatus();
        this.props.onClose(currentStatus, that.props.cardItem.id);
    }
      var data = {
        data_id:this.props.article.ARTICLE_ID,
        type:this.props.article.FACTOR_TYPE,
        refresh:refresh
      }
      this.props.dispatch(RemoveCard(data));      
     
    }

    render() {  
      /*var pos = {
        top: this.state.y+'px',
        left:this.state.x+'px'
      };*/
      const pos1 = {
        top:this.props.display.y+'px',
        left:this.props.display.x+'px'
      };

      var displayzone;
      if(this.props.article.FACTOR_TYPE == "DVM"){
        displayzone = (
          <div>
            <div className="leftside" onClick={this.NavLeft.bind(this)}>
              <Icon type="left" />
            </div>
            <div className="middlecontainer">  
              <DvmPanel Page={this.state.page} Article={this.state.article} />
            </div>
            <div className="rightside" onClick={this.NavRight.bind(this)}>
              <Icon type="right"/>
            </div>
          </div>
        );
      }    
      else if(this.props.article.FACTOR_TYPE == "CAP"){
        displayzone = (
          <div>
            <div className="leftside" onClick={this.NavLeft.bind(this)}>
              <Icon type="left" />
            </div>
            <div className="middlecontainer">  
              <CapacityPanel Article ={this.state.article}/>
            </div>
            <div className="rightside" onClick={this.NavRight.bind(this)}>
              <Icon type="right"/>
            </div>
          </div>
        );
      }
      else if(this.props.article.FACTOR_TYPE == "GEN"){
        console.log(this.state);
        displayzone = (
          /*<Input type="textarea" value={this.state.article.COMMENT} rows={8}/>*/
           <div>
        
            <p>{this.state.article.COMMENT}</p>        
            </div>
        )
      }
     
        console.log(this.state);


      return (
          <Card className="detail-panel" data-id={this.state.article.ARTICLE_ID} style={pos1} title={this.state.article.ARTICLE_NAM} extra={<Icon type="cross" onClick={this.removeCard.bind(this,false)} />}>
            {displayzone}
          </Card>
      );
  }
}

