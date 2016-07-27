import React from "react";
import {Card,Icon,Steps} from "antd";
import { CloseCreatePanel } from "../../Actions/KnowledgeAction";

import TemplateSelect from "./TemplateSelect";
import ObjectDefinition from "./ObjectDefinition";
import BasicInfo from "./BasicInfo";

import { connect } from "react-redux";



const Step = Steps.Step;

@connect((store)=>{    
    return {
        articles:store.articles
    };
    
})
export default class CreatePanel extends React.Component {

 componentWillMount(){

const { articles } =this.props;
console.log(articles);
const { newArticle } = articles;
    if(newArticle == null )
    {
    this.setState({currentstep:0});
    }
    else{
console.log(newArticle.currentstep)
      this.setState({currentstep:newArticle.currentstep})

    }

}

 
    MoveDoc(){
       alert("shitty");

    }
 
    CloseCreatePanel(){

this.props.dispatch(CloseCreatePanel());

    }



    render() {

const { articles } =this.props;
const { newArticle } = articles;
var currentstep;
if(newArticle!=null)
{

   currentstep=newArticle.currentstep;
}
else
{
  currentstep=0
}

  var displaystep;

   switch(parseInt(currentstep))
   {
   case 0 :{
    displaystep = <TemplateSelect></TemplateSelect> ;  break;
  } 
  case 1 : {displaystep = <ObjectDefinition></ObjectDefinition> ; break;
}
   case 2 :{ displaystep= <BasicInfo></BasicInfo>; break}

   }


  return (
  <div>

   <Card title="Create New Article" extra={<Icon type="cross" onClick = {this.CloseCreatePanel.bind(this)}/>}>
    <div>
    <Steps current={currentstep}>
    <Step title="Template Selection" description="Currenct template in System" />
    <Step title="Object Definition" description="What do you want to record" />
    <Step title="Basic Info" description="Type in more info " />
    <Step title="Strategy Definition" description="Do you have exsiting Strategy" />
  </Steps>
     </div>
  <div class="mainstep">
    
  {displaystep}

  </div>



   </Card>

  </div>
   
  
      );
  }
}
