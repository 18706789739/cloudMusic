import React, { Component } from 'react';
import {Router ,Route ,IndexRoute} from 'react-router';
import Frame from '../layouts/Frame.js'
import Home from '../views/Home.js'

const routes = history =>(
	<Router history={history}>
		<Route path="/" component={Frame} >
			<IndexRoute component={Home} />
		</Route>
	</Router>
)

export default routes;