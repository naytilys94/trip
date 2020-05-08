import {store} from "./reducers/reducers.jsx"
import {userName} from "./reducers/loginreducer/functions/userName.jsx"
import {userPassword} from "./reducers/loginreducer/functions/userPassword.jsx"
import {userLogin} from "./reducers/loginreducer/functions/userLogin.jsx"
import {userLogIn} from "./reducers/loginreducer/functions/userLogln.jsx"

store.subscribe(() =>store.getState())
store.dispatch({type: "ADD_USERNAME"})
store.dispatch({type: "ADD_USERPASSWORD"})
store.dispatch({type: "ADD_USERLOGIN"})
store.dispatch({type: "ADD_LOGINUSER"})



export let mapStateToProps = state =>({c: state.c})
export let mapDispatchToProps = {userName, userPassword, userLogin, userLogIn}
export { store}