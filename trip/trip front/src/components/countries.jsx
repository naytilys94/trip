import React from 'react';
import {ElemsRedux} from "./redux/connect/connectroute.jsx"

export class Countries extends React.Component {

  render(){
    return(
        <ElemsRedux storeName={"Trips"} name={"country"}/>
    )
  }
}