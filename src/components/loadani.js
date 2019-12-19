import React from 'react';
import ReactLoading from 'react-loading';

const LoadAni = ({ type, color }) => (
	<div id="load-overlay">
		<ReactLoading type={'bubbles'} color={'rgb(233, 232, 232)'} height={'10%'} width={'10%'} id="load-ani" />
	</div>
);

export default LoadAni;
