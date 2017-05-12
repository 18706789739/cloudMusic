import React, {Component} from 'react' 
import MusicListRow from './MusicListRow.js'
require('./MusicList.less')

export default class MusicList extends Component {
  
  rowClick = (e)=>{
    const {
      onMusicListRowClick
    } = this.props;
    onMusicListRowClick(e)
  }

  shouldComponentUpdate(props,state){
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

  render(){ 

    const songList = this.props.songList;
    const onindex = this.props.onindex;

   	return (
      <div className="music-list">
        {songList.map(function(item,index){
          let active = onindex == index ? true : false;
            return (
              <MusicListRow key={item.id}
                            active={active}
                            id={item.id} 
                            index={index}
                            songname={item.name}
                            auther={item.ar[0].name}
                            handleClick={this.rowClick}
               />
            )
          }.bind(this))
        }
      </div>
    );
  }
}