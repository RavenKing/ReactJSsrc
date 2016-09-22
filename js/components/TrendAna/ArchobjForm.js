import React from "react";
import { Button,Card,Icon,Form,Input} from "antd";

const FormItem=Form.Item;

var displayAreaChangeActions = window.displayAreaChangeActions
var pageStatusDataStore = window.pageStatusDataStore


export default class ArchobjForm extends React.Component {

    componentWillMount(){
      var item = this.props.card;
      this.setState({
        obj:item.factor_name
      });
    }
    CloseCard(){
      
        var currentStatus = pageStatusDataStore.getCurrentStatus();

        displayAreaChangeActions.displayAreaRemoveCardAction(currentStatus, this.props.card.id);
       
    }
    render() {	

        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 }
        };

    	
    	return (
          
        <Card className="strategyCard aligncenter" title={"Archiving Object: "+this.state.obj} extra={<Icon type="cross" onClick = {this.CloseCard.bind(this)}/>}>
          <Form horizontal >
            <FormItem
              {...formItemLayout}
              label="Table Name"
            >
              <Input defaultValue={this.state.obj} placeholder="archiving object" />
            </FormItem>
          </Form>
          <Button type="primary">Save</Button>
        </Card>
         
      

      );
  }
}
