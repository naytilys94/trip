export let registrationReducer = (state, action) => {
  if (state === undefined) {
      return {login: '', name: '', surname: '', password:'', birthday: ''}
  }
  if( action.type === 'ADD_LOGIN') {
      return {...state,
              login: action.login
              }
  }
  if(action.type === 'ADD_NAME') {
      return {...state,
              name: action.name
            }
  }
  if(action.type === 'ADD_SURNAME') {
      return {...state,
              surname: action.surname
            }
  }
  if(action.type === 'ADD_PASSWORD') {
      return {...state,
              password: action.password
            }
  }
  if(action.type === 'ADD_PASSWORDTRUE') {
      return {...state,
              passwordTrue: action.passwordTrue
            }
  }
  if(action.type === 'ADD_BIRTHDAY') {
      return {...state,
              birthday: action.birthday
            }
  }
  if(action.type === 'ADD_ABOUTYOU') {
      return {...state,
              aboutyou: action.aboutyou
            }
  }
  return state
}