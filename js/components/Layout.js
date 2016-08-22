import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";

//Knowledge Action

import { fetchArticles } from "../Actions/KnowledgeAction";

//Antd
import 'antd/dist/antd.css';
import { Button, DatePicker } from "antd";


//high charts
import  ReactHighCharts  from "react-highcharts";


//Three Panels

import DataPanel from "./DataAndFunction/DataPanel";
import FunctionPanel from "./DataAndFunction/FunctionPanel";
import DisplayPanel from "./DisplayPanel/DisplayPanel"

@connect((store)=>{    
    return {
        articles:store.articles
    };
    
})
export default class Layout extends React.Component {
  constructor(props){
  super(props)
   
this.props.dispatch(fetchArticles())
}


  componentWillMount()
  {
this.props.dispatch(fetchArticles())

  }


      render() {
      var DisplayView,DataView;
       const {  articles } = this.props;
       if(articles.fetched == true)
       {
        DataView = <DataPanel articles={this.props.articles}> </DataPanel>  
        DisplayView = <DisplayPanel articles = {this.props.articles}> </DisplayPanel>

       }
       else
       {
       }


      
        
    return (
         <div>

         <DataPanel articles={this.props.articles}> </DataPanel>
         <DisplayPanel articles = {this.props.articles}> </DisplayPanel>
      
     <FunctionPanel> 
    </FunctionPanel>

        </div>
        
        
        
        
        
    );
  }
}
