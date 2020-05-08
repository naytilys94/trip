import {store} from "./reducers/reducers.jsx"
import {login} from "./reducers/registrationReducer/functions/login.jsx"
import {name} from "./reducers/registrationReducer/functions/name.jsx"
import {surname} from "./reducers/registrationReducer/functions/surname.jsx"
import {password} from "./reducers/registrationReducer/functions/password.jsx"
import {birthday} from "./reducers/registrationReducer/functions/birthday.jsx"
import {aboutyou} from "./reducers/registrationReducer/functions/aboutyou.jsx"
import {passwordTrue} from "./reducers/registrationReducer/functions/passwordTrue.jsx"



store.dispatch({type: "ADD_LOGIN"})
store.dispatch({type: "ADD_NAME"})
store.dispatch({type: "ADD_SURNAME"})
store.dispatch({type: "ADD_PASSWORD"})
store.dispatch({type: "ADD_PASSWORDTRUE"})
store.dispatch({type: "ADD_BIRTHDAY"})
store.dispatch({type: "ADD_ABOUTYOU"})


export let mapStateToProps = state =>({d: state.d})
export let mapDispatchToProps = {login, name, surname, password, passwordTrue, birthday, aboutyou}
export { store}