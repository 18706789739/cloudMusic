const initialState = {
	music: {},
	musiclist:{
		privileges:[],
		playlist:{
			tracks:[]
		}
	},
	onindex:0,
	mode: 'LOOP',
	modeArray:['LOOP','RANDOM'],
	musicplay:0,
	musicnext:0,
	musicprev:0,
	musicstatus:true,
	musiclyric:'',
}

const SET_MUSIC_ONINDEX = 'SET_MUSIC_ONINDEX';
const SET_MUSIC = 'SET_MUSIC';
const SET_MUSIC_LIST = 'SET_MUSIC_LIST';
const SET_MUSIC_MODE = 'SET_MUSIC_MODE';
const SET_MUSIC_NEXT = 'SET_MUSIC_NEXT';
const SET_MUSIC_PREV = 'SET_MUSIC_PREV';
const SET_MUSIC_PLAY = 'SET_MUSIC_PLAY';
const SET_MUSIC_STATUS = 'SET_MUSIC_STATUS';
const SET_MUSIC_LYRIC = 'SET_MUSIC_LYRIC';

export function setMusicOnIndex(index) {
	return {
		type: SET_MUSIC_ONINDEX,
		payload: index
	}
}

export function setMusic(msuic) {
	return {
		type: SET_MUSIC,
		payload: msuic
	}
}

export function setMusicList(musiclist) {
	return {
		type: SET_MUSIC_LIST,
		payload: musiclist
	}
}

export function setMusicMode(mode) {
	return {
		type: SET_MUSIC_MODE,
		payload: mode
	}
}

export function setMusicNext(o) {
	return {
		type: SET_MUSIC_NEXT,
		payload: new Date().valueOf()
	}
}

export function setMusicPrev(o) {
	return {
		type: SET_MUSIC_PREV,
		payload: new Date().valueOf()
	}
}

export function setMusicPlay(bool) {
	return {
		type: SET_MUSIC_PLAY,
		payload:new Date().valueOf()
	}
}

export function setMusicStatus(bool) {
	return {
		type: SET_MUSIC_STATUS,
		payload:bool
	}
}

export function setMusicLyric(json) {
	return {
		type: SET_MUSIC_LYRIC,
		payload:json
	}
}


export default function musiclist(state = initialState, action) {
	switch (action.type) {
		case SET_MUSIC_ONINDEX:{
			return {
				...state,
				onindex: action.payload
			}
		}
		case SET_MUSIC:{
			return {
				...state,
				music: action.payload
			}
		}
		case SET_MUSIC_LIST:{
			return {
				...state,
				musiclist: action.payload
			}
		}
		case SET_MUSIC_MODE:{
			return {
				...state,
				mode: action.payload
			}
		}
		case SET_MUSIC_NEXT:{
			return{
				...state,
				musicnext:action.payload
			}
		}
		case SET_MUSIC_PREV:{
			return{
				...state,
				musicprev:action.payload
			}
		}
		case SET_MUSIC_PLAY:{
			return{
				...state,
				musicplay:action.payload
			}
		}
		case SET_MUSIC_STATUS:{
			return{
				...state,
				musicstatus:action.payload
			}
		}
		case SET_MUSIC_LYRIC:{
			return{
				...state,
				musiclyric:action.payload
			}
		}
		default:
			return state;
	}
}

/*根据id获取歌曲*/
export const fetchMusic = (id) => dispatch => {
	return fetch('https://api.imjad.cn/cloudmusic/?type=song&id='+id)
	.then(response => response.json())
	.then(json =>{
		json.data[0].url == null && dispatch(setMusicNext());
		dispatch(setMusic(json.data[0]))
	})
}
/*获取歌单*/
export const fetchMusicList = () => dispatch => {
	return fetch('https://api.imjad.cn/cloudmusic/?type=playlist&id=391820753')
		.then(response => response.json())
		.then(json => {
			/*获取到歌单放进state*/
			dispatch(setMusicList(json))
			/*根据第一首ID查询歌曲*/
			let id = json.privileges[0].id;
			dispatch(fetchMusic(id))
		})
}
/*根据id获取歌词*/
export const fetchMusicLyric = (id) => dispatch => {
	return fetch('https://api.imjad.cn/cloudmusic/?type=lyric&id='+id)
		.then(response => response.json())
		.then(json => {
			dispatch(setMusicLyric(json.lrc.lyric));
		})
}