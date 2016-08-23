import React from "react";
import ReactDOM from "react-dom";
import { Form, Input, Button, Checkbox, Radio, Tooltip, Icon,Moda } from "antd";
const ButtonGroup = Button.Group;
import { connect } from "react-redux";

import { ForwardStep,GetTop5Tables,SetArticleNamAndDsc } from "../../Actions/KnowledgeAction";

//back
import BackButton from "./BackButton";

const FormItem = Form.Item;


@connect((store)=>{    
    return {
        articles:store.articles
    };
    
})
export default class ObjectDefinition extends React.Component {

    constructor(props) {

        super(props);
        this.state={ 
          objectstatus:"",
          objecthelp:"",
          visible:false,
          article_nam:"",
          article_dsc:"",
          obj:""

        }
    }


    GoToStepThree()
    {
        //users do not input the archiving object or table 
        if(this.state.obj == ""){

          this.setState({
            objectstatus:"error",
            objecthelp:"please input an object or table!"
          })
        }
        else{
          this.setState({
            objectstatus:"validating",
            objecthelp:"validating"
          });
            this.props.dispatch(GetTop5Tables(this.state.obj));
     
 const { newArticle } = this.props.articles;

        setTimeout(function(){this.CheckExist(newArticle)}.bind(this),1000)
        }
        

    }
      CheckExist(newArticle)
      {
          if(newArticle.TABLES == undefined)
          { 

          this.setState({
            objectstatus:"error",
            objecthelp:"please input an correct object or table!"
          })

          }
          else{
            this.props.dispatch(SetArticleNamAndDsc(this.state));  

            this.props.dispatch(ForwardStep());
          }

      }
   
    handleChange(e){
        console.log(e.target.value);
        switch(e.target.name ){
          case "article_nam":
          {

              this.setState({article_nam:e.target.value});
              break;
          }
          case "article_dsc":
          {
              this.setState({article_dsc:e.target.value});
              break;
          }
          case "obj":
          {
              this.setState({obj:e.target.value});
              break;
          }
        }
        

    }

    render() {

        const formItemLayout = {
          labelCol: { span: 6 },
          wrapperCol: { span: 14 },
        };

        return (
        	<div>
              <Form horizontal >
                <FormItem
                  {...formItemLayout}
                  label="Customer ID"
                >
                  <p className="ant-form-text" id="userName" name="userName">32326</p>                  
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="Type"
                >
                  <p className="ant-form-text" id="typeName" name="typeName">DVM</p>                  
                </FormItem>

                 <FormItem
                  {...formItemLayout}
                  label="Article Name:"
                >
                  <Input name="article_nam" type="text"  placeholder="Type in an article name" onChange={this.handleChange.bind(this)}/>
                </FormItem>

                 <FormItem
                  {...formItemLayout}
                  label="Article Description:"
                >
                  <Input name="article_dsc" type="text"  placeholder="Type in a description of the article" onChange={this.handleChange.bind(this)}/>
                </FormItem>

                <FormItem
                  {...formItemLayout}
                  label="What object do you want to record"
                  validateStatus={this.state.objectstatus}
                  help={this.state.objecthelp}
                >
                  <Input name="obj" type="text"  placeholder="Type in a table name or archiving object" onChange={this.handleChange.bind(this)}/>
                </FormItem>

                <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: 24 }}>
              

      <ButtonGroup>
      <BackButton/>
      <Button type="primary" onClick={this.GoToStepThree.bind(this)}>
        Go forward <Icon type="right" />
      </Button>
    </ButtonGroup>


        
                </FormItem>

              </Form>



          </div>

      );
    }
}
