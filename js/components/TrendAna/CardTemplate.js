import React from "react";
import ReactDOM from "react-dom";
import { Button,Card,Icon } from "antd";

import { setAreaDropable } from "../../interactScript";




export default class TemplateSelect extends React.Component {

   
    componentDidMount() {

      const props = this.props;
      this.interactable = setAreaDropable({

          element: ReactDOM.findDOMNode(this),
          accept: '.function-button, .data-item,.data-block,.config-button, .function-button-nav',
          ondrop: function(event) {
              let draggableElement = event.relatedTarget;
              var x = event.dragEvent.clientX + window.scrollX;
              var y = event.dragEvent.clientY + window.scrollY;
              var data_id = draggableElement.getAttribute('data-id');
              var data = {
                x:x,
                y:y
              }
             console.log(props.key)
             alert(props.key)
              
          }
      });
    }

    ModeSelect(){

        var datatype= this.props.key1;
        var currentStatus = pageStatusDataStore.getCurrentStatus();
        if(datatype == "INIT0"){
          var nextStatus = {
            pageName:"INIT-KPI",
            sid:this.props.name,
            client:this.props.description
          };
          var data = {
            type:"KPI"            
          }
          dataPanelItemChangeActions.dataPanelAddPageAction(nextStatus);
          displayAreaChangeActions.displayAreaAddPageAction(nextStatus);
          functionPanelItemChangeActions.functionPanelAddPageAction(nextStatus);
          pageStatusChangeActions.pageStatusAddAction(nextStatus);
          displayAreaChangeActions.displayAreaAddCardAction(nextStatus,data);
          pageStatusDataStore.setLogInfo(this.props.name,this.props.description);
          /*var nextStatus = {
            pageName:"INIT",
            sid:this.props.name,
            client:this.props.description
          };         
          dataPanelItemChangeActions.dataPanelAddPageAction(nextStatus);
          displayAreaChangeActions.displayAreaAddPageAction(nextStatus);
          functionPanelItemChangeActions.functionPanelAddPageAction(nextStatus);
          pageStatusChangeActions.pageStatusAddAction(nextStatus);
          pageStatusDataStore.setLogInfo(this.props.name,this.props.description);*/
          
        }
        else{
          const { card } = this.props;
          var that = this;
          var draggableElement = event.relatedTarget,
              dropzoneElement = event.target;
          var cardId = card.id;
          var factorCate = card.category[0];
          console.log(factorCate);
          var factorName = card.FACTOR_NAME[0];
        
          if(datatype == "CAPA"){
            var nextStatus = {
              pageName:"ANALYSIS_RCA_" + factorName,
              sid:currentStatus.sid,
              client:currentStatus.client
            }

            if(!pageStatusDataStore.isStatusExisted(nextStatus)) {
                var sIntervalCallId;

                (function () {
                    var addStatus = function addStatus() {
                      if (displayAreaDataStore.isStatusExisted(nextStatus) && dataPanelDataStore.isStatusExisted(nextStatus) && functionPanelDataStore.isStatusExisted(nextStatus)) {
                        clearInterval(sIntervalCallId);
                        pageStatusChangeActions.pageStatusAddAction(nextStatus);
                      }
                    };

                    var nextData = {};

                    nextData.style = that.props.card.style;
                    nextData.type = "ITEM-ANA";
                    nextData.guidArr = that.props.card.guidArr;
                    nextData.FACTOR_NAME = that.props.card.FACTOR_NAME;
                    nextData.category = that.props.card.category;
                    
                    nextData.factor_type = that.props.card.factor_type;
                    nextData.customerId = that.props.card.customerId;
                    nextData.systemId = that.props.card.systemId;
                    nextData.systemClt = that.props.card.systemClt;


                    displayAreaChangeActions.displayAreaAddPageAction(nextStatus);
                    dataPanelItemChangeActions.dataPanelAddPageAction(nextStatus);
                    functionPanelItemChangeActions.functionPanelAddPageAction(nextStatus);
                    displayAreaChangeActions.displayAreaAddCardAction(nextStatus,nextData);//zengheng

                    sIntervalCallId = setInterval(function () {
                      addStatus();
                    }, 100);
                    ;
                  })();
                } else {
                  pageStatusChangeActions.pageStatusChangeAction(nextStatus);
                }
              }
              else if (datatype == "DVM" ){

                  var nextStatus = {
                    pageName:"ANALYSIS_DVM_" + factorName,
                    sid:currentStatus.sid,
                    client:currentStatus.client
                  } 
                  var status = pageStatusDataStore.getAllStatus();
                  if (!pageStatusDataStore.isStatusExisted(nextStatus)) {
                      var sIntervalCallId;

                      (function () {
                          var addStatus = function addStatus() {
                            if (displayAreaDataStore.isStatusExisted(nextStatus) && dataPanelDataStore.isStatusExisted(nextStatus) && functionPanelDataStore.isStatusExisted(nextStatus)) {
                              clearInterval(sIntervalCallId);
                              pageStatusChangeActions.pageStatusAddAction(nextStatus);
                            }
                          };

                          var nextData = {};

                          nextData.style = that.props.card.style;
                          nextData.type = "ITEM-ANA";
                          nextData.guidArr = that.props.card.guidArr;
                          nextData.FACTOR_NAME = that.props.card.FACTOR_NAME;
                          nextData.category = that.props.card.category;

                          nextData.factor_type = that.props.card.factor_type;
                          nextData.customerId = that.props.card.customerId;
                          nextData.systemId = that.props.card.systemId;
                          nextData.systemClt = that.props.card.systemClt;

                          displayAreaChangeActions.displayAreaAddPageAction(nextStatus, cardId);
                          dataPanelItemChangeActions.dataPanelAddPageAction(nextStatus);
                          functionPanelItemChangeActions.functionPanelAddPageAction(nextStatus);
                          displayAreaChangeActions.displayAreaAddCardAction(nextStatus,nextData);//zengheng
                          sIntervalCallId = setInterval(function () {
                              addStatus();
                          }, 100);
                          ;
                        })();
                  } else {
                    pageStatusChangeActions.pageStatusChangeAction(nextStatus);
                  }

              }
              else{

                  var nextStatus = {
                    pageName:"ANALYSIS_WIF_" + factorName,
                    sid:currentStatus.sid,
                    client:currentStatus.client
                  }

                  if(!pageStatusDataStore.isStatusExisted(nextStatus)) {
                    var sIntervalCallId;

                    (function () {
                        var addStatus = function addStatus() {
                            if (displayAreaDataStore.isStatusExisted(nextStatus) && dataPanelDataStore.isStatusExisted(nextStatus) && functionPanelDataStore.isStatusExisted(nextStatus)) {
                                clearInterval(sIntervalCallId);
                                pageStatusChangeActions.pageStatusAddAction(nextStatus);
                            }
                        };

                        var nextData = {};

                        nextData.style = that.props.card.style;
                        nextData.type = "ITEM-ANA";
                        nextData.guidArr = that.props.card.guidArr;
                        nextData.FACTOR_NAME = that.props.card.FACTOR_NAME;
                        nextData.category = that.props.card.category;
                        
                          nextData.factor_type = that.props.card.factor_type;
                          nextData.customerId = that.props.card.customerId;
                          nextData.systemId = that.props.card.systemId;
                          nextData.systemClt = that.props.card.systemClt;


                        displayAreaChangeActions.displayAreaAddPageAction(nextStatus, cardId);
                        dataPanelItemChangeActions.dataPanelAddPageAction(nextStatus);
                        functionPanelItemChangeActions.functionPanelAddPageAction(nextStatus);
                        displayAreaChangeActions.displayAreaAddCardAction(nextStatus,nextData);//zengheng

                        sIntervalCallId = setInterval(function () {
                            addStatus();
                        }, 100);

                    ;
                    })();
                  } else {
                  pageStatusChangeActions.pageStatusChangeAction(nextStatus);
                }
              }
        }
        
        
              



         

    } 



    render() {

        return (
  <Card class="margin10" style={{ width: 150 }} onClick={this.ModeSelect.bind(this)}>
  <div class="custom-size">
        {this.props.name}
        </div>
    <div className="custom-card">
      <p>{this.props.description}</p>
       </div>
       </Card>
      );
  }
}
