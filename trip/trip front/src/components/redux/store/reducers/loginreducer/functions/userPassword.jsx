export function userPassword(userPassword) {
  return{
    type: 'ADD_USERPASSWORD',
    userPassword: userPassword
  }
}