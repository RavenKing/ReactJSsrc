import React from "react";
import { Button } from "antd";
import { Link } from "react-router";
import { connect} from "react-redux"; 
import { AddCard }  from "../../Actions/KnowledgeAction";

@connect((store)=>{    
    return {
        articles:store.articles
    };
    
})
export default class DataItem extends React.Component {
    
  AddOneCard(){

this.props.dispatch(AddCard( this.props.uniquekey ));

  }
    render() {
   
        return (
            <div>
            <Button class="data-item" type="dashed" onClick={this.AddOneCard.bind(this)}>
            {    this.props.title       }    
            </Button>
  </div>
      );
  }
}
