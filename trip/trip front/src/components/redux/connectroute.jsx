import {connect}   from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from "./store/storeroute.jsx"
import {Elems} from "../elem/elems.jsx"
import {Elem} from "../elem.jsx"
import {Regions } from "../regions.jsx"
import {Country } from "../country.jsx"
import {Trips } from "../trips.jsx"
import {ElemsTrips } from "../elemtrips.jsx"
import {ElemsTrek } from "../elemtrek.jsx"
import {Trek } from "../trek.jsx"

export let ElemsRedux = connect(mapStateToProps,mapDispatchToProps)(Elems)
export let ElemRedux = connect(mapStateToProps,mapDispatchToProps)(Elem)

export let RegionsRedux = connect(mapStateToProps)(Regions)
export let CountryRedux = connect(mapStateToProps)(Country)
export let ElemsTripsRedux = connect(mapStateToProps)(ElemsTrips)
export let ElemsTrekRedux = connect(mapStateToProps)(ElemsTrek)
export let TripsRedux = connect(mapStateToProps)(Trips)
export let TrekRedux = connect(mapStateToProps)(Trek)


