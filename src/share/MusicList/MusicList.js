import React, {Component} from 'react' 
import MusicListRow from './MusicListRow.js'

export default class MusicList extends Component {
  
  handleClick = ()=>{
    console.log('MusicList')
  }

  render(){ 
  	const props = {
      songname      : 'Work',
      auther        : 'Rihanna',
      handleClick   : this.handleClick
    }
   	return (
      <div className="music-list">
        <MusicListRow {...props} />
      </div>
    );
  }
}