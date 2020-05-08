import React from 'react';
import { GraphQLClient } from 'graphql-request'
import {ElemsTemplate} from "./elemstemplate.jsx"

const gql = new GraphQLClient("http://localhost:4000/graphql", { headers: {} })

export class Elems extends React.Component {
  state= {storage:[] }

  async componentDidMount() {
    let string=''
    let name= this.props.name
    if(name === "country") {string =`query \{   get${this.props.storeName}(region: "${this.props.route.region}") \{ country \}\}`
    }
    else string =`query \{ get${this.props.storeName} \{ ${name} \}\}`
    console.log(string)
    await gql.request(string).then(res =>
            {
              console.log(res)
              for(let i=0; i<res.getTrips.length; i++){
              this.state.storage.push(res.getTrips[i][name])}
            })
    let uniq =  [...new Set(this.state.storage)]
    this.setState({storage: uniq})
  }
  render(){
    return(
        <ElemsTemplate storeName={this.props.storeName} name={this.props.name} elems={this.state.storage} />
    )
  }
}



