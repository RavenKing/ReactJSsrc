import React from "react";
import ReactDOM from "react-dom";
import { Button,Card,Icon } from "antd";
import {setNodeDragable} from "../../interactScript";
import { CloseMainPanel } from "../../Actions/KnowledgeAction";

import { connect } from "react-redux";


@connect((store)=>{    
    return {
        articles:store.articles
    };
    
})
export default class FunctionPanel extends React.Component {

    
    componentDidMount() {
      setNodeDragable(ReactDOM.findDOMNode(this));
    }

    render() {
       // const { results } = this.props;

        return (
        	<div className="tile" data-type="MENU" article-id={this.props.article_id}>

              <Card key={this.props.article_id} title={this.props.archobj} style={{ width: 200 }}>
                  <p>{this.props.article_nam}</p>
                  <p>{this.props.article_dsc}</p>
                  <p>{"Total Size:" + this.props.total_size} </p>
              </Card>
        </div>

      );
  }
}
