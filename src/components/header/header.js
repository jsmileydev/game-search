import React from 'react';
import './header.scss';

function Header() {
	return (
		<header>
			<div id="gameboy-head">
				<h1>
					<img src={require('./icons8-game-controller-24.png')} alt="controller logo" /> Game Database Search
				</h1>
			</div>
		</header>
	);
}

export default Header;
