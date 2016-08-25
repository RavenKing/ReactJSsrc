import React from "react";
import { 
          Button,Card,Icon,Form,Input,Row,Col,
          Collapse,Rate,Popover,Modal
        } from "antd";
const ButtonGroup = Button.Group;

import { connect } from "react-redux";

import { ForwardStep,SetBasicInfo } from "../../Actions/KnowledgeAction";
const FormItem = Form.Item;
const Panel = Collapse.Panel;

import BackButton from "./BackButton"

@connect((store)=>{    
    return {
        articles:store.articles
    };
    
})
export default class BasicInfo extends React.Component {
     constructor(props) {

        super(props);
        const { newArticle } = this.props.articles;       
        var size = [];
        var dsc = [];

        if(newArticle.SIZE){          

          size = newArticle.SIZE;
        }
        if(newArticle.TABLESDSC){
          dsc = newArticle.TABLESDSC;
        }
        
        this.state={ 

          size:size,
          dsc:dsc

        }
    }

    GoToStepFour()
    {
        var {size} = this.state;
        var {dsc} = this.state;
        var validInput = true;
        for(var i = 0;i < this.props.tables.length;i++){
          if(size[i] == undefined){
            size[i] = ""
          }
          if(isNaN(size[i])){
              validInput = false;
              break;
          }
          if(dsc[i] == undefined){
            dsc[i] = ""
          }

        }
        if(validInput){

            this.setState({
              size:size,
              dsc:dsc
            });
      
            this.props.dispatch(SetBasicInfo(this.state));
            this.props.dispatch(ForwardStep());
        }
        else{
          const modal = Modal.warning({
            title: 'Warning! ',
            content: 'Please input the correct number'
          });
        }
        

    }

    handleSizeChange(e){

      var name = e.target.name;
     
      var idx = name.substring(4);

      var inputSize = e.target.value;
      
      var {size} = this.state;
      size[idx] = inputSize;
      this.setState({
        size:size
      });
      
      
    }
    handleDscChange(e){
      var name = e.target.name;
     
      var idx = name.substring(3);

      var inputDsc = e.target.value;
     
      var { dsc } = this.state;
      dsc[idx] = inputDsc;
      this.setState({
        dsc:dsc
      })
     
    }

    render() {
      var header = "Archiving Object "+this.props.obj;
      var tables = this.props.tables;
      var that = this;
     
      const formItemLayout = {
          labelCol: { span: 14},
          wrapperCol: { span: 10 },
        };

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
         

                <Form inline horizontal >
            {
              tables.map(function(table,idx){
                
                var sizeInputName = "size"+idx;
                var dscInputName = "dsc"+idx;
               return ( 
                <div>
                  <FormItem 
                   {...formItemLayout}
                   label={table}>

                    <Input name={sizeInputName} defaultValue={that.state.size[idx]} placeholder="input Table Size" onChange={that.handleSizeChange.bind(that)}/>
                  </FormItem>
                  <FormItem   {...formItemLayout} label="Desicription">
                    <Input name={dscInputName} defaultValue={that.state.dsc[idx]} placeholder="input desicription" onChange={that.handleDscChange.bind(that)} />
                  </FormItem>
                  </div>
                )
            })
            }
          
                   </Form>
            

                     

            <ButtonGroup>
              <BackButton/>
              <Button type="primary" onClick={this.GoToStepFour.bind(this)}>
                Go forward <Icon type="right" />
              </Button>
            </ButtonGroup>

          </div>
        </div>

      );
  }
}
