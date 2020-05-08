import {connect}   from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from "./store/storelogin.jsx"
import {LogIn} from "../login.jsx"
import {Menu} from "../menu.jsx"

export let LoginRedux = connect(mapStateToProps,mapDispatchToProps)(LogIn)

export let MenuRedux = connect(mapStateToProps)(Menu)