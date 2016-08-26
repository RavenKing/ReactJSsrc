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


  shouldComponentUpdate(nextProps,nextState)
  { 
    const {articles} =nextProps;
    console.log(articles);
    console.log("update"+articles.refresh)
    if(articles.refresh == true || articles.fetched == true )
    {

      return true;
    }


  }

  componentWillUpdate(nextProps,nextState){
    const {articles} = nextProps;
    if(articles.refresh ==true)
    {

     this.props.dispatch(fetchArticles())

    }

  }


  componentWillMount()
  {
    alert("fetch Article from layout")
this.props.dispatch(fetchArticles())

  }


      render() {
        
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