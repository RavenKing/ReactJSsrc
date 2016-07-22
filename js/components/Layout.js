import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { fetchUser } from "../Actions/userAction";
import { fetchArticles } from "../Actions/KnowledgeAction";
import 'antd/dist/antd.css';
import { Button, DatePicker } from "antd";


//high charts
import  ReactHighCharts  from "react-highcharts";

import DataPanel from "./DataAndFunction/DataPanel";
import FunctionPanel from "./DataAndFunction/FunctionPanel";
import DisplayPanel from "./DisplayPanel/DisplayPanel"

@connect((store)=>{
    
    return {
        user: store.users.user, 
        tweets:store.tweets.tweets,
        articles:store.articles
    };
    
})
export default class Layout extends React.Component {
  constructor(props){
  super(props)



  this.props.dispatch(fetchArticles())
  this.state={
              items:[
              {key:1,title:"good"},
              {key:2,title:"bac"},
              {key:3,title:"nice"},
              {key:4,title:"job"},    
        ]
  }


  }
 componentWillMount(){
          
      }

      AddOne(){

       const data = this.state.items;
       data.push({key:5,title:"fifth"});

       this.setState({items:data});

      
      }
    
    render() {
      


      const items = {
          items:[
              {key:1,title:"good"},
              {key:2,title:"bac"},
              {key:3,title:"nice"},
              {key:4,title:"job"},    
        ]
      }
      
       var DisplayView,DataView;
       console.log(this.props)
       if(this.props.articles)
       {

        DataView = <DataPanel items={this.state.items} articles={this.props.articles}> </DataPanel>  
        DisplayView = <DisplayPanel articles = {this.props.articles}> </DisplayPanel>

       }
       else
       {
        DisplayView = <h1>Good</h1>
       }

      
        
    return (
         <div>



        { DataView  }
  <div class="display-panel">
  {this.props.children}
 {
    DisplayView
 }
  </div>
      
     <FunctionPanel> 
 </FunctionPanel>

        </div>
        
        
        
        
        
    );
  }
}
