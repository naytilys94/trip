import React from 'react';
import { Maps} from "./maps.jsx"
import {Graph} from "./Function/graphQLFetch.js"
import {Parse} from "./Function/trekParse.js"

export class TrekCard extends React.Component{

  state={tripInfo:{}, trek: {}, length:'',}

  Trip = this.Trip.bind(this)
  ParseTrek = this.ParseTrek.bind(this)

  async Trip() {

    const query = `{
        getTrip(id: ${this.props.id}) {
          id
          region
          country
          title
          text
          trek
    }}`

    const data = await Graph(query)
    console.log(data)
    this.setState({tripInfo: data.getTrip})
  }
  async ParseTrek(trek){
    this.setState({trek: await Parse(trek)})
    console.log(this.state.trek)
  }
  async componentDidMount() {
      await this.Trip()
      await this.ParseTrek(this.state.tripInfo.trek)
    }

  render(){
    return(
      <div className="card-trip">
        <div className="card-trip-view">
          <div className="card-trip-info">
            <span>region: {this.state.tripInfo.region}</span>
            <span>country: {this.state.tripInfo.country}</span>
            <span>title: {this.state.tripInfo.title}</span>
            <span>about: {this.state.tripInfo.text}</span>
          </div>
          <div className="card-trip-info">
            <span>length: {this.state.length}</span>
            <span>time: {this.state.trek.time}</span>
            {this.state.trek.height ?
              <dl className="Card-Trip-Info-height">
              <dt>height:</dt>
                <dd>min: {this.state.trek.height.min}</dd>
                <dd>max: {this.state.trek.height.max}</dd>
                <dd>delta: {this.state.trek.height.delta}</dd>
              </dl> : ""}
          </div>
        </div>
        <div className="card-trip-map">
          <Maps />
        </div>
        <div className="card-trip-photos">

        </div>
      </div>
      )
  }
}