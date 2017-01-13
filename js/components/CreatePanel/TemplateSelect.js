import React from "react";
import { Button,Card,Icon } from "antd";

import { connect } from "react-redux";

import { NewArticleStepOne } from "../../Actions/KnowledgeAction";


@connect((store)=>{    
    return {
        articles:store.articles
    };
    
})
export default class TemplateSelect extends React.Component {

    GoToStepTwo(type)
    {
        switch(type){
          case "DVM":
            var newArticle = { 
                type:"DVM",
                currentstep:1
            }
            break;
          case "GEN":
            var newArticle = { 
                type:"GEN",
                currentstep:1
            } 
            break;
          case "CAP":
            var newArticle = { 
                type:"CAP",
                currentstep:1
            } 
            break;
          default:
            break;
        }       

        this.props.dispatch(NewArticleStepOne(newArticle));
        

    }

    render() {

        return (
        	<div>
            <div className="templatecontainer"> 
              <Card className="margin10" style={{ width: 240 }} onClick={this.GoToStepTwo.bind(this,"DVM")}>

                <div className="custom-size">
                  DVM
                </div>

                <div className="custom-card">
                  <h3>Data Volume Management</h3>
                  <p>Tables and objects</p>
                </div>

              </Card>

              <Card className="margin10" style={{ width: 240 }} onClick={this.GoToStepTwo.bind(this,"GEN")}>

                <div className="custom-size">
                  General
                </div>

                <div className="custom-card">
                  <h3>General Information</h3>
                  <p>Comments</p>
                </div>

              </Card>

              <Card className="margin10" style={{ width: 280 }} onClick={this.GoToStepTwo.bind(this,"CAP")}>
                <div className="custom-size">
                  Capacity Management
                </div>

                <div className="custom-card">
                  <h3>Capacity Management</h3>
                  <p>Performance </p>
                </div>
              </Card> 

          </div>
        </div>

      );
  }
}
