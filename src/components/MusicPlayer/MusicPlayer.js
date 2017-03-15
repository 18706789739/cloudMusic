import React, { Component } from 'react';
import MusicPlayerTop from './MusicPlayerTop.js';
import MusicPlayerWord from './MusicPlayerWord.js';
import MusicPlayerControlBar from './MusicPlayerControlBar.js';

require('./MusicPlayer.css')

export default class MusicPlayer extends Component {
	render(){
		const settop = {
			songname:'Layer',
			auther:'Rihanna'
		}
		return (
			<div className="music-player">
				<div className="music-player-cover">
					<MusicPlayerTop {...settop} />
					<MusicPlayerWord />
					<MusicPlayerControlBar {...this.props}/>
				</div>
			</div>
		)
	}
}