import React from "react";
import { Button,Card,Icon,Form,Input,Row,Col,InputNumber} from "antd";

const FormItem=Form.Item;

var displayAreaChangeActions = window.displayAreaChangeActions
var pageStatusDataStore = window.pageStatusDataStore
var dataPanelDataStore = window.dataPanelDataStore


export default class SaveArticle extends React.Component {

    componentWillMount(){
      /*var item = this.props.card;
      this.setState({
        objList:item.objList
      });*/
      var currentStatus = pageStatusDataStore.getCurrentStatus();
      var objList = dataPanelDataStore.getBlockObjList(currentStatus,"Arch Obj");
      var tablesList = dataPanelDataStore.getBlockObjList(currentStatus,"Tables");
      var strategyList = dataPanelDataStore.getBlockObjList(currentStatus,"Strategy");
      var retentionList = dataPanelDataStore.getBlockObjList(currentStatus,"Retention");
      this.setState({
        objList:objList,
        tablesList:tablesList,
        strategyList:strategyList,
        retentionList:retentionList
      });

    }
    CloseCard(){
      
        var currentStatus = pageStatusDataStore.getCurrentStatus();

        displayAreaChangeActions.displayAreaRemoveCardAction(currentStatus, this.props.card.id);
       
    }
    render() {	

        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 18 }
        };

    	
    	return (
          
        <Card className="saveCard aligncenter" title="Save as Article" extra={<Icon type="cross" onClick = {this.CloseCard.bind(this)}/>}>
          <p>Basic Information</p>
          <hr />
          <br />
          <Form horizontal >
            <FormItem
            {...formItemLayout}
            label="Article Name"
            >
            <Input placeholder="Article Name"/>
            </FormItem>

            <FormItem
            {...formItemLayout}
            label="Article Description"
            >
            <Input placeholder="Article Description"/>
            </FormItem>

            <FormItem
            {...formItemLayout}
            label="Article Name"
            >
            <Input placeholder="Archiving Object"/>
            </FormItem>
          </Form>

          <p>Tables</p>
          <hr />
          <br />
          <Form horizontal className="ant-advanced-search-form">
            <Row gutter={16}>
              <Col sm={10}>
              {
                this.state.tablesList.map((table)=>{
                  return(
                    <FormItem
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    label={table.FACTOR_NAME}
                    >
                    <Col span="15">
                      <Input defaultValue={table.FACTOR_INFO}/>
                    </Col>
                    <Col span="3">
                      <p className="ant-form-split">GB</p>
                    </Col>
                    </FormItem>
                  )
                })
              }
            </Col>
            <Col sm={14}>
            {
              this.state.tablesList.map((table)=>{
                  return(
                    <FormItem
                      labelCol={{ span: 6 }}
                      wrapperCol= {{ span: 14 }}
                      label="Description"
                    >
                      <Input placeholder="Archiving Object"/>
                    </FormItem>
                  )
                })
            }
            </Col>
            </Row>
          </Form>
          
          <br />
          <p>Strategy</p>
          <hr />
          <br />
          <Form horizontal>
            <FormItem
            {...formItemLayout}
            label="Retention Time"
            >
            <div>
              <InputNumber min={12} max={999} defaultValue={this.state.retentionList[0].FACTOR_NAME}/> <p className="ant-form-text" >Month</p>
            </div>
            </FormItem>

            {
              this.state.strategyList.map(function(strategy){
                return (
                  <FormItem
                    {...formItemLayout}
                    label={strategy.FACTOR_NAME}
                  >
                    <Input type="textarea" defaultValue={strategy.FACTOR_INFO} placeholder="Current Strategy Of your System" />
                  </FormItem>
                )
              })
            }
          </Form>

          <p>Saving Potential</p>
          <hr />
          <br />
          <Form horizontal>
            <FormItem
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 12 }}
            label="Estimated Saving Potential(GB)"
            >
            <Input placeholder="Estimated Saving Potential" />
            </FormItem>

            <FormItem
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 12 }}
            label="Estimated Saving Potential(%)"
            >
            <Input placeholder="Estimated Saving Potential" />
            </FormItem>

            <FormItem
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 12 }}
            label="Actual Saving Potential(GB)"
            >
            <Input placeholder="Actual Saving Potential" />
            </FormItem>

            <FormItem
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 12 }}
            label="Actual Saving Potential(%)"
            >
            <Input placeholder="Actual Saving Potential" />
            </FormItem>
          </Form>

          <p>Comments</p>
          <hr />
          <br />
          <Form horizontal>
            <FormItem
            {...formItemLayout}
            label="Comment"
            >
            <Input type="textarea" placeholder="Comments" />
            </FormItem>

          </Form>








          <Button type="primary">Save</Button>
        </Card>
         
      

      );
  }
}
