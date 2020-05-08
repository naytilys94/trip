import React from 'react';
import {Input} from "./components/input.jsx"
import { GraphQLClient } from 'graphql-request'
import {TextArea} from "./components/textarea.jsx"


const gql = new GraphQLClient("http://localhost:4000/graphql", { headers: {} })


export class Registration extends React.Component {

  Send = this.Send.bind(this)

  async Send() {
    gql.request(`mutation
      createUser ($login: String!, $name: String!, $surname: String!, $password: String!, $birthday: String!, $aboutyou: String!  ) {
        createUser(login: $login, name: $name, surname: $surname, password: $password, birthday: $birthday, aboutyou: $aboutyou, ) {
          login
          name
          surname
          password
          birthday
          aboutyou
        }
      }`,
      {login: this.props.d.login, name: this.props.d.name, surname: this.props.d.surname, password: this.props.d.password, birthday: this.props.d.birthday, aboutyou: this.props.d.aboutyou}
    )
  }

  render() {
    return(
       <div >
        <h1>Pегистрация</h1>
        <Input name={"Login"} refreshRedux={this.props.login} />
        <Input name={"Name"} refreshRedux={this.props.name}/>
        <Input name={"Surname"} refreshRedux={this.props.surname} />
        <Input name={"Password"} refreshRedux={this.props.password}/>
        <Input name={"PasswordTrue"} refreshRedux={this.props.passwordTrue}/>
        <Input  name={"birthday"} refreshRedux={this.props.birthday} />
        <TextArea name={"about you"} refreshRedux={this.props.aboutyou} />
        { this.props.d.password && this.props.d.passwordTrue &&  (this.props.d.password != this.props.d.passwordTrue) ? <span> пароли не совпадают </ span> : "" }
        <button disabled={!this.props.d.login || !this.props.d.name || !this.props.d.surname || !this.props.d.password || !this.props.d.passwordTrue || !(this.props.d.password === this.props.d.passwordTrue)  || !this.props.d.birthday} onClick={this.Send} > register </ button>
         </div>
      )
  }
}