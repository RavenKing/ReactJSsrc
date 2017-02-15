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

export default class SYSCLTCard extends React.Component {

   



    render() {
        var data = this.props.card;
        var logInfo = data.map((item)=>{
          <CardTemplate name={item.SID} description={item.CLIENT}/>
        })
        
        return (

            <div class="templatecontainer aligncenter"> 
         
                {logInfo}

            </div>

         

      );
  }
}
