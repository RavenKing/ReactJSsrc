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
                            <CardTemplate name="DVM" description="Tables and Objects" key1="DVM" card = {this.props.card}/>
                            <CardTemplate name="What If " description="Tables and Objects" key1="BUSI" />
                        </div>
            break;
          case "S":
            templates = <CardTemplate name="Forcast" description="Tables and Objects" key1="CAPA"  card = {this.props.card}/>
            break;
        }
        return (

            <div class="templatecontainer aligncenter"> 
         
                {templates}

            </div>

         

      );
  }
}
