import React from "react";
import ReactDOM from "react-dom";
import { Button,Card,Icon } from "antd";

import ArticleMenuTile from "./ArticleMenuTile";
import { AddCard }  from "../../Actions/KnowledgeAction";

import { CloseMainPanel } from "../../Actions/KnowledgeAction";
import { setCardDragable } from "../../interactScript";
import { setAreaDropable } from "../../interactScript";
import { connect } from "react-redux";


@connect((store)=>{    
    return {
        articles:store.articles
    };
    
})
export default class MainPanel extends React.Component {

    CloseMainCardPanel(){

      this.props.dispatch(CloseMainPanel());

    }

    componentDidMount(){
      
      setCardDragable(ReactDOM.findDOMNode(this));


      const props = this.props;
      this.interactable = setAreaDropable({

          element: ReactDOM.findDOMNode(this),
          accept: '.menu-tile',
          ondrop: function(event) {
              let draggableElement = event.relatedTarget;
              console.log("draggableElement",draggableElement);
              switch(draggableElement.getAttribute('data-type')){
              case "MENU":
              {
                  //alert("menu alert");
                  props.dispatch(AddCard( draggableElement.getAttribute('data-id')));
                  break;            
              }
              default:
                  ;
              }
              
              //props.dispatch(AddCard( props.uniquekey ));
          }
      });
  
    }

    render() {
      const { results } = this.props;

      const DisplayMain= results.map((result)=><ArticleMenuTile article_id={result.ARTICLE_ID} archobj={result.ARCHOBJ} 
        article_nam={result.ARTICLE_NAM} article_dsc={result.ARTICLE_DSC} total_size={result.TOTAL_SIZE}/>);
        
    		 

        return (
        	<div className="main-panel">
           <Card title="DVM Articles" extra={<Icon type="cross" onClick={this.CloseMainCardPanel.bind(this)} />}  >
        	{DisplayMain}
          </Card>
        </div>

      );
  }
}
