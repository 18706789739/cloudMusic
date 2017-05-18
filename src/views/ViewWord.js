import React, { Component } from 'react';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import MusicPlayer from '../components/MusicPlayer/MusicPlayer.js'
import {setMusic,setMusicInfo,fetchMusic,setMusicPlay,setMusicMode,setMusicNext,setMusicPrev,setMusicLyric} from '../share/MusicPlayerControlRedux.js';
import MusicList from '../share/MusicList/MusicList.js';

require('./ViewWord.css');

@connect(state => {
  return {
    Player:state.home.music.Player,
    onindex:    state.home.music.onindex,
    music:  	state.home.music.music,
    musiclist:  state.home.music.musiclist,
    mode:  		state.home.music.mode,
    modeArray: 	state.home.music.modeArray,
    musicstatus:state.home.music.musicstatus,
  };
},{
  push,
  setMusic,
  fetchMusic,
  setMusicPlay,
  setMusicMode,
  setMusicNext,
  setMusicPrev,
  setMusicInfo,
})
export default class ViewWord extends Component{

  shouldComponentUpdate(props,state){
    
    return true;
  }
  componentWillMount(){
    this.props.musiclist.privileges.length == 0 && this.props.push('/');
  }

  componentDidMount(){
    this.refs.VIEW_viewword.addEventListener('click',this.listenWindow)
	}
  componentWillUnmount(){
    this.refs.musicListWindow.removeEventListener('click',this.listenWindow)
  }

 

  listenWindow = (e)=>{
      var musicListWindow = this.refs.musicListWindow;
      var target = e.target;
      while(target != musicListWindow && target.nodeName != 'BODY'){
        target = target.parentNode;
      }
      if(target != musicListWindow){
        musicListWindow.className = 'music-list-window';
      }
  }

  showMusicList = ()=>{
    this.refs.musicListWindow.className = 'music-list-window music-list-window-open';
  }

  onMusicListRowClick = (e)=>{
    const {
      fetchMusic,
      setMusicInfo
    } = this.props;
    const musicRow = e.currentTarget;
    const id = musicRow.dataset.id;
    const index = musicRow.dataset.index;
    setMusicInfo({
      onindex:index,
      music:{ url:''}
    })
    fetchMusic(id)
  }

	render(){
  console.log(66666666+'viewword render')
    const songList = this.props.musiclist.playlist.tracks;

		return (
			<div ref="VIEW_viewword" className="music-viewword">
				<MusicPlayer {...this.props} showMusicList={this.showMusicList}  />
        <div ref='musicListWindow' className="music-list-window">
          <MusicList songList = {songList} onMusicListRowClick={this.onMusicListRowClick} {...this.props}  />
        </div>
			</div>
		)
	}
}