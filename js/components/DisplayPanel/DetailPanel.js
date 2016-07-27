import React from "react";
import { Button,Card,Icon} from "antd";
import { connect } from "react-redux";
import TableCharts from "./TableCharts";
import DvmPanel from "./DvmPanel";
import { RemoveCard } from "../../Actions/KnowledgeAction";

@connect((store)=>{
    return {
        articles:store.articles
    };
    
})
export default class DetailPanel extends React.Component { 



  NavLeft(){

 var data = this.state.articles;
 var pagenumber = this.state.page -1 ;
 this.setState({articles:data,
          page:pagenumber
 })
  }

 NavRight(){
 
 var data = this.state.articles;
 var pagenumber = this.state.page + 1;
 this.setState({articles:data,
          page:pagenumber
 })

  }
 componentWillMount(){

  // get number 
  const { articlenumber } = this.props;
  const { articles } = this.props;
  const { results } = articles.articles;
    const target = results.filter((result)=>{ return result.ARTICLE_ID == articlenumber })
 
  this.setState({
    articles:target[0],
    page:1
  })


        }

    removeCard(){


 this.props.dispatch(RemoveCard(this.props.articlenumber));      
     
    }

    render() {  

      console.log(this.state);
   return (

  <div>

      <Card title={this.state.articles.ARTICLE_NAM} extra={<Icon type="cross" onClick={this.removeCard.bind(this)} />}>
<div class="leftside" onClick={this.NavLeft.bind(this)}>
  <Icon type="left" />
</div>
 <div class="middlecontainer">  

  <DvmPanel Page={this.state.page} Article={this.state.articles}> </DvmPanel>
  </div>
  <div class="rightside" onClick={this.NavRight.bind(this)}>
  <Icon type="right"/>
  </div>
   </Card>
   </div>
      );
  }
}
