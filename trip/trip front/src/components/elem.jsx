import React from 'react';
import {Link} from 'react-router-dom';


export class Elem extends React.Component{

  Route = this.Route.bind(this)

     async Route()  {
        let root = window.location.pathname
        let wrap = this.props.name

      if(root=== `/regions/${this.props.route.region}/${this.props.route.country}/${this.props.route.triptitle}`) {
             await  this.props.trektitle(wrap)
            }
      else if(root=== `/regions/${this.props.route.region}/${this.props.route.country}`) {
             await  this.props.triptitle(wrap)
            }
      else if(root ===`/regions/${this.props.route.region}`) {
        await this.props.country(wrap)
      }
      else {await  this.props.region(wrap)}
    }

  render(){
     let root = window.location.pathname
     let wrap = this.props.name
    return(
      <div className={`${wrap}`}>
      {root}
      <Link onClick={this.Route} to={`${root}/${wrap}`}><h2>{wrap}</h2></Link>
      </div>
    )
  }
}