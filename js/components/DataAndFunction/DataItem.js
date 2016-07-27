import React from "react";
import ReactDOM from "react-dom";
import { Button } from "antd";
import { Link } from "react-router";
import { connect} from "react-redux"; 
import { AddCard }  from "../../Actions/KnowledgeAction";
import {setNodeDragable} from "../../interactScript";

@connect((store)=>{    
    return {
        articles:store.articles
    };
    
})
export default class DataItem extends React.Component {

    AddOneCard(){

        this.props.dispatch(AddCard( this.props.uniquekey ));

    }
    componentDidMount() {
      
        setNodeDragable(ReactDOM.findDOMNode(this));
        
    }
    render() {
   
        return (
            
            <Button className="data-item" type="dashed" data-type="ITEM" article-id={this.props.article_id}>
              {this.props.title}    
            </Button>
  
      );
  }
}
