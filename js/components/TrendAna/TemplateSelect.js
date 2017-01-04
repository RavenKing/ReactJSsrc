import React from "react";
import { Button,Card,Icon,Modal} from "antd";

import { setAreaDropable } from "../../interactScript";

import CardTemplate from "./CardTemplate";

var global =window

var displayAreaDataStore= window.displayAreaDataStore
var pageStatusChangeActions =window.pageStatusChangeActions
var displayAreaChangeActions = window.displayAreaChangeActions
var dataPanelItemChangeActions = window.dataPanelItemChangeActions
var pageStatusDataStore = window.pageStatusDataStore
var dataPanelDataStore = window.dataPanelDataStore

export default class TemplateSelect extends React.Component {
constructor(props)
{
  super(props)
  this.state={
    category:this.props.card.category[0],
    visible:this.props.visible
  }
}
   
setItUnvisible()
{

  this.setState({
    visible:false
  })
}


    render() {
        var templates;
        switch(this.state.category){
          case "B":
            templates = <div>
                            <CardTemplate name="DVM" description="Data Volume" key1="DVM" card = {this.props.card}/>
                            <CardTemplate name="What If " description="What If Analysis" key1="BUSI"  card={this.props.card}/>
                        </div>
            break;
          case "S":
            templates = <CardTemplate name="RCA" description="Root Cause Analysis" key1="CAPA"  card = {this.props.card}/>
            break;
        }
        return (

            <div class="templatecontainer aligncenter"> 
         
                {templates}

            </div>

         

      );
  }
}
