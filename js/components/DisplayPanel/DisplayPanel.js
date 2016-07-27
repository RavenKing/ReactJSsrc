import React from "react";
import { Button,Card,Icon } from "antd";
import { Link } from "react-router";
import MainPanel from "./MainPanel";
import DetailPanel from "./DetailPanel";
import CreatePanel from "../CreatePanel/CreatePanel";


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
    detaildisplay = displayPanel.map((displayone)=>{  if(displayone.visible==true)
                                                   {
                                                    return <h1><DetailPanel articlenumber={displayone.article}></DetailPanel></h1> 
                                                   }
                                                   else { return <div></div>}
                                                  } )
 

    


   return (
     <div>
     
		{ DisplayMain }
    { detaildisplay }
    { createpanel  }
    </div>
      );
  }
}
