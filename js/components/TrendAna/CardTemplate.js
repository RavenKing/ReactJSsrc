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

        const props = this.props;
        const { card } = props;
        var that = this;
        var draggableElement = event.relatedTarget,
            dropzoneElement = event.target;
        var currentStatus = pageStatusDataStore.getCurrentStatus();
        var cardId = card.id;
        
        var datatype= this.props.key1;
        var factorCate = card.category[0];
        console.log(factorCate);
        var factorName = card.FACTOR_NAME[0];
        
        if(datatype == "CAPA" && (factorCate == "S" || factorCate == "R")){
            var nextStatus = "ANALYSIS_RCA_" + factorName;

            if(pageStatusDataStore.getAllStatus().indexOf(nextStatus) < 0) {
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
              else if (datatype == "DVM" && (factorCate == "B" || factorCate == "S")){

                  var nextStatus = "ANALYSIS_DVM_" + factorName;

                  if (pageStatusDataStore.getAllStatus().indexOf(nextStatus) < 0) {
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



          console.log(this.props)
          console.log(this.props.key1)

    } 



    render() {

        return (
  <Card class="margin10" style={{ width: 140 }} onClick={this.ModeSelect.bind(this)}>
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
