import React from "react";
import { Button,Card,Icon,Form,Input} from "antd";

const FormItem=Form.Item;

var displayAreaChangeActions = window.displayAreaChangeActions
var pageStatusDataStore = window.pageStatusDataStore


export default class TablesForm extends React.Component {

    componentWillMount(){
      var item = this.props.card;
      this.setState({
        tables:item.objList
      });
    }
    CloseCard(){
      
        var currentStatus = pageStatusDataStore.getCurrentStatus();

        displayAreaChangeActions.displayAreaRemoveCardAction(currentStatus, this.props.card.id);
       
    }
    render() {	

        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 10 }
        };

    	
    	return (
          
        <Card className="strategyCard aligncenter" title="Related Tables" extra={<Icon type="cross" onClick = {this.CloseCard.bind(this)}/>}>
          <Form horizontal >
            {
              this.state.tables.map(function(table){
                  return (
                    <FormItem
                      {...formItemLayout}
                      label="Table Name"
                    >
                      <Input defaultValue={table.FACTOR_NAME} placeholder="Related tables" />
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
