import React from "react";
import ReactDOM from "react-dom";
import { Button,Card,Icon } from "antd";
import { Link } from "react-router";
import MainPanel from "./MainPanel";
import DetailPanel from "./DetailPanel";
import CreatePanel from "../CreatePanel/CreatePanel";
import { setAreaDropable } from "../../interactScript";

import { AddCard }  from "../../Actions/KnowledgeAction";
import { ShowMainPanel } from "../../Actions/KnowledgeAction";

import { connect } from "react-redux";

@connect((store)=>{    
    return {
        articles:store.articles
    };
    
})
export default class DisplayPanel extends React.Component {   
   

   CloseMainCard(){

      this.props.dispatch(ShowMainPanel());

   }

   componentDidMount() {

      const props = this.props;
      console.log("display panel did mount,and props is:",props);
      this.interactable = setAreaDropable({

          element: ReactDOM.findDOMNode(this),
          accept: '.data-item, .data-block',
          ondrop: function(event) {
              let draggableElement = event.relatedTarget;
              console.log("draggableElement",draggableElement);
              switch(draggableElement.getAttribute('data-type')){
              case "ITEM":
              {
                  //alert("item drag");
                  props.dispatch(AddCard(draggableElement.getAttribute('data-id')));
                  break;
              }
              case "TITLE":
              {
                  //alert("title alert");
                  props.dispatch(ShowMainPanel());
                  break;
              }
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

  componentWillUnmount() {
      this.interactable.unset();
      this.interactable = null;
      
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
    		DisplayMain = <MainPanel results={ results } ></MainPanel>
      }
    	else
    	{

    		DisplayMain = <div></div>
      }

      var createpanel;
      if(test.showCreate == true) 
      {

        createpanel = <CreatePanel></CreatePanel>
      }
      else{
         
      createpanel = <div></div>

      }
// show or close Detail Panels 
    const { displayPanel } = articles ;
     var detaildisplay;
    detaildisplay = displayPanel.map((displayone)=>{  
      if(displayone.visible==true)
      {
        return <h1><DetailPanel articlenumber={displayone.article}></DetailPanel></h1> 
      }
      else { return <div></div>}
      } )
 

    


   return (
     <div className="display-panel">
     
		{ DisplayMain }
    { detaildisplay }
    { createpanel  }
    </div>
      );
  }
}
