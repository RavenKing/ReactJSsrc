import React from "react";
import ReactDOM from "react-dom";
import DataItem from "./DataItem";

import { Link } from "react-router";
import { setNodeDragable } from "../../interactScript";


export default class DataBlock extends React.Component {
    
    componentDidMount() {
        this.interactable = setNodeDragable(ReactDOM.findDOMNode(this));
    }
    componentWillUnmount() {
      this.interactable.unset();
      this.interactable = null;
    }

    render() { 

      const { articles } =this.props;
      var  DataItems;
      if(articles.fetched === true)
      {
       
        const  { results } = articles.articles;
        const topfive = results.concat();


        let topfive1 = topfive.filter((one)=>{
          if(one.FACTOR_TYPE == this.props.type)
          return one;
        });
        topfive1=topfive1.splice(0,5);
        DataItems = topfive1.map((item)=><DataItem  title = {item.ARTICLE_NAM} key = {item.ARTICLE_ID} uniquekey={item.ARTICLE_ID} type = {item.FACTOR_TYPE} />);
      
       }
       else
       {
          DataItems = <h1></h1>

       }

        return (
          <div className="data-block" data-type="TITLE"> 
          <div className="data-title" >
            <span> {this.props.title} </span>
          </div>
          { DataItems }
          </div>
      );
  }
}