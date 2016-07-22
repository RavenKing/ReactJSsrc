import React from "react";
import ReactDOM from "react-dom";
import {Router,Route,IndexRoute,hashHistory} from "react-router";
import Layout from "./components/Layout";
import Article from "./components/Article";
import { Provider } from "react-redux";
import store from "./store";
import DisplayPanel from "./components/DisplayPanel/DisplayPanel";





const app = document.getElementById('app');
ReactDOM.render(
    <Provider store = {store}>
    <Router history={hashHistory}>
    <Route path="/" component={Layout}>
    	<Route path="/articles/(:articles)" component = {Article}>
    	</Route>
    <Provider store = {store}>
	<Route path="/overview/" component = {DisplayPanel}>
    	</Route>
 </Provider>
    </Route>
  </Router>
    </Provider>,
app);
