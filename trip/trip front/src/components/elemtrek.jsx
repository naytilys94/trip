import React from 'react';
import { GraphQLClient } from 'graphql-request'
import {ElemsTemplate} from "./elem/elemstemplate.jsx"

const gql = new GraphQLClient("http://localhost:4000/graphql", { headers: {} })

export class ElemsTrek extends React.Component {
  state= {storage:[] }

  async componentDidMount() {
    let string=`query \{ get${this.props.storeName}(region: "${this.props.route.region}", country: "${this.props.route.country}", title: "${this.props.route.triptitle}") \{ treks \}\}`
    console.log(string)

    await gql.request(string).then(res =>

              {console.log(res)
                for(let i=0; i<res.getTrips[0].treks.length; i++){
              this.state.storage.push(res.getTrips[0].treks[i][this.props.name])}
            })
    this.setState({storage: this.state.storage})
    }
  render(){
    return(
        <ElemsTemplate storeName={this.props.storeName} name={this.props.name} elems={this.state.storage} />
    )
  }
}


