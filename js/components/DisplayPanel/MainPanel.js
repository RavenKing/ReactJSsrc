import React from "react";
import ReactDOM from "react-dom";
import { Button,Card,Icon,Table,Input } from "antd";

import ArticleMenuTile from "./ArticleMenuTile";
import { RemoveCard,AddCard }  from "../../Actions/KnowledgeAction";
import { setCardDragable,handleFocus,setAreaDropable } from "../../interactScript";
import { connect } from "react-redux";


@connect((store)=>{    
    return {
        articles:store.articles
    };
    
})
export default class MainPanel extends React.Component {
   constructor(props) {
      super(props)    
      //   const { results } = this.props;
      const {query } =this.props;
      var tabledata ;
      if(query!="")
      {
        tabledata = this.setNewData(query.object);
      }
      console.log(this.props);


      this.state={ 
          selectedRowKeys: [],  // 这里配置默认勾选列
          loading: false,
          query:query.object,
          tabledata:tabledata
      }



    }


    CloseMainCardPanel(){
      var data = {
        type:"main"
      };
      this.props.dispatch(RemoveCard(data));

    }

    componentDidMount(){
      
      setCardDragable(ReactDOM.findDOMNode(this));  
      handleFocus(ReactDOM.findDOMNode(this));   
                
    }

    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.setState({
        selectedRowKeys:selectedRowKeys
      });
      var length = selectedRowKeys.length;
      this.props.dispatch(AddCard(selectedRowKeys[length-1]));
      
    }




    addnewCard(e)
    {

      console.log(e.target.rel)
      var data = {
        data_id:e.target.rel,
        type:e.target.type
      };
      this.props.dispatch(AddCard(data));
    }


    setNewData(filterdata)
    {

      const { results } = this.props;
      const searcharray = results.concat();
      var data = searcharray.filter((one)=>{

        if(one.ARTICLE_NAM.indexOf(filterdata)!=-1)
        {
          return one;     
        }
        else if(one.ARTICLE_DSC.indexOf(filterdata)!=-1)
        {
          return one;
        }

      });

      var tabledata = data.filter((result)=>{
          if(result.FACTOR_TYPE==this.props.type)
          {if(this.props.type=="DVM")
          return {
            key:result.ARTICLE_ID,
            article_nam:result.ARTICLE_NAM,
            article_dsc:result.ARTICLE_DSC,
            archobj:result.ARCHOBJ,
            total_size:result.TOTAL_SIZE, 
            type:result.FACTOR_TYPE
          }
          else if(this.props.type=="CAP")
          {
            return {
            key:result.ARTICLE_ID,
            article_nam:result.ARTICLE_NAM,
            article_dsc:result.ARTICLE_DSC,
            type:result.FACTOR_TYPE}
          }
        }
      });
      return tabledata;
    }

    filterSearch(e){
      var tabledata = this.setNewData(e.target.value);
      this.setState({
        "tabledata" : tabledata

      })

    }


    render() {
      var results;
      var data;
      if(!this.state.tabledata)
      {
        const { articles} = this.props;
        results = articles.articles.results;
        data = results.filter((result)=>{

          if(result.FACTOR_TYPE==this.props.type)
          {if(this.props.type=="DVM")
          return {
            key:result.ARTICLE_ID,
            article_nam:result.ARTICLE_NAM,
            article_dsc:result.ARTICLE_DSC,
            archobj:result.ARCHOBJ,
            total_size:result.TOTAL_SIZE, 
            type:result.FACTOR_TYPE
          }
          else if(this.props.type=="CAP")
          {
            return {
            key:result.ARTICLE_ID,
            article_nam:result.ARTICLE_NAM,
            article_dsc:result.ARTICLE_DSC,
            type:result.FACTOR_TYPE}
          }
        }

        });
      }
      else{
        data= this.state.tabledata
      }
   

       if(this.props.type == "DVM") 
      {var columns = [        
        {
          title: 'Article Name',
          width:150,
          dataIndex: 'ARTICLE_NAM',
          render:(text,record)=><a href='#' onClick={this.addnewCard.bind(this)} rel={record.ARTICLE_ID} type={record.FACTOR_TYPE}>{text}</a>
        },
        {
          title: 'Article Description',
          width:150,
          dataIndex: 'ARTICLE_DSC'
        },
        {
          title: 'Archiving Object',
          width:150,
          dataIndex: 'ARCHOBJ'
        },
        {
          title: 'Total Size (GB)',
          width:150,
          dataIndex: 'TOTAL_SIZE'
        }];
      }
      else if(this.props.type == "CAP")
      {
      var columns = [ 
        {
          title: 'Article Name',
          width:150,
          dataIndex: 'ARTICLE_NAM',
          render:(text,record)=><a href='#' onClick={this.addnewCard.bind(this)} rel={record.ARTICLE_ID} type={record.FACTOR_TYPE}>{text}</a>
        },
        {
          title: 'Article Description',
          width:150,
          dataIndex: 'ARTICLE_DSC'
        }] 

      }
               
  console.log(data);
  console.log(columns)
        var title = this.props.type == "CAP"?"Capacity Articles":"DVM Articles";
        return (
          <div className="main-panel">
           <Card title={title} extra={<Icon type="cross" onClick={this.CloseMainCardPanel.bind(this)} />}  >
          <div class="margin-bottom10">
          <Input placeholder="Search help" size="small" onChange={this.filterSearch.bind(this)} defaultValue={this.state.query?this.state.query:""}/>
          </div>
          <Table columns={columns} dataSource={data}  pagination={{ pageSize: 10 }} scroll={{ y: 240 }} />
          </Card>
        </div>

      );
  }
}
