import React from "react";
import PredictPanel from "../DisplayPanel/PredictPanel";
import { RemoveCard,PostArticle } from "../../Actions/KnowledgeAction";
import {Button,Modal} from "antd";
import BackButton from "./BackButton";
import { connect } from "react-redux";

const ButtonGroup = Button.Group;
const confirm = Modal.confirm;



@connect((store)=>{    
    return {
        articles:store.articles,
        auth:store.auth.token
    };
    
})
export default class PredictAnalysis extends React.Component{
  PostArticle(){
      const { user } = this.props.auth;
      const { newArticle } = this.props.articles;
      const { articles } = this.props.articles;
      var data = newArticle;
      var that = this;
      if(data.ARTICLE_NAM == articles.results[0].ARTICLE_NAM){
        confirm({
          title: '\''+data.ARTICLE_NAM + '\' already exists, do you still want to save this article?',
          content: 'Please confirm that you want to save this article with the same name \'' + data.ARTICLE_NAM+'\'!',
          onOk() {
                      
                data.USERNAME = user.USERNAME;
                that.props.dispatch(PostArticle(data));
          },                      
          onCancel() {}
      });
      }
      else{
          data.USERNAME = user.USERNAME;
          this.props.dispatch(PostArticle(data));
      }
      
  }
  CloseCreatePanel(){
      var that = this;
      confirm({
          title: 'Do you really want to close this panel?',
          content: 'Please confirm that you have saved the article before close this panel!',
          onOk() {
                      
              var data = {
                type:"create"
              };
              that.props.dispatch(RemoveCard(data));   
          },                      
          onCancel() {}
      });
                    

    
  }
	render(){
		
		return (
			<div>
				<PredictPanel/>
        <ButtonGroup>
          <BackButton/>
          <Button type="primary" onClick={this.PostArticle.bind(this)}>Save</Button>
          <Button type="primary" onClick={this.CloseCreatePanel.bind(this)}>
            Close
          </Button>
        </ButtonGroup>
			</div>


		)

	}
}