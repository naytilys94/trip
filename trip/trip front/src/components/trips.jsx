import React from 'react';
import {ElemsTripsRedux} from "./redux/connectroute.jsx"

export class Trips extends React.Component{

	render(){
		return(
			<ElemsTripsRedux storeName={"Trips"} name={"title"}/>
			)
	}
	}
