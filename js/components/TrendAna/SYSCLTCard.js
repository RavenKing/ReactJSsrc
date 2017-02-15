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

    constructor(props){
      
        super(props);
        this.state={
          tsvisible:true
          
        } 
    }  

    onSetUnvisible(){
      this.setState({
        tsvisible:false
      })
    }

    render() {
        var logInfo = this.props.card.logInfo;
        var selections = logInfo.map((item)=>{
          return <CardTemplate name={item.SID} description={item.CLIENT} key1 = "INIT0"/>
        })
        
        return (
            <Modal title="select system and client"
                footer= {false}
                onCancel={()=>{this.onSetUnvisible()} }  visible={this.state.tsvisible}>

                <div class="templatecontainer aligncenter">          
                  {selections}
                </div>
            </Modal>

            

         

      );
  }
}
