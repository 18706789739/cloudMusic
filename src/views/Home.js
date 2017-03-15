import React, { Component } from 'react';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import MusicPlayer from '../components/MusicPlayer/MusicPlayer.js'

require('./Home.css');

@connect(state => {
  return {
    music: state.home.music.music,
    musiclist: state.home.music.musiclist,
    mode: state.home.music.mode,
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
				<MusicPlayer />
			</div>
		)
	}
}