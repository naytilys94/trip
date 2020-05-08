import React from 'react';
import {ElemsRedux} from "./redux/connectroute.jsx"

export class Country extends React.Component {

	render(){
		return(
			<ElemsRedux storeName={"Trips"} name={"country"}/>
			)
	}
}


