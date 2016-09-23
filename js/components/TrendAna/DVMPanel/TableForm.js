import React from "react";
import ReactDOM from "react-dom";
import { Button,Card,Icon,Form,Input,Col,Row} from "antd";

var FormItem = Form.item;
export default class TableForm extends React.Component {

    componentWillMount(){
      var item = this.props.card;
      this.setState({
        table_name:item.factor_name
      });
    }
    render() {	

        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 }
        };

    	
    	return (
          <div>
             <Row>
                <Col span={12}>  {this.state.table_name}</Col>
                <Col span={12}> <Input placeholder="size"></Input></Col>
              </Row>      
          </div>

      );
  }
}
