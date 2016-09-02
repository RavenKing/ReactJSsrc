import React from "react";
import ReactDOM from "react-dom";
import { Form, Input, Button, Table, Icon,Moda,InputNumber,Card} from "antd";
const ButtonGroup = Button.Group;
import { connect } from "react-redux";
import {GetAlltheDVM} from "../../Actions/dvmpracticeAction";

import { ForwardStep,GetTop5Tables,SetArticleNamAndDsc } from "../../Actions/KnowledgeAction";


const FormItem = Form.Item;


let Demo = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    console.log('收到表单值：', this.props.form.getFieldsValue());
  },

  render() {
          const formItemLayout = {
          labelCol: { span: 6 },
          wrapperCol: { span: 14 },
        };
    const { getFieldProps } = this.props.form;
    return (
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormItem
                  {...formItemLayout}
          label="Factor Guid"
        >
          <Input placeholder="Factor Id"
            {...getFieldProps('FACTOR_GUID')}
          />
        </FormItem>
          <FormItem
                  {...formItemLayout}
          label="Archiving object"
        >
          <Input placeholder="Archiving object"
            {...getFieldProps('ARCHOBJ')}
          />
        </FormItem>
         <FormItem
                  {...formItemLayout}
          label="Business Content"
        >
          <Input placeholder="Archiving object"
            {...getFieldProps('BUSINESSCONTENT')}
          />
        </FormItem>
                <FormItem
                  {...formItemLayout}
          label="SAP Best Avoidance"
        >
          <Input placeholder="avoidance" type="textarea"
            {...getFieldProps('AVOIDANCE')}
          />
        </FormItem>            
         <FormItem
                  {...formItemLayout}
          label="SAP Best SUMMERIZATION"
        >
          <Input placeholder="SUMMERIZATION" type="textarea"
            {...getFieldProps('SUMMERIZATION')}
          />
        </FormItem>

         <FormItem 
                  {...formItemLayout}
          label="SAP Best Deletion"
        >
          <Input placeholder="DELETIOn" type="textarea"
            {...getFieldProps('DELETION')}
          />
        </FormItem>

         <FormItem
                  {...formItemLayout}
          label="SAP Best ARCHIVING"
        >
          <Input placeholder="ARCHIVING" type="textarea"
            {...getFieldProps('ARCHIVING')}
          />
        </FormItem>
         <FormItem
                  {...formItemLayout}
          label="SAP Best Retention"
        >
          <InputNumber  placeholder="Retention"
            {...getFieldProps('BEST_PRACTICE')}
          />
        </FormItem>

         <FormItem
                  {...formItemLayout}>
        <Button type="primary" htmlType="submit">save</Button>

        </FormItem>
      </Form>
    );
  },
});

Demo = Form.create()(Demo);



@connect((store)=>{    
    return {
        articles:store.articles,
        auth:store.auth.token,
        DVMPRACTICE:store.DVM
    };
    

})



export default class Maintain extends React.Component {

    constructor(props) {
        super(props)


        this.state={
          newone: {
              FACTOR_GUID:null,
              ARCHOBJ:null,
              AVOIDANCE:null,
              SUMMERIZATION:null,
              DELETION:null,
              ARCHIVING:null
          }
        }
    }

    SaveIt(){

    }
    componentWillMount(){

        this.props.dispatch(GetAlltheDVM());

    }

    handleChange(){

    }
    render() {


        const formItemLayout = {
          labelCol: { span: 6 },
          wrapperCol: { span: 14 },
        };


console.log(this.props.DVMPRACTICE);


//table 

var data = [];
  var columns = [{
        title: 'FACTOR_GUID',
        width:"130px",
        dataIndex: 'FACTOR_GUID',
        render: function(text) {
          return <a href="javascript:;">{text}</a>;
        }}, 
        {
          title: 'ARCHIVING Object',
          width:'140px',
          dataIndex: 'ARCHOBJ'
        }, 
        {
          title: 'Avoidance',
          width:'300px',
          dataIndex: 'AVODANCE'
        }  ,      
             {
          title: 'SUMMERIZATION',
          width:'300px',
          dataIndex: 'SUMMERIZATION'
        } ,      
             {
          title: 'Deletion',
          width:'300px',
          dataIndex: 'DELETION'
        }       ,      
             {
          title: 'ARCHIVING',
          width:'300px',
          dataIndex: 'ARCHIVING'
        } ,      
         {
          title: 'Retention',
          width:'300px',
          dataIndex: 'BEST_PRACTICE'
        } ,      
         {
          title: 'Business Content',
          width:'300px',
          dataIndex: 'BUSINESSCONTENT'
        }        
       ];
      

//table 

        return (
          <div>
            


  <Card>


              <Table columns={columns} dataSource={data} pagination={false} />
              <Demo />
</Card>
          </div>

      );
    }
}
