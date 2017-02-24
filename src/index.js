import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import configureStore from './redux/configureStore';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { hashHistory } from 'react-router';
import routes from './routes/index.js';
import DevTools from './redux/DevTools';

import normalize from 'normalize.css'

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);
history.listen(location => console.log(location.pathname))

ReactDOM.render(
    <Provider store={store}>
	    <div>
	      {routes(history)}
	      <DevTools />
	    </div>
	</Provider>,
	document.getElementById('root')
)