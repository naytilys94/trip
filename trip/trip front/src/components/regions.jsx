import React from 'react';
import {ElemsRedux} from "./redux/connectroute.jsx"

export class Regions extends React.Component {

  render(){
	return(
	  <ElemsRedux storeName={"Trips"} name={"region"}/>
	)
  }
}