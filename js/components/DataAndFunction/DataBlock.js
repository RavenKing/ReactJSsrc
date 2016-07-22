import React from "react";
import DataItem from "./DataItem";

import { Link } from "react-router";

export default class DataBlock extends React.Component {
    


    render() { 
        const { articles } =this.props;
        var  DataItems;
        console.log(articles);
      if(articles.fetched === true)
      {
       
      const  { results } = articles.articles;

         DataItems = results.map((item)=><DataItem title = {item.ARTICLE_ID} key = {item.ARTICLE_ID}  />);
      
       }
       else
       {
     DataItems = <h1> No Data Found</h1>

       }

        return (
  <div class="data-block"> 

            <span> DVM </span>

            { DataItems }
  </div>
      );
  }
}
