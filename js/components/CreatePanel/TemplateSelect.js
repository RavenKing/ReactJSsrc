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
        if(type == "DVM"){
            var newArticle = { 
                type:"DVM",
                currentstep:1
            }
            
        }
        else if(type == "GEN"){
            var newArticle = { 
                type:"GEN",
                currentstep:1
            }  
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
                  <h3>Capacity Management</h3>
                  <p>Performance </p>
                </div>

              </Card>

              <Card className="margin10" style={{ width: 240 }}>
                <div className="custom-size">
                  Coming Soon
                </div>

                <div className="custom-card">
                  <h3>Others</h3>
                  <p>Business API</p>
                </div>
              </Card> 

          </div>
        </div>

      );
  }
}
