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

         DataItems = results.map((item)=><DataItem title = {item.ARTICLE_NAM} key = {item.ARTICLE_ID} uniquekey={item.ARTICLE_ID} />);
      
       }
       else
       {
     DataItems = <h1> No Data Found</h1>

       }

        return (
  <div className="data-block" data-type="TITLE"> 

            <span> DVM </span>

            { DataItems }
  </div>
      );
  }
}
