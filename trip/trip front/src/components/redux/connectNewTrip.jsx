import {connect}   from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from "./store/storeNewTrip.jsx"
import {NewTrip} from "../newtrip.jsx"


export let NewTripRedux = connect(mapStateToProps,mapDispatchToProps)(NewTrip)
