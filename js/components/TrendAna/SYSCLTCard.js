import React from "react";
import { Button,Card,Icon,Modal,Form,Input} from "antd";

import { setAreaDropable } from "../../interactScript";

import CardTemplate from "./CardTemplate";
import {AddSystem} from "../../Actions/authAction";
const FormItem=Form.Item;
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
          title:"select system and client",
          action:"select",
          tsvisible:true
          
        } 
    }  
    addAction(){
      this.setState({
        title:"add system and client",
        action:"add",
      })
    }
    addSystem(){
      var sid = this.refs.sid.refs.input.value;
      var client = this.refs.clt.refs.input.value;
      var valid = true;
      if(!sid || !client){
        valid = false;
        const modal = Modal.warning({
          title:'Warning!',
          content:"System ID and Client Should Not Be Empty!"
        })
      }
      if(valid && sid.length != 3){
        valid = false;
        const modal = Modal.warning({
              title: 'Warning! ',
              content: 'The System ID is not valid!'
          });
      }
      if(valid && (client.length != 3 || isNaN(client) )){
        valid = false;
        const modal = Modal.warning({
              title: 'Warning! ',
              content: 'The client is not valid!'
          });
      }
      if(valid){
        var logInfo = pageStatusDataStore.getCustomerID();
        var data = {
          CUSTOMER_ID:logInfo.CUSTOMER_ID,
          SID:sid.toUpperCase(),
          CLIENT:client
        }
        var pageStatus = {
          pageName:"INIT0",
          sid:"",
          client:"" 
                 }
        //this.props.dispatch(AddSystem(data));
        displayAreaChangeActions.displayAreaChangeCardAction(pageStatus,data,this.props.card.id);
        const modal = Modal.success({
          title:'Successfully!',
          content:'New System Added Successfully!'
        })
        this.setState({
          action:"select"
        })
      }
    }
    onSetUnvisible(){
      this.setState({
        tsvisible:false
      })
    }

    render() {
        var modalContent;
        if(this.state.action == "select"){
          var logInfo = this.props.card.logInfo;
          var selections = logInfo.map((item)=>{
            return <CardTemplate name={item.SID} description={item.CLIENT} key1 = "INIT0"/>
          })

          modalContent = <div class="templatecontainer aligncenter">          
                            {selections}
                            <div className="addBtn">
                            <Button icon="plus" size={20} onClick={this.addAction.bind(this)}>Add System</Button>
                            </div>                
                          </div>
        }
        else{
          const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 18 }
          };
          modalContent = <div>
                            <Form horizontal>
                              <FormItem
                              {...formItemLayout}
                              label="System ID:"
                              >
                              <Input ref="sid" placeholder="System ID" />
                              </FormItem>

                              <FormItem
                              {...formItemLayout}
                              label="Client:"
                              >
                              <Input ref="clt" placeholder="Client" />
                              </FormItem>
                            </Form>

                            <div className="aligncenter">
                              <Button type="primary" onClick={this.addSystem.bind(this)}>Add</Button>
                            </div>
                              

                            
                          </div>
        }
        
        
        return (
            <Modal title={this.state.title}
                footer= {false}
                onCancel={()=>{this.onSetUnvisible()} }  visible={this.state.tsvisible}>
                {modalContent}
                
            </Modal>

            

         

      );
  }
}
