import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import { push } from 'react-router-redux';

require('./Home.css');

@connect(state => {
  return {

  };
}, {
  push,
})
export default class Home extends Component{

	componentWillMount(){
		
	}

	render(){


		return (
			<div className="music-home">
				HOme
				<p>1</p>
				<Link to='/viewword'>viewword</Link>
			</div>
		)
	}
}