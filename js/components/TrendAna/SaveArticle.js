import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Button,Card,Icon,Checkbox,Form,Input,Row,Col,Modal,InputNumber} from "antd";
import { setCardDragable,handleFocus } from "../../interactScript";
import { PostArticle } from "../../Actions/KnowledgeAction";
const FormItem=Form.Item;
const CheckboxGroup = Checkbox.Group;

var displayAreaChangeActions = window.displayAreaChangeActions
var pageStatusDataStore = window.pageStatusDataStore
var dataPanelDataStore = window.dataPanelDataStore

@connect((store)=>{    
    return {
        articles:store.articles,
        auth:store.auth.token

    };
    
})

export default class SaveArticle extends React.Component {
    constructor(props){
        super(props);
        var currentStatus = pageStatusDataStore.getCurrentStatus();
        this.state={
            DVM:[],
            obj:dataPanelDataStore.getBlockObjList(currentStatus,"Arch Obj"),
            tables:dataPanelDataStore.getBlockObjList(currentStatus,"Tables"),
            residence:dataPanelDataStore.getBlockObjList(currentStatus,"Residence Time")
        }
    }

    componentDidMount() {

      setCardDragable(ReactDOM.findDOMNode(this));     
      handleFocus(ReactDOM.findDOMNode(this));   
    }
    handleSubmit(e) {
       
        e.preventDefault();
        //get fields value
        const { getFieldsValue } = this.props.form;

        var formValues = getFieldsValue();
        formValues.SIZE = [];
        formValues.TABLES = [];
        formValues.TABLESDSC=[];

        //to valid the input
        var valid = true;
      
        //check whether input the article name or not
        if(valid && !formValues["ARTICLE_NAM"]){
          valid = false;
          const modal = Modal.warning({
              title: 'Warning! ',
              content: 'The Article Name Should not be Empty!'
          });
        }
        //article description
        if(valid && formValues["ARTICLE_DSC"] == undefined){
          formValues["ARTICLE_DSC"] = "";
        }
        if(valid){//check table size
            
            this.state.tables.map(table=>{
                if(valid){
                    formValues.TABLES.push(table.FACTOR_NAME);
                    if(formValues[table.FACTOR_NAME+"_SIZE"] == undefined){
                        formValues[table.FACTOR_NAME+"_SIZE"] = 0;
                        
                    }
                    if(isNaN(formValues[table.FACTOR_NAME+"_SIZE"])){
                        valid = false;
                        const modal = Modal.warning({
                            title: 'Warning! ',
                            content: 'Input valid number for table size!'
                        });
                    }
                    
                    formValues.SIZE.push(formValues[table.FACTOR_NAME+"_SIZE"]);
                    
                        
                } 
            })
                
            
        }
        if(valid){
            this.state.tables.map(table=>{
                if(formValues[table.FACTOR_NAME+"_DESC"] == undefined){
                    formValues[table.FACTOR_NAME+"_DESC"] = "";
                }
                formValues.TABLESDSC.push(formValues[table.FACTOR_NAME+"_DESC"]);
            })
                
            
        }
        
        //saving potential
        if(valid && formValues["SAVING_EST"] == undefined){
          formValues["SAVING_EST"] = "";
        }
        if(valid && isNaN(formValues["SAVING_EST"])){
            valid = false;
            const modal = Modal.warning({
              title: 'Warning! ',
              content: 'Input the Correct Number!'
            });
        }
        if(valid && formValues["SAVING_EST_P"] == undefined){
          formValues["SAVING_EST_P"] = "";
        }
        if(valid && isNaN(formValues["SAVING_EST_P"])){
            valid = false;
            const modal = Modal.warning({
              title: 'Warning! ',
              content: 'Input the Correct Number!'
            });
        }
        if(valid && formValues["SAVING_ACT"] == undefined){
          formValues["SAVING_ACT"] = "";
        }
        if(valid && isNaN(formValues["SAVING_ACT"])){
            valid = false;
            const modal = Modal.warning({
              title: 'Warning! ',
              content: 'Input the Correct Number!'
            });
        }
        if(valid && formValues["SAVING_ACT_P"] == undefined){
          formValues["SAVING_ACT_P"] = "";
        }
        if(valid && isNaN(formValues["SAVING_ACT_P"])){
            valid = false;
            const modal = Modal.warning({
              title: 'Warning! ',
              content: 'Input the Correct Number!'
            });
        }
        //comment
        if(valid && formValues["COMMENT"] == undefined){
          formValues["COMMENT"] = "";
        }
        //dispatch post article action
        if(valid){
            const {user} = this.props.auth;
            //add extra field to formValues
            formValues.CUSTOMER_ID = user.CUSTOMER_ID;
            formValues.USERNAME = user.USERNAME;            
            console.log(formValues);

            
            //post article
            this.props.dispatch(PostArticle(formValues))
        }

    }
    CloseCard(){
      
        var currentStatus = pageStatusDataStore.getCurrentStatus();

        displayAreaChangeActions.displayAreaRemoveCardAction(currentStatus, this.props.card.id);
       
    }
    changeDVMMethods(checkedValues){
        this.setState({
            DVM:checkedValues
        });
    }
    render() {
        const that = this;	

        const DVM_Methods = [
         
            {label:"Avoidance",value:"Avoidance"},
            {label:"Summarization",value:"Summarization"},
            {label:"Deletion",value:"Deletion"},
            {label:"Archiving",value:"Archiving"}
        ]

        const { DVM } = this.state;  

        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 18 }
        };
        const { getFieldProps } = this.props.form;
        const {setFieldsInitialValue} = this.props.form; 

        var currentStatus = pageStatusDataStore.getCurrentStatus();
        const { obj } = this.state; 
        const { tables } = this.state;
        const { residence } = this.state;
     
    	return (
            <div style={this.props.card.style} className="saveCard aligncenter">
            <Card  title="Save as Article" extra={<Icon type="cross" onClick = {this.CloseCard.bind(this)}/>}>
            <p>Basic Information</p>
            <hr />
            <br />
            <Form horizontal className="ant-advanced-search-form" onSubmit={this.handleSubmit.bind(this)}>
            <FormItem
            {...formItemLayout}
            label="Article Name"
            >
            <Input placeholder="Article Name"
            {...getFieldProps('ARTICLE_NAM')}
            />
            </FormItem>

            <FormItem
            {...formItemLayout}
            label="Article Description"
            >
            <Input placeholder="Article Description"
            {...getFieldProps('ARTICLE_DSC')}
            />
            </FormItem>

            <FormItem
            {...formItemLayout}
            label="Archiving Object"
            >
            <Input placeholder="Archiving Object" disabled="true"
            {...getFieldProps('ARCHOBJ', {initialValue:obj[0].FACTOR_NAME})}
            />
            </FormItem>

            <p>Tables</p>
            <hr />
            <br />            
            <Row gutter={16}>
                <Col sm={12}>
                {
                  tables.map((table,idx)=>{
      
                    return (       
                        <FormItem                        
                        label={table.FACTOR_NAME}
                        labelCol={{ span: 10 }}
                        wrapperCol={{ span: 12 }}
                        >
                        <Col span="15">
                            <Input
                            {...getFieldProps(table.FACTOR_NAME+"_SIZE")}
                            />
                        </Col>
                        <Col span="3">
                            <p className="ant-form-split">GB</p>
                        </Col>
                      </FormItem>
                      )
                    })
                  }
                </Col>
                <Col sm={12}>
                {
                    tables.map((table,idx)=>{
                        return (
                            <FormItem                         
                            label="Description:"
                            labelCol={{ span: 6 }}
                            wrapperCol={{ span: 16 }}
                            >
                            <Input
                            {...getFieldProps(table.FACTOR_NAME+"_DESC")}
                            />
                            </FormItem>
                        )
                    })
                }
                </Col>
            </Row>

            
            <p>Dvm Methods</p>
            <hr />
            <br/>
            <div className="aligncenter margin-bottom10">
                <CheckboxGroup options={DVM_Methods} defaultValue={this.state.DVM} onChange={this.changeDVMMethods.bind(this)}/>
            </div>

            
            { 
                DVM.map((one)=>{
                    switch(one){
                        case "Avoidance":{
                            return (
                                <FormItem
                                {...formItemLayout}
                                label="Avoidance:"
                                >
                                <Input type="textarea"  placeholder="Current Strategy Of your System" 
                                {...getFieldProps('AVOIDANCE')}
                                />
                                </FormItem>
                            )
                        }
                        case "Summarization":{
                            return (
                                <FormItem
                                {...formItemLayout}
                                label="Summarization:"               
                                >
                                <Input type="textarea" placeholder="Current Strategy Of your System"
                                {...getFieldProps('SUMMARIZATION')}
                                />
                                </FormItem>
                            )
                        }
                        case "Deletion":{
                            return (
                                <FormItem
                                {...formItemLayout}
                                label="Deletion:"                                           
                                >
                                <Input type="textarea" placeholder="Current Strategy Of your System" 
                                {...getFieldProps('DELETION')}
                                />
                                </FormItem>
                            )
                        }
                        case "Archiving":{
                            return (
                                <div>

                                <FormItem
                                {...formItemLayout}
                                label="Residence Time"
                                >
               
                                <div>
                                    <InputNumber  min={12} max={999}                                     
                                    {...getFieldProps('RESIDENCE',{initialValue:residence[0].FACTOR_NAME})}
                                    /> 
                                    <p className="ant-form-text" >Month</p>
                                </div>
               
                                </FormItem>  
        
                                <FormItem
                                {...formItemLayout}
                                label="Archiving:"               
                                >
                                <Input type="textarea" placeholder="Current Strategy Of your System"
                                {...getFieldProps('ARCHIVING')}
                                />
                                </FormItem>

                                </div>
                            )
                    }

                }
            })
        }
         

            <p>Saving Potential</p>
            <hr />
            <br />
         
            <FormItem
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 12 }}
            label="Estimated Saving Potential(GB)"
            >
            <Input placeholder="Estimated Saving Potential" 
            {...getFieldProps('SAVING_EST')}
            />
            </FormItem>

            <FormItem
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 12 }}
            label="Estimated Saving Potential(%)"
            >
            <Input placeholder="Estimated Saving Potential" 
            {...getFieldProps('SAVING_EST_P')}
            />
            </FormItem>

            <FormItem
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 12 }}
            label="Actual Saving Potential(GB)"
            >
            <Input placeholder="Actual Saving Potential" 
            {...getFieldProps('SAVING_ACT')}
            />
            </FormItem>

            <FormItem
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 12 }}
            label="Actual Saving Potential(%)"
            >
            <Input placeholder="Actual Saving Potential" 
            {...getFieldProps('SAVING_ACT_P')}
            />
            </FormItem>
          
            <p>Comments</p>
            <hr />
            <br />
         
            <FormItem
            {...formItemLayout}
            label="Comment"
            >
            <Input type="textarea" placeholder="Comments" 
            {...getFieldProps('COMMENT')}
            />
            </FormItem>
            
            <FormItem
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 10 }} 
            label=" "          
            >
            <Button type="primary" htmlType="submit">Save</Button>
            </FormItem>

          </Form>
        </Card>
        </div>
         
      

      );
  }
}
SaveArticle = Form.create()(SaveArticle);