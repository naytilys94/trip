import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import createHistory from "history/createBrowserHistory";

import { User} from "./user.jsx"
import { MainPage} from "./mainPage"


import {RegionsRedux} from "./redux/connectroute.jsx"

import { MenuRedux} from  "./redux/connectlogin.jsx"
import { CountryRedux} from "./redux/connectroute.jsx"
import { TripsRedux} from "./redux/connectroute.jsx"
import { NewTripRedux} from "./redux/connectNewTrip.jsx"


class Photo extends React.Component{
}


class Photos extends React.Component{
}

export let Content = p =>
    <Router history = {createHistory()}>
    <MenuRedux />
        <Switch>
            <Route path="/" component = { MainPage  } exact />
            <Route path="/regions" component = { RegionsRedux  } exact />
            <Route path="/regions/:region" component = { CountryRedux  } exact />
            <Route path="/regions/:region/:country" component = { TripsRedux } exact />
            <Route path="/regions/:region/:country/:trip" component = { TripsRedux } exact />      {/*page for one trip*/}
            <Route path="/regions/:region/:country/:trip/:photo" component = { Photo  } exact />
            <Route path="/photos" component = { Photos  } exact />
            <Route path="/user" component = { User } exact />
            <Route path="/user/newTrip" component = { NewTripRedux } exact />
        </Switch>
    </Router>