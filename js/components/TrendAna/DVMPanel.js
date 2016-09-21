import React from "react";
import { Button,Card,Icon,Input } from "antd";
import RetentionForm from "./RetentionForm";
import ArchivingForm from "./ArchivingForm";
import AvoidanceForm from "./AvoidanceForm";
import DeletionForm from "./DeletionForm";
import SummarizationForm from "./SummarizationForm";




export default class DVMPanel extends React.Component { 

    
    render() {	
      //var editArea = <RetentionForm/>;
    	//var editArea = <ArchivingForm/>; 
      //var editArea = <AvoidanceForm/>; 
      //var editArea = <DeletionForm/>; 
      var editArea = <SummarizationForm/>;
     /* var editArea = (<div>
        <RetentionForm/>
        <ArchivingForm/>
        <AvoidanceForm/>
        <DeletionForm/>
        <SummarizationForm/>
        </div>
      ); */

    	return (
        
        <div className="margin-top10 ">
          <Card className="aligncenter DVMPanel" title="DVM Panel" extra={<Icon type="cross"/>}>
          { editArea }
          <Button type="primary">Save</Button>
          </Card>

        </div>

      );
  }
}
