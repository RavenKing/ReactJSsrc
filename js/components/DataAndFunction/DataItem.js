import React from "react";
import { Button } from "antd";
import { Link } from "react-router";



export default class DataItem extends React.Component {
    

	handleClick(){

	}

    render() {


        return (
            <div>
           <Link  activeClassName = "active" to={"articles/"+this.props.title } >
            <Button class="data-item" type="dashed" onClick={this.handleClick.bind(this)}>
{    this.props.title       }    
            </Button>
            </Link>
  </div>
      );
  }
}
