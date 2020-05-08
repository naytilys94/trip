import React from 'react';
import './App.css';

import {Provider}   from 'react-redux';

import {Header} from "./components/Header.jsx"
import {Footer} from "./components/footer.jsx"
import {Content} from "./components/content.jsx"

import {store} from "./components/redux/store/storelogin.jsx"

function App(p) {
  return (
  <Provider store = {store} >
    <div className="App">
      <Header />
      <Content />
      <Footer />
    </div>
    </Provider>
  );
}
export default App