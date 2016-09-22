import React from "react";
import ReactDOM from "react-dom";
import { Button,Card,Icon,Form,Input} from "antd";
import { setCardDragable,handleFocus } from "../../interactScript";
const FormItem=Form.Item;

var displayAreaChangeActions = window.displayAreaChangeActions
var pageStatusDataStore = window.pageStatusDataStore


export default class TableForm extends React.Component {

    componentWillMount(){
      var item = this.props.card;
      this.setState({
        table_name:item.factor_name
      });
    }
    componentDidMount() {

      setCardDragable(ReactDOM.findDOMNode(this));     
      handleFocus(ReactDOM.findDOMNode(this));   
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
          
        <Card style={this.props.card.style} className="strategyCard aligncenter" title={"Table: "+this.state.table_name} extra={<Icon type="cross" onClick = {this.CloseCard.bind(this)}/>}>
          <Form horizontal >
            <FormItem
              {...formItemLayout}
              label="Table Name"
            >
              <Input defaultValue={this.state.table_name} placeholder="related table" />
            </FormItem>
          </Form>
          <Button type="primary">Save</Button>
        </Card>
         
      

      );
  }
}
