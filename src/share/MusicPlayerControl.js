import React, { Component } from 'react';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import {fetchMusicList,fetchMusic,setMusicStatus} from '../share/MusicPlayerControlRedux.js'

@connect(state => {
  return {
    music: state.home.music.music,
    musiclist: state.home.music.musiclist,
    mode: state.home.music.mode,
    musicplay: state.home.music.musicplay,
    musicstatus:state.home.music.musicstatus
  };
}, {
  push,
  fetchMusicList,
  fetchMusic,
  setMusicStatus
})
export default class MusicPlayerControl extends Component{
	state = {
		onindex : 0
	}
	componentWillMount(){
		this.props.fetchMusicList();
	}

	playNextMusic = ()=>{
		const {
			mode
		} = this.props;
		switch(mode){
			case 'LOOP':
			console.log('当前模式：循环模式')
			this.musicModeLoop()
			break;

			case 'RANDOM':
			console.log('当前模式：随机模式')
			this.musicModeRandom()
			break;
	
			default:
			console.log('当前模式异常')
			this.musicModeLoop()
			break;
		}
	}

	musicModeLoop(){
		const {
			musiclist,
			fetchMusic,
		} = this.props;
		let {onindex} = this.state;
		onindex == musiclist.privileges.length-1?onindex=0:onindex+=1;
		this.setState({onindex})
		fetchMusic(musiclist.privileges[onindex].id)
	}

	musicModeRandom(){
		const {
			musiclist,
			fetchMusic
		} = this.props;
		const min = 0;
		const max = musiclist.privileges.length-1;
		let onindex ;
		/*歌曲列表只有一首时中断随机*/
		if(musiclist.privileges.length == 1){return}
		do{	onindex = Math.floor(Math.random()*(max-min+1)+min);}
		while(this.state.onindex == onindex)
		this.setState({onindex})
		fetchMusic(musiclist.privileges[onindex].id)
	}

	shouldComponentUpdate(props,state){
		/*更新歌曲列表不渲染*/
		if(this.props.musiclist.privileges.length != props.musiclist.privileges.length){return false;}
		/*setState更新onindex时不渲染*/
		if(this.state.onindex != state.onindex){return false};
		/*更新播放器播放状态时不渲染*/
		if(this.props.musicstatus != props.musicstatus){return false};
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