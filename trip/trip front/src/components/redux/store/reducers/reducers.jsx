import {createStore, combineReducers} from 'redux'
import {loginReducer} from "./loginreducer/loginReducer.jsx"
import {registrationReducer} from "./registrationReducer/registrationReducer.jsx"
import {routeReducer} from "./routereducer/routereducer.jsx"
import {newTripReducer} from "./newTripReducer/newTripReducer.jsx"

const reducers = combineReducers({
    c: loginReducer,
    d: registrationReducer,
    route: routeReducer,
    newTrip: newTripReducer,
})

export const store = createStore(reducers)