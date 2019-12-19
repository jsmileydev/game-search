import React from 'react';
import './resulthome.scss';

function ResultHome() {
	return (
		<div id="display">
			<p id="api-tag">
				<a href="https://rapidapi.com/valkiki/api/chicken-coop" alt="Chicken Coop API">
					Powered by Chicken Coop's Metacritic API
				</a>
			</p>
			<img
				src={require('./consolering-100.png')}
				alt="console logo ring"
				id="console-ring"
				width="160"
				height="160"
			/>
		</div>
	);
}

export default ResultHome;
