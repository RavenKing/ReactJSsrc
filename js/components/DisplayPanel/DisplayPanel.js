import React from "react";
import ReactDOM from "react-dom";
import { Button,Card,Icon } from "antd";
import { Link } from "react-router";
import MainPanel from "./MainPanel";
import DetailPanel from "./DetailPanel";
import CreatePanel from "../CreatePanel/CreatePanel";
import EditPanel from "../EditPanel/EditPanel";
import { setAreaDropable } from "../../interactScript";

import { AddCard }  from "../../Actions/KnowledgeAction";

import { ShowMainPanel,ShowEditPanel,ShowCreatePanel } from "../../Actions/KnowledgeAction";
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
          accept: '.data-item, .data-block,.func-item',
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
              case "FUNC":
              {
                  var data_id = draggableElement.getAttribute('data-id');
                  if(data_id == "1"){
                      props.dispatch(ShowCreatePanel());
                  }
                  else if(data_id == "4"){
                      props.dispatch(ShowMainPanel());
                  }
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
    	if(test.showMain === true){ 

      	var array = test.articles;
      	const { results } = array;
    		DisplayMain = <MainPanel results={ results } ></MainPanel>
      }
    	else
    	{
    		DisplayMain = <div></div>
      }

      var createpanel;
      if(test.showCreate == true){

          createpanel = <CreatePanel/>
      }
      else{
         createpanel = <div></div>
      }
      //whether open edit panel
      const { editPanel } = articles;
      const { results } = articles.articles;
      var editPanels = [<div></div>];

      for(var i = 0; i < editPanel.length; i++){
          if(editPanel[i].visible == true){
            for(var j = 0;j < results.length;j++){
              if(editPanel[i].article_id == results[j].ARTICLE_ID){
                  editPanels.push(<EditPanel article_id={results[j].ARTICLE_ID} article_nam={results[j].ARTICLE_NAM} 
                  article_dsc={results[j].ARTICLE_DSC} archobj={results[j].ARCHOBJ} saving_est={results[j].SAVING_EST} 
                  saving_est_p={results[j].SAVING_EST_P} saving_act="5" saving_act_p="89" comment={results[j].COMMENT}/>);
                break;
              }
            }
          }
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
    { editPanels }
    </div>
      );
  }
}
