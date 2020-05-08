import React from 'react'
import {Link} from 'react-router-dom'

export class User extends React.Component{

	render(){
		return(
			<div>
				<Link  to="/user/newTrip"><h2>Создать трип</h2></Link>
		 	</div>
		)
	}
}