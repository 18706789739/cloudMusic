import React, { Component } from 'react';
import {connect} from 'react-redux';
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
			</div>
		)
	}
}