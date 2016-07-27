import React from "react";
import ReactDOM from "react-dom";
import ArticleMenuPanel from "./ArticleMenuPanel";
import { Button,Card,Icon } from "antd";
import {setCardDragable} from "../../interactScript";
import { CloseMainPanel } from "../../Actions/KnowledgeAction";

import { connect } from "react-redux";


@connect((store)=>{    
    return {
        articles:store.articles
    };
    
})
export default class FunctionPanel extends React.Component {

    CloseMainCardPanel(){

        this.props.dispatch(CloseMainPanel());

    }

    componentDidMount() {
      setCardDragable(ReactDOM.findDOMNode(this));
    }

    render() {
        const { results } = this.props.articles;

        const DisplayMain= results.map((result)=>
          <ArticleMenuPanel article_id={result.ARTICLE_ID} archobj={result.ARCHOBJ} article_nam={result.ARTICLE_NAM} 
          article_dsc={result.ARTICLE_DSC} total_size={result.TOTAL_SIZE}/>
        );

        return (
        	<div className="main-panel">
              <Card title="DVM Articles" extra={<Icon type="cross" onClick={this.CloseMainCardPanel.bind(this)} />} style={{ width: 800 }} >
        	       {DisplayMain}
              </Card>
        </div>

      );
  }
}
