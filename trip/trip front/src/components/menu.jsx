import React from 'react';
import {Link} from 'react-router-dom';

import {RegistrationRedux} from "./redux/connectregistration.jsx"

import {LoginRedux} from "./redux/connectlogin.jsx"



export class Menu extends React.Component{
  state={ loginLinkClicked: true, registrationLinkClicked :true}

  loginClicked = this.loginClicked.bind(this)
  registrationClicked = this.registrationClicked.bind(this)

  loginClicked () {
    this.setState({loginLinkClicked: !this.state.loginLinkClicked})
  }
  registrationClicked () {
    this.setState({registrationLinkClicked: !this.state.registrationLinkClicked})
  }

  render(){
    return(
      <div className="topMenu">
        <Link  to="/regions"><h2>Страны</h2></Link>

        <Link  to="/photos"><h2>Фото</h2></Link>
        {
          this.props.c.userLogin || window.localStorage.userLogIn ? "" :
          (
            this.state.loginLinkClicked ?
            <button onClick= {this.loginClicked}><h2>Войти</h2></button> :
            <div>
              <LoginRedux className='see' />
              {
                (this.props.c.userLogin === false) ?
                <span> Неверное имя пользователя<br></br> или пароль </ span> : ''
              }
              <button onClick= {this.loginClicked}><h2>close</h2></button>
            </div>
          )
        }
        {
          this.props.c.userLogin || window.localStorage.userLogIn ? "" :
          (
            this.state.registrationLinkClicked ?
            <button onClick= {this.registrationClicked}><h2>Регистрация</h2></button> :
            <div>
              <RegistrationRedux className='see' />
              <button onClick= {this.registrationClicked}><h2>close</h2></button>
            </div>
          )
        }
        <div>
          {
            this.props.c.userLogin || window.localStorage.userLogin ?
            <Link to="/user"><h3>Hi  {this.props.c.userLogin || window.localStorage.userLogin} </h3></Link> : ''
          }
            <br></br>
          <Link to="/user"><h2> Юзер</h2></Link>
        </div>
      </div>
    )
  }
}