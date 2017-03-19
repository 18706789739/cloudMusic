import React, { Component } from 'react';
import Icon from '../../share/iconfont/Icon.js'
require('./MusicPlayerControlBar.css')

export default class MusicPlayerControlBar extends Component {

	handleClickPlay = ()=>{
		this.props.setMusicPlay();
	}
	handleClickNext = ()=>{
		this.props.setMusicNext();
	}
	handleClickPrev = ()=>{
		this.props.setMusicPrev();
	}
	handleClickMode = ()=>{
		this.props.setMusicMode();
	}
	render(){
		return (
			<div className="music-player-control-bar">
				<div className="music-player-btnmode"><Icon fontname="icon-suijibofang01" /></div>
				<div className="music-player-btnprev" onClick={this.handleClickPrev}><Icon fontname="icon-shangyishou" /></div>
				<div className="music-player-btnplay" onClick={this.handleClickPlay}><Icon fontname="icon-bigbofang" /></div>
				<div className="music-player-btnnext" onClick={this.handleClickNext}><Icon fontname="icon-xiayishou" /></div>
				<div className="music-player-btnlist"><Icon fontname="icon-list" /></div>
			</div>
		)
	}
}