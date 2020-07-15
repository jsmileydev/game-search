import React from 'react';
import './searchhome.scss';

function SearchHome(props) {
	return (
		<div id="search-container">
			{/*TITLE LIST SEARCH*/}
			<form className="pure-form pure-form-stacked column" id="title-form" >
				<fieldset>
					<legend>Top 10 Related Games</legend>
					<div>
						<label htmlFor="search-title">Search games: </label>
						<input type="text" id="search-title" className="search" onChange={props.inputTitle} onKeyPress={props.handleKeyDownTitle} required />
					</div>
				</fieldset>
			</form>
			{/*<form className="pure-form pure-form-stacked column">
				<fieldset>
					<legend>Search By Name</legend>
					<div>
						<label htmlFor="search-title-data">Enter an EXACT game title: </label>
						<input
							type="text"
							id="search-title-data"
							className="search"
							onChange={props.inputTitleData}
							onKeyPress={props.handleKeyDownData}
							required
						/>
						<label htmlFor="search-plat-data">And a platform (required): </label>
						<input
							type="text"
							id="search-plat-data"
							className="search"
							onChange={props.inputPlatData}
							onKeyPress={props.handleKeyDownData}
							required
						/>
					</div>
				</fieldset>
	</form>*/}
		</div>
	);
}

export default SearchHome;
