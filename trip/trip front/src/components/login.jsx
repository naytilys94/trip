import React from 'react'
import { GraphQLClient } from 'graphql-request'
import {Input} from "./components/input.jsx"

const gql = new GraphQLClient("http://localhost:4000/graphql", { headers: {} })


export class LogIn extends React.Component {

  Send = this.Send.bind(this)

  async Send() {

    let string=`mutation \{ authenticate(login: "${this.props.c.username}", password: "${this.props.c.userpassword}")\{id login token\} \}`
    gql.request(string).then(res => {
      console.log(res.authenticate)
         try {this.props.userLogin(res.authenticate.login)
              window.localStorage.userLogin = res.authenticate.login
              window.localStorage.userLogIn = true
              window.localStorage.userToken = res.authenticate.token
              window.localStorage.userId = res.authenticate.id
         }
         catch {this.props.userLogin(false)}
    })
  }
  render() {
    return (
      <div>
      <h1>Вход</h1>
      <Input name={"Login"} refreshRedux={this.props.userName} />
      <Input name={"Password"} refreshRedux={this.props.userPassword}/>
      <button disabled={!this.props.c.username|| !this.props.c.userpassword} onClick={this.Send} > log in </ button>
      </div>
    )
  }
}