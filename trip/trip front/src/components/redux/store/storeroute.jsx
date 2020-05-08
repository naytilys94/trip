import {store} from "./reducers/reducers.jsx"
import {country} from "./reducers/routereducer/functions/country.jsx"
import {region} from "./reducers/routereducer/functions/region.jsx"
import {trektitle} from "./reducers/routereducer/functions/trektitle.jsx"
import {triptitle} from "./reducers/routereducer/functions/triptitle.jsx"

store.dispatch({type: "ADD_REGION"})
store.dispatch({type: "ADD_COUNTRY"})
store.dispatch({type: "ADD_TRIPTITLE"})
store.dispatch({type: "ADD_TREKTITLE"})

export let mapStateToProps = state =>({route: state.route})
export let mapDispatchToProps = {country, region, triptitle, trektitle}
export { store}