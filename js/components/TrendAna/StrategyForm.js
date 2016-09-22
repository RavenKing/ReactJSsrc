import React from "react";
import { Button,Card,Icon,Form,Input} from "antd";

const FormItem=Form.Item;

var displayAreaChangeActions = window.displayAreaChangeActions
var pageStatusDataStore = window.pageStatusDataStore
var dataPanelDataStore = window.dataPanelDataStore


export default class StrategyForm extends React.Component {

    componentWillMount(){
      var item = this.props.card;
      this.setState({
        objList:item.objList
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
          
        <Card className="strategyCard aligncenter" title="DVM Strategy" extra={<Icon type="cross" onClick = {this.CloseCard.bind(this)}/>}>
          <Form horizontal >
            {
              this.state.objList.map(function(obj){
                return (
                  <FormItem
                    {...formItemLayout}
                    label={obj.FACTOR_NAME}
                  >
                    <Input type="textarea" defaultValue={obj.FACTOR_INFO} placeholder="Current Strategy Of your System" />
                  </FormItem>
                )
              })
            }

          </Form>








          <Button type="primary">Save</Button>
        </Card>
         
      

      );
  }
}
