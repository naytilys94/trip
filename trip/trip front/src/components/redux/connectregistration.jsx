import {connect}   from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from "./store/storeregistration.jsx"
import {Registration} from "../registration.jsx"

export let RegistrationRedux = connect(mapStateToProps,mapDispatchToProps)(Registration)
