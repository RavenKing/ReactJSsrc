import React from "react";
import { Button,Card,Carousel } from "antd";
import { Link } from "react-router";



export default class DisplayPanel extends React.Component {   
 componentWillMount(){
         

  const { articles } = this.props;


if( articles != null )
{
     this.setState={
articles: articles,
         }
      }
}


   reloadData()
   {
   }
 onChange(a, b, c) {
  console.log(a, b, c);
}

    render() {
    	const { articles } = this.props;


    	var Display;

       var test;
    	test =articles;
    	console.log(test);
    	if(test.fetched === true)
    	{ 

    		var array = test.articles;

    		const { results } = array;
    		console.log( results );

    		Display= results.map((result)=><Card class = "tile" title={ result.ARCHOBJ }  style={{ width: 200 }}><p>{result.ARTICLE_NAM }</p>

    		 <p>{result.ARTICLE_DSC }</p>
				<p>{"Total Size:" + result.TOTAL_SIZE} </p>

    			</Card>);
				
    	}
    	else
    	{

    		Display = <h1>shit</h1>
    	}

   return (
     <div>
     
     <Card title="DVM Articles" extra="Customer Number" style={{ width: 800 }} >

{Display}

    </Card>
     


    </div>
      );
  }
}
