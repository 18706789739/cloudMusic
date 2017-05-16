import React, { Component } from 'react';
import Icon from '../../share/iconfont/Icon.js'
require('./MusicPlayerControlBar.css')

export default class MusicPlayerControlBar extends Component {

	handleClickPlay = ()=>{
		this.props.setMusicPlay();
	}
	handleClickNext = ()=>{
		this.props.setMusicInfo({
			music:{url:''},
			musicnext: new Date().valueOf()
		})
	}
	handleClickPrev = ()=>{
		this.props.setMusicInfo({
			music:{url:''},
			musicprev: new Date().valueOf()
		})
	}
	handleClickMode = ()=>{
		const {
			mode,
			modeArray,
		} = this.props;
		let inNum = this.in_array(mode,modeArray);
		this.props.setMusicMode(modeArray[inNum]);
	}
	showMusicList = ()=>{
		this.props.showMusicList();
	}
	in_array = (mode,modeArray)=>{
		for (let i =0 ,n = modeArray.length ;i < n ;i++){
			if (modeArray[i] === mode) {
				return i+1 === n ? 0 : i+1;
			}
		}
	}

	render(){
		const {
			mode,
			musicstatus
		} = this.props;
		let playStatu = musicstatus ? 'icon-pause' : 'icon-bigbofang' ;
		let modeStatu ;
		switch(mode){
			case 'LOOP':
			modeStatu = 'icon-shunxuxunhuan';
			break;

			case 'RANDOM':
			modeStatu = 'icon-suijibofang01';
			break;

			default :
			return 0;
		}

		return (
			<div className="music-player-control-bar">
				<div className="music-player-btnmode" onClick={this.handleClickMode}><Icon fontname={modeStatu} /></div>
				<div className="music-player-btnprev" onClick={this.handleClickPrev}><Icon fontname="icon-shangyishou" /></div>
				<div className="music-player-btnplay" onClick={this.handleClickPlay}><Icon fontname={playStatu} /></div>
				<div className="music-player-btnnext" onClick={this.handleClickNext}><Icon fontname="icon-xiayishou" /></div>
				<div className="music-player-btnlist" onClick={this.showMusicList}><Icon fontname='icon-list' /></div>
			</div>
		)
	}
}