import React from 'react';
require('./font/iconfont.css')

export default (props)=>{
	const {
		fontname
	} = props;
	return (
		<i className={`iconfont ${fontname}`}></i>
	)
}