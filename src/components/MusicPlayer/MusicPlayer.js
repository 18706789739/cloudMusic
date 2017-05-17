import React, { Component } from 'react';
import MusicPlayerTop from './MusicPlayerTop.js';
import MusicPlayerWord from './MusicPlayerWord.js';
import MusicPlayerControlBar from './MusicPlayerControlBar.js';

require('./MusicPlayer.css')

export default class MusicPlayer extends Component {
	state = {
		bgurl:''
	}
	componentWillMount(){
		this.prevloadImage()
	}
	componentWillReceiveProps(newxProps){
		if(newxProps.onindex != this.props.onindex){
			this.prevloadImage(newxProps)
		}
	}

	prevloadImage(newxProps){
		var self = this;
		const {
			onindex,
			musiclist
		} = newxProps || this.props;
		var url = musiclist.playlist.tracks[onindex].al.picUrl;
		console.log(url)
		this.loadImage(url,function(){
			self.setState({bgurl:url})
		})
	}
	loadImage(url, callback) { 
		var img = new Image(); 
		img.src = url; 
		img.onload = function(){ //图片下载完毕时异步调用callback函数。 
			callback.call(img); // 将callback函数this指针切换为img。 
		}; 
	} 
	render(){
		const {
			onindex,
			musiclist,
			Player
		} = this.props;
		const topProps = {
			songname:musiclist.playlist.tracks[onindex].name,
			auther:musiclist.playlist.tracks[onindex].ar[0].name
		}
		const wordProps = {
			onindex : onindex,
			musiclist : musiclist,
			Player:Player
		}
		return (
			<div className="music-player">
				<div className="music-player-cover">
					<MusicPlayerTop {...topProps} />
					<MusicPlayerWord {...wordProps} />
					<MusicPlayerControlBar {...this.props}/>
				</div>
				<div className="music-player-blurbg" style={{backgroundImage:'url('+ this.state.bgurl +')'}}></div>
			</div>
		)
	}
}