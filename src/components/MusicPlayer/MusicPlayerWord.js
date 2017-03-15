import React, { Component } from 'react';
require('./MusicPlayerWord.css')

export default class MusicPlayerWord extends Component {
	state = {
		lrc:[]
	}

	/*获取歌词 并设置state*/
	fetchLyric(){
		let lrc = ''
		let that = this;
		 $.ajax({
             type: "GET",
             url: "./1.lrc",
             dataType: "text",
             success: function(data){
                 lrc = that.parseLyric(data)
                 that.setState({lrc})
              }
         });

		
	}

	/*将歌词重整为数组*/
	parseLyric(text){
		//将文本分隔成一行一行，存入数组
		var lines = text.split('\n'),
			//用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
			pattern = /\[\d{2}:\d{2}.\d{2}\]/g,
			//保存最终结果的数组
			result = [];
		//去掉不含时间的行
		while (!pattern.test(lines[0])) {
			lines = lines.slice(1);
		};
		//上面用'\n'生成生成数组时，结果中最后一个为空元素，这里将去掉
		lines[lines.length - 1].length === 0 && lines.pop();
		lines.forEach(function(v /*数组元素值*/ , i /*元素索引*/ , a /*数组本身*/ ) {
			//提取出时间[xx:xx.xx]
			var time = v.match(pattern),
				//提取歌词
				value = v.replace(pattern, '');
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
		const {
			lrc
		} = this.state;
		if(lrc.length){
			console.log(lrc)
			return lrc.map((o,index)=>{
				return (
					<div key={index} className="music-word-row">{o[1]}</div>
				);
			})
		}else{
			return <div>暂无歌词</div>;
		}
	}

	componentDidMount(){
		//this.fetchLyric()
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