import React from 'react';
import MusicPlayerControl from '../share/MusicPlayerControl.js'
require('./Frame.less')

class Frame extends React.Component {
  render() {
    return (
        <div className="fremacontainer">
        	{this.props.children}
			<MusicPlayerControl />
        </div>
    );
  }
}

export default Frame;
