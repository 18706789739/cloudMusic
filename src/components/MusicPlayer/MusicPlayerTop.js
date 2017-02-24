import React, { Component } from 'react';
import Icon from '../../share/iconfont/Icon.js';
require('./MusicPlayerTop.css')

export default class MusicPlayerTop extends Component {
	render(){
		const {
			songname,
			auther
		} = this.props;
		return (
			<div className="music-player-top">
				<div className="music-player-icon"><Icon fontname="icon-fanhui" /></div>
				<div className="music-player-name music-list-textrow">{songname}</div>
				<div className="music-player-auther music-list-textrow">{auther}</div>
			</div>
		)
	}
}