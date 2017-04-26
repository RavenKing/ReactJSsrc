import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Card,Icon, Form,Table, Input, Button, Modal } from 'antd';

import { AddRelation } from "../../Actions/KnowledgeAction";
import { setCardDragable,handleFocus } from "../../interactScript";
const FormItem = Form.Item;
var global = window;
var displayAreaChangeActions = window.displayAreaChangeActions
var pageStatusDataStore = window.pageStatusDataStore


var EditableCell = React.createClass({
    getInitialState: function getInitialState() {
      return {
        value: this.props.value,
        editable: false,
      };
    },
    componentWillReceiveProps:function componentWillReceiveProps(nextProps){
        this.setState({
          value:nextProps.value,
          onChange:nextProps.onChange
        })
    }, 
    handleChange:function handleChange(e){
      const value = e.target.value;
      this.setState({ value });
    },
    check:function check(){
      this.setState({ editable: false });
      if (this.props.onChange) {
        this.props.onChange(this.state.value);
      }
    },
    edit:function edit(){
      this.setState({ editable: true });
    },
    render:function render() {
      const { value, editable } = this.state;
      return (
        <div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper">
              <Input
                value={value}
                onChange={this.handleChange.bind(this)}
                onPressEnter={this.check.bind(this)}
              />
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check.bind(this)}
              />
            </div>
            :
            <div className="editable-cell-text-wrapper">
              {value || ' '}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit.bind(this)}
              />
            </div>
        }
      </div>
    );
  }
  });

    



  var RelationCard = React.createClass({
    displayName: "RelationCard",

    getInitialState: function getInitialState() {
      return {
        add:false,
        tabledata:this.props.card.relations
      };
    },
    removeCard: function removeCard() {     
      
      var currentStatus = pageStatusDataStore.getCurrentStatus();

      displayAreaChangeActions.displayAreaRemoveCardAction(currentStatus, this.props.card.id);
        
      
    },
    componentDidMount:function componentDidMount() {
      this.interactable = global.setCardDragable(this.getDOMNode(), this.props.card.id);
      global.handleFocus(this.getDOMNode());  
    },   
    onCellChange:function(index, key){
      return (value) => {
        const tabledata = [...this.state.tabledata];
        tabledata[index][key] = parseFloat(value).toFixed(2);
        this.setState({ tabledata:tabledata });
        this.editRelation(tabledata[index],index);
      };
    },

    filterSearch:function filterSearch(e){
      const { relations } = this.props.card;
      const searcharray = relations.concat();
      var filterdata = e.target.value;
      var data = searcharray.filter((one)=>{

        if(one.REPORT_NAME.indexOf(filterdata)!=-1)
        {
          return one;     
        }
        else if(one.RELATED_NAME.indexOf(filterdata)!=-1)
        {
          return one;
        }

      });

      this.setState({
        tabledata : data

      })

    },
    changeAddStatus:function changeAddStatus(){
      this.setState({
        add:true
      })
    },
    addRelation:function addRelation(data){
      const { tabledata } = this.state;
      
      var report_name = this.refs.REPORT_NAME.refs.input.value;
      var related_name = this.refs.RELATED_NAME.refs.input.value;
      var factor = this.refs.FACTOR.refs.input.value;
      var valid = true;
      if(!related_name || !factor){
        valid = false;
        const modal = Modal.warning({
          title: 'Fields are empty! ',
          content: 'The fields should not be empty!',
        })
      }
      if(valid && isNaN(factor)){
        valid = false;
        const modal = Modal.warning({
          title: 'Factor is not valid! ',
          content: 'Please input a valid number for factor!',
        })
      }
      if(valid){
        var newData = {
          REPORT_NAME:report_name,
          RELATED_NAME:related_name,
          FACTOR:factor
        }

        if(displayAreaDataStore.addRelation(newData)){
          const modal = Modal.success({
            title: 'Add Successfully! ',
            content: 'The relationship has been added!',
          })
          this.setState({
            add:false,
            tabledata: [...tabledata, newData]
          })
          var currentStatus = pageStatusDataStore.getCurrentStatus();
          var data = {
            relations:this.state.tabledata,
            info:"REL"
          };
          displayAreaChangeActions.displayAreaChangeCardAction(currentStatus,data,"");
        }
      }
      
    },
    editRelation:function editRelation(record,index){
      if(displayAreaDataStore.updateRelation(record)){
        const tabledata = [...this.state.tabledata];
        tabledata.splice(index, 1);
        const modal = Modal.success({
          title: 'Update Successfully! ',
          content: 'The relationship has been updated!',
        })
        var currentStatus = pageStatusDataStore.getCurrentStatus();
        var data = {
          relations:tabledata,
          info:"REL"
        };
        displayAreaChangeActions.displayAreaChangeCardAction(currentStatus,data,"");
      }
    },
    deleteRelation:function deleteRelation(record,index){
      if(displayAreaDataStore.deleteRelation(record)){
        const tabledata = [...this.state.tabledata];
        tabledata.splice(index, 1);
        this.setState({ tabledata:tabledata });
        const modal = Modal.success({
          title: 'Delete Successfully! ',
          content: 'The relationship has been deleted!',
        })
        var currentStatus = pageStatusDataStore.getCurrentStatus();
        var data = {
          relations:tabledata,
          info:"REL"
        }
        //displayAreaChangeActions.displayAreaChangeCardAction(currentStatus,data,"");
      }
    },
    render:function render() {
        const { tabledata } = this.state;
        var that = this;
        var columns = [{
          title: 'Report Name',
          width:150,
          dataIndex: 'REPORT_NAME',
        },{
          title: 'Related Report Name',
          width:250,
          dataIndex: 'RELATED_NAME'
        },{
          title: 'Factor',
          width:100,
          dataIndex: 'FACTOR',
          render: (text, record, index) => (
            <EditableCell
              value={text}
              onChange={this.onCellChange(index, 'FACTOR')}
            />
          )
        },{
          title: "Delete",
          width:100,
          render:(text,record,index)=>(
            <span>
              <a href="#" onClick={that.deleteRelation.bind(this,record,index)}><Icon type="delete"/></a>
            </span>
          )
        }];        

        return (
          <div className="relatedCard">
            <Card title="Add Related Reports" extra={<Icon type="cross" onClick = {this.removeCard.bind(this)}/>}>
              <div class="margin-bottom10">
                <Input placeholder="Search help" size="small" onChange={this.filterSearch.bind(this)}/>
              </div>
              <Table columns={columns} dataSource={tabledata}  pagination={{ pageSize: 10 }} scroll={{ y: 240 }} />  
              {
                (this.state.add)?
                (
                <div style={{display:"inline"}}>
                <Input className="margin5" style={{width:"100"}} ref="REPORT_NAME" value={that.props.card.report_name} placeholder="report name" />
           
                <Input className="margin5" style={{width:"200"}} ref="RELATED_NAME" placeholder="related report name" />
            
                <Input className="margin5" style={{width:"100"}} ref="FACTOR" placeholder="factor" />
           
                <a href="#" onClick={that.addRelation.bind(this)}><Icon type="check" /></a>
                </div>
                )
                :
                <div/>
              } 
              <div>           
              <Button type="primary" onClick={this.changeAddStatus.bind(this)}><Icon type="plus"/>Add</Button>
              </div>
              
            </Card>
          </div>
            
             	
      );
    }
});

export default RelationCard;
