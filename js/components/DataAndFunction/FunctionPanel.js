import React from "react";
import { Button } from "antd";



export default class FunctionPanel extends React.Component {


    render() {


        return (
                 <div class = "function-panel ">
         <Button type="ghost">Create</Button>
         <Button type="ghost">Edit</Button>
         <Button type="ghost">Delete</Button>
  </div>
      );
  }
}
