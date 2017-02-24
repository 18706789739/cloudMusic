import React, { Component } from 'react';

export default class MusicMiniPlayer extends Component{
	renderPlayer(){
		const audio = document.createElement("AUDIO")
		document.getElementsByTagName('body')[0].append(audio)
	}
	render(){
		this.renderPlayer()
		return (<div></div>)
	}
}