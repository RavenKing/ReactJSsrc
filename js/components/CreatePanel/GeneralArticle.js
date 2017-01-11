import React from "react";
import { Button,Icon,Form,Input,Modal } from "antd";

import { connect } from "react-redux";
import { PostCapArticle } from "../../Actions/KnowledgeAction";
import BackButton from "./BackButton";

const ButtonGroup = Button.Group;


const FormItem=Form.Item;

@connect((store)=>{    
    return {
        articles:store.articles,
        auth:store.auth.token
    };
    
})
export default class GeneralArticle extends React.Component {  

    handleSubmit(e){
        e.preventDefault();
        //get fields value        
        const { getFieldsValue} = this.props.form;
        //to valid the input
        var valid = true;
      
        //check whether input the article name or not
        var fieldsValue = getFieldsValue();
        if(!fieldsValue["ARTICLE_NAM"]){

            valid = false;
            const modal = Modal.warning({
              title:"Article name can't be empty!",
              content:"Please input the article name!"
              
            })

        }
        if(valid && !fieldsValue["COMMENT"]){
          valid = false;
          const modal = Modal.warning({
              title:"Comment can't be empty!",
              content:"Please input the comment!"
              
            })
        }

        if(valid){
            const {user} = this.props.auth;
            var data = {
              CUSTOMER_ID:user.CUSTOMER_ID,
              USERNAME:user.USERNAME,
              ARTICLE_NAM:fieldsValue["ARTICLE_NAM"],
              ARTICLE_DSC:fieldsValue["ARTICLE_DSC"],
              COMMENT:fieldsValue["COMMENT"]
            }            
            //post article
            this.props.dispatch(PostCapArticle(data));
        }
    }

    render() {	 
        const {user} = this.props.auth;       

        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 }
        };

        const { getFieldProps } = this.props.form;
        const {setFieldsInitialValue} = this.props.form;

    	
    	  return (
        
            <div className="margin-top10 ">
              
              <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                <FormItem
                {...formItemLayout}
                label="Customer ID:"
                >
                <p className="ant-form-text">{user.CUSTOMER_ID}</p> 
                </FormItem>         
                       
                <FormItem
                {...formItemLayout}
                label="Type:"
                >
                <p className="ant-form-text">General</p> 
                </FormItem>

                <FormItem
                {...formItemLayout}
                label="Article Name:"
                >
                <Input type="text" placeholder="Type in an article name" 
                {...getFieldProps('ARTICLE_NAM')}/>
                </FormItem>

                <FormItem
                {...formItemLayout}
                label="Article Description:"
                >
                <Input type="text" placeholder="Type in an description for article"
                {...getFieldProps('ARTICLE_DSC')}/>
                </FormItem>

                <FormItem
                {...formItemLayout}
                label="Comment:"
                >
                <Input type="text" placeholder="Type in comment "
                {...getFieldProps('COMMENT')}/>
                </FormItem>

                <FormItem>


                  <ButtonGroup>
                    <BackButton/>
                    <Button type="primary" htmlType="submit">
                      Save <Icon type="right" />
                    </Button>
                  </ButtonGroup>
                </FormItem>

              </Form>

        </div>

      );
  }
}

GeneralArticle = Form.create()(GeneralArticle);
