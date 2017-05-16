import React, { Component } from 'react';
require('./MusicPlayerWord.css')

export default class MusicPlayerWord extends Component {
	state = {
		musiclyric:'网易云音乐'
	}
	/*将歌词重整为数组*/
	parseLyric(text){
		//将文本分隔成一行一行，存入数组
		var lines = text.split('\n'),
			//用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
			pattern = /\[\d{2}:\d{2}.\d{2,3}\]/g,
			//保存最终结果的数组
			result = [];
		//去掉不含时间的行
		var o = 0;
		while (pattern.test(lines[0])) {
			lines = lines.slice(1);
			if(++o == 100)return ;
		};
		//上面用'\n'生成生成数组时，结果中最后一个为空元素，这里将去掉
		lines[lines.length - 1].length === 0 && lines.pop();
		lines.forEach(function(v /*数组元素值*/ , i /*元素索引*/ , a /*数组本身*/ ) {
			//提取出时间[xx:xx.xx]
			//console.log(v)
			var time = v.match(pattern),
				//提取歌词
				value = v.replace(pattern, '');
				//console.log(time)
				
			//因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔
			time.forEach(function(v1, i1, a1) {
				//去掉时间里的中括号得到xx:xx.xx
				var t = v1.slice(1, -1).split(':');
				//将结果压入最终数组
				result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
			});
		});
		//最后将结果数组中的元素按时间大小排序，以便保存之后正常显示歌词
		result.sort(function(a, b) {
			return a[0] - b[0];
		});
		return result;
	}

	/*渲染歌词*/
	renderWord = ()=>{
		var {
			musiclyric
		} = this.state;
		if(musiclyric.length > 10){
			musiclyric = this.parseLyric(musiclyric);
			return musiclyric.map((o,index)=>{
				return (
					<div key={index} className="music-word-row">{o[1]}</div>
				);
			})
		}else{
			return <div className="music-word-row">{musiclyric}</div>;
		}
	}

	componentDidMount(){
		this.fetMusicLyric(this.props.onindex);
	}

	componentWillUpdate(){
		//this.fetMusicLyric();
	}

	componentWillReceiveProps(nextProps){
		if(this.props.onindex != nextProps.onindex){
			this.setState({
				musiclyric:'加载歌词中···'
			})
			this.fetMusicLyric(nextProps.onindex)
			return false;
		};
	}

	fetMusicLyric = (onindex) => {
		var self = this;
		const {
			musiclist,
		} = this.props;
		if(musiclist.privileges.length != 0){
			fetch('https://api.imjad.cn/cloudmusic/?type=lyric&id='+musiclist.privileges[onindex].id)
			.then(response => response.json())
			.then(json => {
				self.setState({
					musiclyric:json.lrc.lyric
				})
			})
		}
	}

	render(){
		const word = this.renderWord()
		return (
			<div className="music-player-word">
				{word}
			</div>
		)
	}
}