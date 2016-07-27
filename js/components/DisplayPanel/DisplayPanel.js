import React from "react";
import ReactDOM from "react-dom";
import { Button,Card,Icon } from "antd";
import { Link } from "react-router";
import MainPanel from "./MainPanel";
import DetailPanel from "./DetailPanel";
import { ShowMainPanel } from "../../Actions/KnowledgeAction";
import { connect } from "react-redux";
import {setAreaDropable} from "../../interactScript";
import { AddCard }  from "../../Actions/KnowledgeAction";



@connect((store)=>{    
    return {
        articles:store.articles
    };
    
})
export default class DisplayPanel extends React.Component {   
   

    CloseMainCard(){

      this.props.dispatch(ShowMainPanel());

    }

    componentDidMount(){

      //console.log("this.props:",this.props);
      var props = this.props;

      this.interactable = setAreaDropable({
        
        element: ReactDOM.findDOMNode(this),
        accept: '.data-item, .data-block,.tile',
        ondrop: function(event) {
          let draggableElement = event.relatedTarget;
          console.log("draggableElement",draggableElement);
          switch(draggableElement.getAttribute('data-type')){
            case "ITEM":
            {
              alert("item drag");
              props.dispatch(AddCard(draggableElement.getAttribute('article-id')));
              break;
            }
            case "TITLE":
            {
              alert("title alert");
              props.dispatch(ShowMainPanel());
              break;
            }
            case "MENU":
            {
              alert("menu alert");
              props.dispatch(AddCard( draggableElement.getAttribute('article-id')));
              break;            
            }
            default:
                ;
          }
          
              
          }
      });

    }

    componentWillMount(){         

    }

    render() {

      // show or close Main Panel
      const { articles } = this.props;
      var DisplayMain;
      var test;
      test = articles;
      if(test.showMain === true)
      {
        var array = test.articles;
      	const { results } = array;
    		DisplayMain = <MainPanel results={ results } />
      }
    	else
    	{

    		DisplayMain = <div></div>

      }
      console.log("displaymain:",DisplayMain);

      // show or close Detail Panels 
      const { displayPanel } = articles ;
      console.log("displayPanel:",displayPanel);
      var detaildisplay;
      detaildisplay = displayPanel.map((displayone)=>{  
        if(displayone.visible==true)
        {
          console.log("DetailPanel:",<DetailPanel articlenumber={displayone.article}/>);
            return (
              
                <DetailPanel articlenumber={displayone.article}/>)
            
              
        }
        else { 
          return <div></div>
        }

      })
      console.log("detaildisplay:",detaildisplay);

      return (
        
        <div>
          { DisplayMain }
   
          { detaildisplay }

        </div>
      );
    }
}
