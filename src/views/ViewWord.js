import React, { Component } from 'react';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import MusicPlayer from '../components/MusicPlayer/MusicPlayer.js'
import {fetchMusic,setMusicPlay,setMusicMode,setMusicNext,setMusicPrev,setMusicOnIndex,setMusicLyric,fetchMusicLyric} from '../share/MusicPlayerControlRedux.js';
import MusicList from '../share/MusicList/MusicList.js';

require('./ViewWord.css');

@connect(state => {
  return {
    onindex:    state.home.music.onindex,
    music:  	state.home.music.music,
    musiclist:  state.home.music.musiclist,
    mode:  		state.home.music.mode,
    modeArray: 	state.home.music.modeArray,
    musicstatus:state.home.music.musicstatus,
    musiclyric:state.home.music.musiclyric
  };
},{
  push,
  fetchMusic,
  setMusicPlay,
  setMusicMode,
  setMusicNext,
  setMusicPrev,
  setMusicOnIndex,
  fetchMusicLyric
})
export default class ViewWord extends Component{

  shouldComponentUpdate(props,state){
    if(this.props.music != props.music){
      return true;
    }
    /*更新歌曲列表不渲染*/
    if(this.props.musiclist.privileges.length != props.musiclist.privileges.length){return false;}
    // /*setState更新onindex时不渲染*/
     if(this.props.onindex != props.onindex){return false};
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
    console.log(999999999999999900909)

    return true;
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
      setMusicOnIndex
    } = this.props;
    const musicRow = e.currentTarget;
    const id = musicRow.dataset.id;
    const index = musicRow.dataset.index;
    setMusicOnIndex(index)
    fetchMusic(id)
  }

	render(){
  console.log(66666666+'viewword render')
    const songList = this.props.musiclist.playlist.tracks;

		return (
			<div ref="VIEW_viewword" className="music-viewword">
				<MusicPlayer {...this.props} showMusicList={this.showMusicList}  />
        <div ref='musicListWindow' className="music-list-window music-list-window-open">
          <MusicList songList = {songList} onMusicListRowClick={this.onMusicListRowClick} {...this.props}  />
        </div>
			</div>
		)
	}
}