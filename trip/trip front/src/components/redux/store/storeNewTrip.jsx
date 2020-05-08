import {store} from "./reducers/reducers.jsx"
import {title} from "./reducers/newTripReducer/func/title.jsx"
import {country} from "./reducers/newTripReducer/func/country.jsx"
import {region} from "./reducers/newTripReducer/func/region.jsx"
import {aboutyou} from "./reducers/registrationReducer/functions/aboutyou.jsx"


store.dispatch({type: "ADD_TITLE"})
store.dispatch({type: "ADD_REGION"})
store.dispatch({type: "ADD_COUNTRY"})
store.dispatch({type: "ADD_ABOUTYOU"})


export let mapStateToProps = state =>({newTrip: state.newTrip})
export let mapDispatchToProps = {title, country, region, aboutyou}
export {store}