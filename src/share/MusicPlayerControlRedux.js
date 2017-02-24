const initialState = {
	music: {
		id:99,
		url:'src/static/song/summer.mp3'
	},
	musiclist: [],
	mode: 'RANDOM',
}

const SET_MUSIC = 'SET_MUSIC';
const SET_MUSIC_LIST = 'SET_MUSIC_LIST';
const SET_MUSIC_MODE = 'SET_MUSIC_MODE';

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

export const fetchMusicList = () => dispatch => {
	return fetch('src/static/json/songlist.json')
		.then(response => response.json())
		.then(json => dispatch(setMusicList(json)))
}

export default function musiclist(state = initialState, action) {
	switch (action.type) {
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
		default:
			return state;
	}
}