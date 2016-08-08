import React from "react";
import { Button,Card,Icon,Form,Input,Row,Col,Collapse,Rate,Popover} from "antd";

import { connect } from "react-redux";

import { ForwardStep } from "../../Actions/KnowledgeAction";
const FormItem = Form.Item;
const Panel = Collapse.Panel;

import BackButton from "./BackButton"

@connect((store)=>{    
    return {
        articles:store.articles
    };
    
})
export default class BasicInfo extends React.Component {
 

    GoToStepFour()
    {
        this.props.dispatch(ForwardStep());
    }

   

    render() {

      var header = "Archiving Object "+this.props.obj;
      var tables = this.props.tables;
     

        return (
        	<div>
            <Collapse defaultActiveKey={['1']} accordion >
            <Panel header={header} key="1">
    
            <Popover content="Popular Object In Our Database">
              <div>Rank:<Rate disabled defaultValue={3} /></div>
            </Popover>
            <p>Business Content of the Archiving Object</p>
            </Panel>
            </Collapse>


          <div className="margin-top10">
         

            {
              tables.map(function(table,idx){
               return ( 
                <Form inline key={idx} >
                  <FormItem label={table}>

                    <Input placeholder="Input Table Size" />
                  </FormItem>
                  <FormItem  label="Desicription">
                    <p className="ant-form-text" id="userName" name="userName">Header Table of material documents</p>
                  </FormItem>
                </Form>
                )
            })
            }
          
              
            

            <FormItem>
              <Button type="primary" onClick={this.GoToStepFour.bind(this)}>Next</Button>
              <BackButton></BackButton>
            </FormItem>
          </div>
        </div>

      );
  }
}
