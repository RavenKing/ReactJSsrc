import React from "react";
import { Button,Card,Icon } from "antd";

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

    render() {
const { results } = this.props;

const DisplayMain= results.map((result)=><Card class = "tile" key={result.ARTICLE_ID} title={ result.ARCHOBJ }  style={{ width: 200 }}><p>{result.ARTICLE_NAM }</p>
    		 <p>{result.ARTICLE_DSC }</p>
				<p>{"Total Size:" + result.TOTAL_SIZE} </p>
    			</Card>);

        return (
        	<div>
           <Card title="DVM Articles" extra={<Icon type="cross" onClick={this.CloseMainCardPanel.bind(this)} />} style={{ width: 800 }} >
        	{DisplayMain}
          </Card>
        </div>

      );
  }
}
