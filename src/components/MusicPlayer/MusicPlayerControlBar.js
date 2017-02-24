import React, { Component } from 'react';
import Icon from '../../share/iconfont/Icon.js'
require('./MusicPlayerControlBar.css')

export default class MusicPlayerControlBar extends Component {
	render(){
		return (
			<div className="music-player-control-bar">
				<div className="music-player-btnmode"><Icon fontname="icon-suijibofang01" /></div>
				<div className="music-player-btnprev"><Icon fontname="icon-shangyishou" /></div>
				<div className="music-player-btnplay"><Icon fontname="icon-bigbofang" /></div>
				<div className="music-player-btnnext"><Icon fontname="icon-xiayishou" /></div>
				<div className="music-player-btnlist"><Icon fontname="icon-list" /></div>
			</div>
		)
	}
}