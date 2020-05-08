import React from 'react';
import {ElemsTrekRedux} from "./redux/connectroute.jsx"

export class Trek extends React.Component{

	render(){
		return(
			<ElemsTrekRedux storeName={"Trips"} name={"title"}/>
			)
	}
	}
