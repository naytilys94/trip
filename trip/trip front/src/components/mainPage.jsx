import React from 'react';
import { View } from "./tripsCardView.jsx"
import {Graph} from "./Function/graphQLFetch.js"


export class MainPage extends React.Component {
	state = {trekInfo: {}}

	TrekLoad = this.TrekLoad.bind(this)

	//PhotoLoad = this.Photoload.bind(this)

	async TrekLoad() {

	    let query = `{
	      getTrips{
	      	  id
	        }}`
	    const data = await Graph(query)
	    await this.setState({trekInfo: data.getTrips})
	}

	async componentDidMount(){
		await this.TrekLoad()
	}

	render(){
		return(
			this.state.trekInfo.length > 0 ?
			<View array={this.state.trekInfo} />: ''
		)
	}
}