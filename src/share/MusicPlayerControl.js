import React, { Component } from 'react';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import {setMusic,fetchMusicList} from '../share/MusicPlayerControlRedux.js'

@connect(state => {
  return {
    music: state.home.music.music,
    musiclist: state.home.music.musiclist,
    mode: state.home.music.mode,
  };
}, {
  push,
  fetchMusicList,
  setMusic
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
			this.MusicModeLoop()
			break;

			case 'RANDOM':
			console.log('当前模式：随机模式')
			this.MusicModeRandom()
			break;
	
			default:
			console.log('当前模式异常')
			this.MusicModeLoop()
			break;
		}
	}

	MusicModeLoop(){
		const {
			musiclist,
			setMusic,
		} = this.props;
		let {onindex} = this.state;
		onindex == musiclist.length-1?onindex=0:onindex+=1;
		this.setState({onindex})
		setMusic(musiclist[onindex])
	}

	MusicModeRandom(){
		const {
			musiclist,
			setMusic
		} = this.props;
		const min = 0;
		const max = musiclist.length-1;
		let onindex ;
		if(musiclist.length == 1){return}
		do{	onindex = Math.floor(Math.random()*(max-min+1)+min);}
		while(this.state.onindex == onindex)
		this.setState({onindex})
		setMusic(musiclist[onindex])
	}

	shouldComponentUpdate(props,state){
		if(this.state.onindex != state.onindex){return false}
		return true;
	}

	componentDidMount(){
		this.refs.myAudio.addEventListener('ended',this.playNextMusic)
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