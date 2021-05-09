import React from 'react';
import ReactDOM from 'react-dom';

import './scss/master.scss';

function App() {
	return (
		<Header />
	);
}

function Header() {
	return (
		<div id="header">
			<button className='header-button'>Rules</button>
			<button className='header-button'>Connect to a room</button>
			<button className='header-button'>Username</button>
		</div>
	);
}

ReactDOM.render(<App />, document.getElementById('root'));