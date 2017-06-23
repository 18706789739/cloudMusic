import React, { Component } from 'react';
var classNames = require('classnames');
require('./MusicPlayerWord.css')

export default class MusicPlayerWord extends Component {
	state = {
		musiclyric:'网易云音乐',
		lyricRow:0
	}
	/*将歌词重整为数组*/
	parseLyric(text){
		//将文本分隔成一行一行，存入数组
		var lines = text.split('\n'),
			//用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
			pattern = /\[\d{2}:\d{2}.\d{1,3}\]/g,
			//保存最终结果的数组
			result = [];
		//去掉不含时间的行
		//var o = 0;
		while (!pattern.test(lines[0])) {
			lines = lines.slice(1);
			//if(++o ==1000){break;}
		};
		//上面用'\n'生成生成数组时，结果中最后一个为空元素，这里将去掉
		lines[lines.length - 1].length === 0 && lines.pop();
		lines.forEach(function(v /*数组元素值*/ , i /*元素索引*/ , a /*数组本身*/ ) {
			//提取出时间[xx:xx.xx]
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
		console.log(result)
		return result;
	}

	/*渲染歌词*/
	renderWord = ()=>{
		var {
			musiclyric,
			lyricRow
		} = this.state;
		if(musiclyric instanceof Array){
			return musiclyric.map((o,index)=>{
				let active = lyricRow == index ? true : false;
				return (
					<div>
						<div key={index} ref={`lyric${index}`} className={classNames('music-word-row',{'music-word-row-active':active})}>{o[1]}</div>
						{null}					
					</div>
				);
			})
		}else{
			return <div className="music-word-row">{musiclyric}</div>;
		}
	}

	componentDidMount(){
		this.fetMusicLyric(this.props.onindex);
	}

	lyricScroll = ()=>{
		var self = this;
		const Player = this.props.Player;
		const {
			lyricRow,
			musiclyric
		} = this.state;
		// 歌词行高
		const rowLineHeight = 30;
		var _I_ = 0;
		
		// 不注释自己都忘了这里啥意思
		while (true){
			//如果i 大于歌词长度 跳出循环
			if(_I_ > musiclyric.length-1){
				break;
			}
			//当前播放时间小于 首行歌词播放时间 跳出循环
			if(Player.currentTime<musiclyric[_I_][0]){
				break;
			}
			// 当前播放时间 小于数组[i] 的播放时间 ？？？？
			if(Player.currentTime>musiclyric[_I_][0] && musiclyric[_I_+1] ? Player.currentTime<musiclyric[_I_+1][0] : true){
				break;
			}else{
				++_I_;
			}
		}

		if(_I_ != lyricRow){	
			this.setState({lyricRow: _I_},()=>{
				let scroll = 0;
				for(let i = 0; i<_I_; i++){
					// 这里可以优化一下
					scroll += self.refs['lyric'+i].offsetHeight;
				}
				
				self.refs.myWord.setAttribute('style','transform:translateY(-'+scroll +'px);-webkit-transform:translateY(-'+ scroll +'px)')
			})
		}
		
	}

	componentWillUpdate(){
		//this.fetMusicLyric();
	}

	componentWillReceiveProps(nextProps){
		if(this.props.onindex != nextProps.onindex){
			this.setState({
				musiclyric:'加载歌词中···'
			})
			this.props.Player.removeEventListener('timeupdate',this.lyricScroll)
			this.refs.myWord.setAttribute('style','transform:translateY(0px);transition:all 0s;-webkit-transition:all 0s');
			this.fetMusicLyric(nextProps.onindex)
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
				console.log(json)
				if(json.nolyric === true){
					self.setState({
						musiclyric:'纯音乐请欣赏'
					})
				}else{

					let musiclyric = self.parseLyric(json.lrc.lyric);
					let tlyric = []
					if(json.tlyric.lyric!=null){
						tlyric = self.parseLyric(json.tlyric.lyric);
						for(let i =0,len = musiclyric.length; i<len; i++){
							if(musiclyric[i][0] == tlyric[0][0]){
								console.log(i)
								break;
							}
						}
					}

					self.setState({
						musiclyric:musiclyric,
						tlyric:tlyric,
						lyricRow:0
					},self.props.Player.addEventListener('timeupdate',this.lyricScroll))
				}
				
			})
		}
	}

	render(){
		const word = this.renderWord()
		return (
			<div className="music-player-word">
				<div className="music-player-halfword"></div>
				<div className="music-player-wordbox">
					<div ref='myWord' data-scroll={0} className="music-player-scrollbox">{word}</div>
				</div>
			</div>
		)
	}
}