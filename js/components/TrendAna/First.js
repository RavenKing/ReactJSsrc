import React from "react";

//high charts
import DataPanel from "./datapanel"
import FunctionPanel from "./functionPanel"
import DisplayPanel from "./displaypanel"
import { Link } from "react-router"
import { connect } from "react-redux";
import { fetchArticles,AddCard} from "../../Actions/KnowledgeAction";


     
var pageStatusDataStore=window.pageStatusDataStore;

var rc = window.rc;

  var getState = function getState() {
    return {
      currentStatus: pageStatusDataStore.getCurrentStatus()
    };
  };

@connect((store)=>{    
    return {
        articles:store.articles,
        auth:store.auth
    };
})

export default class Test extends React.Component {
  constructor(props)
  {
    super(props);

    const {auth} = this.props;
    const {user} = auth.token ; 
    
    this.props.dispatch(fetchArticles(user))

    const {location} = this.props; 
    const {query} = location;
    console.log(query);
    if(query.object && query.stype)
    {
      setTimeout(function(){
        var data = {
          query:query,
          type:"main",
          stype:query.stype
        };
        this.props.dispatch(AddCard(data));
      }.bind(this),500)

    }

  }
    
    render() {



        return (
            <div id="wrapper">
            <DataPanel> </DataPanel>
            <DisplayPanel></DisplayPanel>
            <FunctionPanel></FunctionPanel>
            </div>

  
      );
  }
}
