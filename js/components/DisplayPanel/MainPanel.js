import React from "react";
import ReactDOM from "react-dom";
import { Button,Card,Icon,Table } from "antd";

import ArticleMenuTile from "./ArticleMenuTile";
import { AddCard }  from "../../Actions/KnowledgeAction";

import { CloseMainPanel } from "../../Actions/KnowledgeAction";
import { setCardDragable } from "../../interactScript";
import { setAreaDropable } from "../../interactScript";
import { connect } from "react-redux";


@connect((store)=>{    
    return {
        articles:store.articles
    };
    
})
export default class MainPanel extends React.Component {
    constructor(props) {

        super(props);
        this.state={ 

          selectedRowKeys: [],  // 这里配置默认勾选列
          loading: false,

        }
    }


    CloseMainCardPanel(){

      this.props.dispatch(CloseMainPanel());

    }

    componentDidMount(){
      
      setCardDragable(ReactDOM.findDOMNode(this));     
                
    }

    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.setState({
        selectedRowKeys:selectedRowKeys
      });
      var length = selectedRowKeys.length;
      this.props.dispatch(AddCard(selectedRowKeys[length-1]));
      
    }

    render() {
      const { results } = this.props;
      const { selectedRowKeys } = this.state;
      const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange.bind(this),
      };

      const DisplayMain= results.map((result)=><ArticleMenuTile article_id={result.ARTICLE_ID} archobj={result.ARCHOBJ} 
        article_nam={result.ARTICLE_NAM} article_dsc={result.ARTICLE_DSC} total_size={result.TOTAL_SIZE}/>);
      var data = results.map((result)=>{
          return {
            key:result.ARTICLE_ID,
            article_nam:result.ARTICLE_NAM,
            article_dsc:result.ARTICLE_DSC,
            archobj:result.ARCHOBJ,
            total_size:result.TOTAL_SIZE
          }
      });
        
    	var columns = [        
        {
          title: 'Article Name',
          width:150,
          dataIndex: 'article_nam'
        },
        {
          title: 'Article Description',
          width:150,
          dataIndex: 'article_dsc'
        },
        {
          title: 'Archiving Object',
          width:150,
          dataIndex: 'archobj'
        },
        {
          title: 'Total Size (GB)',
          width:150,
          dataIndex: 'total_size'
        }];
               

        return (
        	<div className="main-panel">
           <Card title="DVM Articles" extra={<Icon type="cross" onClick={this.CloseMainCardPanel.bind(this)} />}  >
        	<Table columns={columns} dataSource={data} rowSelection={rowSelection} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
          </Card>
        </div>

      );
  }
}
