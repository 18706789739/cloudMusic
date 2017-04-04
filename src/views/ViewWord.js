import React, { Component } from 'react';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import MusicPlayer from '../components/MusicPlayer/MusicPlayer.js'
import {setMusicPlay,setMusicMode,setMusicNext,setMusicPrev} from '../share/MusicPlayerControlRedux.js'

require('./ViewWord.css');

@connect(state => {
  return {
    music:  	state.home.music.music,
    musiclist:  state.home.music.musiclist,
    mode:  		state.home.music.mode,
    modeArray: 	state.home.music.modeArray,
    musicstatus:state.home.music.musicstatus,
  };
}, {
  push,
  setMusicPlay,
  setMusicMode,
  setMusicNext,
  setMusicPrev,
})
export default class ViewWord extends Component{

	componentWillMount(){
		
	}

	render(){


		return (
			<div className="music-viewword">
				<MusicPlayer {...this.props} />
			</div>
		)
	}
}