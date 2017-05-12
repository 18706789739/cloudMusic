import React, { Component } from 'react';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import {fetchMusicList,fetchMusic,setMusicStatus,setMusicOnIndex} from '../share/MusicPlayerControlRedux.js'

@connect(state => {
  return {
  	onindex: 	state.home.music.onindex,
    music: 		state.home.music.music,
    musiclist: 	state.home.music.musiclist,
    mode: 		state.home.music.mode,
    musicplay: 	state.home.music.musicplay,
    musicprev: 	state.home.music.musicprev,
    musicnext: 	state.home.music.musicnext,
    musicstatus:state.home.music.musicstatus,
  };
}, {
  push,
  fetchMusicList,
  fetchMusic,
  setMusicStatus,
  setMusicOnIndex
})
export default class MusicPlayerControl extends Component{
	componentWillMount(){
		this.props.fetchMusicList();
	}

	playNextMusic = (statu = 1)=>{
		const {
			mode
		} = this.props;
		switch(mode){
			case 'LOOP':
			console.log('当前模式：循环模式')
			this.musicModeLoop(statu)
			break;

			case 'RANDOM':
			console.log('当前模式：随机模式')
			this.musicModeRandom()
			break;
	
			default:
			console.log('当前模式异常')
			this.musicModeLoop(statu)
			break;
		}
	}

	musicModeLoop(statu = 1){
		const {
			musiclist,
			fetchMusic,
			setMusicOnIndex
		} = this.props;
		let onindex = parseInt(this.props.onindex);
		if(statu)onindex == musiclist.privileges.length-1?onindex=0:onindex+=1;
		else{onindex == 0?onindex=musiclist.privileges.length-1:onindex-=1;}
		console.log(onindex)
		setMusicOnIndex(onindex)
		fetchMusic(musiclist.privileges[onindex].id)
	}

	musicModeRandom(){
		const {
			musiclist,
			fetchMusic,
			setMusicOnIndex
		} = this.props;
		const min = 0;
		const max = musiclist.privileges.length-1;
		let onindex ;
		/*歌曲列表只有一首时中断随机*/
		if(musiclist.privileges.length == 1){return}
		do{	onindex = Math.floor(Math.random()*(max-min+1)+min);}
		while(this.props.onindex == onindex)
		setMusicOnIndex(onindex)
		fetchMusic(musiclist.privileges[onindex].id)
	}

	shouldComponentUpdate(props,state){
		/*播放上一首歌曲*/
		if(this.props.musicprev != props.musicprev){
			this.playNextMusic(0)
			return false
		};
		/*播放下一首歌曲*/
		if(this.props.musicnext != props.musicnext){
			this.playNextMusic()
			return false
		};
		if(this.props.music != props.music){
			return true;
		}
		/*更新歌曲列表不渲染*/
		if(this.props.musiclist.privileges.length != props.musiclist.privileges.length){return false;}
		// /*setState更新onindex时不渲染*/
		// if(this.props.onindex != props.onindex){return false};
		/*更新播放器播放状态时不渲染*/
		if(this.props.musicstatus != props.musicstatus){return false};
		/*更新播放器播放模式时不渲染*/
		if(this.props.mode != props.mode){return false};
		/*控制播放暂停时不渲染*/
		if(this.props.musicplay != props.musicplay){
			if(this.props.musicstatus){
				this.refs.myAudio.pause()
				this.props.setMusicStatus(false)
			}else{
				this.refs.myAudio.play()
				this.props.setMusicStatus(true)
			}
			return false;
		}

		return true;
	}

	componentDidMount(){
		this.refs.myAudio.addEventListener('ended',this.playNextMusic)
		this.refs.myAudio.volume = 0.3;
		//this.refs.myAudio.addEventListener('timeupdate',()=>{console.log(this.refs.myAudio.currentTime)})
	}

	componentWillUnMount(){
		this.refs.myAudio.removeEventListener();
	}

	render(){
		console.log('CONtrol render!!!!!')
		const {
			music,
		} = this.props;
		return <audio ref="myAudio" controls autoPlay src={music.url}></audio>
	}
}