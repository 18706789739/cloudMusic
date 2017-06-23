import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import configureStore from './redux/configureStore';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { hashHistory } from 'react-router';
import routes from './routes/index.js';
import DevTools from './redux/DevTools';

import 'whatwg-fetch'
import Promise from 'promise-polyfill'; 
if (!window.Promise) {
  window.Promise = Promise;
}

import normalize from 'normalize.css'
require('./index.css')

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);
history.listen(location => console.log(location.pathname))

var devtool ;
if (process.env.NODE_ENV === 'production') {
  devtool = null;
} else {
  devtool = <DevTools />;
}

ReactDOM.render(
    <Provider store={store}>
	    <div>
	      {routes(history)}
	      {/*devtool*/}
	    </div>
	</Provider>,
	document.getElementById('root')
)