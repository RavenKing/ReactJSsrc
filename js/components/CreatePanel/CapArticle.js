import React from "react";
import { Button,Icon,Form,Input,Modal,Select } from "antd";

import { connect } from "react-redux";
import { PostCapArticle } from "../../Actions/KnowledgeAction";
import BackButton from "./BackButton";

const ButtonGroup = Button.Group;


const FormItem=Form.Item;
const Option = Select.Option;

@connect((store)=>{    
    return {
        articles:store.articles,
        auth:store.auth.token
    };
    
})
export default class CapArticle extends React.Component {  

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
        if(valid && !fieldsValue["FACTOR_NAME"]){
            valid = false;
            const modal = Modal.warning({
                title:"Factor name can't be empty!",
                conten:"Please select the factor name from the list!"
            })
        }

        if(valid){
            const {user} = this.props.auth;
            var data = {
                TYPE:"CAP",
                CUSTOMER_ID:user.CUSTOMER_ID,
                USERNAME:user.USERNAME,
                ARTICLE_NAM:fieldsValue["ARTICLE_NAM"],
                ARTICLE_DSC:fieldsValue["ARTICLE_DSC"],
                COMMENT:fieldsValue["COMMENT"],
                FACTOR_CAT:"W",
                FACTOR_NAME:fieldsValue["FACTOR_NAME"]
            }            
            //post article
            this.props.dispatch(PostCapArticle(data));
        }
    }

    render() {	 
        const {user} = this.props.auth;       
        const {factor_name} = this.props.articles;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 }
        };

        const { getFieldProps } = this.props.form;
        const {setFieldsInitialValue} = this.props.form;
    
        var options = factor_name.map(function(one){
            return <Option value={one.FACTOR_NAME}>{one.FACTOR_NAME}</Option>
        });
    	
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
                <p className="ant-form-text">Capacity Management</p> 
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
                label="Factor Name:"
                >
                <Select showSearch
                    placeholder="please select factor name"                   
                    {...getFieldProps('FACTOR_NAME')}               
                    
                  >
                    {options}
                  </Select>
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

CapArticle = Form.create()(CapArticle);
