import React, {Component} from 'react' 
require('./MusicListRow.css')

import Icon from '../iconfont/Icon.js';

export default class MusicListRow extends Component {
	
	rowClick = (e)=>{
		const {
			handleClick
		} = this.props;
		handleClick(e)
	}

	iconClick = (e)=>{
		e.stopPropagation()
		console.log('icon')
	}

	render(){
		const {
			songname,
			auther,
			index,
			id,
			active,
			handleClick
		} = this.props;

		const getRow = (active)=>{
			switch(active){

				case true:
				return (
					<div className='music-list-row active' data-index={index} data-id={id} onClick={this.rowClick}>
						<div className="music-list-palyIcon"><Icon fontname='icon-shengyin' /></div>
						<div className="music-list-songname music-list-textrow">{songname}</div>
						<div className="music-list-auther music-list-textrow">{auther}</div>
						<div className="music-list-btn" onClick={this.iconClick}><Icon fontname='icon-icon'/></div>
					</div>
				);
				break;

				case false:
				return (
					<div className='music-list-row' data-index={index} data-id={id} onClick={this.rowClick}>
						<div className="music-list-songname music-list-textrow">{songname}</div>
						<div className="music-list-auther music-list-textrow">{auther}</div>
						<div className="music-list-btn" onClick={this.iconClick}><Icon fontname='icon-icon'/></div>
					</div>
				);
				break;

				default:
				return(<div></div>);
				break;
			}
		}

		return (
			getRow(active)
		)
	}
}