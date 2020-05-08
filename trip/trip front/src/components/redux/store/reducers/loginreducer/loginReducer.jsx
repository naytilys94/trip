 export let loginReducer = (state, action) => {
  if (state === undefined) {
      return {username: '', userpassword:'', userLogin: "", userLogIn: ""}
  }
  if( action.type === 'ADD_USERNAME') {
      return {...state,
              username: action.userName
              }

  }
  if(action.type === 'ADD_USERPASSWORD') {
      return {...state,
              userpassword: action.userPassword
            }
  }
  if(action.type === 'ADD_USERLOGIN') {
      return {...state,
              userLogin: action.userLogin
            }
  }
  if(action.type === 'ADD_LOGINUSER') {
      return {...state,
              userLogIn: action.userLogIn
            }
  }
  return state
}