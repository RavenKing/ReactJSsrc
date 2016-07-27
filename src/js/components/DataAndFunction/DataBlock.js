import React from "react";
import ReactDOM from "react-dom";
import DataItem from "./DataItem";
import {setNodeDragable} from "../../interactScript";
import { Link } from "react-router";

export default class DataBlock extends React.Component {
    
    componentDidMount() {
      
        setNodeDragable(ReactDOM.findDOMNode(this));
        
    }

    render() { 
        const { articles } =this.props;
        var  DataItems;

        if(articles.fetched === true)
        {
          const  { results } = articles.articles;
          DataItems = results.map((item)=><DataItem title = {item.ARTICLE_NAM} key = {item.ARTICLE_ID} article_id={item.ARTICLE_ID} />);
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
